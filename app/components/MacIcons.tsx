import React from 'react';

export const FinderIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" style={{ filter: 'drop-shadow(0px 6px 8px rgba(0,0,0,0.4))' }}>
    <defs>
      <linearGradient id="finderFace" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#D8D8D8" />
      </linearGradient>
      <linearGradient id="finderBlue" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4AC0FF" />
        <stop offset="100%" stopColor="#0071D2" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#finderFace)" />
    <path d="M0 22C0 9.8 9.8 0 22 0h28v100H22C9.8 100 0 90.2 0 78V22z" fill="url(#finderBlue)" />
    <path d="M50 0v100h28c12.2 0 22-9.8 22-22V22C100 9.8 90.2 0 78 0H50z" fill="url(#finderFace)" />
    <circle cx="32" cy="40" r="5" fill="#333" />
    <circle cx="68" cy="40" r="5" fill="#333" />
    <path d="M41 62c0 12-14 12-14 0" stroke="#333" strokeWidth="3" strokeLinecap="round" />
    <path d="M59 62c0 12 14 12 14 0" stroke="#333" strokeWidth="3" strokeLinecap="round" />
    <path d="M50 20v80" stroke="#005BAA" strokeWidth="2" opacity="0.6" />
    <path d="M40 20c0 15 20 15 20 0" fill="url(#finderBlue)" />
  </svg>
);

export const SafariIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0px 6px 8px rgba(0,0,0,0.4))' }}>
    <defs>
      <linearGradient id="safariBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F0F0F0" />
      </linearGradient>
      <linearGradient id="safariBlue" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4AC0FF" />
        <stop offset="100%" stopColor="#007AFF" />
      </linearGradient>
      <linearGradient id="needleRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF5E5E" />
        <stop offset="100%" stopColor="#FF1E1E" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#safariBg)" />
    <circle cx="50" cy="50" r="44" fill="url(#safariBlue)" />
    <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeDasharray="4 4" />
    <path d="M30 70 L70 30 L60 60 Z" fill="#FFFFFF" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }} />
    <path d="M30 70 L60 60 L40 40 Z" fill="url(#needleRed)" />
    <circle cx="50" cy="50" r="3.5" fill="#333" />
  </svg>
);

export const VSCodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0px 6px 8px rgba(0,0,0,0.4))' }}>
    <defs>
      <linearGradient id="vsLight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#25A8F5" />
        <stop offset="100%" stopColor="#0078D7" />
      </linearGradient>
      <linearGradient id="vsDark" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0063B1" />
        <stop offset="100%" stopColor="#004A85" />
      </linearGradient>
    </defs>
    <path d="M70 15 L30 40 L30 60 L70 85 L85 75 L85 25 Z" fill="url(#vsLight)" />
    <path d="M85 25 L30 60 L15 50 L15 35 L70 15 Z" fill="url(#vsDark)" />
    <path d="M85 75 L30 40 L15 50 L15 65 L70 85 Z" fill="url(#vsDark)" />
  </svg>
);

export const TerminalIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0px 6px 8px rgba(0,0,0,0.4))' }}>
    <defs>
      <linearGradient id="termDark" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#444" />
        <stop offset="100%" stopColor="#222" />
      </linearGradient>
      <linearGradient id="termTop" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#666" />
        <stop offset="100%" stopColor="#444" />
      </linearGradient>
    </defs>
    <rect x="5" y="10" width="90" height="80" rx="15" fill="url(#termDark)" />
    <rect x="5" y="10" width="90" height="22" rx="15" fill="url(#termTop)" />
    <rect x="5" y="25" width="90" height="7" fill="url(#termTop)" />
    <circle cx="16" cy="21" r="4.5" fill="#FF5F56" />
    <circle cx="29" cy="21" r="4.5" fill="#FFBD2E" />
    <circle cx="42" cy="21" r="4.5" fill="#27C93F" />
    <path d="M22 45 L38 55 L22 65" stroke="#E2E2E2" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="46" y="61" width="18" height="5" fill="#E2E2E2" />
  </svg>
);

export const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0px 6px 8px rgba(0,0,0,0.4))' }}>
    <defs>
      <linearGradient id="mailBlue" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#5AC8FA" />
        <stop offset="100%" stopColor="#007AFF" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#mailBlue)" />
    <path d="M15 28 L50 58 L85 28" stroke="#FFFFFF" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.2))' }} />
    <path d="M15 78 L40 53 M85 78 L60 53" stroke="#FFFFFF" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MusicIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0px 6px 8px rgba(0,0,0,0.4))' }}>
    <defs>
      <linearGradient id="musicBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F5F5F5" />
      </linearGradient>
      <linearGradient id="musicRed" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FF4B68" />
        <stop offset="100%" stopColor="#FF2143" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#musicBg)" />
    <path d="M40 70 A 13 13 0 1 1 27 57 L 27 25 L 75 13 L 75 50 A 13 13 0 1 1 62 37 L 62 21 L 40 27 Z" fill="url(#musicRed)" style={{ filter: 'drop-shadow(0px 3px 4px rgba(0,0,0,0.2))' }} />
  </svg>
);

