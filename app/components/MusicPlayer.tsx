"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAudioStore } from "../store/audioStore";
import { useMusicAppStore } from "../store/musicAppStore";
import { fetchTrackLyrics, LyricLine } from "../../lib/musicService";

import Sidebar from "./MusicPlayer/Sidebar";
import TopControlBar from "./MusicPlayer/TopControlBar";
import MainContent from "./MusicPlayer/MainContent";
import DetailedPlayer from "./MusicPlayer/DetailedPlayer";
import LyricsPanel from "./MusicPlayer/LyricsPanel";
import MobilePlayer from "./MusicPlayer/MobilePlayer";

export default function MusicPlayer() {
  const { currentTrack, togglePlay, next, prev, volume, setVolume } = useAudioStore();
  const { isDetailedPlayerOpen, showLyricsPanel, isMobilePlayerOpen, mobileView } = useMusicAppStore();

  const [lyrics, setLyrics] = useState<LyricLine[] | 'loading' | 'error' | null>(null);

  // Fetch lyrics when track changes
  useEffect(() => {
    if (currentTrack) {
      setLyrics('loading');
      fetchTrackLyrics(currentTrack).then(setLyrics);
    } else {
      setLyrics(null);
    }
  }, [currentTrack]);

  // Global Keyboard Shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Only trigger if we aren't typing in an input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    switch (e.code) {
      case 'Space':
        e.preventDefault();
        togglePlay();
        break;
      case 'ArrowRight':
        e.preventDefault();
        next();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        prev();
        break;
      case 'ArrowUp':
        e.preventDefault();
        setVolume(Math.min(1, volume + 0.1));
        break;
      case 'ArrowDown':
        e.preventDefault();
        setVolume(Math.max(0, volume - 0.1));
        break;
    }
  }, [togglePlay, next, prev, setVolume, volume]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Scroll active lyrics into view
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
  }, [showLyricsPanel, isMobilePlayerOpen, mobileView, isDetailedPlayerOpen, lyrics]); // trigger also on lyrics update

  return (
    <div className="w-full h-full bg-white dark:bg-[#1c1c1e] text-gray-900 dark:text-white flex flex-col overflow-hidden relative">
      
      {/* Background Blur Effect */}
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

      {/* Desktop Top Control Bar */}
      <TopControlBar />

      {/* Full Screen Desktop Player */}
      <DetailedPlayer lyrics={lyrics} />

      <div className="flex flex-1 overflow-hidden z-10 relative flex-col md:flex-row">
        {/* Left Sidebar Navigation */}
        <Sidebar />

        {/* Main Feed (Home, Search, Queue) */}
        <MainContent />

        {/* Desktop Sidebar Lyrics */}
        <LyricsPanel lyrics={lyrics} />
      </div>

      {/* Mobile Interfaces */}
      <MobilePlayer lyrics={lyrics} />

    </div>
  );
}