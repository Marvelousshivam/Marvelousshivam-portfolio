import { APPS } from '../config/apps';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

interface DesktopProps {
  toggleWindow: (id: string) => void
}

export default function Desktop({ toggleWindow }: DesktopProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const desktopApps = APPS.filter(app => app.showInDesktop);

  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden" 
      ref={constraintsRef}
      onClick={() => setSelectedIcon(null)}
    >
      <div className="absolute right-4 sm:right-8 top-12 flex flex-col gap-6 sm:gap-8 pointer-events-none">
        {desktopApps.map((app) => {
          const Icon = app.icon;
          const isSelected = selectedIcon === app.id;
          
          return (
            <motion.div
              key={app.id}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0}
              dragMomentum={false}
              className="pointer-events-auto flex flex-col items-center w-[80px] group outline-none cursor-default"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIcon(app.id);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                toggleWindow(app.id);
                setSelectedIcon(null);
              }}
            >
              <div className={`p-1 rounded-xl transition-colors duration-200 ${isSelected ? 'bg-black/30 dark:bg-white/20' : ''}`}>
                <Icon className={`w-12 h-12 sm:w-16 sm:h-16 drop-shadow-md transition-all ${isSelected ? 'brightness-75 scale-95' : 'group-hover:scale-105'}`} />
              </div>
              <span 
                className={`mt-1 px-2 py-0.5 text-white text-[11px] sm:text-[13px] font-medium leading-tight text-center break-words rounded backdrop-blur-sm transition-colors ${
                  isSelected 
                    ? 'bg-[#0058d0] shadow-sm' 
                    : 'bg-transparent group-hover:bg-black/20'
                }`}
                style={{ textShadow: isSelected ? 'none' : '0 1px 4px rgba(0,0,0,0.9)' }}
              >
                {app.desktopLabel || app.title}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  )
}