export const FolderIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0px 6px 8px rgba(0,0,0,0.4))' }}>
    <defs>
      <linearGradient id="folderBack" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7CD0FF" />
        <stop offset="100%" stopColor="#30AAFF" />
      </linearGradient>
      <linearGradient id="folderFront" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4AC0FF" />
        <stop offset="100%" stopColor="#007AFF" />
      </linearGradient>
    </defs>
    <path d="M10 20 C10 12 15 10 25 10 L40 10 C45 10 48 13 52 17 L58 24 L85 24 C92 24 95 28 95 35 L95 85 C95 90 90 95 85 95 L15 95 C10 95 5 90 5 85 Z" fill="url(#folderBack)" />
    <path d="M5 35 C5 32 8 30 12 30 L95 30 C95 30 95 85 95 85 C95 90 90 95 85 95 L15 95 C10 95 5 90 5 85 Z" fill="url(#folderFront)" style={{ filter: 'drop-shadow(0px -1px 3px rgba(0,0,0,0.2))' }} />
  </svg>
);

export const NotesIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0px 6px 8px rgba(0,0,0,0.4))' }}>
    <defs>
      <linearGradient id="noteBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFBE6" />
        <stop offset="100%" stopColor="#FFF2A8" />
      </linearGradient>
      <linearGradient id="noteTop" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFCC00" />
        <stop offset="100%" stopColor="#E6A800" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#noteBg)" />
    <rect width="100" height="28" rx="22" fill="url(#noteTop)" />
    <rect y="18" width="100" height="10" fill="url(#noteTop)" />
    <line x1="25" y1="45" x2="75" y2="45" stroke="#D4AA00" strokeWidth="4" strokeLinecap="round" />
    <line x1="25" y1="60" x2="75" y2="60" stroke="#D4AA00" strokeWidth="4" strokeLinecap="round" />
    <line x1="25" y1="75" x2="55" y2="75" stroke="#D4AA00" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0px 6px 8px rgba(0,0,0,0.4))' }}>
    <defs>
      <linearGradient id="trashBody" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F5F5F5" />
        <stop offset="50%" stopColor="#E0E0E0" />
        <stop offset="100%" stopColor="#F5F5F5" />
      </linearGradient>
      <linearGradient id="trashLid" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#CCCCCC" />
      </linearGradient>
    </defs>
    <path d="M22 25 L78 25 L72 90 L28 90 Z" fill="url(#trashBody)" stroke="#999" strokeWidth="2" />
    <path d="M15 25 L85 25 L85 32 L15 32 Z" fill="url(#trashLid)" stroke="#999" strokeWidth="2" />
    <path d="M42 12 L58 12 L58 25 L42 25 Z" fill="url(#trashLid)" stroke="#999" strokeWidth="2" />
    <line x1="38" y1="40" x2="38" y2="80" stroke="#999" strokeWidth="3" strokeLinecap="round" />
    <line x1="50" y1="40" x2="50" y2="80" stroke="#999" strokeWidth="3" strokeLinecap="round" />
    <line x1="62" y1="40" x2="62" y2="80" stroke="#999" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const GameIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0px 6px 8px rgba(0,0,0,0.4))' }}>
    <defs>
      <linearGradient id="gameBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E5E5E5" />
      </linearGradient>
      <linearGradient id="gamePurple" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D580FF" />
        <stop offset="100%" stopColor="#8A2BE2" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#gameBg)" />
    <rect x="10" y="25" width="80" height="50" rx="25" fill="url(#gamePurple)" style={{ filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.2))' }} />
    <circle cx="30" cy="50" r="15" fill="#E5E5EA" />
    <line x1="30" y1="40" x2="30" y2="60" stroke="#444" strokeWidth="6" strokeLinecap="round" />
    <line x1="20" y1="50" x2="40" y2="50" stroke="#444" strokeWidth="6" strokeLinecap="round" />
    <circle cx="65" cy="45" r="6" fill="#FF2D55" />
    <circle cx="75" cy="55" r="6" fill="#FFCC00" />
  </svg>
);

export const AppStoreIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0px 6px 8px rgba(0,0,0,0.4))' }}>
    <defs>
      <linearGradient id="appStoreBlue" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#25A8F5" />
        <stop offset="100%" stopColor="#0071D2" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#appStoreBlue)" />
    {/* Stylized A made of 3 overlapping white lines */}
    <path d="M 50 18 L 22 75" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
    <path d="M 50 18 L 78 75" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
    <path d="M 28 55 L 72 55" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
    
    {/* Overlay glowing shadows for the intersections to mimic the real icon */}
    <path d="M 50 18 L 22 75" stroke="rgba(255,255,255,0.8)" strokeWidth="6" strokeLinecap="round" />
    <path d="M 50 18 L 78 75" stroke="rgba(255,255,255,0.8)" strokeWidth="6" strokeLinecap="round" />
    <path d="M 28 55 L 72 55" stroke="rgba(255,255,255,0.8)" strokeWidth="6" strokeLinecap="round" />
  </svg>
);
