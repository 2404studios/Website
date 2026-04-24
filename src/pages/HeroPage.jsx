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
        className="w-[320px] md:w-[500px] lg:w-[650px] h-auto cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.05,
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



          <p className="text-white text-lg md:text-xl font-bold text-center leading-relaxed max-w-2xl">
            We are having irresistible fun <br className="md:hidden" /> and we are here <br /> To take the world with us...
          </p>



        </div>
      </motion.div>
    </div>
  );
}