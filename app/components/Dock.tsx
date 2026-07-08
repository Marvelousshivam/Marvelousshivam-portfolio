import { 
  Music, 
  Code, 
  Globe, 
  Terminal,
  User,
  Briefcase,
  Mail,
  File,
  Gamepad2,
  ClipboardList,
  Trash2
} from 'lucide-react'
import {
  FinderIcon,
  SafariIcon,
  VSCodeIcon,
  TerminalIcon,
  MailIcon,
  MusicIcon,
  FolderIcon,
  NotesIcon,
  TrashIcon,
  GameIcon,
  AppStoreIcon
} from './MacIcons'
import { ReactNode, useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion'
import { useStore } from '../store'

interface DockItemProps {
  id: string;
  label: string;
  onClick: () => void;
  children: ReactNode;
  isOpen: boolean;
  mouseX: MotionValue;
  isMobile: boolean;
}

interface DockProps {
  toggleWindow: (id: string) => void;
}

const DockItem = ({ label, onClick, children, isOpen, mouseX, isMobile }: DockItemProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // True macOS magnification scaling based on proximity to mouse pointer
  // Animate width/height to push adjacent items away instead of just scaling visually
  const sizeSync = useTransform(distance, [-150, 0, 150], [52, isMobile ? 52 : 90, 52]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 200, damping: 15 });

  return (
    <div className="group relative flex flex-col items-center mx-1">
      <motion.button
        ref={ref}
        onClick={onClick}
        style={{ width: size, height: size, marginBottom: 8 }}
        whileTap={{ scale: 0.8 }}
        className="relative flex items-center justify-center outline-none z-10 transition-transform"
      >
        <div className="w-[85%] h-[85%] flex items-center justify-center [&>*]:w-full [&>*]:h-full drop-shadow-lg hover:drop-shadow-xl transition-all">
          {children}
        </div>
      </motion.button>
      
      {/* Tooltip */}
      <div className={`absolute -top-12 scale-0 ${isMobile ? '' : 'group-hover:scale-100'} transition-all duration-200 z-[100]`}>
        <div className="relative px-3 py-1.5 bg-gray-900/90 dark:bg-white/90 backdrop-blur-md 
          text-white dark:text-gray-900 rounded-lg text-sm font-semibold shadow-xl whitespace-nowrap 
          border border-white/10 dark:border-black/10">
          {label}
        </div>
      </div>

      {/* Open App Indicator Dot */}
      {isOpen && (
        <div className="absolute -bottom-2 w-1 h-1 rounded-full bg-black/60 dark:bg-white/60 shadow-sm" />
      )}
    </div>
  );
};

export default function Dock({ toggleWindow }: DockProps) {
  const openApps = useStore((state) => state.openApps);
  const mouseX = useMotionValue(Infinity);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`fixed bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 w-auto max-w-[95vw] z-[9999] ${isMobile ? 'overflow-x-auto no-scrollbar rounded-2xl' : ''}`}>
      <div 
        className={`relative flex items-end gap-1 px-3 pt-12 ${isMobile ? 'min-w-max' : ''}`}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {/* Fixed-height glass background that doesn't scale vertically */}
        <div className="absolute bottom-0 left-0 right-0 h-[68px] bg-white/40 dark:bg-black/40 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/40 dark:border-white/20 pointer-events-none" />

        <DockItem id="about" label="About Me (Finder)" onClick={() => toggleWindow('about')} isOpen={openApps.includes('about')} mouseX={mouseX} isMobile={isMobile}>
          <FinderIcon />
        </DockItem>

        <DockItem id="work-experience" label="Work Experience" onClick={() => toggleWindow('work-experience')} isOpen={openApps.includes('work-experience')} mouseX={mouseX} isMobile={isMobile}>
          <FolderIcon />
        </DockItem>
        
        <DockItem id="projects" label="Projects (App Store)" onClick={() => toggleWindow('projects')} isOpen={openApps.includes('projects')} mouseX={mouseX} isMobile={isMobile}>
          <AppStoreIcon />
        </DockItem>

        <DockItem id="contact" label="Mail" onClick={() => toggleWindow('contact')} isOpen={openApps.includes('contact')} mouseX={mouseX} isMobile={isMobile}>
          <MailIcon />
        </DockItem>

        <DockItem id="music-player" label="Music" onClick={() => toggleWindow('music-player')} isOpen={openApps.includes('music-player')} mouseX={mouseX} isMobile={isMobile}>
          <MusicIcon />
        </DockItem>

        <DockItem id="vscode" label="VSCode" onClick={() => toggleWindow('vscode')} isOpen={openApps.includes('vscode')} mouseX={mouseX} isMobile={isMobile}>
          <VSCodeIcon />
        </DockItem>

        <DockItem id="browser" label="Safari" onClick={() => toggleWindow('browser')} isOpen={openApps.includes('browser')} mouseX={mouseX} isMobile={isMobile}>
          <SafariIcon />
        </DockItem>

        <DockItem id="terminal" label="Terminal" onClick={() => toggleWindow('terminal')} isOpen={openApps.includes('terminal')} mouseX={mouseX} isMobile={isMobile}>
          <TerminalIcon />
        </DockItem>

        <DockItem id="resume" label="Resume" onClick={() => toggleWindow('resume')} isOpen={openApps.includes('resume')} mouseX={mouseX} isMobile={isMobile}>
          <NotesIcon />
        </DockItem>

        <DockItem id="flappy-bird" label="Flappy Bird" onClick={() => toggleWindow('flappy-bird')} isOpen={openApps.includes('flappy-bird')} mouseX={mouseX} isMobile={isMobile}>
          <GameIcon />
        </DockItem>
        
        {/* Separator */}
        <div className="w-[1px] h-12 bg-black/10 dark:bg-white/20 mx-2 self-center rounded-full" />

        {/* Trash */}
        <DockItem id="trash" label="Trash" onClick={() => {}} isOpen={false} mouseX={mouseX} isMobile={isMobile}>
          <TrashIcon />
        </DockItem>

      </div>
    </div>
  )
}
