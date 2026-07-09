import { create } from 'zustand';
import { Track } from '../../lib/musicService';

interface MusicAppStore {
  searchQuery: string;
  searchResults: Track[];
  isSearching: boolean;
  activeTab: 'home' | 'search' | 'queue' | 'browse' | 'library';
  showLyricsPanel: boolean;
  isDetailedPlayerOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  homePlaylists: {title: string, items: any[]}[];
  isMobilePlayerOpen: boolean;
  mobileView: 'art' | 'lyrics';
  
  setSearchQuery: (q: string) => void;
  setSearchResults: (res: Track[]) => void;
  setIsSearching: (val: boolean) => void;
  setActiveTab: (tab: 'home' | 'search' | 'queue' | 'browse' | 'library') => void;
  setShowLyricsPanel: (val: boolean) => void;
  setIsDetailedPlayerOpen: (val: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setHomePlaylists: (pl: any[]) => void;
  setIsMobilePlayerOpen: (val: boolean) => void;
  setMobileView: (val: 'art' | 'lyrics') => void;
}

export const useMusicAppStore = create<MusicAppStore>((set) => ({
  searchQuery: "",
  searchResults: [],
  isSearching: false,
  activeTab: 'home',
  showLyricsPanel: false,
  isDetailedPlayerOpen: false,
  homePlaylists: [],
  isMobilePlayerOpen: false,
  mobileView: 'art',

  setSearchQuery: (q) => set({ searchQuery: q }),
  setSearchResults: (res) => set({ searchResults: res }),
  setIsSearching: (val) => set({ isSearching: val }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setShowLyricsPanel: (val) => set({ showLyricsPanel: val }),
  setIsDetailedPlayerOpen: (val) => set({ isDetailedPlayerOpen: val }),
  setHomePlaylists: (pl) => set({ homePlaylists: pl }),
  setIsMobilePlayerOpen: (val) => set({ isMobilePlayerOpen: val }),
  setMobileView: (val) => set({ mobileView: val })
}));
