import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi,
  WifiOff,
  BatteryFull,
  BatteryLow,
  BatteryCharging,
  Sun,
  Moon,
  Settings,
  LucideCopyright,
  ChevronDown,
  X,
  SlidersHorizontal,
  Maximize,
  Minimize
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import Calendar from "./Calendar";
import WallpaperSelector from "./WallpaperSel";
import ControlCenter from "./ControlCenter";
import useBatteryStatus from "../hooks/useBatteryStatus";
import { useStore } from "../store";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}
interface MenuBarProps {
  switchWallpaper: (wallpaperSrc: string) => void;
}

const appTitles: Record<string, string> = {
  about: "About Me",
  "work-experience": "Work Experience",
  projects: "Projects",
  contact: "Contact",
  "music-player": "Music",
  vscode: "VSCode",
  browser: "Safari",
  terminal: "Terminal",
  resume: "Resume",
  "flappy-bird": "Flappy Bird"
};

const appMenus: Record<string, string[]> = {
  "browser": ["File", "Edit", "View", "History", "Bookmarks", "Window", "Help"],
  "terminal": ["Shell", "Edit", "View", "Window", "Help"],
  "vscode": ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"],
};

const defaultMenu = ["File", "Edit", "View", "Go", "Window", "Help"];

const MenuBar: React.FC<MenuBarProps> = ({ switchWallpaper }) => {
  const { theme, toggleTheme } = useTheme() as ThemeContextType;
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const batteryStatus = useBatteryStatus();
  const wifiStrength: number = 3;
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isWallpaperSelectorOpen, setIsWallpaperSelectorOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.warn(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const activeApp = useStore(state => state.activeApp);
  const activeTitle = activeApp ? appTitles[activeApp] : "Finder";
  const currentMenu = activeApp && appMenus[activeApp] ? appMenus[activeApp] : defaultMenu;
  
  const toggleControlCenter = useStore(state => state.toggleControlCenter);
  const openApp = useStore(state => state.openApp);
  const closeApp = useStore(state => state.closeApp);

  const handleCloseWallpaperSelector = (): void => {
    setIsWallpaperSelectorOpen(false);
  };

  const handleSelectWallpaper = (wallpaper: string): void => {
    switchWallpaper(wallpaper);
    setIsWallpaperSelectorOpen(false);
  };
  const drawerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    startY.current = e.touches[0].clientY;
    currentY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;
    
    if (deltaY > 0 && deltaY < 300 && drawerRef.current) {
      drawerRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = (): void => {
    const deltaY = currentY.current - startY.current;
    if (!drawerRef.current) return;

    if (deltaY > 50) {
      setIsDrawerOpen(true);
      drawerRef.current.style.transform = 'translateY(100%)';
    } else {
      setIsDrawerOpen(false);
      drawerRef.current.style.transform = 'translateY(0)';
    }
  };

  const handleDrawerClose = (): void => {
    setIsDrawerOpen(false);
    if (drawerRef.current) {
      drawerRef.current.style.transform = 'translateY(-100%)';
    }
  };
  const handleOpenWallpaperSelector = (): void => {
    handleDrawerClose();
    setIsWallpaperSelectorOpen(true);
  };
  const handleCalendarClick = (): void => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const renderBatteryIcon = (): React.ReactNode => {
    const { level, charging } = batteryStatus;
    
    if (charging) return <BatteryCharging className="w-4 h-4 text-green-500" />;
    if (level > 80) return <BatteryFull className="w-4 h-4 text-black dark:text-white" />;
    if (level > 30) return <BatteryCharging className="w-4 h-4 text-black dark:text-white" />;
    return <BatteryLow className="w-4 h-4 text-red-500" />;
  };

  const renderWifiIcon = (): React.ReactNode => {
    if (wifiStrength === 3) return <Wifi className="w-4 h-4 text-black dark:text-white" />;
    if (wifiStrength === 2) return <Wifi className="w-4 h-4 text-yellow-500" />;
    if (wifiStrength === 1) return <Wifi className="w-4 h-4 text-red-500" />;
    return <WifiOff className="w-4 h-4 text-gray-500" />;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 h-8 sm:h-8 ${
          theme === "light"
            ? "bg-white/40 text-black"
            : "bg-black/30 text-white"
        } backdrop-blur-3xl flex items-center justify-between px-2 sm:px-4 z-[9999] transition-colors duration-300 font-sans border-b border-black/5 dark:border-white/10`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center space-x-2">
          <div 
            className="flex items-center space-x-1 cursor-default relative px-3 py-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            onMouseEnter={() => setActiveMenu('apple')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <svg viewBox="0 0 384 512" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
            <AnimatePresence>
              {activeMenu === 'apple' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.1 }}
                  className="absolute top-full left-0 mt-1 w-56 bg-white/70 dark:bg-[#1E1E1E]/70 backdrop-blur-3xl rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/40 dark:border-white/10 py-1.5 z-[99999] overflow-hidden"
                >
                  <button onClick={() => { openApp('about'); setActiveMenu(null); }} className="w-full text-left px-4 py-1 hover:bg-blue-500 hover:text-white text-[13px] transition-colors">About This Mac</button>
                  <div className="w-full h-px bg-black/10 dark:bg-white/10 my-1"></div>
                  <button onClick={() => { toggleTheme(); setActiveMenu(null); }} className="w-full text-left px-4 py-1 hover:bg-blue-500 hover:text-white text-[13px] transition-colors">System Settings...</button>
                  <button className="w-full text-left px-4 py-1 hover:bg-blue-500 hover:text-white text-[13px] transition-colors">App Store...</button>
                  <div className="w-full h-px bg-black/10 dark:bg-white/10 my-1"></div>
                  <button className="w-full text-left px-4 py-1 hover:bg-blue-500 hover:text-white text-[13px] transition-colors">Sleep</button>
                  <button className="w-full text-left px-4 py-1 hover:bg-blue-500 hover:text-white text-[13px] transition-colors">Restart...</button>
                  <button className="w-full text-left px-4 py-1 hover:bg-blue-500 hover:text-white text-[13px] transition-colors">Shut Down...</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <span className="font-bold text-sm px-2 cursor-default">{activeTitle}</span>
          <div className="hidden md:flex space-x-1 text-[13px] font-medium opacity-90">
            {currentMenu.map((item, idx) => (
              <div 
                key={idx} 
                className="relative px-3 py-1 rounded cursor-default hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                onMouseEnter={() => setActiveMenu(item)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                {item}
                <AnimatePresence>
                  {activeMenu === item && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.1 }}
                      className="absolute top-full left-0 mt-1 w-48 bg-white/70 dark:bg-[#1E1E1E]/70 backdrop-blur-3xl rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/40 dark:border-white/10 py-1.5 z-[99999] overflow-hidden"
                    >
                      {item === "File" && (
                        <>
                          <button className="w-full flex justify-between px-4 py-1 hover:bg-blue-500 hover:text-white text-[13px] transition-colors opacity-50 cursor-not-allowed">
                            <span>New Window</span>
                            <span>⌘N</span>
                          </button>
                          <div className="w-full h-px bg-black/10 dark:bg-white/10 my-1"></div>
                          <button 
                            onClick={() => { if(activeApp) closeApp(activeApp); setActiveMenu(null); }} 
                            className="w-full flex justify-between px-4 py-1 hover:bg-blue-500 hover:text-white text-[13px] transition-colors"
                          >
                            <span>Close Window</span>
                            <span>⌘W</span>
                          </button>
                        </>
                      )}
                      {item === "View" && (
                        <>
                          <button 
                            onClick={() => { toggleFullscreen(); setActiveMenu(null); }} 
                            className="w-full flex justify-between px-4 py-1 hover:bg-blue-500 hover:text-white text-[13px] transition-colors"
                          >
                            <span>{isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}</span>
                            <span>fn F</span>
                          </button>
                        </>
                      )}
                      {item !== "File" && item !== "View" && (
                        <div className="px-4 py-1 text-[13px] opacity-50 italic">No actions available</div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm font-medium">
          <ChevronDown className="sm:hidden w-5 h-5" />
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          
          <button
            onClick={toggleFullscreen}
            aria-label="Toggle fullscreen"
            className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors hidden sm:block"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
          
          <Settings
            onClick={handleOpenWallpaperSelector}
            className="w-4 h-4 hover:scale-110 transition-transform cursor-pointer hidden sm:block"
          />
          
          <SlidersHorizontal
            onClick={toggleControlCenter}
            className="w-4 h-4 hover:scale-110 transition-transform cursor-pointer"
          />
          
          <div className="relative group flex items-center">
            {renderBatteryIcon()}
            <span className="ml-1 opacity-80 hidden sm:block">{batteryStatus.level}%</span>
          </div>

          <div className="relative group">
            {renderWifiIcon()}
          </div>

          <div className="relative">
            <button
              onClick={handleCalendarClick}
              aria-label="Toggle calendar"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              {formatDate(dateTime)}
            </button>
            {isCalendarOpen && (
              <div className="absolute top-8 right-0 z-10 sm:block hidden">
                <Calendar />
              </div>
            )}
          </div>

          <div className="relative">
            <button aria-label="Display time" className="hover:text-black dark:hover:text-white transition-colors">
              {formatTime(dateTime)}
            </button>
          </div>
        </div>
      </div>

      <div
        ref={drawerRef}
        className={`fixed top-8 left-0 right-0 sm:hidden ${
          theme === "light" ? "bg-white" : "bg-gray-900"
        } shadow-lg transition-transform duration-300 ease-in-out z-40`}
        style={{
          transform: isDrawerOpen ? 'translateY(100%)' : 'translateY(-100%)',
          height: 'auto',
          maxHeight: '80vh'
        }}
      >
        <div className="p-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm">Shivam Raj</span>
            <div className="flex items-center space-x-1">
              <LucideCopyright className="h-3 w-3" />
              <span className="text-sm">2026</span>
            </div>
            <button onClick={handleDrawerClose} aria-label="Close Drawer" className="p-1 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "light" ? (
                <>
                  <Moon className="w-5 h-5" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-5 h-5" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
            
            <button 
              type="button"
              className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"  
              onClick={handleOpenWallpaperSelector} 
            >
              <Settings className="h-5 w-5" />
              <span>Change Background</span>
            </button>
            <div className="flex items-center space-x-3 p-3">
              {renderBatteryIcon()}
              <span>Battery: {batteryStatus.level}% {batteryStatus.charging ? '(Charging)' : ''}</span>
            </div>
            <div className="flex items-center space-x-3 p-3">
              {renderWifiIcon()}
              <span>WiFi Strength: {wifiStrength * 33}%</span>
            </div>
            <div className="p-3">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
      {isWallpaperSelectorOpen && (
        <WallpaperSelector
          onSelectWallpaper={handleSelectWallpaper}
          closeWindow={handleCloseWallpaperSelector}
        />
      )}
      <ControlCenter />
    </>
  );
};

export default MenuBar;
