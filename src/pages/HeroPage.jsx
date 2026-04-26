import { motion } from "framer-motion";
import { useVideoPreload } from '../hooks/useVideoPreload';

const EXPERIENCE_VIDEOS = [
  '/vid/Driver_compressed.mp4',
  '/vid/favourAnimation_compressed.mp4',
  '/vid/KNC_compressed.mp4',
  '/vid/LocusGodot_compressed.mp4',
  '/vid/LocusUnreal_compressed.mp4',
  '/vid/Mosun_compressed.mp4',
  '/vid/Nature_compressed.mp4',
  '/vid/PitRush_compressed.mp4',
  '/vid/StillWalking_compressed.mp4',
  '/vid/Swordsman_compressed.mp4'
];

export default function HeroPage({ isActive }) {
  // Start preloading experience page videos immediately
  useVideoPreload(EXPERIENCE_VIDEOS, 0);

  const headline1 = "BIG DREAMS.";
  const headline2 = "BOLD GAMES.";
  const body = "We are having irresistible fun and we are here to take the world with us. Africa’s greatest studio in the making...";

  const popVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: (delay) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.6,
        type: "spring",
        stiffness: 120,
        damping: 10
      }
    })
  };

  const charVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // The bounce happens to the whole container after typing is done
  const bounceVariants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -8, 0],
      transition: {
        delay: 5.5, // Start after typewriter finishes
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full px-4 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundColor: "#11002b",
      }}
    >
      <motion.img
        src="/logo.png"
        alt="2404 Studios"
        className="w-[320px] md:w-[500px] lg:w-[650px] h-auto cursor-pointer z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        whileHover={{ scale: 1.05 }}
        transition={{
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      />

      <motion.div
        className="flex flex-col items-center mt-10 z-10 w-full max-w-[320px] md:max-w-[500px] lg:max-w-[650px]"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        {/* Symmetrical Split Headlines - Balanced padding */}
        <div className="mb-10 w-full flex justify-between items-start px-8 md:px-10 uppercase font-black italic tracking-tighter">
          {/* Left Side */}
          <motion.div
            custom={0.8}
            variants={popVariants}
            className="flex flex-col items-start leading-none"
          >
            <span className="text-xl md:text-4xl text-white/40">BIG</span>
            <span className="text-2xl md:text-6xl text-white">DREAMS.</span>
          </motion.div>

          {/* Right Side */}
          <motion.div
            custom={1.3}
            variants={popVariants}
            className="flex flex-col items-end leading-none text-right"
          >
            <span className="text-xl md:text-4xl text-white/40">BOLD</span>
            <span className="text-2xl md:text-6xl text-white">GAMES.</span>
          </motion.div>
        </div>

        {/* Body Text: Typewriter + Bounce */}
        <motion.div
          variants={bounceVariants}
          className="w-full text-center"
        >
          <p className="text-white text-sm md:text-lg font-bold leading-relaxed tracking-wide px-2">
            {body.split("").map((char, index) => (
              <motion.span
                key={`b-${index}`}
                variants={charVariants}
                transition={{
                  duration: 0.05,
                  delay: 2.0 + index * 0.03, // Starts after headlines
                }}
              >
                {char}
              </motion.span>
            ))}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}