import { motion } from "framer-motion";

export default function HeroPage() {
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
        className="w-[220px] md:w-[320px] lg:w-[380px] h-auto cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.05,
          filter: "drop-shadow(0px 0px 20px rgba(168, 85, 247, 0.7))",
        }}
        transition={{
          duration: 0.8,
          ease: [0.20, 1, 0.3, 1],
          scale: { duration: 0.3 },
        }}
      />

      <motion.div
        className="flex flex-col items-center mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0.20, 1, 0.3, 1],
        }}
      >
        <div className="flex items-start justify-center gap-6">
          
          {/* Left circle */}
          <div className="relative w-3 h-3 flex items-center justify-center mt-[12px]">
            <div className="absolute w-4 h-4 rounded-full border border-white/40"></div>
            <div className="w-1 h-1 rounded-full bg-white/70"></div>
          </div>

          <p className="text-white text-lg md:text-xl text-center leading-relaxed max-w-lg">
            We are here to have irresistible fun and the intention
            <br />
            is to carry the whole world along
          </p>

          {/* Right circle */}
          <div className="relative w-3 h-3 flex items-center justify-center mt-[12px]">
            <div className="absolute w-4 h-4 rounded-full border border-white/40"></div>
            <div className="w-1 h-1 rounded-full bg-white/70"></div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}