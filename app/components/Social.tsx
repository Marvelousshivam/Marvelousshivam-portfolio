import React from "react";
import {
  Github,
  Mail,
  Linkedin,
  MessageCircle,
  MessageSquare,
  Phone,
  ArrowUpRight,
  Sparkles,
  MapPin,
  Clock
} from "lucide-react";

const ConnectWithMe = () => {
  return (
    <div className="h-full overflow-y-auto p-4 sm:p-8 bg-gray-50/50 dark:bg-[#1e1e1e] hide-scrollbar">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Contact
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Let&apos;s build something amazing together.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[160px]">
          
          {/* Hero Profile Card - 2x2 */}
          <div className="md:col-span-2 md:row-span-2 relative overflow-hidden group bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-all duration-500" />
            
            <div className="relative h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-semibold mb-4">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Available for work
                  </div>
                  <h1 className="text-3xl font-bold mb-1">Shivam</h1>
                  <h2 className="text-blue-100 font-medium">Full Stack Developer</h2>
                </div>
                <Sparkles className="text-blue-200/50 w-8 h-8" />
              </div>

              <div className="flex flex-col gap-2 text-sm text-blue-100/80">
                <div className="flex items-center gap-2">
                  <MapPin size={16} /> <span>Based in India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} /> <span>Open to remote opportunities</span>
                </div>
              </div>
            </div>
          </div>

          {/* Email Card - 2x1 */}
          <a 
            href="mailto:Shivam@oryvi.space"
            className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800/80 p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Mail size={20} />
              </div>
              <ArrowUpRight className="text-gray-400 group-hover:text-blue-500 transition-colors" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Drop me an email</p>
              <p className="font-semibold text-gray-900 dark:text-white truncate">Shivam@oryvi.space</p>
            </div>
          </a>

          {/* LinkedIn Card - 1x1 */}
          <a 
            href="https://www.linkedin.com/in/marvelousshivam" target="_blank" rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-3xl bg-[#0077b5]/10 dark:bg-[#0077b5]/20 p-6 shadow-sm border border-[#0077b5]/20 hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center">
                <Linkedin size={20} fill="currentColor" />
              </div>
              <ArrowUpRight className="text-[#0077b5] opacity-50 group-hover:opacity-100 transition-opacity" size={20} />
            </div>
            <div>
              <p className="font-semibold text-[#0077b5] dark:text-[#0077b5]">LinkedIn</p>
              <p className="text-xs text-[#0077b5]/70 mt-1 dark:text-[#0077b5]/80">Connect</p>
            </div>
          </a>

          {/* GitHub Card - 1x1 */}
          <a 
            href="https://github.com/marvelousshivam" target="_blank" rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-3xl bg-gray-900 dark:bg-black/50 p-6 shadow-sm border border-gray-800 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-white"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center">
                <Github size={20} />
              </div>
              <ArrowUpRight className="text-gray-400 group-hover:text-white transition-colors" size={20} />
            </div>
            <div>
              <p className="font-semibold text-white">GitHub</p>
              <p className="text-xs text-gray-400 mt-1">@marvelousshivam</p>
            </div>
          </a>

          {/* WhatsApp Card - 1x1 */}
          <a 
            href="https://wa.me/marvelousshivam" target="_blank" rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-3xl bg-[#25D366]/10 dark:bg-[#25D366]/20 p-6 shadow-sm border border-[#25D366]/20 hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                <Phone size={20} fill="currentColor" />
              </div>
              <ArrowUpRight className="text-[#25D366] opacity-50 group-hover:opacity-100 transition-opacity" size={20} />
            </div>
            <div>
              <p className="font-semibold text-[#25D366] dark:text-[#25D366]">WhatsApp</p>
              <p className="text-xs text-[#25D366]/70 mt-1 dark:text-[#25D366]/80">Chat</p>
            </div>
          </a>

          {/* Telegram Card - 1x1 */}
          <a 
            href="https://t.me/marvelousshivam" target="_blank" rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-3xl bg-[#229ED9]/10 dark:bg-[#229ED9]/20 p-6 shadow-sm border border-[#229ED9]/20 hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-[#229ED9] text-white flex items-center justify-center">
                <MessageCircle size={20} fill="currentColor" />
              </div>
              <ArrowUpRight className="text-[#229ED9] opacity-50 group-hover:opacity-100 transition-opacity" size={20} />
            </div>
            <div>
              <p className="font-semibold text-[#229ED9] dark:text-[#229ED9]">Telegram</p>
              <p className="text-xs text-[#229ED9]/70 mt-1 dark:text-[#229ED9]/80">Message</p>
            </div>
          </a>

          {/* Discord Card - 2x1 */}
          <a 
            href="https://discord.com/users/marvelousshivam" target="_blank" rel="noopener noreferrer"
            className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-[#5865F2] p-6 text-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center">
                <MessageSquare size={20} fill="currentColor" />
              </div>
              <ArrowUpRight className="text-white/50 group-hover:text-white transition-colors" size={20} />
            </div>
            <div className="relative z-10">
              <p className="font-semibold text-white">Discord</p>
              <p className="text-sm text-white/80 mt-1">@marvelousshivam</p>
            </div>
          </a>

        </div>
      </div>
    </div>
  );
};

export default ConnectWithMe;
