import {
  FinderIcon,
  SafariIcon,
  VSCodeIcon,
  TerminalIcon,
  MailIcon,
  MusicIcon,
  FolderIcon,
  NotesIcon,
  GameIcon,
  AppStoreIcon
} from '../components/MacIcons';

export interface AppConfig {
  id: string;
  title: string;
  dockLabel: string;
  desktopLabel?: string;
  icon: React.ElementType;
  showInDesktop: boolean;
  showInDock: boolean;
  defaultSize?: { width: number; height: number };
  frameless?: boolean;
}

export const APPS: AppConfig[] = [
  {
    id: 'about',
    title: 'About Me',
    dockLabel: 'About Me (Finder)',
    desktopLabel: 'About Me',
    icon: FinderIcon,
    showInDesktop: true,
    showInDock: true,
    defaultSize: { width: 800, height: 600 },
  },
  {
    id: 'work-experience',
    title: 'Work Experience',
    dockLabel: 'Work Experience',
    desktopLabel: 'Work Experience',
    icon: FolderIcon,
    showInDesktop: true,
    showInDock: true,
  },
  {
    id: 'projects',
    title: 'My Projects',
    dockLabel: 'Projects (App Store)',
    desktopLabel: 'Projects',
    icon: AppStoreIcon,
    showInDesktop: true,
    showInDock: true,
  },
  {
    id: 'contact',
    title: 'Contact Me',
    dockLabel: 'Mail',
    desktopLabel: 'Contact',
    icon: MailIcon,
    showInDesktop: true,
    showInDock: true,
  },
  {
    id: 'music-player',
    title: 'Music Player',
    dockLabel: 'Music',
    icon: MusicIcon,
    showInDesktop: false,
    showInDock: true,
    frameless: true,
  },
  {
    id: 'vscode',
    title: 'VS Code',
    dockLabel: 'VSCode',
    icon: VSCodeIcon,
    showInDesktop: false,
    showInDock: true,
  },
  {
    id: 'browser',
    title: 'Safari',
    dockLabel: 'Safari',
    icon: SafariIcon,
    showInDesktop: false,
    showInDock: true,
    defaultSize: { width: 900, height: 650 },
    frameless: true,
  },
  {
    id: 'terminal',
    title: 'Terminal',
    dockLabel: 'Terminal',
    icon: TerminalIcon,
    showInDesktop: false,
    showInDock: true,
    defaultSize: { width: 600, height: 400 },
  },
  {
    id: 'resume',
    title: 'Resume',
    dockLabel: 'Resume',
    desktopLabel: 'Resume',
    icon: NotesIcon,
    showInDesktop: true,
    showInDock: true,
  },
  {
    id: 'flappy-bird',
    title: 'Flappy Bird',
    dockLabel: 'Flappy Bird',
    icon: GameIcon,
    showInDesktop: false,
    showInDock: true,
  }
];
