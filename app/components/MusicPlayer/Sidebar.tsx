import React from 'react';
import { Search, PlayCircle, LayoutGrid, Clock, Mic2, Disc3, Music2, Loader2 } from "lucide-react";
import { useMusicAppStore } from '../../store/musicAppStore';
import { searchMusic } from '../../../lib/musicService';

export default function Sidebar() {
  const { 
    searchQuery, setSearchQuery, 
    isSearching, setIsSearching, 
    activeTab, setActiveTab, 
    setSearchResults 
  } = useMusicAppStore();

  const handleSearch = async (query: string) => {
    if (!query) return;
    setIsSearching(true);
    setActiveTab('search');
    const results = await searchMusic(query);
    setSearchResults(results);
    setIsSearching(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const NavItem = ({ tab, icon: Icon, label }: { tab: any, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(tab)}
      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-[5px] transition-colors text-[13px] font-medium ${activeTab === tab ? 'bg-red-500/90 text-white' : 'hover:bg-gray-200/50 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200'}`}
      aria-label={label}
    >
      <Icon size={16} className={activeTab === tab ? 'text-white' : 'text-red-500'} strokeWidth={2.2} /> {label}
    </button>
  );

  return (
    <div className="hidden md:flex w-[240px] flex-col bg-white/40 dark:bg-black/30 backdrop-blur-3xl border-r border-gray-200/50 dark:border-white/10 p-3 pt-6 transition-colors select-none z-10">
      
      {/* Search Input */}
      <div className="relative w-full mb-6 mt-2">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" size={14} />
        <input 
          type="text"
          className="w-full pl-7 pr-3 py-1 bg-gray-200/60 dark:bg-[#2c2c2e]/60 border border-transparent focus:border-red-500/50 rounded-md text-[13px] outline-none transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-white"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch(searchQuery);
          }}
          aria-label="Search music"
        />
        {isSearching && <Loader2 size={12} className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin text-gray-400" />}
      </div>
      
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
        
        {/* Apple Music Section */}
        <div className="space-y-0.5">
          <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1 px-2">Apple Music</p>
          <NavItem tab="home" icon={PlayCircle} label="Listen Now" />
          <NavItem tab="browse" icon={LayoutGrid} label="Browse" />
        </div>

        {/* Library Section */}
        <div className="space-y-0.5">
          <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1 px-2">Library</p>
          <NavItem tab="library" icon={Clock} label="Recently Added" />
          <NavItem tab="library" icon={Mic2} label="Artists" />
          <NavItem tab="library" icon={Disc3} label="Albums" />
          <NavItem tab="library" icon={Music2} label="Songs" />
        </div>
        
        {/* Playlists Section */}
        <div className="space-y-0.5">
          <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1 px-2">Playlists</p>
          {/* Mock Playlists */}
          <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-[5px] hover:bg-gray-200/50 dark:hover:bg-white/10 text-[13px] text-gray-800 dark:text-gray-200">
             <Music2 size={16} className="text-gray-400" /> Favorites
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-[5px] hover:bg-gray-200/50 dark:hover:bg-white/10 text-[13px] text-gray-800 dark:text-gray-200">
             <Music2 size={16} className="text-gray-400" /> Coding Mix
          </button>
        </div>

      </div>
    </div>
  );
}
