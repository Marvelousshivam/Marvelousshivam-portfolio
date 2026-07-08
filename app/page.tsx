'use client';

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import Desktop from "./components/Desktop";
import Dock from "./components/Dock";
import MenuBar from "./components/MenuBar";
import Window from "./components/Window";
import ApplePreloader from "./components/ApplePreloader";
import { ThemeProvider } from "./contexts/ThemeContext";
import VSCodeEditor from "./components/VSCodeEditor";
import Terminal from "./components/Terminal";
import ResumeWindow from "./components/ResumeWindow";
import MusicPlayer from "./components/MusicPlayer";
import ProfileCard from "./components/AboutMe";
import ConnectWithMe from "./components/Social";
import Projects from "./components/Project";
import FlappyBird from "./components/PacManGame";
import WorkExperience from "./components/WorkExperience";
import BlogApp from "./components/BlogApp";
import Spotlight from "./components/Spotlight";
import { useStore } from "./store";

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
    if (!hasRequestedFullscreen && document.documentElement.requestFullscreen && !document.fullscreenElement) {
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
        className="min-h-screen min-w-full overflow-hidden text-black dark:text-white transition-colors duration-300 relative"
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
              {openApps.includes("about") && (
                <Window key="about" id="about" title="About Me" defaultSize={{ width: 800, height: 600 }}>
                  <ProfileCard />
                </Window>
              )}
              {openApps.includes("work-experience") && (
                <Window key="work-experience" id="work-experience" title="Work Experience">
                  <WorkExperience />
                </Window>
              )}
              {openApps.includes("projects") && (
                <Window key="projects" id="projects" title="My Projects">
                  <Projects />
                </Window>
              )}
              {openApps.includes("contact") && (
                <Window key="contact" id="contact" title="Contact Me">
                  <ConnectWithMe />
                </Window>
              )}
              {openApps.includes("vscode") && (
                <Window key="vscode" id="vscode" title="VS Code">
                  <VSCodeEditor />
                </Window>
              )}
              {openApps.includes("browser") && (
                <Window key="browser" id="browser" title="Safari" defaultSize={{ width: 900, height: 650 }} frameless={true}>
                  <BlogApp />
                </Window>
              )}
              {openApps.includes("terminal") && (
                <Window key="terminal" id="terminal" title="Terminal" defaultSize={{ width: 600, height: 400 }}>
                  <Terminal />
                </Window>
              )}
              {openApps.includes("music-player") && (
                <Window key="music-player" id="music-player" title="Music Player" frameless={true}>
                  <MusicPlayer />
                </Window>
              )}
              {openApps.includes("flappy-bird") && (
                <Window key="flappy-bird" id="flappy-bird" title="Flappy Bird">
                  <FlappyBird />
                </Window>
              )}
              {openApps.includes("resume") && (
                <ResumeWindow key="resume" />
              )}
            </AnimatePresence>

            <Dock toggleWindow={toggleWindow} />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
