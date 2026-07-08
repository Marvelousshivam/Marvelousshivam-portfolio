import React from 'react';
import Window from './Window';
import { Download, ExternalLink, Github, Mail } from 'lucide-react';

export default function ResumeWindow() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <Window id="resume" title="Resume">
      {/* Print Styles to hide everything except the resume content when printing */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-resume, #printable-resume * {
            visibility: visible;
          }
          #printable-resume {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            box-shadow: none;
            background: white !important;
            color: black !important;
          }
          /* Hide the download button during print */
          #print-btn {
            display: none !important;
          }
        }
      `}} />

      <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900/50">
        {/* Toolbar */}
        <div className="flex justify-between items-center px-6 py-4 bg-white/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 backdrop-blur-md sticky top-0 z-10">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Interactive Web Resume
          </span>
          <button 
            id="print-btn"
            onClick={handleDownload}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
          >
            <Download size={16} />
            <span>Download PDF</span>
          </button>
        </div>

        {/* Resume Content (Paper) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center hide-scrollbar">
          <div 
            id="printable-resume" 
            className="bg-white dark:bg-gray-900 w-full max-w-4xl h-max rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-8 sm:p-12 text-gray-800 dark:text-gray-200"
          >
            {/* Header */}
            <div className="border-b-2 border-gray-200 dark:border-gray-800 pb-8 mb-8">
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
                Shivam
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <a href="mailto:Shivam@oryvi.space" className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                  <Mail size={14} /> Shivam@oryvi.space
                </a>
                <a href="https://github.com/marvelousshivam" className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                  <Github size={14} /> github.com/marvelousshivam
                </a>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              
              {/* Left Column */}
              <div className="md:col-span-2 space-y-10">
                
                {/* Experience Section */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm">
                    Experience
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Software Developer</h3>
                          <p className="text-blue-600 dark:text-blue-400 font-medium">StreamX</p>
                        </div>
                        <span className="text-sm font-medium text-gray-500 whitespace-nowrap">2022 - 2023</span>
                      </div>
                      <ul className="list-disc list-outside ml-4 text-gray-600 dark:text-gray-400 space-y-2 leading-relaxed">
                        <li>Contributed to the core development team for a fast-growing startup platform.</li>
                        <li>Assisted in building interactive UI components and optimizing frontend performance.</li>
                        <li>Collaborated closely with senior engineers to ensure a seamless, high-quality user experience.</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Full Stack Developer</h3>
                          <p className="text-blue-600 dark:text-blue-400 font-medium">Freelance</p>
                        </div>
                        <span className="text-sm font-medium text-gray-500 whitespace-nowrap">2023 - Present</span>
                      </div>
                      <ul className="list-disc list-outside ml-4 text-gray-600 dark:text-gray-400 space-y-2 leading-relaxed">
                        <li>Designed and developed modern, responsive web applications for local clients and personal portfolios.</li>
                        <li>Leveraged Next.js, React, and TailwindCSS to deliver high-performance user interfaces.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Projects Section */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm">
                    Featured Projects
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        Netphlixx
                        <a href="#" className="text-gray-400 hover:text-blue-500"><ExternalLink size={14} /></a>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
                        A full-stack movie streaming platform clone. Built with modern web technologies focusing on high-quality video delivery, seamless UI interactions, and a Netflix-style dark mode aesthetic.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        Whats-Wrap
                        <a href="#" className="text-gray-400 hover:text-blue-500"><ExternalLink size={14} /></a>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
                        A dynamic data visualization web app that analyzes exported WhatsApp chats. Transforms raw text into beautiful, jaw-dropping annual recaps, compatibility scores, and interactive charts entirely in the browser.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        Screen-X
                        <a href="#" className="text-gray-400 hover:text-blue-500"><ExternalLink size={14} /></a>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
                        A pure, powerful screen recording utility for Android built with performance in mind. No limits, no nonsense recording capabilities leveraging native APIs.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="space-y-10">
                
                {/* Education */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm">
                    Education
                  </h2>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">High School (12th Grade)</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Focus on Computer Science and Mathematics</p>
                  </div>
                </section>

                {/* Skills */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm">
                    Skills
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Frontend</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm">React</span>
                        <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm">Next.js</span>
                        <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm">TailwindCSS</span>
                        <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm">TypeScript</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Backend & Tools</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm">Node.js</span>
                        <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm">Python</span>
                        <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm">Git</span>
                        <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm">REST APIs</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Community */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm">
                    Community
                  </h2>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">GDSC Member</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm leading-relaxed">
                      Active technical contributor, organizing web development workshops and mentoring peers.
                    </p>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
