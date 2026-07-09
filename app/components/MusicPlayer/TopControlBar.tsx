import React from 'react';
import Image from 'next/image';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Maximize2, Minimize2, MessageSquare, ListMusic } from "lucide-react";
import { useAudioStore } from '../../store/audioStore';
import { useMusicAppStore } from '../../store/musicAppStore';

export default function TopControlBar() {
  const { 
    currentTrack, isPlaying, progress, duration, volume,
    togglePlay, next, prev, seek, setVolume 
  } = useAudioStore();

  const {
    isDetailedPlayerOpen, setIsDetailedPlayerOpen,
    showLyricsPanel, setShowLyricsPanel,
    activeTab, setActiveTab
  } = useMusicAppStore();

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progressValue = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div 
      data-drag-handle="true"
      className="hidden md:flex h-[60px] bg-gray-100/95 dark:bg-[#2c2c2e]/95 backdrop-blur-3xl border-b border-gray-200/50 dark:border-black/50 z-40 flex-shrink-0 items-center justify-between px-4 w-full pl-[84px] transition-colors relative"
    >
      {/* Left: Playback Controls */}
      <div className="flex items-center gap-5 w-auto flex-shrink-0">
        <button aria-label="Shuffle" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><Shuffle size={14} /></button>
        <button aria-label="Previous Track" onClick={prev} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"><SkipBack size={18} fill="currentColor" /></button>
        <button 
          aria-label={isPlaying ? "Pause" : "Play"}
          onClick={togglePlay} 
          className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-[#3a3a3c] hover:bg-gray-300 dark:hover:bg-[#4a4a4c] rounded-full transition-colors shadow-inner"
        >
          {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-1" />}
        </button>
        <button aria-label="Next Track" onClick={next} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"><SkipForward size={18} fill="currentColor" /></button>
        <button aria-label="Repeat" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><Repeat size={14} /></button>
      </div>

      {/* Center: LCD Display (Now Playing) */}
      <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-[400px] h-10 bg-white/60 dark:bg-black/30 rounded-md border border-gray-200/50 dark:border-white/5 flex items-center px-2 shadow-inner group">
        {currentTrack ? (
           <>
             <button type="button" aria-label="Toggle Detailed Player" className="relative w-7 h-7 rounded-sm overflow-hidden flex-shrink-0 shadow-sm mr-3 bg-gray-200 dark:bg-gray-800 p-0 border-none text-left" onClick={() => setIsDetailedPlayerOpen(!isDetailedPlayerOpen)}>
               <Image src={currentTrack.albumArt} alt={currentTrack.name} fill className="object-cover group-hover:scale-105 transition-transform" />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {isDetailedPlayerOpen ? <Minimize2 size={12} className="text-white" /> : <Maximize2 size={12} className="text-white" />}
               </div>
             </button>
             <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
                <div className="flex items-center justify-center gap-1 -mt-0.5">
                  <span className="text-[11px] font-semibold truncate text-gray-900 dark:text-gray-100">{currentTrack.name}</span>
                  <span className="text-[11px] text-gray-500">—</span>
                  <span className="text-[11px] text-gray-500 truncate">{currentTrack.artist}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] text-gray-500 w-6 text-right">{formatTime(progress)}</span>
                  <button
                    type="button"
                    aria-label="Seek track"
                    className="w-full h-1 bg-gray-300 dark:bg-gray-700 rounded-full cursor-pointer relative p-0 border-none block"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      seek(((e.clientX - rect.left) / rect.width) * 100);
                    }}
                  >
                    <div className="absolute top-0 left-0 h-full bg-gray-600 dark:bg-gray-400 rounded-full hover:bg-red-500 transition-colors" style={{ width: `${progressValue}%` }}></div>
                  </button>
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
            aria-label="Volume"
            className="flex-1 h-1 bg-gray-300/50 dark:bg-gray-700/50 rounded-full appearance-none cursor-pointer accent-gray-500"
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>
        <button 
          type="button"
          aria-label="Toggle Lyrics"
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${showLyricsPanel ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-[#3a3a3c] dark:text-gray-300 dark:hover:bg-[#4a4a4c]'}`}
          onClick={() => setShowLyricsPanel(!showLyricsPanel)}
        >
          <MessageSquare size={14} className={showLyricsPanel ? 'fill-current' : ''} />
        </button>
        <button 
          type="button"
          aria-label="Toggle Queue"
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeTab === 'queue' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-[#3a3a3c] dark:text-gray-300 dark:hover:bg-[#4a4a4c]'}`}
          onClick={() => setActiveTab(activeTab === 'queue' ? 'home' : 'queue')}
        >
          <ListMusic size={14} className={activeTab === 'queue' ? 'text-red-500' : ''} />
        </button>
      </div>
    </div>
  );
}
