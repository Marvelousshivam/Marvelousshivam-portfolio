import { useState, useRef, useEffect, useCallback } from 'react';
import { Track } from '../../lib/musicService';

interface UseAudioPlayerProps {
  onNext: () => void;
}

export function useAudioPlayer({ onNext }: UseAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // We keep track to handle auto-play and time updates
  const playTrack = useCallback((track: Track, onLyricsSync?: (activeLyricOffsetTop: number, activeLyricClientHeight: number) => void) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(track.src);
    audio.preload = "auto";
    audio.volume = volume;

    const onTime = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || track.duration || 0);
      setIsPlaying(!audio.paused);

      // Trigger lyrics sync logic if a callback is provided
      if (onLyricsSync) {
         const activeLyric = document.getElementById('active-lyric');
         if (activeLyric) {
            onLyricsSync(activeLyric.offsetTop, activeLyric.clientHeight);
         }
      }
    };
    
    const onEnded = () => {
      onNext();
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
  }, [volume, onNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  const seek = useCallback((percentage: number) => {
    const audio = audioRef.current;
    if (!audio || duration === 0) return;
    const newTime = (percentage / 100) * duration;
    audio.currentTime = newTime;
    setProgress(newTime);
  }, [duration]);

  return {
    isPlaying,
    progress,
    duration,
    volume,
    setVolume,
    playTrack,
    togglePlay,
    seek
  };
}
