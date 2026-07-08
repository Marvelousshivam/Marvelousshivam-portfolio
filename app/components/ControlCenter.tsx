import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Bluetooth, Sun, Volume2 } from 'lucide-react';
import { useStore } from '../store';

const ControlCenter = () => {
  const isControlCenterOpen = useStore(state => state.isControlCenterOpen);

  return (
    <AnimatePresence>
      {isControlCenterOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed top-10 right-2 sm:right-4 w-72 bg-white/70 dark:bg-gray-900/70 backdrop-blur-3xl 
            border border-white/40 dark:border-white/10 rounded-2xl shadow-2xl p-4 z-[9999]"
        >
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 rounded-xl p-3 flex flex-col items-start gap-2 cursor-pointer hover:bg-blue-500/20 dark:hover:bg-blue-500/30 transition-colors">
              <div className="bg-blue-500 rounded-full p-1.5"><Wifi className="w-4 h-4 text-white" /></div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Wi-Fi</span>
            </div>
            <div className="bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 rounded-xl p-3 flex flex-col items-start gap-2 cursor-pointer hover:bg-blue-500/20 dark:hover:bg-blue-500/30 transition-colors">
              <div className="bg-blue-500 rounded-full p-1.5"><Bluetooth className="w-4 h-4 text-white" /></div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Bluetooth</span>
            </div>
          </div>
          
          <div className="bg-black/5 dark:bg-white/5 rounded-xl p-3 mb-3 border border-black/5 dark:border-white/10">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 block">Display</span>
            <div className="flex items-center gap-3">
              <Sun className="w-4 h-4 text-gray-400" />
              <div className="h-6 flex-1 bg-white dark:bg-gray-800 rounded-full overflow-hidden border border-black/5 dark:border-white/10 shadow-inner">
                <div className="h-full w-2/3 bg-gray-900 dark:bg-gray-100" />
              </div>
            </div>
          </div>

          <div className="bg-black/5 dark:bg-white/5 rounded-xl p-3 border border-black/5 dark:border-white/10">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 block">Sound</span>
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-gray-400" />
              <div className="h-6 flex-1 bg-white dark:bg-gray-800 rounded-full overflow-hidden border border-black/5 dark:border-white/10 shadow-inner">
                <div className="h-full w-1/2 bg-gray-900 dark:bg-gray-100" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ControlCenter;
