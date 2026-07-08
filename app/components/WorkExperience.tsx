import React from "react";
import { MonitorPlay, Users, Code, Github } from "lucide-react";

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
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
    description: "Building modern, responsive web applications for clients and personal projects. Leveraging Next.js and TailwindCSS to deliver high-performance, glassmorphic user interfaces tailored to specific business needs.",
    skills: ["React", "Next.js", "TailwindCSS"],
    icon: <Code size={20} className="text-blue-500" />,
    color: "bg-blue-500",
  },
  {
    id: "gdsc",
    role: "Technical Contributor",
    company: "Google Developer Student Clubs (GDSC)",
    period: "2023 – Present",
    description: "Organizing workshops on web development and modern frontend frameworks. Mentoring peers in JavaScript and collaborating on community-driven tech initiatives to foster learning and innovation.",
    skills: ["Community", "JavaScript", "Mentorship"],
    icon: <Users size={20} className="text-green-500" />,
    color: "bg-green-500",
  },
  {
    id: "opensource",
    role: "Developer",
    company: "Open Source Contributor",
    period: "2024 – Present",
    description: "Active contributor to various open-source projects on GitHub, focusing on UI/UX improvements, bug fixes, and feature enhancements in the React ecosystem.",
    skills: ["Git", "Open Source", "React"],
    icon: <Github size={20} className="text-gray-700 dark:text-gray-300" />,
    color: "bg-gray-500",
  },
  {
    id: "streamx",
    role: "Software Developer",
    company: "StreamX",
    period: "2022 – 2023",
    description: "Contributed to the core development team. Assisted in building interactive UI components, optimizing frontend performance, and ensuring a seamless, high-quality user experience for the streaming platform.",
    skills: ["Frontend", "UI/UX", "Web Development"],
    icon: <MonitorPlay size={20} className="text-red-500" />,
    color: "bg-red-500",
  }
];

const WorkExperience: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-6 sm:p-10 hide-scrollbar bg-gray-50 dark:bg-[#1e1e1e]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Experience Timeline
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            My journey through development, communities, and startups.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] sm:left-[39px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-gray-200 via-gray-300 to-transparent dark:from-gray-700 dark:via-gray-600 dark:to-transparent hidden sm:block"></div>

          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative flex flex-col sm:flex-row gap-6 sm:gap-12 group">
                
                {/* Timeline Icon */}
                <div className="hidden sm:flex flex-col items-center z-10 pt-1">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 transition-transform duration-300 group-hover:scale-110`}>
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${exp.color} bg-opacity-10 dark:bg-opacity-20`}>
                      {exp.icon}
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <div className="flex-1">
                  <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-xl border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    
                    {/* Header: Mobile Icon + Title */}
                    <div className="flex items-center sm:block gap-4 mb-4 sm:mb-0">
                      <div className={`sm:hidden w-12 h-12 rounded-full flex items-center justify-center ${exp.color} bg-opacity-10 dark:bg-opacity-20 shrink-0`}>
                        {exp.icon}
                      </div>
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {exp.role}
                          </h3>
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1 sm:mt-0">
                            {exp.period}
                          </span>
                        </div>
                        <h4 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-4">
                          {exp.company}
                        </h4>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map(skill => (
                        <span 
                          key={skill}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
