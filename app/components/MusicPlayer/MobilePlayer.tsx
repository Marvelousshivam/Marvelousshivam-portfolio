import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Search, Loader2, MessageSquare, ChevronDown, Repeat, Shuffle, Home, Music2, Disc3, Mic2, LayoutGrid, Clock, MoreHorizontal } from "lucide-react";
import { useAudioStore } from '../../store/audioStore';
import { useMusicAppStore } from '../../store/musicAppStore';

interface MobilePlayerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lyrics: any[] | 'loading' | 'error' | null;
}

export default function MobilePlayer({ lyrics }: MobilePlayerProps) {
  const { currentTrack, isPlaying, progress, duration, volume, togglePlay, next, prev, seek, setVolume } = useAudioStore();
  const { 
    activeTab, setActiveTab,
    isMobilePlayerOpen, setIsMobilePlayerOpen,
    mobileView, setMobileView
  } = useMusicAppStore();

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progressValue = duration > 0 ? (progress / duration) * 100 : 0;

  // --- Framer Motion Drag Physics ---
  const y = useMotionValue(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // When dragging the mini player up
  const handleDragEnd = (event: any, info: any) => {
    const threshold = -100; // Swipe up 100px to open
    if (info.offset.y < threshold || info.velocity.y < -500) {
      setIsMobilePlayerOpen(true);
    }
    controls.start({ y: 0, transition: { type: "spring", bounce: 0, duration: 0.4 } });
  };

  // When dragging the full player down
  const handleFullPlayerDragEnd = (event: any, info: any) => {
    const threshold = 150; // Swipe down 150px to close
    if (info.offset.y > threshold || info.velocity.y > 500) {
      setIsMobilePlayerOpen(false);
      setMobileView('art'); // Reset to art view
    } else {
      controls.start({ y: 0, transition: { type: "spring", bounce: 0, duration: 0.4 } });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TabItem = ({ tab, icon: Icon, label }: { tab: any, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(tab)}
      className={`flex flex-col items-center justify-center gap-1 w-full h-full ${activeTab === tab ? 'text-red-500' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}
    >
      <Icon size={24} className={activeTab === tab ? 'fill-current stroke-[1.5px]' : 'stroke-[1.5px]'} />
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </button>
  );

  return (
    <>
      {/* --- MOBILE NAVIGATION BAR (iOS Style Bottom Tabs) --- */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 h-[83px] bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-3xl border-t border-gray-200/50 dark:border-white/10 z-30 flex items-start pt-2 justify-around px-2 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <TabItem tab="home" icon={Home} label="Listen Now" />
        <TabItem tab="browse" icon={LayoutGrid} label="Browse" />
        <TabItem tab="library" icon={Music2} label="Library" />
        <TabItem tab="search" icon={Search} label="Search" />
      </div>

      {/* --- MOBILE MINI PLAYER --- */}
      {/* Hidden if full player is open, else draggable upwards */}
      <motion.div 
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.2, bottom: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ y, opacity: isMobilePlayerOpen ? 0 : 1, pointerEvents: isMobilePlayerOpen ? 'none' : 'auto' }}
        className="md:hidden absolute bottom-[88px] left-2 right-2 h-[60px] bg-white/80 dark:bg-[#2c2c2e]/80 backdrop-blur-3xl border border-gray-200/50 dark:border-white/10 rounded-xl z-20 flex items-center justify-between px-3 cursor-pointer shadow-xl overflow-hidden touch-none"
        onClick={() => setIsMobilePlayerOpen(true)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/5 dark:to-white/5 pointer-events-none"></div>
        <div className="flex items-center gap-3 min-w-0 z-10">
          {currentTrack ? (
            <>
              <div className="relative w-10 h-10 rounded-md overflow-hidden shadow-md flex-shrink-0 bg-gray-200 dark:bg-gray-800">
                <Image src={currentTrack.albumArt} alt={currentTrack.name} fill className="object-cover" sizes="40px" />
              </div>
              <div className="truncate pr-4">
                <p className="text-[14px] font-semibold text-gray-900 dark:text-white truncate">{currentTrack.name}</p>
                <p className="text-[12px] text-gray-500 dark:text-gray-400 truncate mt-0.5">{currentTrack.artist}</p>
              </div>
            </>
          ) : (
            <div className="w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <Music2 size={20} className="text-gray-400" />
            </div>
          )}
        </div>
        <div className="flex items-center gap-5 z-10 pr-1">
          <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="text-gray-900 dark:text-white hover:scale-110 transition-transform">
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="text-gray-900 dark:text-white hover:scale-110 transition-transform">
            <SkipForward size={24} fill="currentColor" />
          </button>
        </div>
      </motion.div>

      {/* --- MOBILE FULL SCREEN PLAYER (iOS 17 Apple Music Style) --- */}
      <motion.div 
        ref={containerRef}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        onDragEnd={handleFullPlayerDragEnd}
        animate={{ y: isMobilePlayerOpen ? 0 : '100%' }}
        transition={{ type: "spring", bounce: 0, duration: 0.5 }}
        className="md:hidden absolute inset-0 z-[100] bg-white dark:bg-[#1c1c1e] flex flex-col touch-none overflow-hidden"
      >
        {/* Dynamic iOS 17 morphing background */}
        {currentTrack && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute inset-0 opacity-60 dark:opacity-80 transition-all duration-1000 ease-in-out"
              style={{
                backgroundImage: `url(${currentTrack.albumArt})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(90px) saturate(300%) brightness(0.8)',
                transform: 'scale(1.2)'
              }}
            />
            {/* Animated Blobs for iOS 17 fluid feel */}
            <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-white/20 dark:bg-black/20 rounded-full blur-[80px] mix-blend-overlay animate-[spin_10s_linear_infinite]" />
            <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-black/10 dark:bg-black/40 rounded-full blur-[80px] mix-blend-overlay animate-[spin_15s_linear_infinite_reverse]" />
          </div>
        )}
        
        <div className="relative z-10 flex flex-col h-full px-6 pt-12 pb-10">
          
          {/* Header Grabber & Toggles */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="w-10 h-1.5 bg-gray-400/50 dark:bg-white/30 rounded-full absolute left-1/2 -translate-x-1/2 -top-8 cursor-grab active:cursor-grabbing"></div>
            
            <button onClick={() => { setIsMobilePlayerOpen(false); setMobileView('art'); }} className="p-2 -ml-2 text-gray-800 dark:text-white/80 hover:text-gray-900 dark:hover:text-white">
              <ChevronDown size={28} />
            </button>
            <div className="flex gap-4">
               <button 
                 onClick={() => setMobileView('art')} 
                 className={`p-2 transition-all ${mobileView === 'art' ? 'opacity-100 scale-110' : 'opacity-40 scale-100'}`}
               >
                 <Music2 size={20} className="text-gray-900 dark:text-white" />
               </button>
               <button 
                 onClick={() => setMobileView('lyrics')} 
                 className={`p-2 transition-all ${mobileView === 'lyrics' ? 'opacity-100 scale-110 text-red-500' : 'opacity-40 scale-100 text-gray-900 dark:text-white'}`}
               >
                 <MessageSquare size={20} className={mobileView === 'lyrics' ? 'fill-current' : ''} />
               </button>
            </div>
          </div>

          {/* Main Area: Art or Lyrics */}
          <div className="flex-1 flex items-center justify-center mb-8 relative overflow-hidden">
             
             {/* Art View */}
             <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${mobileView === 'art' ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                <div 
                  className="relative w-full max-w-[340px] aspect-square rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-out" 
                  style={{ transform: isPlaying ? 'scale(1)' : 'scale(0.85)' }}
                >
                  {currentTrack && <Image src={currentTrack.albumArt} alt="cover" fill className="object-cover" sizes="340px" />}
                </div>
             </div>

             {/* Lyrics View */}
             <div id="lyrics-container-mobile" className={`absolute inset-0 overflow-y-auto no-scrollbar scroll-smooth transition-all duration-500 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_10%,black_80%,transparent)] ${mobileView === 'lyrics' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}>
                 <div className="w-full text-left space-y-8 pt-[30vh] pb-[40vh] px-2 relative">
                    {lyrics === 'loading' && <Loader2 className="animate-spin text-gray-900 dark:text-white/50 mx-auto" size={32} />}
                    {lyrics === 'error' && (
                      <div className="text-center text-gray-900 dark:text-white/50 mt-10">
                        <MessageSquare size={48} className="mx-auto mb-4 opacity-30" />
                        <p className="text-xl font-medium tracking-tight">Lyrics not available</p>
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
                              : 'text-gray-900/30 dark:text-white/30 blur-[1.5px] opacity-60 hover:text-gray-900/50 dark:hover:text-white/50 hover:blur-none'
                          }`}
                          onClick={() => { if (line.time !== -1) seek((line.time / duration) * 100); }}
                        >
                          {isActive && line.words ? (
                            line.words.map((word: {time: number, text: string}, wi: number) => {
                               const wordActive = progress >= word.time;
                               return (
                                 <span key={wi} className={`transition-colors duration-200 ${wordActive ? 'text-gray-900 dark:text-white' : 'text-gray-900/50 dark:text-white/50'} mr-1`}>
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
          <div className="w-full max-w-[340px] mx-auto">
            {/* Song Title & Artist */}
            <div className="flex items-center justify-between mb-8">
              <div className="min-w-0 pr-4">
                <h2 className="text-[24px] font-bold truncate text-gray-900 dark:text-white tracking-tight leading-tight">{currentTrack?.name || 'Not Playing'}</h2>
                <p className="text-[18px] text-gray-900/70 dark:text-white/70 truncate mt-0.5">{currentTrack?.artist || 'Unknown'}</p>
              </div>
              <button className="w-8 h-8 flex items-center justify-center bg-black/5 dark:bg-white/10 rounded-full hover:scale-110 transition-transform">
                <MoreHorizontal size={18} className="text-gray-900 dark:text-white" />
              </button>
            </div>

            {/* iOS Timeline Scrubber */}
            <div className="mb-8 group">
              <div 
                className="w-full h-1.5 bg-black/10 dark:bg-white/20 rounded-full mb-2 cursor-pointer relative group-active:h-2.5 transition-all"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  seek(((e.clientX - rect.left) / rect.width) * 100);
                }}
              >
                <div className="absolute top-0 left-0 h-full bg-gray-900 dark:bg-white rounded-full" style={{ width: `${progressValue}%` }}></div>
              </div>
              <div className="flex justify-between text-[11px] font-medium text-gray-900/50 dark:text-white/50 px-1">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-10 mb-10">
              <button onClick={prev} className="text-gray-900 dark:text-white hover:scale-110 active:scale-95 transition-transform"><SkipBack size={38} fill="currentColor" /></button>
              <button 
                onClick={togglePlay} 
                className="w-20 h-20 flex items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-black rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform"
              >
                {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1.5" />}
              </button>
              <button onClick={next} className="text-gray-900 dark:text-white hover:scale-110 active:scale-95 transition-transform"><SkipForward size={38} fill="currentColor" /></button>
            </div>
            
            {/* Volume */}
            <div className="flex items-center gap-4 px-2">
              <Volume2 size={16} className="text-gray-900/50 dark:text-white/50" />
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
      </motion.div>
    </>
  );
}
