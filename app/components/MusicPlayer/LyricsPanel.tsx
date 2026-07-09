import React from 'react';
import { Loader2, MessageSquare } from "lucide-react";
import { useAudioStore } from '../../store/audioStore';
import { useMusicAppStore } from '../../store/musicAppStore';

interface LyricsPanelProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lyrics: any[] | 'loading' | 'error' | null;
}

export default function LyricsPanel({ lyrics }: LyricsPanelProps) {
  const { currentTrack, progress, duration, seek } = useAudioStore();
  const { showLyricsPanel, isDetailedPlayerOpen } = useMusicAppStore();

  if (!showLyricsPanel || isDetailedPlayerOpen) return null;

  return (
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
                      line.words.map((word: {time: number, text: string}, wi: number) => {
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
  );
}
