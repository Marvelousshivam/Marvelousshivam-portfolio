import React from 'react';
import Image from 'next/image';
import { Loader2, MessageSquare } from "lucide-react";
import { useAudioStore } from '../../store/audioStore';
import { useMusicAppStore } from '../../store/musicAppStore';

interface DetailedPlayerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lyrics: any[] | 'loading' | 'error' | null;
}

export default function DetailedPlayer({ lyrics }: DetailedPlayerProps) {
  const { currentTrack, isPlaying, progress, duration, seek } = useAudioStore();
  const { isDetailedPlayerOpen } = useMusicAppStore();

  if (!isDetailedPlayerOpen || !currentTrack) return null;

  return (
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
                        line.words.map((word: {time: number, text: string}, wi: number) => {
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
  );
}
