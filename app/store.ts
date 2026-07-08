import { create } from 'zustand';

export interface WindowState {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

interface AppState {
  openApps: string[];
  activeApp: string | null;
  windows: Record<string, WindowState>;
  highestZIndex: number;
  openApp: (id: string, defaultSize?: { width: number; height: number }) => void;
  closeApp: (id: string) => void;
  focusApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  maximizeApp: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
  isSpotlightOpen: boolean;
  isControlCenterOpen: boolean;
  toggleSpotlight: () => void;
  toggleControlCenter: () => void;
}

const getDefaultPosition = () => {
  // Simple cascade effect for new windows
  const offset = Math.floor(Math.random() * 50);
  return { x: 50 + offset, y: 50 + offset };
};

export const useStore = create<AppState>((set, get) => ({
  openApps: [],
  activeApp: null,
  windows: {},
  highestZIndex: 10,
  isSpotlightOpen: false,
  isControlCenterOpen: false,
  
  toggleSpotlight: () => {
    set((state) => ({ isSpotlightOpen: !state.isSpotlightOpen }));
  },
  
  toggleControlCenter: () => {
    set((state) => ({ isControlCenterOpen: !state.isControlCenterOpen }));
  },
  
  openApp: (id, defaultSize = { width: 800, height: 600 }) => {
    const { openApps, windows, highestZIndex } = get();
    const newZIndex = highestZIndex + 1;
    
    if (!openApps.includes(id)) {
      set({
        openApps: [...openApps, id],
        activeApp: id,
        highestZIndex: newZIndex,
        windows: {
          ...windows,
          [id]: {
            id,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            position: getDefaultPosition(),
            size: defaultSize,
            zIndex: newZIndex,
          },
        },
      });
    } else {
      // If already open, just focus and un-minimize it
      get().focusApp(id);
      if (windows[id]?.isMinimized) {
        set((state) => ({
          windows: {
            ...state.windows,
            [id]: { ...state.windows[id], isMinimized: false },
          }
        }));
      }
    }
  },
  
  closeApp: (id) => {
    set((state) => {
      const newOpenApps = state.openApps.filter((appId) => appId !== id);
      const newWindows = { ...state.windows };
      delete newWindows[id];
      
      let newActiveApp = state.activeApp;
      if (newActiveApp === id) {
        newActiveApp = newOpenApps.length > 0 ? newOpenApps[newOpenApps.length - 1] : null;
      }
      
      return {
        openApps: newOpenApps,
        activeApp: newActiveApp,
        windows: newWindows,
      };
    });
  },
  
  focusApp: (id) => {
    const { highestZIndex, activeApp } = get();
    if (activeApp === id) return; // Already focused
    
    const newZIndex = highestZIndex + 1;
    set((state) => ({
      activeApp: id,
      highestZIndex: newZIndex,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], zIndex: newZIndex },
      },
    }));
  },
  
  minimizeApp: (id) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: true },
      },
      activeApp: state.activeApp === id ? null : state.activeApp
    }));
  },
  
  maximizeApp: (id) => {
    set((state) => {
      const isMaximized = !state.windows[id].isMaximized;
      return {
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isMaximized },
        },
      };
    });
  },
  
  updateWindowPosition: (id, position) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], position },
      },
    }));
  },
  
  updateWindowSize: (id, size) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], size },
      },
    }));
  },
}));
