import React, { useState } from 'react';
import { 
  Search, 
  Gamepad2, 
  Code, 
  Wrench, 
  Star, 
  ChevronLeft,
  Share,
  Download,
  Film,
  Video,
  MessageCircle,
  Database,
  Heart,
  Loader2,
  Music
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deployedUrl?: string;
  githubUrl?: string;
  githubUrl2?: string;
  technologies: string[];
  category: string;
  icon: React.ReactNode;
  color: string;
  isFeatured?: boolean;
  screenshots?: string[];
  actionLabel?: string;
}

const projectsData: ProjectData[] = [
  {
    id: "usmusic",
    title: "USMusic",
    subtitle: "Modern Ad-Free Android Music Player",
    description: `A modern Android music app with ad-free streaming, synced lyrics, offline playback, and an intuitive user experience.

### 🌟 Overview
USMusic delivers a seamless, premium listening experience by leveraging a vast library of music — completely free of ads. It comes packed with powerful features including offline downloads, real-time synchronized lyrics, environment-aware music recognition, and highly customizable playback settings.

### ✨ Features
#### 🚀 What's New
- **Redesigned UI** — Cleaner, faster, and more intuitive interface from the ground up.
- **Import from Spotify** — Bring your playlists and tracks over with ease.
- **Listen Together** — Sync music in real time with friends.
- **Podcast Support** — Listen to podcasts alongside your music library.
- **Local Media Support** — Play music files stored directly on your device.
- **Dynamic Island Support** — Enhanced playback notifications on supported Android devices.

#### 🎧 Streaming & Playback
- **Ad-Free** — Stream without any interruptions.
- **Seamless Playback** — Switch effortlessly between audio-only and video modes.
- **Background Playback** — Listen while using other apps or with the screen off.
- **Offline Mode** — Download tracks, albums, and playlists via a dedicated download manager to listen without the internet.
- **Crossfade** — Smooth transitions between tracks.
- **Canvas Animations** — Visual animations while playing music.

#### 🔍 Discovery & Recognition
- **Music Recognition** — Identify songs playing around you using advanced audio recognition.
- **Intelligent Queueing** — An intelligent, on-device engine that analyzes your listening momentum and auto-injects perfectly aligned tracks into your queue.
- **Smart Recommendations** — Personalized suggestions based on your listening history.
- **Comprehensive Browsing** — Explore Charts, Podcasts, Moods, and Genres.

#### 🎤 Lyrics
- **Multiple Lyric Animations** — Choose from various lyric display styles.
- **Word-by-Word Lyrics** — Precise per-word synchronization for the ultimate sing-along experience.
- **Advanced Lyrics Provider** — Improved accuracy and coverage for millions of songs.
- **AI Translation** — Built-in translation integration for lyrics in any language.

#### 🔌 Integrations & Sharing
- **Music Sharing** — Share songs across platforms with unified links.
- **Set as Ringtone** — Directly set any song as your device ringtone from the app.

#### 🧠 Smart Playback
- **Pause on Mute** — Auto-pause when your device is muted.
- **Resume on Bluetooth** — Playback resumes automatically when headphones or earbuds reconnect.

#### 🎨 Customization
- **UI Density Scale** — Adjust interface spacing to your preference.
- **High Refresh Rate Support** — Smoother UI and animations on supported displays.
- **Hide Player Thumbnail** — Keep the player minimal without album art.
- **Crop Album Art** — Adjust album art display to fit your style.
- **Hide Video Songs / Shorts** — Filter out video content and short-form videos from your feed for a pure music experience.

### 💻 Tech Stack & Architecture
USMusic is built using modern Android development practices and libraries, ensuring high performance, stability, and maintainability:
- **Language**: Kotlin (100%)
- **UI Framework**: Jetpack Compose & Material 3
- **Media Playback**: AndroidX Media3 (ExoPlayer)
- **Dependency Injection**: Hilt / Dagger
- **Networking**: Ktor and Retrofit powered by OkHttp
- **Local Persistence**: Room (SQLite) and DataStore
- **Asynchrony & State**: Kotlin Coroutines & Flow
- **Image Loading**: Coil
- **Additional Utilities**: FFMpeg Kit, Lottie, Protobuf

### ⚙️ How It Works (Under the Hood)
USMusic acts as a powerful aggregator and player, bridging multiple platforms into a single, cohesive experience:
- **Music & Metadata Sourcing**: Directly interfaces with various APIs (like YouTube Music / InnerTube, JioSaavn, and LastFM).
- **Audio Streaming & Offline Playback**: Extracted stream URLs are handed off to ExoPlayer. Offline media pathways securely saved in Room database.
- **Synchronized Lyrics**: Lyrics pulled from multiple providers (LrcLib, BetterLyrics, Kugou) are parsed and auto-scrolled in synchronization with playback.
- **US Brain (Smart Queue)**: Evaluates listening context and uses AI heuristic engines (Flow Neuro Engine) to auto-queue similar tracks.
- **Echo Find (Music Recognition)**: Records audio, creates an acoustic fingerprint (via APIs like ShazamKit) to recognize songs instantly.

### 🛠️ Installation
1. Click on the GET button above to download the app.
2. Once the .apk file is downloaded, open it on your Android device.
3. If prompted, allow installation from "Unknown Sources" in your device settings.
4. Complete the installation and enjoy ad-free music!`,
    deployedUrl: "https://www.dl.dropboxusercontent.com/scl/fi/dm2zwyyah6p8xy6252b7j/app-arm64-foss-release.apk?rlkey=cdztj04ea7f99p9i2wr3n5663&st=djpa8bgk&dl=0",
    technologies: ["Android", "Kotlin", "Jetpack Compose", "ExoPlayer", "Hilt"],
    category: "Discover",
    icon: <Music className="w-8 h-8 text-white" />,
    color: "from-purple-600 to-indigo-900",
    isFeatured: true,
    actionLabel: "GET"
  },
  {
    id: "netphlixx",
    title: "Netphlixx",
    subtitle: "Custom Movie Streaming Platform",
    description: "A sleek, fully functional movie streaming platform designed with a Netflix-inspired UI/UX. To power the content delivery, I custom-built a dedicated backend service (movie-scraper) that dynamically scrapes and extracts direct video links from external sources, feeding them seamlessly into the Netphlixx frontend for a continuous streaming experience.",
    deployedUrl: "https://netphlixx.vercel.app/",
    githubUrl: "https://github.com/Marvelousshivam/Netphlixx",
    githubUrl2: "https://github.com/Marvelousshivam/movie-scraper",
    technologies: ["Full-Stack", "UI/UX", "Web Scraping", "Streaming"],
    category: "Discover",
    icon: <Film className="w-8 h-8 text-white" />,
    color: "from-red-600 to-red-900",
    isFeatured: true,
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
    description: "A modern, high-performance, open-source Android screen recording utility. I actively collaborated with my friend (gtxPrime) to contribute to its development, helping refine its core functionality.",
    githubUrl: "https://github.com/gtxPrime/screen-x",
    technologies: ["Android", "Kotlin", "Open Source", "Collaboration"],
    category: "Develop",
    icon: <Video className="w-8 h-8 text-white" />,
    color: "from-blue-500 to-blue-700"
  },
  {
    id: "whats-wrap",
    title: "Whats-Wrap",
    subtitle: "WhatsApp Chat Analyzer",
    description: "An engaging, interactive web tool that generates a 'Spotify Wrapped'-style breakdown of WhatsApp chat data. I collaborated heavily on this repository, building and shipping several key features.",
    githubUrl: "https://github.com/gtxPrime/whats-wrap",
    technologies: ["JavaScript", "Data Visualization", "Web App"],
    category: "Create",
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
    description: "A custom-built Customer Relationship Management (CRM) dashboard engineered specifically for a small enterprise, streamlining their internal business logic and data flow.",
    deployedUrl: "https://bharatnatural-crm.vercel.app/",
    technologies: ["Next.js/React", "CRM", "Enterprise", "Vercel"],
    category: "Work",
    icon: <Database className="w-8 h-8 text-white" />,
    color: "from-orange-500 to-amber-700"
  },
  {
    id: "oryvi",
    title: "Oryvi",
    subtitle: "Privacy-Focused Wellness App",
    description: "A period-tracking web application designed with user privacy and wellness in mind. (Currently archived/on-pause due to time constraints).",
    deployedUrl: "https://www.oryvi.space/",
    technologies: ["Web App", "Health Tech", "UI/UX"],
    category: "Discover",
    icon: <Heart className="w-8 h-8 text-white" />,
    color: "from-pink-500 to-rose-700"
  }
];

