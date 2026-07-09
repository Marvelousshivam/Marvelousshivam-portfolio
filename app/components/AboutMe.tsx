import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Bot, Zap, CheckCircle2, Music } from 'lucide-react';

const tabs = ['Overview', 'Education', 'Tech Stack', 'Workflow'];

const profilePicUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj6I6EbHXQTzc7wlfXP1zrfSAGenBr49nw815cgNlCu-XazMyD5Bl3lNjIcb6T6uYbPaRZ9uhfGFARXvyI_ti1r_XF-iDvsVd-1FJHo3zC6hVpN1jqz1HP7iGIxRzxWKVR-fenQnnPPUc_Fidf130pleAZjSIoLD-TwsqITNXeEm-kmvdHbID1cOUiRRrw/s679/IMG_20260205_143032-EDIT.jpg";

const ProfileCard = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="flex flex-col h-full font-sans bg-white/40 dark:bg-[#1c1c1e]/40 text-gray-800 dark:text-gray-200 select-none">
      {/* MAC-STYLE HEADER */}
      <div className="flex flex-col items-center pt-10 pb-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-28 h-28 mb-5"
        >
          <Image 
            src={profilePicUrl} 
            alt="Shivam Raj" 
            fill
            sizes="112px"
            className="object-cover rounded-full shadow-lg border-2 border-white/50 dark:border-white/10"
          />
        </motion.div>
        
        <motion.h1 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-light tracking-tight text-gray-900 dark:text-white"
        >
          <span className="font-bold">Shivam</span> Raj
        </motion.h1>
        
        <motion.p 
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[12px] text-gray-500 dark:text-gray-400 mt-1.5 font-medium"
        >
          Version 1.0 (Developer & Tech Enthusiast)
        </motion.p>
      </div>

      {/* SEGMENTED CONTROL (MAC STYLE TABS) */}
      <div className="px-6 flex justify-center mb-6">
        <div className="flex p-1 bg-gray-200/60 dark:bg-black/50 rounded-lg shadow-inner">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-4 py-1 text-xs font-medium rounded-md transition-colors z-10"
            >
              <span className={`relative z-20 ${activeTab === tab ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                {tab}
              </span>
              {activeTab === tab && (
                <motion.div
                  layoutId="macTabPill"
                  className="absolute inset-0 bg-white dark:bg-gray-700/80 rounded-md shadow-sm z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* DIVIDER */}
      <div className="w-full h-[1px] bg-gray-300/50 dark:bg-gray-700/50" />

      {/* CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 flex justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-[400px]"
          >
            {activeTab === 'Overview' && (
              <div className="space-y-4 text-[13px] leading-relaxed text-gray-700 dark:text-gray-300">
                <div className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-2 mb-6">
                  <span className="text-right font-medium text-gray-500 dark:text-gray-400">Processor</span>
                  <span>Neural Engine (Vibecoding Enabled)</span>
                  
                  <span className="text-right font-medium text-gray-500 dark:text-gray-400">Memory</span>
                  <span>Infinite curiosity</span>
                  
                  <span className="text-right font-medium text-gray-500 dark:text-gray-400">Location</span>
                  <span>Gaya, India</span>
                </div>
                <p>
                  I am currently a 12th-grade student with a deep passion for technology and building things on the web. I completed my primary and secondary schooling (up to Class 10th) at Podar in Gaya.
                </p>
                <p>
                  Over the years, I have learned languages like Python and have recently been heavily exploring &quot;vibecoding,&quot; which I&apos;ve found to be an incredibly productive way to develop applications as a student.
                </p>
              </div>
            )}

            {activeTab === 'Education' && (
              <div className="space-y-6 text-[13px]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                    <span className="text-blue-500 font-bold text-lg">12</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-[14px]">High School (12th Grade)</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-1 text-[11px] uppercase tracking-wide">Current Student</p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Continuing higher secondary education with a focus on academics and advanced technological skill-building.</p>
                  </div>
                </div>
                
                <div className="w-full h-[1px] bg-gray-200/50 dark:bg-gray-800/50 ml-14 max-w-[calc(100%-56px)]" />

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-500/10 flex items-center justify-center flex-shrink-0 border border-gray-500/20">
                    <span className="text-gray-500 font-bold text-lg">10</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-[14px]">Podar, Gaya</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-1 text-[11px] uppercase tracking-wide">Primary & Secondary</p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Built a strong foundational knowledge base while exploring early interests in computers and programming.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Tech Stack' && (
              <div className="space-y-8 text-[13px]">
                <div>
                  <h3 className="font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider text-[11px]">Core Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Kotlin', 'Android', 'Python', 'Next.js', 'React', 'Tailwind CSS', 'TypeScript'].map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50 rounded-md font-medium shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider text-[11px]">Cloud & Infrastructure</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Vercel', 'Supabase', 'Firebase', 'Render', 'Google Cloud', 'GitHub', 'Linux'].map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50 rounded-md font-medium shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Workflow' && (
              <div className="space-y-2 text-[13px]">
                {[
                  { icon: <Bot size={20} />, title: 'AI Assistants', desc: 'Claude, Google Antigravity' },
                  { icon: <Zap size={20} />, title: 'Methodology', desc: 'Vibecoding for highly productive app development' },
                  { icon: <CheckCircle2 size={20} />, title: 'Productivity', desc: 'Todoist for organizing studies and dev work' },
                  { icon: <Music size={20} />, title: 'Downtime', desc: 'Always listening to music' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center text-lg flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-[13px]">{item.title}</h4>
                      <p className="text-gray-500 dark:text-gray-400 text-[12px] mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfileCard;