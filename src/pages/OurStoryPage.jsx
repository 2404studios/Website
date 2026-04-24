import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SUB_PAGES = [
  {
    title: "24TH OF APRIL",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Our story began with a simple vision: to create worlds that resonate globally while remaining rooted in our unique perspectives.",
    color: "#4a0404"
  },
  {
    title: "INDIE STUDIO",
    content: "As an independent studio, we prioritize creative freedom and experimental gameplay. We believe the best games come from small, dedicated teams who aren't afraid to take risks and challenge industry norms. Every mechanic is crafted with intention and passion.",
    color: "#042a4a"
  },
  {
    title: "WORLDS & INNOVATION",
    content: "Innovation isn't just about technology; it's about how we tell stories and build immersive environments. We're constantly pushing the boundaries of interactive media to deliver experiences that are both visually stunning and emotionally impactful.",
    color: "#2a4a04"
  },
  {
    title: "JOURNEY",
    content: "Our journey is just beginning. From Lagos to the world, we are building a legacy of excellence in game development. Join us as we continue to explore new frontiers and share our stories with players everywhere. The future of play is here.",
    color: "#4a3b04"
  }
];

export default function OurStoryPage({ isActive }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(null);
  const trackRef = useRef(null);

  const next = () => {
    setCurrentIdx((prev) => (prev + 1) % SUB_PAGES.length);
    setScrollProgress(0);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };
  
  const prev = () => {
    setCurrentIdx((prev) => (prev - 1 + SUB_PAGES.length) % SUB_PAGES.length);
    setScrollProgress(0);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const progress = scrollTop / (scrollHeight - clientHeight);
    setScrollProgress(isNaN(progress) ? 0 : progress);
  };

  const handleDrag = (event, info) => {
    if (!scrollRef.current || !trackRef.current) return;
    
    const trackHeight = trackRef.current.clientHeight;
    const dragY = info.point.y - trackRef.current.getBoundingClientRect().top;
    const progress = Math.max(0, Math.min(1, dragY / trackHeight));
    
    const { scrollHeight, clientHeight } = scrollRef.current;
    scrollRef.current.scrollTop = progress * (scrollHeight - clientHeight);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Independent Image Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % SUB_PAGES.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative w-full h-full flex flex-col items-center justify-center bg-cover bg-center overflow-hidden px-6 md:px-20"
      style={{ backgroundImage: "url('/new_stars.png')" }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Constellation Visual - Top Center */}
      <div className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 w-32 md:w-48 pointer-events-none z-0 flex justify-center">
        <motion.img 
          src="/taurus_connection.png" 
          alt="Taurus Constellation" 
          className="w-full h-auto"
          initial={{ opacity: 0.6 }}
          animate={{ 
            opacity: [0.6, 1, 0.6],
            filter: [
              "drop-shadow(0 0 10px rgba(255,255,255,0.4))",
              "drop-shadow(0 0 25px rgba(255,255,255,0.8))",
              "drop-shadow(0 0 10px rgba(255,255,255,0.4))"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Responsive Content Layout - Wrapped in motion for entrance */}
      <motion.div 
        className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 mt-4 md:mt-0"
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={isActive ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 40 }}
        transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
      >
        
        {/* Left Side: Large Image Placeholder */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${imgIdx}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-full max-w-[300px] md:max-w-full aspect-[4/3] md:aspect-[3/4] h-96 md:h-[550px] rounded-3xl border-2 border-white/10 shadow-2xl overflow-hidden relative"
              style={{ backgroundColor: SUB_PAGES[imgIdx].color }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Text & Navigation */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentIdx}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col"
            >
              <h2 className="text-white text-[16px] md:text-3xl font-press-start uppercase tracking-tighter mb-4 md:mb-6 leading-relaxed text-center md:text-left whitespace-nowrap">
                {SUB_PAGES[currentIdx].title}
              </h2>
              
              {/* Custom Scrollable Area with 'O' Knob */}
              <div className="relative flex w-full" data-no-swipe>
                <div 
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="max-h-32 md:max-h-none overflow-y-auto hide-scrollbar mb-20 md:mb-12 w-full"
                  data-no-swipe
                >
                  <p className="text-white text-base md:text-xl leading-relaxed font-bold text-center md:text-left pr-4 md:pr-0" data-no-swipe>
                    {SUB_PAGES[currentIdx].content}
                  </p>
                </div>

                {/* The 'O' Knob track - Hidden on desktop, visible on mobile */}
                <div 
                  ref={trackRef}
                  className="absolute right-0 top-0 bottom-20 md:bottom-12 w-6 flex md:hidden flex-col items-center cursor-pointer z-20"
                  data-no-swipe
                >
                  <div className="relative w-[2px] h-full bg-white/10 rounded-full" data-no-swipe>
                    <motion.div 
                      drag="y"
                      dragConstraints={trackRef}
                      dragElastic={0}
                      dragMomentum={false}
                      onDrag={handleDrag}
                      onDragStart={(e) => e.stopPropagation()}
                      onDragEnd={(e) => e.stopPropagation()}
                      className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-white/60 shadow-[0_0_8px_rgba(255,255,255,0.3)] bg-black/40 cursor-grab active:cursor-grabbing hover:border-white transition-colors"
                      style={{ top: `${scrollProgress * 100}%` }}
                      data-no-swipe
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Sub-Navigation UI - Controller Style on Mobile */}
          <div className="fixed md:relative bottom-16 md:bottom-0 left-0 w-full md:w-auto px-6 md:px-0 flex items-center justify-between md:justify-start md:gap-10 z-50">
            {/* Left Arrow */}
            <button 
              onClick={prev}
              className="group flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-active:scale-90 transition-transform">
                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Counter */}
            <div className="font-press-start text-white/80 text-[10px] md:text-sm tracking-[0.2em] md:min-w-[80px] text-center">
              {currentIdx + 1} / {SUB_PAGES.length}
            </div>

            {/* Right Arrow */}
            <button 
              onClick={next}
              className="group flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-active:scale-90 transition-transform">
                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