const SidebarItem = ({ icon: Icon, label, isActive, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-blue-500 text-white shadow-sm' 
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-white/10'
    }`}
  >
    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-500'}`} />
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

  React.useEffect(() => {
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
    : (activeCategory === "Discover" 
        ? projectsData.filter(p => !p.isFeatured) 
        : projectsData.filter(p => p.category === activeCategory));

  const featuredProject = projectsData.find(p => p.isFeatured);

  if (selectedApp) {
    return (
      <div className="flex h-full bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-100 font-sans absolute inset-0 z-50">
        {/* App Detail View */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-[#1E1E1E]/90 backdrop-blur-md sticky top-0 z-10">
            <button 
              onClick={() => setSelectedApp(null)}
              className="flex items-center text-blue-500 hover:text-blue-600 font-medium"
            >
              <ChevronLeft className="w-6 h-6 mr-1" />
              <span className="text-lg">Back</span>
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <Share className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 sm:p-12">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-8 mb-12">
                <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${selectedApp.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                  {selectedApp.icon}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl font-bold mb-2">{selectedApp.title}</h1>
                  <h2 className="text-xl text-gray-500 dark:text-gray-400 mb-6">{selectedApp.subtitle}</h2>
                  <div className="flex flex-wrap items-center gap-3">
                    {selectedApp.deployedUrl && (
                      <a 
                        href={selectedApp.deployedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-bold transition-colors shadow-sm text-sm sm:text-base text-center flex-1 sm:flex-none"
                      >
                        {selectedApp.actionLabel || "OPEN"}
                      </a>
                    )}
                    {selectedApp.githubUrl && (
                      <a 
                        href={selectedApp.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-2 rounded-full font-bold transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {selectedApp.githubUrl2 && (
                      <a 
                        href={selectedApp.githubUrl2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-2 rounded-full font-bold transition-colors"
                      >
                        Backend Repo
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {selectedApp.screenshots && selectedApp.screenshots.length > 0 && (
                <div className="mb-12 border-t border-gray-200 dark:border-gray-800 pt-8">
                  <h3 className="text-xl font-bold mb-6">Screenshots</h3>
                  <div className="flex overflow-x-auto space-x-4 pb-4 snap-x hide-scrollbar">
                    {selectedApp.screenshots.map((src, index) => (
                      <div key={index} className="flex-none w-[280px] sm:w-[400px] h-[180px] sm:h-[250px] snap-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={src} 
                          alt={`${selectedApp.title} screenshot ${index + 1}`} 
                          className="w-full h-full object-cover rounded-2xl shadow-md border border-gray-200 dark:border-gray-800"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-12 border-t border-gray-200 dark:border-gray-800 pt-8">
                <h3 className="text-xl font-bold mb-4">About this App</h3>
                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none mb-8 text-gray-700 dark:text-gray-300 leading-relaxed prose-headings:font-bold prose-a:text-blue-500">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {selectedApp.description}
                  </ReactMarkdown>
                </div>

                {isLoadingReadme && (
                  <div className="flex items-center justify-center p-12 text-gray-500">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                )}
                
                {readmeContent && (
                  <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
                    <h3 className="text-xl font-bold mb-6">From the Developer (README)</h3>
                    <div className="prose prose-sm sm:prose-base dark:prose-invert prose-headings:font-bold prose-a:text-blue-500 max-w-none prose-img:rounded-xl overflow-x-hidden">
                      <ReactMarkdown 
                        rehypePlugins={[rehypeRaw]}
                        components={{
                          img: ({ node, src, ...props }) => {
                            let finalSrc = src;
                            if (finalSrc && !finalSrc.startsWith('http') && !finalSrc.startsWith('data:') && rawBaseUrl) {
                              finalSrc = `${rawBaseUrl}/${finalSrc.replace(/^\//, '')}`;
                            }
                            return <img {...props} src={finalSrc || ''} className="inline-block max-w-full h-auto" />;
                          }
                        }}
                      >
                        {readmeContent}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedApp.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-100 font-sans relative">
      {/* Sidebar */}
      <div className="hidden md:flex w-48 border-r border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex-col h-full z-10">
        <div className="p-4 pt-6 pb-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-black/50 border border-gray-200 dark:border-gray-700 rounded-md pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-6">
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Store</h3>
            <div className="space-y-1">
              <SidebarItem icon={Star} label="Discover" isActive={activeCategory === "Discover"} onClick={() => setActiveCategory("Discover")} />
              <SidebarItem icon={Gamepad2} label="Arcade" isActive={activeCategory === "Arcade"} onClick={() => setActiveCategory("Arcade")} />
              <SidebarItem icon={Code} label="Create" isActive={activeCategory === "Create"} onClick={() => setActiveCategory("Create")} />
              <SidebarItem icon={Wrench} label="Develop" isActive={activeCategory === "Develop"} onClick={() => setActiveCategory("Develop")} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-[70px] md:pb-0">
        <div className="p-4 sm:p-10 max-w-5xl mx-auto space-y-8 md:space-y-12">
          
          {/* Mobile Search Bar */}
          <div className="md:hidden relative mt-2">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search apps, projects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-xl pl-10 pr-3 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="border-b border-gray-200 dark:border-gray-800 pb-4 md:pb-6">
            <h1 className="text-2xl md:text-3xl font-bold">{searchQuery ? 'Search Results' : activeCategory}</h1>
          </div>

          {activeCategory === "Discover" && featuredProject && (
            <div 
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedApp(featuredProject)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${featuredProject.color} opacity-90 transition-opacity group-hover:opacity-100`} />
              <div className="relative z-10 p-8 sm:p-12 flex flex-col min-h-[350px] justify-between">
                <div>
                  <h4 className="text-white/80 font-semibold uppercase tracking-widest text-sm mb-2">Featured Developer</h4>
                  <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">{featuredProject.title}</h2>
                  <p className="text-xl text-white/90 max-w-md">{featuredProject.subtitle}</p>
                </div>
                <div className="mt-8 flex items-end justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg">
                      {featuredProject.icon}
                    </div>
                    <div>
                      <p className="text-white font-medium">Free</p>
                      <p className="text-white/70 text-sm">Offers In-App Purchases</p>
                    </div>
                  </div>
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-2 rounded-full font-bold transition-colors">
                    GET
                  </button>
                </div>
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Top Apps & Projects</h2>
              <button className="text-blue-500 hover:text-blue-600 font-medium">See All</button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="flex items-center space-x-4 group cursor-pointer border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0"
                  onClick={() => setSelectedApp(project)}
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    {project.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold truncate group-hover:text-blue-500 transition-colors">{project.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate mb-1">{project.subtitle}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{project.technologies.slice(0,2).join(', ')}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedApp(project);
                      }}
                      className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-blue-500 font-bold px-5 py-1.5 rounded-full text-sm transition-colors mb-1"
                    >
                      GET
                    </button>
                    <p className="text-[10px] text-gray-400">In-App Purchases</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 h-[64px] bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-2xl border-t border-gray-200 dark:border-gray-800 flex items-center justify-around px-2 z-40 pb-safe">
        <button onClick={() => { setActiveCategory('Discover'); setSearchQuery(""); }} className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${activeCategory === 'Discover' && !searchQuery ? 'text-blue-500' : 'text-gray-500'}`}>
          <Star className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Discover</span>
        </button>
        <button onClick={() => { setActiveCategory('Arcade'); setSearchQuery(""); }} className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${activeCategory === 'Arcade' && !searchQuery ? 'text-blue-500' : 'text-gray-500'}`}>
          <Gamepad2 className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Arcade</span>
        </button>
        <button onClick={() => { setActiveCategory('Create'); setSearchQuery(""); }} className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${activeCategory === 'Create' && !searchQuery ? 'text-blue-500' : 'text-gray-500'}`}>
          <Code className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Create</span>
        </button>
        <button onClick={() => { setActiveCategory('Develop'); setSearchQuery(""); }} className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${activeCategory === 'Develop' && !searchQuery ? 'text-blue-500' : 'text-gray-500'}`}>
          <Wrench className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Develop</span>
        </button>
      </div>

    </div>
  );
};

export default Projects;
