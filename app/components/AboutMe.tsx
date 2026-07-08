import React, { useState } from 'react';

const ProfileCard = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = ['Overview', 'Education', 'Tech Stack', 'Workflow'];

  const profilePicUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj6I6EbHXQTzc7wlfXP1zrfSAGenBr49nw815cgNlCu-XazMyD5Bl3lNjIcb6T6uYbPaRZ9uhfGFARXvyI_ti1r_XF-iDvsVd-1FJHo3zC6hVpN1jqz1HP7iGIxRzxWKVR-fenQnnPPUc_Fidf130pleAZjSIoLD-TwsqITNXeEm-kmvdHbID1cOUiRRrw/s679/IMG_20260205_143032-EDIT.jpg";

  return (
    <div className="flex flex-col h-full font-sans bg-white/40 dark:bg-black/40 text-gray-800 dark:text-gray-200">
      {/* Top Tab Navigation */}
      <div className="flex justify-center pt-6 pb-4 border-b border-gray-300/50 dark:border-gray-700/50 backdrop-blur-md">
        <div className="flex space-x-1 bg-gray-200/50 dark:bg-gray-800/50 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-white dark:bg-gray-600 shadow-sm text-black dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex items-start justify-center">
        {activeTab === 'Overview' && (
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 max-w-3xl w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={profilePicUrl} 
                alt="Shivam Raj" 
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-2xl border-4 border-white/20 dark:border-white/10"
              />
            </div>
            <div className="text-center md:text-left space-y-4">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Shivam Raj
                </h2>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-medium mt-1">
                  Developer & Tech Enthusiast
                </p>
              </div>
              <div className="h-px w-full bg-gray-300/50 dark:bg-gray-700/50 my-4" />
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                I am currently a 12th-grade student with a deep passion for technology and building things on the web. I completed my primary and secondary schooling (up to Class 10th) at Podar in Gaya.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                Over the years, I have learned languages like Python and have recently been heavily exploring &quot;vibecoding,&quot; which I&apos;ve found to be an incredibly productive way to develop applications as a student.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                When I am not writing code or managing cloud infrastructure, you can almost always find me listening to music.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'Education' && (
          <div className="w-full max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">Education Timeline</h2>
            
            <div className="relative pl-8 border-l-2 border-gray-300 dark:border-gray-700 space-y-10">
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-blue-500 border-4 border-white dark:border-gray-900 shadow-sm" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">High School (12th Grade)</h3>
                <p className="text-blue-500 dark:text-blue-400 font-medium mb-2">Current Student</p>
                <p className="text-gray-600 dark:text-gray-400">Continuing higher secondary education with a focus on academics and advanced technological skill-building.</p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-gray-400 border-4 border-white dark:border-gray-900 shadow-sm" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Podar, Gaya</h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium mb-2">Primary and Secondary Schooling (Up to Class 10th)</p>
                <p className="text-gray-600 dark:text-gray-400">Built a strong foundational knowledge base while exploring early interests in computers and programming.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Tech Stack' && (
          <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-8">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Core Technologies</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {['Kotlin', 'Android', 'Python', 'Vercel', 'Supabase', 'Firebase', 'Next.js', 'React', 'Tailwind CSS', 'TypeScript'].map(tech => (
                  <div key={tech} className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Cloud & Infrastructure</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {['Render', 'Google Cloud', 'GitHub', 'Linux'].map(tech => (
                  <div key={tech} className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Workflow' && (
          <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">Workflow & Tools</h2>
            
            <div className="bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0">
                    AI
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white">AI Assistants</h4>
                    <p className="text-gray-600 dark:text-gray-400">Claude, Google Antigravity</p>
                  </div>
                </div>

                <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0">
                    {'</>'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white">Methodology</h4>
                    <p className="text-gray-600 dark:text-gray-400">Vibecoding for highly productive app development</p>
                  </div>
                </div>

                <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white">Productivity</h4>
                    <p className="text-gray-600 dark:text-gray-400">Todoist for organizing studies and dev work</p>
                  </div>
                </div>

                <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors">
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0">
                    ♫
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white">Downtime</h4>
                    <p className="text-gray-600 dark:text-gray-400">Always listening to music</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;