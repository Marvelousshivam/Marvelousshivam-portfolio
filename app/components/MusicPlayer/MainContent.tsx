import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Play, Search, Loader2, MoreHorizontal, ChevronRight, Shuffle } from "lucide-react";
import { useAudioStore } from '../../store/audioStore';
import { useMusicAppStore } from '../../store/musicAppStore';
import { fetchHomePlaylists, fetchPlaylistTracks, searchMusic } from '../../../lib/musicService';

export default function MainContent() {
  const { currentTrack, queue, setQueue, playTrack, isPlaying } = useAudioStore();
  const { 
    activeTab, homePlaylists, setHomePlaylists, 
    searchQuery, setSearchQuery, searchResults, setSearchResults,
    isSearching, setIsSearching, setActiveTab
  } = useMusicAppStore();

  const [isLoadingHome, setIsLoadingHome] = useState(true);

  useEffect(() => {
    if (homePlaylists.length === 0) {
      setIsLoadingHome(true);
      fetchHomePlaylists().then(data => {
        setHomePlaylists(data);
        setIsLoadingHome(false);
      });
    } else {
      setIsLoadingHome(false);
    }
  }, [homePlaylists.length, setHomePlaylists]);

  const handleSearch = async (query: string) => {
    if (!query) return;
    setIsSearching(true);
    setActiveTab('search');
    const results = await searchMusic(query);
    setSearchResults(results);
    setIsSearching(false);
  };

  const playPlaylist = async (id: string) => {
    const tracks = await fetchPlaylistTracks(id);
    if (tracks.length > 0) {
      setQueue(tracks);
      playTrack(tracks[0]);
    }
  };

  // Skeletons
  const SkeletonHero = () => (
    <div className="w-full flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
       {[1, 2, 3].map(i => (
         <div key={i} className="min-w-[85vw] md:min-w-[600px] h-[300px] md:h-[340px] rounded-2xl bg-gray-200 dark:bg-white/10 animate-pulse snap-center shrink-0"></div>
       ))}
    </div>
  );

  const SkeletonCard = () => (
    <div className="min-w-[140px] md:min-w-[180px] max-w-[140px] md:max-w-[180px]">
      <div className="w-[140px] md:w-[180px] h-[140px] md:h-[180px] rounded-[10px] bg-gray-200 dark:bg-white/10 animate-pulse mb-3"></div>
      <div className="h-3 w-3/4 bg-gray-200 dark:bg-white/10 rounded animate-pulse mb-1"></div>
      <div className="h-2 w-1/2 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 pt-16 md:p-8 lg:px-12 pb-24 md:pb-8 no-scrollbar relative bg-white dark:bg-[#1c1c1e] transition-colors">
      
      {/* HOME VIEW (Listen Now / Browse) */}
      {(activeTab === 'home' || activeTab === 'browse' || activeTab === 'library') && (
        <div className="animate-in fade-in duration-500 max-w-[1400px] mx-auto">
          <h1 className="text-3xl md:text-[34px] font-bold mb-6 text-gray-900 dark:text-white tracking-tight capitalize">
            {activeTab === 'home' ? 'Listen Now' : activeTab}
          </h1>
          
          {isLoadingHome ? (
            <div className="space-y-12">
              <SkeletonHero />
              {[1, 2].map((section) => (
                <div key={section} className="border-b border-gray-200/50 dark:border-white/5 pb-8 last:border-0">
                  <div className="h-6 w-48 bg-gray-200 dark:bg-white/10 rounded animate-pulse mb-4"></div>
                  <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* HERO CAROUSEL */}
              <div className="w-full flex gap-4 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory">
                 {homePlaylists[0]?.items.slice(0, 4).map((pl: any, idx: number) => (
                   <button 
                     key={`hero-${pl.id}`} 
                     className="relative min-w-[85vw] md:min-w-[600px] h-[280px] md:h-[340px] rounded-2xl overflow-hidden snap-center shrink-0 group text-left border-none p-0 cursor-pointer"
                     onClick={() => playPlaylist(pl.id)}
                     aria-label={`Play ${pl.title || pl.name}`}
                   >
                     <Image src={pl.image?.[pl.image.length - 1]?.link || pl.image?.[pl.image.length - 1]?.url || "/pbx1.jpg"} alt={pl.title || pl.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                     <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                        <div>
                          <p className="text-white/70 text-xs md:text-sm font-semibold uppercase tracking-widest mb-1.5">Featured Playlist</p>
                          <h2 className="text-white text-2xl md:text-4xl font-bold tracking-tight">{pl.title || pl.name}</h2>
                          <p className="text-white/80 text-sm mt-1">{pl.subtitle || "Apple Music"}</p>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play fill="currentColor" size={20} className="ml-1" />
                        </div>
                     </div>
                   </button>
                 ))}
              </div>

              <hr className="border-gray-200/50 dark:border-white/5 mb-10" />

              {/* BENTO GRIDS */}
              {homePlaylists.map(section => (
                <div key={section.title} className="mb-12 border-b border-gray-200/50 dark:border-white/5 pb-10 last:border-0">
                  <div className="flex items-end justify-between mb-4 group cursor-pointer">
                    <h2 className="text-[20px] md:text-[22px] font-bold tracking-tight text-gray-900 dark:text-white flex items-center hover:underline decoration-red-500">
                      {section.title} <ChevronRight size={20} className="text-gray-400 group-hover:text-red-500 ml-1 transition-colors" />
                    </h2>
                  </div>
                  <div className="flex gap-4 md:gap-5 overflow-x-auto pb-4 no-scrollbar scroll-smooth snap-x">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {section.items.map((pl: any) => (
                      <button type="button" key={pl.id} aria-label={`Play playlist ${pl.title || pl.name}`} className="min-w-[140px] md:min-w-[180px] max-w-[140px] md:max-w-[180px] group p-0 border-none bg-transparent text-left block snap-start" onClick={() => playPlaylist(pl.id)}>
                        <div className="relative w-[140px] md:w-[180px] h-[140px] md:h-[180px] rounded-[10px] md:rounded-[12px] overflow-hidden mb-3 shadow-sm bg-gray-200 dark:bg-gray-800">
                          {pl.image && pl.image.length > 0 && (
                            <Image src={pl.image[pl.image.length - 1].link || pl.image[pl.image.length - 1].url || "/pbx1.jpg"} alt={pl.title || pl.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 140px, 180px" />
                          )}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-2 md:p-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
                              <Play fill="currentColor" size={16} className="ml-1" />
                            </div>
                          </div>
                        </div>
                        <h3 className="font-medium text-[13px] md:text-[14px] truncate text-gray-900 dark:text-gray-100 leading-tight">{pl.title || pl.name}</h3>
                        <p className="text-[12px] text-gray-500 truncate mt-0.5">{pl.songCount ? `${pl.songCount} songs` : pl.language || "Apple Music"}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* SEARCH & QUEUE VIEW */}
      {(activeTab === 'search' || activeTab === 'queue') && (
        <div className="animate-in fade-in duration-500 max-w-5xl mx-auto pt-4 md:pt-0">
          <div className="relative w-full mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              className="w-full pl-12 pr-4 py-3.5 bg-gray-100 dark:bg-[#2c2c2e] border border-transparent focus:border-red-500/50 rounded-xl text-[16px] outline-none transition-all placeholder:text-gray-500 shadow-sm"
              placeholder="Artists, Songs, Lyrics, and More"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch(searchQuery);
              }}
              aria-label="Search"
            />
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[26px] font-bold tracking-tight text-gray-900 dark:text-white">
              {activeTab === 'search' ? (searchResults.length > 0 ? 'Top Results' : 'Search') : 'Up Next'}
            </h2>
            {activeTab === 'queue' && queue.length > 0 && (
               <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-200 dark:bg-[#2c2c2e] rounded-md text-xs font-medium text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-[#3a3a3c] transition-colors"><Shuffle size={14}/> Shuffle</button>
            )}
          </div>
          
          {isSearching ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-gray-400" size={32} />
            </div>
          ) : (
            <div className="space-y-1">
              {(activeTab === 'search' ? searchResults : queue).map((track, i) => (
                <div 
                  key={`${track.id}-${i}`}
                  onClick={() => playTrack(track)}
                  role="button"
                  aria-label={`Play ${track.name} by ${track.artist}`}
                  className={`group flex items-center gap-4 p-2.5 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 transition-colors ${currentTrack?.id === track.id ? 'bg-gray-100 dark:bg-white/10' : ''}`}
                >
                  <div className="relative w-12 h-12 flex-shrink-0 rounded-[6px] overflow-hidden shadow-sm bg-gray-200 dark:bg-gray-800">
                    <Image src={track.albumArt || "/pbx1.jpg"} alt={track.name} fill className="object-cover" sizes="48px" />
                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center ${currentTrack?.id === track.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                      {currentTrack?.id === track.id && isPlaying ? (
                         <div className="flex items-center justify-center w-4 h-4">
                           <span className="w-[2px] h-2.5 bg-white mx-[1px] animate-[pulse_0.5s_ease-in-out_infinite] rounded-full"></span>
                           <span className="w-[2px] h-3.5 bg-white mx-[1px] animate-[pulse_0.7s_ease-in-out_infinite_0.1s] rounded-full"></span>
                           <span className="w-[2px] h-2 bg-white mx-[1px] animate-[pulse_0.6s_ease-in-out_infinite_0.2s] rounded-full"></span>
                         </div>
                      ) : (
                        <Play size={16} className="text-white fill-white ml-0.5" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[14px] truncate ${currentTrack?.id === track.id ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-900 dark:text-gray-100 font-medium'}`}>{track.name}</p>
                    <p className="text-[12px] text-gray-500 truncate mt-0.5">{track.artist}</p>
                  </div>
                  <div className="hidden sm:block text-[11px] font-medium text-gray-400 px-4 w-24 text-right truncate">
                    {track.source === 'ytm' ? 'YouTube' : 'JioSaavn'}
                  </div>
                  <button aria-label="More options" className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-opacity">
                     <MoreHorizontal size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
