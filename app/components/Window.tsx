import { useRef } from "react";
import { X, Minus, Square } from "lucide-react";
import { motion, useDragControls } from "framer-motion";
import { useStore } from "../store";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultSize?: { width: number; height: number };
  frameless?: boolean;
}

export default function Window({ id, title, children, frameless = false }: WindowProps) {
  const windowState = useStore((state) => state.windows[id]);
  const activeApp = useStore((state) => state.activeApp);
  const closeApp = useStore((state) => state.closeApp);
  const focusApp = useStore((state) => state.focusApp);
  const minimizeApp = useStore((state) => state.minimizeApp);
  const maximizeApp = useStore((state) => state.maximizeApp);
  const updateWindowPosition = useStore((state) => state.updateWindowPosition);
  
  const windowRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // If window state hasn't initialized yet or is minimized, don't render it here
  if (!windowState || windowState.isMinimized) return null;

  const isActive = activeApp === id;
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    focusApp(id);
    if (frameless) {
      const target = e.target as HTMLElement;
      // If the clicked element is within a drag handle, and is not an interactive element itself
      if (
        target.closest('[data-drag-handle="true"]') &&
        !target.closest('button, input, textarea, a, [role="button"], [data-no-drag]') &&
        !windowState.isMaximized &&
        !isMobile
      ) {
        // We must cast 'e' to any because Framer Motion's dragControls.start expects a different event type internally
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dragControls.start(e as any);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (_e: any, info: any) => {
    updateWindowPosition(id, {
      x: windowState.position.x + info.offset.x,
      y: windowState.position.y + info.offset.y,
    });
  };

  return (
    <motion.div
      ref={windowRef}
      drag={!windowState.isMaximized && !isMobile}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      onPointerDown={handlePointerDown}
      initial={{ scale: 0.8, opacity: 0, x: windowState.position.x, y: windowState.position.y }}
      animate={
        windowState.isMaximized || isMobile
          ? { scale: 1, opacity: 1, x: 0, y: 32, width: "100vw", height: "calc(100vh - 32px - 80px)" } // Leaves 80px for the dock
          : { scale: 1, opacity: 1, x: windowState.position.x, y: windowState.position.y, width: windowState.size.width, height: windowState.size.height }
      }
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
      style={{
        zIndex: windowState.zIndex,
        position: "absolute",
        minWidth: isMobile ? "300px" : "400px",
        minHeight: isMobile ? "200px" : "300px",
        maxHeight: "calc(100vh - 32px - 80px)", // Prevents normal windows from overlapping the dock
        maxWidth: "100vw",
      }}
      className={`bg-white/25 dark:bg-black/25 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/20 dark:border-white/10 ${
        isActive ? 'shadow-[0_20px_50px_rgba(0,0,0,0.3)]' : 'shadow-lg'
      }`}
    >
      {frameless ? (
        <div className="absolute top-0 left-0 h-14 w-24 z-50 flex items-center px-4 pointer-events-none">
          <div className="flex items-center space-x-2 pointer-events-auto mt-[-4px]">
            <button
              className="w-3.5 h-3.5 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors group"
              onClick={(e) => { e.stopPropagation(); closeApp(id); }}
            >
              <X className="w-2.5 h-2.5 text-black/50 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              className="w-3.5 h-3.5 rounded-full bg-yellow-500 flex items-center justify-center hover:bg-yellow-600 transition-colors group"
              onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
            >
              <Minus className="w-2.5 h-2.5 text-black/50 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              className="w-3.5 h-3.5 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors group"
              onClick={(e) => { e.stopPropagation(); maximizeApp(id); }}
            >
              <Square className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
            </button>
          </div>
        </div>
      ) : (
        <div
          className="bg-gray-100/80 dark:bg-gray-800/80 h-10 flex items-center px-4 backdrop-blur-md border-b border-white/10 dark:border-white/5 cursor-move"
          onPointerDown={(e) => {
            focusApp(id);
            if (!windowState.isMaximized && !isMobile) dragControls.start(e);
          }}
          onDoubleClick={() => maximizeApp(id)}
        >
          <div className="flex items-center space-x-2">
            <button
              className="w-3.5 h-3.5 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors group"
              onClick={(e) => { e.stopPropagation(); closeApp(id); }}
            >
              <X className="w-2.5 h-2.5 text-black/50 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              className="w-3.5 h-3.5 rounded-full bg-yellow-500 flex items-center justify-center hover:bg-yellow-600 transition-colors group"
              onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
            >
              <Minus className="w-2.5 h-2.5 text-black/50 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              className="w-3.5 h-3.5 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors group"
              onClick={(e) => { e.stopPropagation(); maximizeApp(id); }}
            >
              <Square className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
            </button>
          </div>
          <div className="flex-1 text-center font-medium text-sm text-gray-700 dark:text-gray-300 pointer-events-none select-none font-sans">
            {title}
          </div>
        </div>
      )}

      <div className={`bg-white/50 dark:bg-black/50 ${frameless ? 'h-full overflow-hidden' : 'h-[calc(100%-2.5rem)] overflow-auto'} text-gray-800 dark:text-gray-200`}>
        {children}
      </div>
    </motion.div>
  );
}
