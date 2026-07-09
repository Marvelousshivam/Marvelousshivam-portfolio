import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Gamepad2, 
  Code, 
  Wrench, 
  Star, 
  ChevronLeft,
  Share,
  Film,
  Video,
  MessageCircle,
  Database,
  Heart,
  Loader2,
  Music,
  Monitor
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  developer: string;
  description: string;
  deployedUrl?: string;
  githubUrl?: string;
  githubUrl2?: string;
  technologies: string[];
  category: string;
  icon: React.ReactNode;
  color: string;
  isFeatured?: boolean;
  featuredHeroText?: string;
  screenshots?: string[];
  actionLabel?: string;
}

const projectsData: ProjectData[] = [
  {
    id: "portfolio",
    title: "macOS Portfolio",
    subtitle: "Interactive Web Experience",
    developer: "Shivam Raj",
    description: `A highly interactive, modern, and sleek personal portfolio website built with Next.js, featuring a stunning macOS-inspired design aesthetic. It bridges the gap between a traditional resume and an interactive operating system experience right in your browser.

### ✨ Features
- **App Store**: A beautiful showcase of projects.
- **Music Player**: JioSaavn API integrated streaming player.
- **Terminal & VS Code**: Functional command-line and code editor interfaces.
- **Flappy Bird**: A fully playable clone of the classic game!
- **Dynamic Wallpapers & Theme**: Beautiful superhero wallpapers with light/dark mode support.`,
    deployedUrl: "https://github.com/Marvelousshivam/Marvelousshivam-portfolio",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    category: "Developer Tools",
    icon: <Monitor className="w-8 h-8 text-white" />,
    color: "from-blue-600 to-cyan-500",
    isFeatured: false,
    actionLabel: "GET"
  },
  {
    id: "usmusic",
    title: "USMusic",
    subtitle: "Modern Ad-Free Android Music Player",
    developer: "Shivam Raj",
    description: `A modern Android music app with ad-free streaming, synced lyrics, offline playback, and an intuitive user experience.

USMusic delivers a seamless, premium listening experience by leveraging a vast library of music — completely free of ads. It comes packed with powerful features including offline downloads, real-time synchronized lyrics, environment-aware music recognition, and highly customizable playback settings.

### ✨ Features
- **Redesigned UI** — Cleaner, faster, and more intuitive interface from the ground up.
- **Import from Spotify** — Bring your playlists and tracks over with ease.
- **Listen Together** — Sync music in real time with friends.
- **Podcast Support** — Listen to podcasts alongside your music library.
- **Ad-Free** — Stream without any interruptions.
- **Offline Mode** — Download tracks, albums, and playlists via a dedicated download manager.
- **Music Recognition** — Identify songs playing around you using advanced audio recognition.`,
    deployedUrl: "https://www.dl.dropboxusercontent.com/scl/fi/dm2zwyyah6p8xy6252b7j/app-arm64-foss-release.apk?rlkey=cdztj04ea7f99p9i2wr3n5663&st=djpa8bgk&dl=0",
    technologies: ["Android", "Kotlin", "Jetpack Compose", "ExoPlayer", "Hilt"],
    category: "Music",
    icon: <Music className="w-8 h-8 text-white" />,
    color: "from-purple-600 to-indigo-900",
    isFeatured: true,
    featuredHeroText: "NOW AVAILABLE",
    actionLabel: "GET"
  },
  {
    id: "netphlixx",
    title: "Netphlixx",
    subtitle: "Custom Movie Streaming Platform",
    developer: "Shivam Raj",
    description: "A sleek, fully functional movie streaming platform designed with a Netflix-inspired UI/UX. To power the content delivery, I custom-built a dedicated backend service (movie-scraper) that dynamically scrapes and extracts direct video links from external sources, feeding them seamlessly into the Netphlixx frontend for a continuous streaming experience.",
    deployedUrl: "https://netphlixx.vercel.app/",
    githubUrl: "https://github.com/Marvelousshivam/Netphlixx",
    githubUrl2: "https://github.com/Marvelousshivam/movie-scraper",
    technologies: ["Full-Stack", "UI/UX", "Web Scraping", "Streaming"],
    category: "Entertainment",
    icon: <Film className="w-8 h-8 text-white" />,
    color: "from-red-600 to-red-900",
    isFeatured: true,
    featuredHeroText: "FEATURED APP",
    screenshots: [
      "/Projects/netphlixx1.png",
      "/Projects/netphlixx2.png",
      "/Projects/netphlixx3.png"
    ]
  },
  {
    id: "screen-x",
    title: "Screen-X",
    subtitle: "High-Performance Screen Recorder",
    developer: "gtxPrime & Shivam",
    description: "A modern, high-performance, open-source Android screen recording utility. I actively collaborated with my friend (gtxPrime) to contribute to its development, helping refine its core functionality.",
    githubUrl: "https://github.com/gtxPrime/screen-x",
    technologies: ["Android", "Kotlin", "Open Source", "Collaboration"],
    category: "Utilities",
    icon: <Video className="w-8 h-8 text-white" />,
    color: "from-blue-500 to-blue-700"
  },
  {
    id: "whats-wrap",
    title: "Whats-Wrap",
    subtitle: "WhatsApp Chat Analyzer",
    developer: "gtxPrime & Shivam",
    description: "An engaging, interactive web tool that generates a 'Spotify Wrapped'-style breakdown of WhatsApp chat data. I collaborated heavily on this repository, building and shipping several key features.",
    githubUrl: "https://github.com/gtxPrime/whats-wrap",
    technologies: ["JavaScript", "Data Visualization", "Web App"],
    category: "Social Networking",
    icon: <MessageCircle className="w-8 h-8 text-white" />,
    color: "from-green-500 to-emerald-700",
    screenshots: [
      "/Projects/whatswrap1.png"
    ]
  },
  {
    id: "crm",
    title: "Bharat Natural CRM",
    subtitle: "Enterprise Management Dashboard",
    developer: "Shivam Raj",
    description: "A custom-built Customer Relationship Management (CRM) dashboard engineered specifically for a small enterprise, streamlining their internal business logic and data flow.",
    deployedUrl: "https://bharatnatural-crm.vercel.app/",
    technologies: ["Next.js/React", "CRM", "Enterprise", "Vercel"],
    category: "Business",
    icon: <Database className="w-8 h-8 text-white" />,
    color: "from-orange-500 to-amber-700"
  },
  {
    id: "oryvi",
    title: "Oryvi",
    subtitle: "Privacy-Focused Wellness App",
    developer: "Shivam Raj",
    description: "A period-tracking web application designed with user privacy and wellness in mind. (Currently archived/on-pause due to time constraints).",
    deployedUrl: "https://www.oryvi.space/",
    technologies: ["Web App", "Health Tech", "UI/UX"],
    category: "Health & Fitness",
    icon: <Heart className="w-8 h-8 text-white" />,
    color: "from-pink-500 to-rose-700"
  }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SidebarItem = ({ icon: Icon, label, isActive, onClick }: any) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full flex items-center space-x-2 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
      isActive 
        ? 'bg-blue-500 text-white shadow-sm' 
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-white/10'
    }`}
  >
    <Icon className={`w-[16px] h-[16px] ${isActive ? 'text-white' : 'text-blue-500'}`} />
    <span>{label}</span>
  </button>
);

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApp, setSelectedApp] = useState<ProjectData | null>(null);
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [rawBaseUrl, setRawBaseUrl] = useState<string | null>(null);
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedApp?.githubUrl) {
      setIsLoadingReadme(true);
      setReadmeContent(null);
      setRawBaseUrl(null);
      
      const fetchReadme = async () => {
        try {
          const match = selectedApp.githubUrl!.match(/github\.com\/([^\/]+)\/([^\/]+)/);
          if (!match) return;
          const [, owner, repo] = match;
          
          const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
          if (!res.ok) throw new Error('Readme not found');
          const data = await res.json();
          
          const rawRes = await fetch(data.download_url);
          if (!rawRes.ok) throw new Error('Failed to fetch raw readme');
          const text = await rawRes.text();
          
          setRawBaseUrl(data.download_url.split('/').slice(0, -1).join('/'));
          setReadmeContent(text);
        } catch (err) {
          console.error("Failed to fetch README", err);
        } finally {
          setIsLoadingReadme(false);
        }
      };
      
      fetchReadme();
    } else {
      setReadmeContent(null);
      setIsLoadingReadme(false);
    }
  }, [selectedApp]);

  const filteredProjects = searchQuery.trim() !== "" 
    ? projectsData.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : projectsData.filter(p => !p.isFeatured);

  const featuredProjects = projectsData.filter(p => p.isFeatured);

  return (
    <div className="flex h-full bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-100 font-sans relative overflow-hidden">
      
      {/* Sidebar */}
      <div className="hidden md:flex w-52 border-r border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-[#1c1c1e]/80 backdrop-blur-xl flex-col h-full z-10 shrink-0">
        <div className="p-4 pt-8 pb-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-200/60 dark:bg-black/30 border border-transparent dark:border-gray-700/50 rounded-md pl-8 pr-3 py-1 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors placeholder-gray-500"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-6 hide-scrollbar">
          <div>
            <h3 className="px-2 text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-1.5 tracking-tight">Discover</h3>
            <div className="space-y-0.5">
              <SidebarItem icon={Star} label="Discover" isActive={activeCategory === "Discover"} onClick={() => { setActiveCategory("Discover"); setSelectedApp(null); }} />
              <SidebarItem icon={Gamepad2} label="Arcade" isActive={activeCategory === "Arcade"} onClick={() => { setActiveCategory("Arcade"); setSelectedApp(null); }} />
              <SidebarItem icon={Code} label="Create" isActive={activeCategory === "Create"} onClick={() => { setActiveCategory("Create"); setSelectedApp(null); }} />
              <SidebarItem icon={Wrench} label="Develop" isActive={activeCategory === "Develop"} onClick={() => { setActiveCategory("Develop"); setSelectedApp(null); }} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-full relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!selectedApp ? (
            <motion.div 
              key="store-front"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-y-auto hide-scrollbar pb-[70px] md:pb-0"
            >
              <div className="p-6 sm:p-10 max-w-[900px] mx-auto space-y-10">
                
                {/* Header */}
                <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                  <h1 className="text-3xl font-bold tracking-tight">{searchQuery ? 'Search Results' : activeCategory}</h1>
                </div>

                {/* Hero Carousel (Only on Discover) */}
                {activeCategory === "Discover" && !searchQuery && (
                  <div className="flex overflow-x-auto space-x-6 snap-x snap-mandatory hide-scrollbar pb-4 -mx-6 px-6 sm:mx-0 sm:px-0">
                    {featuredProjects.map((project) => (
                      <motion.div 
                        key={project.id}
                        layoutId={`card-${project.id}`}
                        onClick={() => setSelectedApp(project)}
                        className="relative flex-none w-[90%] sm:w-[500px] h-[320px] rounded-2xl overflow-hidden cursor-pointer group snap-center shadow-md border border-gray-200/50 dark:border-gray-700/50 bg-gray-100 dark:bg-gray-800"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90 transition-opacity group-hover:opacity-100`} />
                        <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full justify-between">
                          <div>
                            <h4 className="text-white/80 font-bold text-[11px] uppercase tracking-wide mb-1">{project.featuredHeroText || "FEATURED"}</h4>
                            <motion.h2 layoutId={`title-${project.id}`} className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">{project.title}</motion.h2>
                            <p className="text-[15px] text-white/90 max-w-[280px] line-clamp-2">{project.subtitle}</p>
                          </div>
                          <div className="flex items-end justify-between mt-auto">
                            <div className="flex items-center space-x-4">
                              <motion.div layoutId={`icon-${project.id}`} className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
                                {project.icon}
                              </motion.div>
                              <div>
                                <p className="text-white font-semibold text-sm">Free</p>
                                <p className="text-white/60 text-[10px]">In-App Purchases</p>
                              </div>
                            </div>
                            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 py-1.5 rounded-full font-bold text-sm transition-colors">
                              GET
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Standard App List */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold tracking-tight">Top Apps & Projects</h2>
                    <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">See All</button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2">
                    {filteredProjects.map((project, index) => (
                      <motion.div 
                        key={project.id} 
                        layoutId={`card-${project.id}`}
                        onClick={() => setSelectedApp(project)}
                        className="flex items-center space-x-4 cursor-pointer py-3 border-b border-gray-100 dark:border-gray-800/60 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/30 rounded-xl px-2 -mx-2 transition-colors"
                      >
                        <div className="w-6 font-semibold text-gray-400 text-sm text-center">{index + 1}</div>
                        <motion.div layoutId={`icon-${project.id}`} className={`w-16 h-16 rounded-[14px] bg-gradient-to-br ${project.color} flex items-center justify-center shadow-sm flex-shrink-0 border border-gray-200/50 dark:border-gray-700/50`}>
                          {project.icon}
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <motion.h3 layoutId={`title-${project.id}`} className="text-[15px] font-semibold text-gray-900 dark:text-white truncate">{project.title}</motion.h3>
                          <p className="text-[13px] text-gray-500 dark:text-gray-400 truncate mt-0.5">{project.subtitle}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center pl-2">
                          <button 
                            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-blue-500 font-bold px-4 py-1 rounded-full text-[13px] transition-colors mb-1"
                          >
                            GET
                          </button>
                          <p className="text-[9px] text-gray-400">In-App Purchases</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="app-detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full flex flex-col bg-white dark:bg-[#1E1E1E] z-20 absolute inset-0"
            >
              {/* Detail Header Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-800/80 bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-xl shrink-0 sticky top-0 z-30">
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="flex items-center text-blue-500 hover:text-blue-600 font-medium"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  <span className="text-[15px]">Back</span>
                </button>
                <div className="flex items-center">
                  <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors text-blue-500">
                    <Share className="w-[18px] h-[18px]" />
                  </button>
                </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 sm:p-10 hide-scrollbar pb-[100px]">
                <div className="max-w-[700px] mx-auto">
                  
                  {/* App Identity */}
                  <div className="flex gap-6 sm:gap-8 mb-8">
                    <motion.div layoutId={`icon-${selectedApp.id}`} className={`w-28 h-28 sm:w-32 sm:h-32 rounded-[24px] bg-gradient-to-br ${selectedApp.color} flex items-center justify-center shadow-lg flex-shrink-0 border border-gray-200/50 dark:border-gray-700/50`}>
                      {selectedApp.icon}
                    </motion.div>
                    <div className="flex-1 flex flex-col justify-center">
                      <motion.h1 layoutId={`title-${selectedApp.id}`} className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight mb-1">{selectedApp.title}</motion.h1>
                      <h2 className="text-[15px] text-gray-500 dark:text-gray-400 mb-1">{selectedApp.subtitle}</h2>
                      <p className="text-[13px] font-medium text-blue-500 mb-4">{selectedApp.developer}</p>
                      
                      <div className="flex items-center gap-3 mt-auto">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-1.5 rounded-full font-bold text-sm transition-colors shadow-sm">
                          {selectedApp.actionLabel || "GET"}
                        </button>
                        {selectedApp.githubUrl && (
                          <a href={selectedApp.githubUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-4 py-1.5 rounded-full font-semibold text-sm transition-colors">
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* App Stats Ribbon */}
                  <div className="border-y border-gray-200 dark:border-gray-800/80 py-4 mb-8 flex justify-between items-center px-4 overflow-x-auto hide-scrollbar text-center">
                    <div className="px-4 border-r border-gray-200 dark:border-gray-800 last:border-0 min-w-max">
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Category</p>
                      <p className="text-[15px] font-semibold text-gray-700 dark:text-gray-300">{selectedApp.category}</p>
                    </div>
                    <div className="px-4 border-r border-gray-200 dark:border-gray-800 last:border-0 min-w-max">
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Age Rating</p>
                      <p className="text-[15px] font-semibold text-gray-700 dark:text-gray-300">4+</p>
                    </div>
                    <div className="px-4 border-r border-gray-200 dark:border-gray-800 last:border-0 min-w-max">
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Developer</p>
                      <p className="text-[15px] font-semibold text-gray-700 dark:text-gray-300">{selectedApp.developer}</p>
                    </div>
                    <div className="px-4 min-w-max">
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Language</p>
                      <p className="text-[15px] font-semibold text-gray-700 dark:text-gray-300">EN</p>
                    </div>
                  </div>

                  {/* Screenshots */}
                  {selectedApp.screenshots && selectedApp.screenshots.length > 0 && (
                    <div className="mb-10">
                      <div className="flex overflow-x-auto space-x-4 pb-4 snap-x hide-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0">
                        {selectedApp.screenshots.map((src, index) => (
                          <div key={index} className="flex-none w-[260px] sm:w-[380px] h-[160px] sm:h-[230px] snap-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src={src} 
                              alt={`${selectedApp.title} screenshot ${index + 1}`} 
                              className="w-full h-full object-cover rounded-xl shadow-sm border border-gray-200 dark:border-gray-800"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div className="mb-10">
                    <div className="prose prose-sm dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed prose-headings:font-bold prose-a:text-blue-500">
                      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {selectedApp.description}
                      </ReactMarkdown>
                    </div>
                  </div>

                  {/* README / Extra Information */}
                  {isLoadingReadme && (
                    <div className="flex items-center justify-center p-12 text-gray-500">
                      <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                  )}
                  
                  {readmeContent && (
                    <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
                      <h3 className="text-lg font-bold mb-6 tracking-tight">Information</h3>
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-500 prose-img:rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-800/50">
                        <ReactMarkdown 
                          rehypePlugins={[rehypeRaw]}
                          components={{
                            img: ({ src, alt, ...props }) => {
                              let finalSrc = src;
                              if (finalSrc && !finalSrc.startsWith('http') && !finalSrc.startsWith('data:') && rawBaseUrl) {
                                finalSrc = `${rawBaseUrl}/${finalSrc.replace(/^\//, '')}`;
                              }
                              return <img {...props} src={finalSrc || ''} alt={alt || "readme image"} className="inline-block max-w-full h-auto" />;
                            }
                          }}
                        >
                          {readmeContent}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Bottom Tab Bar */}
      {!selectedApp && (
        <div className="md:hidden absolute bottom-0 left-0 right-0 h-[64px] bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-2xl border-t border-gray-200 dark:border-gray-800 flex items-center justify-around px-2 z-40 pb-safe">
          <button onClick={() => { setActiveCategory('Discover'); setSearchQuery(""); }} className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${activeCategory === 'Discover' && !searchQuery ? 'text-blue-500' : 'text-gray-500'}`}>
            <Star className="w-[22px] h-[22px] mb-1" />
            <span className="text-[10px] font-medium tracking-tight">Discover</span>
          </button>
          <button onClick={() => { setActiveCategory('Arcade'); setSearchQuery(""); }} className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${activeCategory === 'Arcade' && !searchQuery ? 'text-blue-500' : 'text-gray-500'}`}>
            <Gamepad2 className="w-[22px] h-[22px] mb-1" />
            <span className="text-[10px] font-medium tracking-tight">Arcade</span>
          </button>
          <button onClick={() => { setActiveCategory('Create'); setSearchQuery(""); }} className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${activeCategory === 'Create' && !searchQuery ? 'text-blue-500' : 'text-gray-500'}`}>
            <Code className="w-[22px] h-[22px] mb-1" />
            <span className="text-[10px] font-medium tracking-tight">Create</span>
          </button>
          <button onClick={() => { setActiveCategory('Develop'); setSearchQuery(""); }} className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${activeCategory === 'Develop' && !searchQuery ? 'text-blue-500' : 'text-gray-500'}`}>
            <Wrench className="w-[22px] h-[22px] mb-1" />
            <span className="text-[10px] font-medium tracking-tight">Develop</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;
