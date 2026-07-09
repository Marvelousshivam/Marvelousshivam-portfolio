import React, { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, Variants } from "framer-motion";
import {
  Github,
  Mail,
  Linkedin,
  MessageCircle,
  MessageSquare,
  Phone,
  ArrowUpRight,
  MapPin,
  Clock,
  UserCircle2
} from "lucide-react";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const ConnectWithMe = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-8 bg-gray-50/50 dark:bg-[#111111] hide-scrollbar relative">
      <div className="max-w-5xl mx-auto py-12">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center sm:text-left pl-4"
        >
          <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent tracking-tight">
            Contact
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 font-medium">
            Let&apos;s build something amazing together.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          onMouseMove={handleMouseMove}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] group/grid relative px-2"
        >
          
          {/* Hero Profile Card - 2x2 */}
          <motion.div 
            variants={itemVariant}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="md:col-span-2 md:row-span-2 relative overflow-hidden group bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[2rem] p-8 text-white shadow-xl border border-white/10 flex flex-col justify-between cursor-default"
          >
            {/* Spotlight */}
            <motion.div
              className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    800px circle at ${mouseX}px ${mouseY}px,
                    rgba(255,255,255,0.15),
                    transparent 80%
                  )
                `,
              }}
            />

            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
            
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-xs font-semibold mb-6 shadow-inner">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                  </span>
                  Available for work
                </div>
                <h1 className="text-4xl font-black mb-2 tracking-tight">Shivam</h1>
                <h2 className="text-blue-200 font-medium text-lg">Full Stack Developer</h2>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <UserCircle2 size={32} className="text-white" />
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-3 text-sm text-blue-100/90 font-medium">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center backdrop-blur-sm"><MapPin size={16} /></div>
                <span>Based in India</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center backdrop-blur-sm"><Clock size={16} /></div>
                <span>Open to remote opportunities</span>
              </div>
            </div>
          </motion.div>

          {/* Email Card - 2x1 */}
          <motion.a 
            variants={itemVariant}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="mailto:Shivam@oryvi.space"
            className="md:col-span-2 group relative overflow-hidden rounded-[2rem] bg-white dark:bg-[#1C1C1E] p-6 shadow-lg border border-gray-200 dark:border-white/5 flex flex-col justify-between"
          >
            <motion.div
              className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    600px circle at ${mouseX}px ${mouseY}px,
                    rgba(59,130,246,0.1),
                    transparent 80%
                  )
                `,
              }}
            />
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Mail size={24} />
              </div>
              <ArrowUpRight className="text-gray-400 group-hover:text-blue-500 transition-colors" size={24} />
            </div>
            <div className="relative z-10">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">Drop me an email</p>
              <p className="font-bold text-xl text-gray-900 dark:text-white truncate">Shivam@oryvi.space</p>
            </div>
          </motion.a>

          {/* LinkedIn Card - 1x1 */}
          <motion.a 
            variants={itemVariant}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.linkedin.com/in/marvelousshivam" target="_blank" rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-[2rem] bg-[#0077b5] p-6 shadow-lg border border-transparent flex flex-col justify-between text-white"
          >
            <motion.div
              className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    400px circle at ${mouseX}px ${mouseY}px,
                    rgba(255,255,255,0.2),
                    transparent 80%
                  )
                `,
              }}
            />
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Linkedin size={20} fill="currentColor" />
              </div>
              <ArrowUpRight className="text-white/50 group-hover:text-white transition-colors" size={20} />
            </div>
            <div className="relative z-10">
              <p className="font-bold text-lg text-white">LinkedIn</p>
              <p className="text-xs text-white/80 mt-1 font-medium">Connect</p>
            </div>
          </motion.a>

          {/* GitHub Card - 1x1 */}
          <motion.a 
            variants={itemVariant}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/marvelousshivam" target="_blank" rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-[2rem] bg-gray-900 dark:bg-black p-6 shadow-lg border border-gray-800 dark:border-white/10 flex flex-col justify-between text-white"
          >
             <motion.div
              className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    400px circle at ${mouseX}px ${mouseY}px,
                    rgba(255,255,255,0.15),
                    transparent 80%
                  )
                `,
              }}
            />
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                <Github size={20} />
              </div>
              <ArrowUpRight className="text-gray-400 group-hover:text-white transition-colors" size={20} />
            </div>
            <div className="relative z-10">
              <p className="font-bold text-lg text-white">GitHub</p>
              <p className="text-xs text-gray-400 mt-1 font-medium">@marvelousshivam</p>
            </div>
          </motion.a>

          {/* WhatsApp Card - 1x1 */}
          <motion.a 
            variants={itemVariant}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/marvelousshivam" target="_blank" rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-[2rem] bg-[#25D366] p-6 shadow-lg border border-transparent flex flex-col justify-between text-white"
          >
             <motion.div
              className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    400px circle at ${mouseX}px ${mouseY}px,
                    rgba(255,255,255,0.2),
                    transparent 80%
                  )
                `,
              }}
            />
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Phone size={20} fill="currentColor" />
              </div>
              <ArrowUpRight className="text-white/50 group-hover:text-white transition-colors" size={20} />
            </div>
            <div className="relative z-10">
              <p className="font-bold text-lg text-white">WhatsApp</p>
              <p className="text-xs text-white/80 mt-1 font-medium">Chat</p>
            </div>
          </motion.a>

          {/* Telegram Card - 1x1 */}
          <motion.a 
            variants={itemVariant}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://t.me/marvelousshivam" target="_blank" rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-[2rem] bg-[#229ED9] p-6 shadow-lg border border-transparent flex flex-col justify-between text-white"
          >
             <motion.div
              className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    400px circle at ${mouseX}px ${mouseY}px,
                    rgba(255,255,255,0.2),
                    transparent 80%
                  )
                `,
              }}
            />
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <MessageCircle size={20} fill="currentColor" />
              </div>
              <ArrowUpRight className="text-white/50 group-hover:text-white transition-colors" size={20} />
            </div>
            <div className="relative z-10">
              <p className="font-bold text-lg text-white">Telegram</p>
              <p className="text-xs text-white/80 mt-1 font-medium">Message</p>
            </div>
          </motion.a>

          {/* Discord Card - 2x1 */}
          <motion.a 
            variants={itemVariant}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://discord.com/users/marvelousshivam" target="_blank" rel="noopener noreferrer"
            className="md:col-span-2 group relative overflow-hidden rounded-[2rem] bg-[#5865F2] p-6 shadow-lg border border-transparent flex flex-col justify-between text-white"
          >
             <motion.div
              className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    600px circle at ${mouseX}px ${mouseY}px,
                    rgba(255,255,255,0.2),
                    transparent 80%
                  )
                `,
              }}
            />
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-700" />
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MessageSquare size={24} fill="currentColor" />
              </div>
              <ArrowUpRight className="text-white/50 group-hover:text-white transition-colors" size={24} />
            </div>
            <div className="relative z-10">
              <p className="font-bold text-xl text-white">Discord</p>
              <p className="text-sm text-white/80 mt-1 font-medium">@marvelousshivam</p>
            </div>
          </motion.a>

        </motion.div>
      </div>
    </div>
  );
};

export default ConnectWithMe;
