import React, { useEffect, useState, useRef } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useStore } from "../store";
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Share, 
  Plus, 
  Sidebar as SidebarIcon,
  Search,
  BookOpen,
  Copy,
  Clock
} from 'lucide-react';

interface Post {
  slug: string;
  title: string;
  date: string;
  mdxSource: MDXRemoteSerializeResult;
}

const components = {
  MagazineHeader: ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="w-full mb-16 md:mb-24 mt-8 md:mt-16">
      <h1 className="text-5xl sm:text-7xl lg:text-[7rem] font-black tracking-tighter leading-[0.85] mb-6 uppercase text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-400 dark:from-white dark:to-gray-500 break-words">
        {title}
      </h1>
      <div className="w-24 md:w-48 h-1 bg-blue-500 mb-8"></div>
      <h2 className="text-2xl sm:text-4xl font-light italic text-gray-500 dark:text-gray-400 max-w-4xl leading-snug">
        {subtitle}
      </h2>
    </div>
  ),
  DropCap: ({ children }: { children: React.ReactNode }) => (
    <div className="text-xl md:text-2xl leading-relaxed font-serif first-letter:text-[6rem] sm:first-letter:text-[8rem] first-letter:font-black first-letter:text-gray-900 dark:first-letter:text-white first-letter:mr-6 first-letter:mt-4 first-letter:float-left first-letter:leading-[0.7] text-gray-800 dark:text-gray-200">
      {children}
    </div>
  ),
  AsymmetricGrid: ({ children, reverse = false }: { children: React.ReactNode, reverse?: boolean }) => {
    const childrenArray = React.Children.toArray(children);
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 my-16 md:my-24 items-center">
        {childrenArray[0] && (
          <div className={reverse ? 'md:col-span-5' : 'md:col-span-7'}>
            {childrenArray[0]}
          </div>
        )}
        {childrenArray[1] && (
          <div className={reverse ? 'md:col-span-7' : 'md:col-span-5'}>
            {childrenArray[1]}
          </div>
        )}
      </div>
    );
  },
  BleedImage: ({ src, alt }: { src: string, alt: string }) => (
    <div className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] my-16 md:my-24 h-[400px] md:h-[600px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
    </div>
  ),
  MagazinePullQuote: ({ text, author }: { text: string, author?: string }) => (
    <div className="my-16 md:my-24 px-4 md:px-0">
      <div className="border-l-8 border-blue-500 pl-6 md:pl-10">
        <p className="text-3xl sm:text-4xl lg:text-5xl font-serif italic font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
          &quot;{text}&quot;
        </p>
        {author && <p className="mt-6 text-xl font-medium text-gray-500 uppercase tracking-widest">{author}</p>}
      </div>
    </div>
  ),
  ImageGrid: ({ images }: { images: string | string[] }) => {
    const imgArray = typeof images === 'string' ? images.split(',') : (images || []);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 my-16">
        {imgArray.map((img: string, idx: number) => (
          <div key={idx} className={`rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-xl ${idx === 0 ? 'aspect-[4/3] md:translate-y-8' : 'aspect-square md:-translate-y-8'}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.trim()} alt={`Grid image ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        ))}
      </div>
    );
  },
};

