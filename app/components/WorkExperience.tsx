import React, { useState } from "react";
import { MonitorPlay, Users, Code, Github, X, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  details: string[];
  skills: string[];
  icon: React.ReactNode;
  color: string;
}

const experiences: Experience[] = [
  {
    id: "freelance",
    role: "Full Stack Developer",
    company: "Freelance Web Developer",
    period: "2023 – Present",
    description: "Building modern, responsive web applications for clients and personal projects.",
    details: [
      "Leveraged Next.js and TailwindCSS to deliver high-performance user interfaces.",
      "Implemented seamless animations and glassmorphic designs matching client brandings.",
      "Integrated secure authentication and cloud databases (Supabase/Firebase).",
      "Optimized web vitals resulting in 90+ Lighthouse scores across projects."
    ],
    skills: ["React", "Next.js", "TailwindCSS", "Framer Motion"],
    icon: <Code size={24} className="text-blue-500" />,
    color: "bg-blue-500",
  },
  {
    id: "gdsc",
    role: "Technical Contributor",
    company: "Google Developer Student Clubs (GDSC)",
    period: "2023 – Present",
    description: "Organizing workshops and mentoring peers in web development and modern frontend frameworks.",
    details: [
      "Collaborated on community-driven tech initiatives to foster learning and innovation.",
      "Conducted beginner-friendly sessions on JavaScript and React fundamentals.",
      "Helped peers debug complex frontend issues during hackathons.",
      "Promoted best practices in open-source contribution and code review."
    ],
    skills: ["Community", "JavaScript", "Mentorship", "Public Speaking"],
    icon: <Users size={24} className="text-green-500" />,
    color: "bg-green-500",
  },
  {
    id: "opensource",
    role: "Developer",
    company: "Open Source Contributor",
    period: "2024 – Present",
    description: "Active contributor to various open-source projects on GitHub, focusing on UI/UX improvements.",
    details: [
      "Submitted PRs addressing bug fixes and feature enhancements in the React ecosystem.",
      "Collaborated with international maintainers to resolve long-standing issues.",
      "Improved documentation for emerging frontend libraries.",
      "Engaged in technical discussions for architecting scalable component systems."
    ],
    skills: ["Git", "Open Source", "React", "Collaboration"],
    icon: <Github size={24} className="text-gray-700 dark:text-gray-300" />,
    color: "bg-gray-500",
  },
  {
    id: "streamx",
    role: "Software Developer",
    company: "StreamX",
    period: "2022 – 2023",
    description: "Contributed to the core development team, building interactive UI components for a streaming platform.",
    details: [
      "Assisted in optimizing frontend performance for high-traffic media pages.",
      "Ensured a seamless, high-quality user experience across all device types.",
      "Refactored legacy code to modern React functional components with Hooks.",
      "Participated in daily stand-ups and agile sprint planning."
    ],
    skills: ["Frontend", "UI/UX", "Web Development", "Agile"],
    icon: <MonitorPlay size={24} className="text-red-500" />,
    color: "bg-red-500",
  }
];

const WorkExperience: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  return (
    <div className="h-full w-full bg-gray-50/50 dark:bg-[#1c1c1e]/50 font-sans text-gray-900 dark:text-gray-100 relative overflow-hidden flex flex-col">
      
      {/* Header */}
      <div className="px-8 pt-8 pb-4 shrink-0">
        <h2 className="text-3xl font-bold tracking-tight">Work Experience</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Scroll to explore. Click on any card for a Quick Look.
        </p>
      </div>

      {/* Scrolling Cards Area */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden hide-scrollbar pb-8 px-8 flex items-center">
        <div className="flex gap-6 md:gap-8 min-w-max h-full items-center">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedExp(exp)}
              className="w-[280px] h-[360px] md:w-[320px] md:h-[400px] bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-3xl p-6 flex flex-col shadow-lg cursor-pointer group relative overflow-hidden shrink-0"
            >
              {/* Top Accent Gradient */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${exp.color} opacity-80`} />
              
              <div className="flex justify-between items-start mb-6 mt-2">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${exp.color} bg-opacity-10 dark:bg-opacity-20 shadow-inner shrink-0`}>
                  {exp.icon}
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-semibold text-gray-500 dark:text-gray-400 shrink-0 ml-2">
                  {exp.period}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-1 line-clamp-2 leading-tight">{exp.role}</h3>
                <h4 className="text-sm md:text-md font-medium text-gray-600 dark:text-gray-400 mb-4 line-clamp-1">{exp.company}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4 leading-relaxed">
                  {exp.description}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center text-sm font-medium text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                  <Eye size={16} className="mr-2" />
                  Quick Look
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Look Modal */}
      <AnimatePresence>
        {selectedExp && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            
            {/* Modal */}
            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 z-50 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-2xl bg-white/90 dark:bg-[#1e1e1e]/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-600/50 overflow-hidden pointer-events-auto flex flex-col max-h-full"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-black/20 shrink-0">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedExp.color} bg-opacity-10 dark:bg-opacity-20 shrink-0`}>
                      {selectedExp.icon}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-tight">
                        {selectedExp.role}
                      </h3>
                      <p className="text-[12px] md:text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                        {selectedExp.company} • {selectedExp.period}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedExp(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shrink-0"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 sm:p-8 overflow-y-auto hide-scrollbar flex-1">
                  <h4 className="text-[11px] md:text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                    Key Achievements & Responsibilities
                  </h4>
                  <ul className="space-y-4 mb-8">
                    {selectedExp.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-3 text-gray-700 dark:text-gray-300 leading-relaxed text-[14px] md:text-[15px]">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${selectedExp.color} shrink-0`} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-[11px] md:text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                    Technologies & Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg text-[12px] md:text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200/50 dark:border-gray-700/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkExperience;
