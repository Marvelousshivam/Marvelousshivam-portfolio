'use client';

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Desktop from "./components/Desktop";
import Dock from "./components/Dock";
import MenuBar from "./components/MenuBar";
import Window from "./components/Window";
import ApplePreloader from "./components/ApplePreloader";
import { ThemeProvider } from "./contexts/ThemeContext";
import Spotlight from "./components/Spotlight";
import { useStore } from "./store";
import { APPS } from "./config/apps";

// Lazy loaded components
const ProfileCard = dynamic(() => import("./components/AboutMe"), { ssr: false });
const WorkExperience = dynamic(() => import("./components/WorkExperience"), { ssr: false });
const Projects = dynamic(() => import("./components/Project"), { ssr: false });
const ConnectWithMe = dynamic(() => import("./components/Social"), { ssr: false });
const VSCodeEditor = dynamic(() => import("./components/VSCodeEditor"), { ssr: false });
const BlogApp = dynamic(() => import("./components/BlogApp"), { ssr: false });
const Terminal = dynamic(() => import("./components/Terminal"), { ssr: false });
const MusicPlayer = dynamic(() => import("./components/MusicPlayer"), { ssr: false });
const FlappyBird = dynamic(() => import("./components/PacManGame"), { ssr: false });
const ResumeWindow = dynamic(() => import("./components/ResumeWindow"), { ssr: false });

const appComponents: Record<string, React.ReactNode> = {
  'about': <ProfileCard />,
  'work-experience': <WorkExperience />,
  'projects': <Projects />,
  'contact': <ConnectWithMe />,
  'vscode': <VSCodeEditor />,
  'browser': <BlogApp />,
  'terminal': <Terminal />,
  'music-player': <MusicPlayer />,
  'flappy-bird': <FlappyBird />,
};

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [wallpaper1, setWallpaper] = useState<string>("/wallpaper3.jpg");
  const [isLoading, setIsLoading] = useState(true);
  const [hasRequestedFullscreen, setHasRequestedFullscreen] = useState(false);

  const openApps = useStore((state) => state.openApps);
  const openApp = useStore((state) => state.openApp);
  const closeApp = useStore((state) => state.closeApp);
  const toggleSpotlight = useStore((state) => state.toggleSpotlight);

  useEffect(() => {
    setIsMounted(true);
    const savedWallpaper = localStorage.getItem("wallpaper");
    if (savedWallpaper && !savedWallpaper.startsWith("/_next")) {
      setWallpaper(savedWallpaper);
    } else {
      setWallpaper("/wallpaper3.jpg");
      localStorage.setItem("wallpaper", "/wallpaper3.jpg");
    }
  }, []);

  const switchWallpaper = (wallpaperSrc: string) => {
    setWallpaper(wallpaperSrc);
    localStorage.setItem("wallpaper", wallpaperSrc);
  };

  const toggleWindow = useCallback((id: string) => {
    if (openApps.includes(id)) {
      closeApp(id);
    } else {
      openApp(id);
    }
  }, [openApps, closeApp, openApp]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      event.preventDefault();
      toggleSpotlight();
    }
    if ((event.metaKey || event.ctrlKey) && event.key === "t") {
      event.preventDefault();
      toggleWindow("terminal");
    }
  }, [toggleWindow, toggleSpotlight]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // reduced loading time for sanity
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleGlobalClick = useCallback(() => {
    // Only attempt fullscreen on desktop
    if (window.innerWidth > 768 && !hasRequestedFullscreen && document.documentElement.requestFullscreen && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setHasRequestedFullscreen(true);
    }
  }, [hasRequestedFullscreen]);

  if (!isMounted) return null;

  return (
    <ThemeProvider>
      <div
        onClick={handleGlobalClick}
        className="min-h-[100dvh] min-w-full overflow-hidden text-black dark:text-white transition-colors duration-300 relative"
      >
        <Image 
          src={wallpaper1} 
          alt="macOS Wallpaper" 
          fill 
          priority 
          className="object-cover -z-10" 
        />
        {isLoading ? (
          <ApplePreloader />
        ) : (
          <>
            <MenuBar switchWallpaper={switchWallpaper} />
            <Spotlight />
            <Desktop toggleWindow={toggleWindow} />

            <AnimatePresence>
              {APPS.map((app) => {
                if (!openApps.includes(app.id)) return null;
                
                if (app.id === 'resume') {
                  return <ResumeWindow key="resume" />;
                }
                
                return (
                  <Window 
                    key={app.id} 
                    id={app.id} 
                    title={app.title} 
                    defaultSize={app.defaultSize} 
                    frameless={app.frameless}
                  >
                    {appComponents[app.id]}
                  </Window>
                );
              })}
            </AnimatePresence>

            <Dock toggleWindow={toggleWindow} />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
