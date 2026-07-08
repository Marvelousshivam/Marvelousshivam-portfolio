"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from 'next/image';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Search, Loader2, ListMusic, Music, ChevronDown, Repeat, Shuffle, Home, MessageSquare, MoreHorizontal, Maximize2, Minimize2 } from "lucide-react";

const SAAVN_API = "https://jiosaavn-api.shivamrajuniverse616.workers.dev/api";
const YTM_API = "https://music-cgd8.onrender.com/api";

interface Track {
  id: string;
  name: string;
  artist: string;
  albumArt: string;
  src: string;
  duration?: number;
  source: 'saavn' | 'ytm';
}

interface LyricWord {
  time: number;
  text: string;
  duration?: number;
}

interface LyricLine {
  time: number;
  text: string;
  words?: LyricWord[];
  duration?: number;
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Navigation
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'queue'>('home');
  const [showLyricsPanel, setShowLyricsPanel] = useState(false);
  const [isDetailedPlayerOpen, setIsDetailedPlayerOpen] = useState(false);
  
  const [homePlaylists, setHomePlaylists] = useState<{title: string, items: unknown[]}[]>([]);
  const [lyrics, setLyrics] = useState<LyricLine[] | 'loading' | 'error' | null>(null);

  // Mobile specific state
  const [isMobilePlayerOpen, setIsMobilePlayerOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'art' | 'lyrics'>('art');
  const touchStartY = useRef<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [enRes, hiRes, trRes] = await Promise.allSettled([
        fetch(`${SAAVN_API}/search/playlists?query=top english&limit=8`).then(r => r.json()),
        fetch(`${SAAVN_API}/search/playlists?query=top hindi&limit=8`).then(r => r.json()),
        fetch(`${SAAVN_API}/search/playlists?query=trending&limit=8`).then(r => r.json())
      ]);
      const sections = [];
      if (enRes.status === 'fulfilled' && enRes.value.success) {
        sections.push({ title: 'Top English', items: enRes.value.data.results });
      }
      if (hiRes.status === 'fulfilled' && hiRes.value.success) {
        sections.push({ title: 'Top Hindi', items: hiRes.value.data.results });
      }
      if (trRes.status === 'fulfilled' && trRes.value.success) {
        sections.push({ title: 'Trending', items: trRes.value.data.results });
      }
      setHomePlaylists(sections);
    } catch (e) {
      console.error("Home fetch failed", e);
    }
  };

  const parseLrc = (lrc: string): LyricLine[] => {
    const lines = lrc.split('\n');
    const parsed: LyricLine[] = [];
    const lineTimeRegex = /\[(\d+):(\d+\.\d+)\]/;
    const wordRegex = /<(\d+):(\d+\.\d+)>\s*([^<]*)/g;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = lineTimeRegex.exec(line);
      if (match) {
         const min = parseInt(match[1]);
         const sec = parseFloat(match[2]);
         const lineTime = min * 60 + sec;
         
         const textContent = line.replace(lineTimeRegex, '').trim();
         
         const words: LyricWord[] = [];
         let wordMatch;
         let hasWords = false;
         
         wordRegex.lastIndex = 0; 
         while ((wordMatch = wordRegex.exec(textContent)) !== null) {
            hasWords = true;
            const wMin = parseInt(wordMatch[1]);
            const wSec = parseFloat(wordMatch[2]);
            words.push({ time: wMin * 60 + wSec, text: wordMatch[3].trim() });
         }

         const cleanText = textContent.replace(/<\d+:\d+\.\d+>/g, '').trim();
         
         parsed.push({ 
           time: lineTime, 
           text: cleanText,
           words: hasWords ? words : undefined
         });
      } else if (line.trim() && !line.startsWith('[')) {
         parsed.push({ time: -1, text: line.trim() });
      }
    }

    // Process line durations and fake word-by-word if missing
    for (let i = 0; i < parsed.length; i++) {
      if (parsed[i].time !== -1 && i < parsed.length - 1 && parsed[i+1].time !== -1) {
         parsed[i].duration = parsed[i+1].time - parsed[i].time;
      } else {
         parsed[i].duration = 5; // fallback 5 sec
      }

      // Automatically generate fake word-by-word sync if provider only gave line-sync
      if (!parsed[i].words && parsed[i].text.length > 0 && parsed[i].time !== -1) {
         const textWords = parsed[i].text.split(' ');
         const timePerWord = (parsed[i].duration! * 0.8) / textWords.length;
         const generatedWords: LyricWord[] = [];
         let currentTime = parsed[i].time;
         
         for (const w of textWords) {
            generatedWords.push({ time: currentTime, text: w });
            currentTime += timePerWord;
         }
         parsed[i].words = generatedWords;
      }
    }

    return parsed;
  };

  const fetchLyrics = async (track: Track) => {
    setLyrics('loading');
    try {
      if (track.source === 'ytm') {
        const res = await fetch(`https://music-cgd8.onrender.com/api/lyrics/${track.id.replace('ytm-', '')}`);
        if (res.ok) {
           const data = await res.json();
           if (data.lyrics && data.lyrics !== "Lyrics not available for this track.") {
               setLyrics(parseLrc(data.lyrics));
               return;
           }
        }
      }
      
      const cleanName = track.name.replace(/\(.*\)/g, '').trim();
      const res = await fetch(`https://lrclib.net/api/get?track_name=${encodeURIComponent(cleanName)}&artist_name=${encodeURIComponent(track.artist.split(',')[0])}`);
      if (res.ok) {
         const data = await res.json();
         if (data.syncedLyrics) {
           setLyrics(parseLrc(data.syncedLyrics));
         } else if (data.plainLyrics) {
           setLyrics([{ time: -1, text: data.plainLyrics }]);
         } else {
           setLyrics('error');
         }
      } else {
         setLyrics('error');
      }
    } catch {
      setLyrics('error');
    }
  };

  useEffect(() => {
    if (currentTrack) {
      fetchLyrics(currentTrack);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  useEffect(() => {
    if (!currentTrack) return;
    
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(currentTrack.src);
    audio.preload = "auto";
    audio.volume = volume;

    const onTime = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || currentTrack.duration || 0);
      setIsPlaying(!audio.paused);
      
      if (showLyricsPanel || (isMobilePlayerOpen && mobileView === 'lyrics') || isDetailedPlayerOpen) {
        const activeLyric = document.getElementById('active-lyric');
        if (activeLyric) {
           let container;
           if (isDetailedPlayerOpen) container = document.getElementById('lyrics-container-detailed');
           else if (isMobilePlayerOpen) container = document.getElementById('lyrics-container-mobile');
           else container = document.getElementById('lyrics-container-sidebar');
           
           if (container) {
             const scrollPos = activeLyric.offsetTop - (container.clientHeight / 2) + (activeLyric.clientHeight / 2);
             container.scrollTo({ top: scrollPos, behavior: 'smooth' });
           } else {
             activeLyric.scrollIntoView({ behavior: 'smooth', block: 'center' });
           }
        }
      }
    };
    
    const onEnded = () => {
      next();
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);

    audioRef.current = audio;
    audio.play().catch(e => console.log("Autoplay prevented:", e));
    setIsPlaying(true);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (showLyricsPanel || (isMobilePlayerOpen && mobileView === 'lyrics') || isDetailedPlayerOpen) {
      setTimeout(() => {
        const activeLyric = document.getElementById('active-lyric');
        if (activeLyric) {
           let container;
           if (isDetailedPlayerOpen) container = document.getElementById('lyrics-container-detailed');
           else if (isMobilePlayerOpen) container = document.getElementById('lyrics-container-mobile');
           else container = document.getElementById('lyrics-container-sidebar');
           
           if (container) {
             const scrollPos = activeLyric.offsetTop - (container.clientHeight / 2) + (activeLyric.clientHeight / 2);
             container.scrollTo({ top: scrollPos, behavior: 'smooth' });
           } else {
             activeLyric.scrollIntoView({ behavior: 'smooth', block: 'center' });
           }
        }
      }, 100);
    }
  }, [showLyricsPanel, isMobilePlayerOpen, mobileView, isDetailedPlayerOpen]);

  const searchSongs = async (query: string) => {
    if (!query) return;
    setIsSearching(true);
    setActiveTab('search');
    try {
      const [saavnRes, ytmRes] = await Promise.allSettled([
        fetch(`${SAAVN_API}/search/songs?query=${encodeURIComponent(query)}&limit=10`).then(r => r.json()),
        fetch(`${YTM_API}/search?q=${encodeURIComponent(query)}&filter=songs`).then(r => r.json())
      ]);

      let combined: Track[] = [];

      if (saavnRes.status === 'fulfilled' && saavnRes.value.success) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sTracks = saavnRes.value.data.results.map((t: Record<string, unknown>) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const tAny = t as any;
          return {
            id: `saavn-${tAny.id}`,
            name: tAny.name,
            artist: tAny.primaryArtists || tAny.artists?.primary?.[0]?.name || "Unknown",
            albumArt: tAny.image?.[2]?.link || tAny.image?.[tAny.image?.length - 1]?.url || "",
            src: tAny.downloadUrl?.[tAny.downloadUrl?.length - 1]?.link || tAny.downloadUrl?.[tAny.downloadUrl?.length - 1]?.url || "",
            duration: tAny.duration,
            source: 'saavn' as const
          };
        }).filter((t: Track) => t.src !== "");
        combined = [...combined, ...sTracks];
      }

      if (ytmRes.status === 'fulfilled' && Array.isArray(ytmRes.value)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const yTracks = ytmRes.value.slice(0, 5).map((t: Record<string, unknown>) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const tAny = t as any;
          return {
            id: `ytm-${tAny.videoId}`,
            name: tAny.title,
            artist: tAny.artists?.map((a:any) => a.name).join(', ') || "Unknown",
            albumArt: tAny.thumbnails?.[tAny.thumbnails?.length - 1]?.url || "",
            src: `${YTM_API}/stream/${tAny.videoId}`,
            source: 'ytm' as const
          };
        });
        combined = [...combined, ...yTracks];
      }

      setSearchResults(combined);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsSearching(false);
    }
  };
  
  const playPlaylist = async (id: string) => {
    try {
      const res = await fetch(`${SAAVN_API}/playlists?id=${id}&limit=20`);
      const data = await res.json();
      if (data.success && data.data && data.data.songs) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tracks = data.data.songs.map((t: Record<string, unknown>) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const tAny = t as any;
          return {
            id: `saavn-${tAny.id}`,
            name: tAny.name,
            artist: tAny.primaryArtists || "Unknown",
            albumArt: tAny.image?.[2]?.link || "",
            src: tAny.downloadUrl?.[tAny.downloadUrl?.length - 1]?.link || "",
            source: 'saavn' as const
          };
        }).filter((t: Track) => t.src !== "");
        if (tracks.length > 0) {
          setQueue(tracks);
          setCurrentTrack(tracks[0]);
          setActiveTab('queue');
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    if (!queue.find(t => t.id === track.id)) {
      setQueue(prev => [...prev, track]);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const next = () => {
    if (!currentTrack || queue.length === 0) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % queue.length;
    setCurrentTrack(queue[nextIndex]);
  };
  
  const prev = () => {
    if (!currentTrack || queue.length === 0) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    setCurrentTrack(queue[prevIndex]);
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || duration === 0) return;
    const newTime = (value / 100) * duration;
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progressValue = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="w-full h-full bg-white dark:bg-[#1c1c1e] text-gray-900 dark:text-white flex flex-col overflow-hidden relative">
      
      {currentTrack && (
        <div 
          className="absolute inset-0 z-0 opacity-5 dark:opacity-10 transition-all duration-1000 ease-in-out pointer-events-none"
          style={{
            backgroundImage: `url(${currentTrack.albumArt})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(100px) saturate(200%)',
            transform: 'scale(1.1)'
          }}
        />
      )}

      {/* --- DESKTOP TOP BAR (Apple Music macOS Style) --- */}
      <div 
        data-drag-handle="true"
        className="hidden md:flex h-[60px] bg-gray-100/95 dark:bg-[#2c2c2e]/95 backdrop-blur-3xl border-b border-gray-200/50 dark:border-black/50 z-40 flex-shrink-0 items-center justify-between px-4 w-full pl-[84px] transition-colors relative"
      >
        
        {/* Left: Playback Controls */}
        <div className="flex items-center gap-5 w-auto flex-shrink-0">
          <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><Shuffle size={14} /></button>
          <button onClick={prev} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"><SkipBack size={18} fill="currentColor" /></button>
          <button 
            onClick={togglePlay} 
            className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-[#3a3a3c] hover:bg-gray-300 dark:hover:bg-[#4a4a4c] rounded-full transition-colors shadow-inner"
          >
            {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-1" />}
          </button>
          <button onClick={next} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"><SkipForward size={18} fill="currentColor" /></button>
          <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><Repeat size={14} /></button>
        </div>

        {/* Center: LCD Display (Now Playing) */}
        <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-[400px] h-10 bg-white/60 dark:bg-black/30 rounded-md border border-gray-200/50 dark:border-white/5 flex items-center px-2 shadow-inner group">
          {currentTrack ? (
             <>
               <div className="relative w-7 h-7 rounded-sm overflow-hidden flex-shrink-0 shadow-sm mr-3 bg-gray-200 dark:bg-gray-800 cursor-pointer" onClick={() => setIsDetailedPlayerOpen(!isDetailedPlayerOpen)}>
                 <Image src={currentTrack.albumArt} alt={currentTrack.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {isDetailedPlayerOpen ? <Minimize2 size={12} className="text-white" /> : <Maximize2 size={12} className="text-white" />}
                 </div>
               </div>
               <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
                  <div className="flex items-center justify-center gap-1 -mt-0.5">
                    <span className="text-[11px] font-semibold truncate text-gray-900 dark:text-gray-100">{currentTrack.name}</span>
                    <span className="text-[11px] text-gray-500">—</span>
                    <span className="text-[11px] text-gray-500 truncate">{currentTrack.artist}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] text-gray-500 w-6 text-right">{formatTime(progress)}</span>
                    <div 
                      className="flex-1 h-1 bg-gray-300/50 dark:bg-gray-700/50 rounded-full cursor-pointer relative"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        seek(((e.clientX - rect.left) / rect.width) * 100);
                      }}
                    >
                      <div className="absolute top-0 left-0 h-full bg-gray-600 dark:bg-gray-400 rounded-full hover:bg-red-500 transition-colors" style={{ width: `${progressValue}%` }}></div>
                    </div>
                    <span className="text-[9px] text-gray-500 w-6">{formatTime(duration)}</span>
                  </div>
               </div>
             </>
          ) : (
             <div className="flex-1 flex items-center justify-center text-xs text-gray-400">Not Playing</div>
          )}
        </div>

        {/* Right: Volume & Options */}
        <div className="flex items-center justify-end gap-3 w-auto flex-shrink-0">
          <div className="flex items-center gap-2 w-24">
            <Volume2 size={12} className="text-gray-500" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              className="flex-1 h-1 bg-gray-300/50 dark:bg-gray-700/50 rounded-full appearance-none cursor-pointer accent-gray-500"
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </div>
          <button 
            onClick={() => setShowLyricsPanel(!showLyricsPanel)}
            className={`p-1.5 rounded-md transition-colors ${showLyricsPanel ? 'bg-black/10 dark:bg-white/10 text-red-500' : 'text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5'}`}
          >
            <MessageSquare size={14} className={showLyricsPanel ? 'fill-current' : ''} />
          </button>
          <button 
            onClick={() => setActiveTab(activeTab === 'queue' ? 'home' : 'queue')}
            className={`p-1.5 rounded-md transition-colors ${activeTab === 'queue' ? 'bg-black/10 dark:bg-white/10 text-red-500' : 'text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5'}`}
          >
            <ListMusic size={14} className={activeTab === 'queue' ? 'text-red-500' : ''} />
          </button>
        </div>
      </div>

      {/* --- DESKTOP DETAILED PLAYER (Full Screen Mode) --- */}
      {isDetailedPlayerOpen && currentTrack && (
        <div className="hidden md:flex absolute inset-0 top-[60px] z-30 bg-white/60 dark:bg-[#121212]/80 backdrop-blur-3xl transition-all duration-500 animate-in fade-in zoom-in-95">
           
           {/* Detailed Blur */}
           <div 
              className="absolute inset-0 z-0 opacity-40 dark:opacity-60 pointer-events-none"
              style={{
                backgroundImage: `url(${currentTrack.albumArt})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(100px) saturate(200%)',
              }}
            />

           <div className="relative z-10 w-full h-full flex items-center justify-center gap-16 p-12">
              
              {/* Left Side: Massive Album Art */}
              <div className="w-[400px] flex-shrink-0 flex flex-col items-center">
                 <div className="relative w-full aspect-square rounded-[16px] overflow-hidden shadow-2xl transition-transform duration-500" style={{ transform: isPlaying ? 'scale(1)' : 'scale(0.95)' }}>
                    <Image src={currentTrack.albumArt} alt={currentTrack.name} fill className="object-cover" />
                 </div>
                 <div className="w-full mt-8 text-center">
                    <h2 className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight">{currentTrack.name}</h2>
                    <p className="text-[20px] text-gray-700 dark:text-gray-300 mt-1 opacity-80">{currentTrack.artist}</p>
                 </div>
              </div>

              {/* Right Side: Detailed Lyrics */}
              <div id="lyrics-container-detailed" className="w-full max-w-[500px] h-full overflow-y-auto no-scrollbar scroll-smooth py-[30vh] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
                  <div className="w-full text-left space-y-8 relative">
                    {lyrics === 'loading' && <Loader2 className="animate-spin text-gray-400 mx-auto" size={32} />}
                    {lyrics === 'error' && (
                      <div className="text-center text-gray-500">
                        <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="text-xl font-medium">Lyrics not available</p>
                      </div>
                    )}
                    {Array.isArray(lyrics) && lyrics.map((line, i) => {
                      const isActive = line.time !== -1 && progress >= line.time && (i === lyrics.length - 1 || progress < lyrics[i+1].time);
                      return (
                        <p 
                          key={i} 
                          id={isActive ? 'active-lyric' : undefined}
                          className={`text-4xl font-bold transition-all duration-300 tracking-tight leading-tight cursor-pointer ${
                            isActive 
                              ? 'text-gray-900 dark:text-white blur-none opacity-100 scale-[1.02] origin-left' 
                              : 'text-gray-900/30 dark:text-white/30 blur-[1px] opacity-50 hover:text-gray-900/60 dark:hover:text-white/60 hover:blur-none'
                          }`}
                          onClick={() => { if (line.time !== -1) seek((line.time / duration) * 100); }}
                        >
                          {isActive && line.words ? (
                            line.words.map((word, wi) => {
                               const wordActive = progress >= word.time;
                               return (
                                 <span key={wi} className={`transition-colors duration-150 ${wordActive ? 'text-gray-900 dark:text-white' : 'text-gray-900/60 dark:text-white/60'} mr-1.5`}>
                                   {word.text}
                                 </span>
                               )
                            })
                          ) : (
                            line.text || "♪"
                          )}
                        </p>
                      );
                    })}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* --- BODY --- */}
      <div className="flex flex-1 overflow-hidden z-10 relative flex-col md:flex-row">
        
        {/* SIDEBAR */}
        <div className="hidden md:flex w-[220px] flex-col bg-gray-50/50 dark:bg-black/20 backdrop-blur-xl border-r border-gray-200/50 dark:border-black/50 p-3 pt-4 transition-colors">
          
          <div className="relative w-full mb-6">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
            <input 
              type="text"
              className="w-full pl-8 pr-3 py-1 bg-gray-200/60 dark:bg-white/10 border border-transparent focus:border-red-500/50 rounded-md text-[11px] outline-none transition-all placeholder:text-gray-500"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') searchSongs(searchQuery);
              }}
            />
            {isSearching && <Loader2 size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 animate-spin text-gray-400" />}
          </div>
          
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 mb-1 px-2 uppercase tracking-wider">Apple Music</p>
            <button 
              onClick={() => setActiveTab('home')}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors text-[13px] font-medium ${activeTab === 'home' ? 'bg-gray-200/80 dark:bg-white/10 text-gray-900 dark:text-white' : 'hover:bg-gray-200/50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'}`}
            >
              <Home size={14} className={activeTab === 'home' ? 'text-red-500' : 'text-gray-400'} /> Listen Now
            </button>
            <button 
              onClick={() => setActiveTab('search')}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors text-[13px] font-medium ${activeTab === 'search' ? 'bg-gray-200/80 dark:bg-white/10 text-gray-900 dark:text-white' : 'hover:bg-gray-200/50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'}`}
            >
              <Search size={14} className={activeTab === 'search' ? 'text-red-500' : 'text-gray-400'} /> Browse
            </button>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-4 pt-16 md:p-6 lg:p-8 pb-24 md:pb-8 no-scrollbar relative">
          
          {/* HOME VIEW */}
          {activeTab === 'home' && (
            <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
              <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">Listen Now</h1>
              
              {homePlaylists.length === 0 ? (
                <div className="flex items-center justify-center h-40">
                  <Loader2 className="animate-spin text-gray-400" size={24} />
                </div>
              ) : (
                homePlaylists.map(section => (
                  <div key={section.title} className="mb-10 border-b border-gray-200/50 dark:border-white/5 pb-8 last:border-0">
                    <h2 className="text-[17px] font-bold mb-3 flex items-center justify-between tracking-tight">
                      {section.title}
                      <button className="text-[11px] text-red-500 font-medium hover:underline">See All</button>
                    </h2>
                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {section.items.map((pl: any) => (
                        <div key={pl.id} className="min-w-[140px] max-w-[140px] cursor-pointer group" onClick={() => playPlaylist(pl.id)}>
                          <div className="relative w-[140px] h-[140px] rounded-lg overflow-hidden mb-2 shadow-sm bg-gray-200 dark:bg-gray-800">
                            {pl.image && pl.image.length > 0 && (
                              <Image src={pl.image[pl.image.length - 1].link || pl.image[pl.image.length - 1].url || "/pbx1.jpg"} alt={pl.title || pl.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="140px" />
                            )}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-2">
                              <div className="w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
                                <Play fill="currentColor" size={14} className="ml-0.5" />
                              </div>
                            </div>
                          </div>
                          <h3 className="font-medium text-[12px] truncate text-gray-900 dark:text-gray-100 leading-tight">{pl.title || pl.name}</h3>
                          <p className="text-[10px] text-gray-500 truncate mt-0.5">{pl.songCount ? `${pl.songCount} songs` : pl.language}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* SEARCH & QUEUE VIEW */}
          {(activeTab === 'search' || activeTab === 'queue') && (
            <div className="animate-in fade-in duration-500 max-w-4xl mx-auto pt-4 md:pt-0">
              <div className="relative w-full mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-gray-200/80 dark:bg-[#2c2c2e] border border-transparent focus:border-red-500/50 rounded-xl text-[15px] outline-none transition-all placeholder:text-gray-500 shadow-sm"
                  placeholder="Artists, Songs, Lyrics"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') searchSongs(searchQuery);
                  }}
                />
                {isSearching && <Loader2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-gray-400" />}
              </div>
              <h2 className="text-2xl font-bold mb-6 tracking-tight hidden md:block">
                {activeTab === 'search' ? (searchResults.length > 0 ? 'Results' : 'Search') : 'Up Next'}
              </h2>
              
              <div className="space-y-0.5">
                {(activeTab === 'search' ? searchResults : queue).map((track, i) => (
                  <div 
                    key={`${track.id}-${i}`}
                    onClick={() => playTrack(track)}
                    className={`group flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 transition-colors ${currentTrack?.id === track.id ? 'bg-gray-100 dark:bg-white/10' : ''}`}
                  >
                    <div className="relative w-10 h-10 flex-shrink-0 rounded-[4px] overflow-hidden shadow-sm bg-gray-200 dark:bg-gray-800">
                      <Image src={track.albumArt || "/pbx1.jpg"} alt={track.name} fill className="object-cover" sizes="40px" />
                      <div className={`absolute inset-0 bg-black/40 flex items-center justify-center ${currentTrack?.id === track.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                        {currentTrack?.id === track.id && isPlaying ? (
                           <div className="flex items-center justify-center w-3 h-3">
                             <span className="w-[1.5px] h-2 bg-white mx-[1px] animate-pulse rounded-full"></span>
                             <span className="w-[1.5px] h-3 bg-white mx-[1px] animate-pulse delay-75 rounded-full"></span>
                             <span className="w-[1.5px] h-1.5 bg-white mx-[1px] animate-pulse delay-150 rounded-full"></span>
                           </div>
                        ) : (
                          <Play size={12} className="text-white fill-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[13px] truncate ${currentTrack?.id === track.id ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-800 dark:text-gray-200 font-medium'}`}>{track.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{track.artist}</p>
                    </div>
                    <div className="hidden sm:block text-[10px] font-medium text-gray-400 px-4">
                      {track.source === 'ytm' ? 'YouTube' : 'JioSaavn'}
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-opacity">
                       <MoreHorizontal size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE LYRICS PANEL */}
        {showLyricsPanel && !isDetailedPlayerOpen && (
          <div className="hidden md:flex w-[320px] bg-gray-50/80 dark:bg-[#2c2c2e]/50 backdrop-blur-3xl border-l border-gray-200/50 dark:border-black/50 flex-col h-full animate-in slide-in-from-right duration-300">
             {currentTrack ? (
               <div id="lyrics-container-sidebar" className="relative h-full overflow-hidden p-6 pb-20 overflow-y-auto no-scrollbar scroll-smooth [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_10%,black_80%,transparent)]">
                 <div 
                    className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: `url(${currentTrack.albumArt})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'blur(50px) saturate(200%)'
                    }}
                  />
                  
                 <div className="relative z-10 w-full text-left space-y-6 pt-32 pb-64">
                    {lyrics === 'loading' && <Loader2 className="animate-spin text-gray-400 mt-20 mx-auto" size={24} />}
                    {lyrics === 'error' && (
                      <div className="text-center text-gray-500 mt-20">
                        <MessageSquare size={32} className="mx-auto mb-4 opacity-20" />
                        <p className="text-[13px] font-medium">Lyrics not available</p>
                      </div>
                    )}
                    {Array.isArray(lyrics) && lyrics.map((line, i) => {
                      const isActive = line.time !== -1 && progress >= line.time && (i === lyrics.length - 1 || progress < lyrics[i+1].time);
                      return (
                        <p 
                          key={i} 
                          id={isActive ? 'active-lyric' : undefined}
                          className={`text-[20px] font-bold transition-all duration-300 tracking-tight leading-snug cursor-pointer ${
                            isActive 
                              ? 'text-gray-900 dark:text-white blur-none opacity-100 scale-[1.02] origin-left' 
                              : 'text-gray-900/40 dark:text-white/40 blur-[0.5px] opacity-60 hover:text-gray-900/70 dark:hover:text-white/70 hover:blur-none'
                          }`}
                          onClick={() => { if (line.time !== -1) seek((line.time / duration) * 100); }}
                        >
                          {isActive && line.words ? (
                            line.words.map((word, wi) => {
                               const wordActive = progress >= word.time;
                               return (
                                 <span key={wi} className={`transition-colors duration-150 ${wordActive ? 'text-gray-900 dark:text-white' : 'text-gray-900/60 dark:text-white/60'} mr-1`}>
                                   {word.text}
                                 </span>
                               )
                            })
                          ) : (
                            line.text || "♪"
                          )}
                        </p>
                      );
                    })}
                 </div>
               </div>
             ) : (
               <div className="flex items-center justify-center h-full text-gray-400 text-[13px]">Play a song to see lyrics</div>
             )}
          </div>
        )}
      </div>

      {/* --- MOBILE NAVIGATION BAR (iOS Style Bottom Tabs) --- */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 h-[64px] bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-2xl border-t border-gray-200/50 dark:border-black/50 z-30 flex items-center justify-around px-2 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full ${activeTab === 'home' ? 'text-red-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
        >
          <Home size={22} className={activeTab === 'home' ? 'fill-current' : ''} />
          <span className="text-[10px] font-medium tracking-wide">Listen Now</span>
        </button>
        <button 
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full ${activeTab === 'search' ? 'text-red-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
        >
          <Search size={22} className={activeTab === 'search' ? 'stroke-[2.5px]' : ''} />
          <span className="text-[10px] font-medium tracking-wide">Search</span>
        </button>
      </div>

      {/* --- MOBILE MINI PLAYER (Only visible when mobile layout active and full player closed) --- */}
      <div 
        className="md:hidden absolute bottom-[64px] left-2 right-2 h-[56px] bg-white/95 dark:bg-[#2c2c2e]/95 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 rounded-xl z-20 flex items-center justify-between px-3 cursor-pointer shadow-lg overflow-hidden"
        onClick={() => setIsMobilePlayerOpen(true)}
      >
        <div className="flex items-center gap-3 min-w-0">
          {currentTrack ? (
            <>
              <div className="relative w-9 h-9 rounded-md overflow-hidden shadow-sm flex-shrink-0 bg-gray-200 dark:bg-gray-800">
                <Image src={currentTrack.albumArt} alt={currentTrack.name} fill className="object-cover" sizes="40px" />
              </div>
              <div className="truncate">
                <p className="text-[13px] font-medium text-gray-900 dark:text-white truncate">{currentTrack.name}</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">{currentTrack.artist}</p>
              </div>
            </>
          ) : (
            <div className="w-9 h-9 rounded-md bg-gray-200 dark:bg-gray-800"></div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="text-gray-900 dark:text-white">
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="text-gray-900 dark:text-white">
            <SkipForward size={20} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* --- MOBILE FULL SCREEN PLAYER (iOS Apple Music Style) --- */}
      <div className={`md:hidden absolute inset-0 z-[100] bg-white dark:bg-[#121212] transition-transform duration-500 flex flex-col ${isMobilePlayerOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        
        {/* Dynamic iOS blurred background */}
        {currentTrack && (
          <div 
            className="absolute inset-0 z-0 opacity-40 dark:opacity-60 pointer-events-none"
            style={{
              backgroundImage: `url(${currentTrack.albumArt})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(80px) saturate(200%)',
              transform: 'scale(1.2)'
            }}
          />
        )}
        
        <div className="relative z-10 flex flex-col h-full px-6 pt-10 pb-12">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => setIsMobilePlayerOpen(false)} className="w-10 h-1 flex items-center justify-center mx-auto opacity-40 absolute left-1/2 -translate-x-1/2 -top-6">
               <div className="w-10 h-1.5 bg-gray-400 rounded-full"></div>
            </button>
            <button onClick={() => setIsMobilePlayerOpen(false)} className="p-2 -ml-2 text-gray-800 dark:text-white">
              <ChevronDown size={28} />
            </button>
            <div className="flex gap-4">
               <button onClick={() => setMobileView('art')} className={`p-2 transition-opacity ${mobileView === 'art' ? 'opacity-100' : 'opacity-40'}`}><Music size={20} /></button>
               <button onClick={() => setMobileView('lyrics')} className={`p-2 transition-opacity ${mobileView === 'lyrics' ? 'opacity-100 text-red-500' : 'opacity-40'}`}><MessageSquare size={20} className={mobileView === 'lyrics' ? 'fill-current' : ''} /></button>
            </div>
          </div>

          {/* Main Area: Art or Lyrics */}
          <div className="flex-1 flex items-center justify-center mb-8 relative overflow-hidden">
             
             {/* Art View with Swipe to Dismiss */}
             <div 
               className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${mobileView === 'art' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
               onTouchStart={(e) => touchStartY.current = e.touches[0].clientY}
               onTouchMove={(e) => {
                 if (touchStartY.current !== null) {
                   const deltaY = e.touches[0].clientY - touchStartY.current;
                   if (deltaY > 100) { // Swipe down threshold
                     setIsMobilePlayerOpen(false);
                     touchStartY.current = null;
                   }
                 }
               }}
               onTouchEnd={() => touchStartY.current = null}
             >
                <div className="relative w-full max-w-[320px] aspect-square rounded-[16px] overflow-hidden shadow-2xl transition-transform duration-500" style={{ transform: isPlaying ? 'scale(1)' : 'scale(0.90)' }}>
                  {currentTrack && <Image src={currentTrack.albumArt} alt="cover" fill className="object-cover" sizes="320px" />}
                </div>
             </div>

             {/* Lyrics View */}
             <div id="lyrics-container-mobile" className={`absolute inset-0 overflow-y-auto no-scrollbar scroll-smooth transition-all duration-500 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] ${mobileView === 'lyrics' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                 <div className="w-full text-left space-y-8 pt-10 pb-64 relative">
                    {lyrics === 'loading' && <Loader2 className="animate-spin text-gray-400 mt-20 mx-auto" size={32} />}
                    {lyrics === 'error' && (
                      <div className="text-center text-gray-500 mt-20">
                        <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="text-xl font-medium">Lyrics not available</p>
                      </div>
                    )}
                    {Array.isArray(lyrics) && lyrics.map((line, i) => {
                      const isActive = line.time !== -1 && progress >= line.time && (i === lyrics.length - 1 || progress < lyrics[i+1].time);
                      return (
                        <p 
                          key={i} 
                          id={isActive ? 'active-lyric' : undefined}
                          className={`text-3xl font-bold transition-all duration-300 tracking-tight leading-tight cursor-pointer ${
                            isActive 
                              ? 'text-gray-900 dark:text-white blur-none opacity-100 scale-105 origin-left' 
                              : 'text-gray-900/40 dark:text-white/40 blur-[1px] opacity-60 hover:text-gray-900/70 dark:hover:text-white/70 hover:blur-none'
                          }`}
                          onClick={() => { if (line.time !== -1) seek((line.time / duration) * 100); }}
                        >
                          {isActive && line.words ? (
                            line.words.map((word, wi) => {
                               const wordActive = progress >= word.time;
                               return (
                                 <span key={wi} className={`transition-colors duration-200 ${wordActive ? 'text-gray-900 dark:text-white' : 'text-gray-900/60 dark:text-white/60'} mr-1`}>
                                   {word.text}
                                 </span>
                               )
                            })
                          ) : (
                            line.text || "♪"
                          )}
                        </p>
                      );
                    })}
                 </div>
             </div>
          </div>

          {/* Info & Controls */}
          <div className="w-full max-w-[320px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="min-w-0 pr-4">
                <h2 className="text-[22px] font-bold truncate text-gray-900 dark:text-white tracking-tight leading-tight">{currentTrack?.name || 'Not Playing'}</h2>
                <p className="text-[17px] text-gray-600 dark:text-gray-300 truncate opacity-90 mt-0.5">{currentTrack?.artist || 'Unknown'}</p>
              </div>
              <button onClick={() => setIsLiked(!isLiked)} className="w-8 h-8 flex items-center justify-center bg-black/5 dark:bg-white/10 rounded-full">
                <Heart size={16} className={isLiked ? "text-red-500 fill-red-500" : "text-gray-900 dark:text-white"} />
              </button>
            </div>

            {/* Scrubber */}
            <div className="mb-8">
              <div 
                className="w-full h-1.5 bg-black/10 dark:bg-white/20 rounded-full mb-2 cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  seek(((e.clientX - rect.left) / rect.width) * 100);
                }}
              >
                <div className="absolute top-0 left-0 h-full bg-gray-900 dark:bg-white rounded-full" style={{ width: `${progressValue}%` }}></div>
              </div>
              <div className="flex justify-between text-[11px] font-medium text-gray-500 dark:text-gray-400">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between mb-10 px-2">
              <button className="text-gray-900 dark:text-white opacity-50 hover:opacity-100 transition-opacity"><Shuffle size={18} /></button>
              <button onClick={prev} className="text-gray-900 dark:text-white hover:scale-105 transition-transform"><SkipBack size={32} fill="currentColor" /></button>
              <button 
                onClick={togglePlay} 
                className="w-16 h-16 flex items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-black rounded-full shadow-xl hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1.5" />}
              </button>
              <button onClick={next} className="text-gray-900 dark:text-white hover:scale-105 transition-transform"><SkipForward size={32} fill="currentColor" /></button>
              <button className="text-gray-900 dark:text-white opacity-50 hover:opacity-100 transition-opacity"><Repeat size={18} /></button>
            </div>
            
            {/* Volume */}
            <div className="flex items-center gap-4">
              <Volume2 size={16} className="text-gray-900 dark:text-white opacity-50" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                className="flex-1 h-1.5 bg-black/10 dark:bg-white/20 rounded-full appearance-none accent-gray-900 dark:accent-white"
                onChange={(e) => setVolume(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}