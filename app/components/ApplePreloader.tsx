'use client'

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { DigitalRain } from './DigitalRain'; // Import the DigitalRain component

const OSBootPreloader = () => {
  const [bootSteps, setBootSteps] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const bootSequence = useMemo(() => [
    { text: 'BIOS Version 3.1.4 - Initializing...', delay: 200 },
    { text: 'Establishing secure connection to Vercel edge network...', delay: 300 },
    { text: 'Mounting virtual DOM...', delay: 200 },
    { text: 'Loading portfolio modules [■■■■■■■■■■] 100%', delay: 400 },
    { text: 'Decrypting project files... SUCCESS', delay: 200 },
    { text: 'Compiling Tailwind stylesheets...', delay: 300 },
    { text: 'Injecting Framer Motion physics engine...', delay: 200 },
    { text: 'Initializing macOS graphic subsystem...', delay: 400 },
    { text: 'Waking up dormant AI algorithms...', delay: 200 },
    { text: 'Loading user environment: SHIVAM_RAJ...', delay: 300 },
    { text: 'Bypassing mainframe security... ACCESS GRANTED', delay: 300 },
    { text: 'Performing final system checks...', delay: 400 },
    { text: 'SYSTEM READY', delay: 600 },
  ], []);

  const addBootStep = useCallback((step: string) => {
    setBootSteps(prev => [...prev, step]);
    setProgress(prev => prev + (100 / bootSequence.length));
  }, [bootSequence.length]);

  useEffect(() => {
    setIsClient(true);

    const runBootSequence = async () => {
      for (const step of bootSequence) {
        await new Promise(resolve => setTimeout(resolve, step.delay));
        addBootStep(step.text);
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    };

    runBootSequence();
  }, [bootSequence, addBootStep]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black font-mono text-green-500 flex flex-col justify-center items-center z-50 overflow-hidden">
      {/* Digital Rain as background */}
      <DigitalRain />

      <div className="w-full max-w-2xl px-8 relative z-10">
  <div className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg">
    <div className="mb-4 h-2 bg-green-900 rounded-full overflow-hidden">
      <div
        className="h-full bg-green-500 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </div>

    {bootSteps.map((step, index) => (
      <div key={index} className="mb-2 overflow-hidden whitespace-nowrap">
        <span className="text-green-600">[SYSTEM]</span> {step}
      </div>
    ))}

    {!loading && (
      <div className="mt-8 text-center">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-wider glitch">
          SHIVAM RAJ
        </div>
        <div className="text-sm flex items-center justify-center gap-2">
          <span className="h-2 w-2 bg-green-500 rounded-full cursor-blink inline-block"></span>
          <span>System loaded successfully</span>
        </div>
      </div>
    )}
  </div>
</div>

    </div>
  );
};

export default OSBootPreloader;
