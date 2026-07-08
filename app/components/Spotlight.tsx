import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command } from 'lucide-react';
import { useStore } from '../store';

const Spotlight = () => {
  const isSpotlightOpen = useStore(state => state.isSpotlightOpen);
  const toggleSpotlight = useStore(state => state.toggleSpotlight);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSpotlightOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSpotlightOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSpotlightOpen) {
        toggleSpotlight();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSpotlightOpen, toggleSpotlight]);

  return (
    <AnimatePresence>
      {isSpotlightOpen && (
        <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-[20vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSpotlight}
            className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
          />

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl mx-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-3xl 
              border border-white/40 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center px-4 py-4 border-b border-black/5 dark:border-white/10">
              <Search className="w-6 h-6 text-gray-500 dark:text-gray-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Spotlight Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-2xl font-light 
                  text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
              <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
                <Command className="w-4 h-4" />
                <span className="text-xs font-semibold">K</span>
              </div>
            </div>
            
            <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
              {query ? `Search results for "${query}" will appear here...` : "Type to search projects, apps, and notes"}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Spotlight;