const BlogApp = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMobile, setIsMobile] = useState(false);
  const closeApp = useStore((state) => state.closeApp);
  const contentRef = useRef<HTMLDivElement>(null);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load posts", err);
        setLoading(false);
      });
  }, []);

  const handleBack = () => {
    setActivePost(null);
  };

  const domain = "shivam.me";

  return (
    <div className="flex flex-col h-full w-full bg-[#F5F5F7] dark:bg-[#1E1E1E] overflow-hidden rounded-xl font-sans relative">
      
      {/* --- DESKTOP TOP BAR --- */}
      <div 
        data-drag-handle="true" 
        className="hidden md:flex flex-col w-full bg-white/80 dark:bg-[#2C2C2E]/80 backdrop-blur-xl border-b border-gray-200 dark:border-black/50 z-20"
      >
        <div className="flex items-center h-14 px-4 justify-between">
          {/* Traffic Lights & Nav Buttons */}
          <div className="flex items-center w-1/4">
            <div className="flex items-center space-x-2 mr-6 mt-[-2px]">
              <button onClick={() => closeApp('browser')} className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
              <button className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" />
              <button className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
            </div>
            
            <SidebarIcon size={20} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer mr-4" />
            <div className="flex items-center space-x-4">
              <ChevronLeft 
                size={22} 
                className={`cursor-pointer transition-colors ${activePost ? 'text-gray-700 dark:text-gray-200' : 'text-gray-300 dark:text-gray-600'}`} 
                onClick={handleBack}
              />
              <ChevronRight size={22} className="text-gray-300 dark:text-gray-600" />
            </div>
          </div>

          {/* URL Bar */}
          <div className="flex-1 max-w-2xl flex items-center justify-center">
            <div className="w-full bg-gray-100 dark:bg-[#1C1C1E] rounded-md h-8 flex items-center px-3 shadow-inner border border-gray-200/50 dark:border-black/50">
              <span className="text-gray-400 mr-2"><Search size={14} /></span>
              <div className="flex-1 flex items-center justify-center space-x-1">
                {activePost && <span className="text-xs text-gray-400 font-medium"><BookOpen size={12} className="inline mr-1" /> Reader</span>}
                <span className="text-sm text-gray-800 dark:text-gray-200 font-medium truncate">
                  {activePost ? activePost.title : domain}
                </span>
              </div>
              <span className="text-gray-400 ml-2"><RotateCw size={14} /></span>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center justify-end space-x-4 w-1/4 text-gray-500">
            <Share size={18} className="hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer" />
            <Plus size={20} className="hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer" />
            <Copy size={18} className="hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer" />
          </div>
        </div>
        
        {/* Bookmarks Bar */}
        <div className="h-8 flex items-center px-4 space-x-6 text-[12px] font-medium text-gray-600 dark:text-gray-400">
          <span className="hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer">Shivam Raj</span>
          <span className="hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer">Apple</span>
          <span className="hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer">iCloud</span>
          <span className="hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer">Google</span>
          <span className="hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer">Twitter</span>
          <span className="hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer">GitHub</span>
        </div>
      </div>

      {/* --- MOBILE TOP AREA (Traffic lights only for drag handle) --- */}
      <div 
        data-drag-handle="true"
        className="md:hidden absolute top-0 left-0 right-0 h-14 z-20 flex items-center px-4"
      >
        <div className="flex items-center space-x-2 mt-[-4px]">
          <button onClick={() => closeApp('browser')} className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
          <button className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" />
          <button className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
        </div>
      </div>


      {/* --- MAIN CONTENT AREA --- */}
      <div 
        ref={contentRef}
        className={`flex-1 overflow-y-auto overflow-x-hidden no-scrollbar relative z-10 transition-all pb-32 md:pb-0 ${!activePost && 'bg-gradient-to-b from-[#F5F5F7] to-white dark:from-[#1E1E1E] dark:to-[#121212]'}`}
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <RotateCw className="animate-spin text-gray-400" size={24} />
          </div>
        ) : !activePost ? (
          /* START PAGE (Home) */
          <div className="max-w-4xl mx-auto px-6 pt-16 md:pt-12 animate-in fade-in duration-500">
            
            {/* Start Page Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Favorites</h1>
            </div>

            {/* Grid of Posts */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-x-4 gap-y-8">
              {posts.map((post) => (
                <div 
                  key={post.slug} 
                  onClick={() => setActivePost(post)}
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white dark:bg-[#2C2C2E] shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-200 border border-gray-200/50 dark:border-white/5">
                    <BookOpen size={28} className="text-blue-500" />
                  </div>
                  <span className="text-[11px] md:text-xs text-gray-600 dark:text-gray-300 font-medium text-center line-clamp-2 leading-tight">
                    {post.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-16 border-t border-gray-200 dark:border-white/10 pt-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight mb-6 flex items-center gap-2">
                <Clock size={20} className="text-red-500" /> Reading List
              </h2>
              <div className="bg-white dark:bg-[#2C2C2E] rounded-xl shadow-sm overflow-hidden border border-gray-200/50 dark:border-white/5">
                {posts.slice(0, 3).map((post, i) => (
                  <div 
                    key={`rl-${post.slug}`} 
                    onClick={() => setActivePost(post)}
                    className={`p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${i !== 2 ? 'border-b border-gray-100 dark:border-white/5' : ''}`}
                  >
                    <div className="w-12 h-12 bg-gray-100 dark:bg-black/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen size={20} className="text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base line-clamp-1">{post.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{domain} • {post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* READER VIEW (Article) */
          <div className="bg-[#FAF9F6] dark:bg-[#111111] min-h-full">
            <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-24 animate-in slide-in-from-right-8 duration-500">
              {/* Reader Content (Full bleed supported) */}
              <div className="prose prose-lg sm:prose-xl dark:prose-invert max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                prose-a:text-blue-500 hover:prose-a:text-blue-600 prose-img:rounded-2xl prose-img:shadow-2xl
                prose-strong:text-gray-900 dark:prose-strong:text-white"
              >
                <MDXRemote {...activePost.mdxSource} components={components} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- MOBILE BOTTOM TAB BAR (iOS Safari Style) --- */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
        
        {/* Floating URL Bar */}
        <div className="px-4 pb-2 pointer-events-auto">
          <div className="bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-200/50 dark:border-white/10 rounded-2xl flex items-center px-4 h-12 transition-all">
            <span className="text-gray-400 mr-2"><span className="text-[15px]">AA</span></span>
            <div className="flex-1 flex justify-center items-center gap-1">
              {activePost && <BookOpen size={12} className="text-gray-500" />}
              <span className="text-[15px] text-gray-900 dark:text-white font-semibold truncate max-w-[180px]">
                {activePost ? activePost.title : domain}
              </span>
            </div>
            <span className="text-gray-400 ml-2"><RotateCw size={16} /></span>
          </div>
        </div>

        {/* Bottom Navigation Icons */}
        <div className="h-[48px] bg-white/95 dark:bg-[#1C1C1E]/95 backdrop-blur-3xl border-t border-gray-200/50 dark:border-white/10 flex items-center justify-between px-6 pb-safe pointer-events-auto">
          <button 
            onClick={handleBack}
            disabled={!activePost}
            className={`transition-colors ${!activePost ? 'text-gray-300 dark:text-gray-700' : 'text-blue-500'}`}
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>
          <button className="text-gray-300 dark:text-gray-700 pointer-events-none">
            <ChevronRight size={28} strokeWidth={2.5} />
          </button>
          <button className="text-blue-500">
            <Share size={24} strokeWidth={2} />
          </button>
          <button className="text-blue-500">
            <BookOpen size={24} strokeWidth={2} />
          </button>
          <button className="text-blue-500 relative flex items-center justify-center">
            <Copy size={22} strokeWidth={2} className="absolute" />
          </button>
        </div>

      </div>

    </div>
  );
};

export default BlogApp;
