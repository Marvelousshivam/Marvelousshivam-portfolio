import { create } from 'zustand';
import { Track } from '../../lib/musicService';

interface AudioStore {
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  currentTrack: Track | null;
  queue: Track[];
  isLiked: boolean;
  
  // Actions
  setVolume: (volume: number) => void;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  seek: (percentage: number) => void;
  next: () => void;
  prev: () => void;
  setQueue: (tracks: Track[]) => void;
  setIsLiked: (liked: boolean) => void;
  
  // Internal ref for audio element
  _audio: HTMLAudioElement | null;
}

export const useAudioStore = create<AudioStore>((set, get) => {
  let audioInstance: HTMLAudioElement | null = null;
  
  if (typeof window !== 'undefined') {
    audioInstance = new Audio();
  }

  const store: AudioStore = {
    isPlaying: false,
    progress: 0,
    duration: 0,
    volume: 1,
    currentTrack: null,
    queue: [],
    isLiked: false,
    _audio: audioInstance,

    setVolume: (volume) => {
      const { _audio } = get();
      if (_audio) _audio.volume = volume;
      set({ volume });
    },

    playTrack: (track) => {
      const { _audio, queue } = get();
      if (!_audio) return;

      _audio.pause();
      _audio.src = track.src;
      _audio.preload = "auto";
      const vol = get().volume;
      _audio.volume = vol;

      // Ensure it's in queue
      let newQueue = queue;
      if (!queue.find(t => t.id === track.id)) {
        newQueue = [...queue, track];
      }

      set({ currentTrack: track, queue: newQueue, isPlaying: true });

      _audio.play().catch(e => console.log("Autoplay prevented:", e));
    },

    togglePlay: () => {
      const { _audio } = get();
      if (!_audio) return;
      
      if (_audio.paused && get().currentTrack) {
        _audio.play().catch(() => {});
        set({ isPlaying: true });
      } else {
        _audio.pause();
        set({ isPlaying: false });
      }
    },

    seek: (percentage) => {
      const { _audio, duration } = get();
      if (!_audio || duration === 0) return;
      const newTime = (percentage / 100) * duration;
      _audio.currentTime = newTime;
      set({ progress: newTime });
    },

    next: () => {
      const { currentTrack, queue, playTrack } = get();
      if (!currentTrack || queue.length === 0) return;
      const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % queue.length;
      playTrack(queue[nextIndex]);
    },

    prev: () => {
      const { currentTrack, queue, playTrack } = get();
      if (!currentTrack || queue.length === 0) return;
      const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
      const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
      playTrack(queue[prevIndex]);
    },

    setQueue: (tracks) => set({ queue: tracks }),
    setIsLiked: (liked) => set({ isLiked: liked }),
  };

  if (audioInstance) {
    audioInstance.addEventListener('timeupdate', () => {
      set({ 
        progress: audioInstance!.currentTime,
        duration: audioInstance!.duration || get().currentTrack?.duration || 0,
        isPlaying: !audioInstance!.paused
      });
    });

    audioInstance.addEventListener('ended', () => {
      get().next();
    });
  }

  return store;
});
