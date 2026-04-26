import { motion } from 'framer-motion';
import ReelsContainer from '../components/ReelsContainer';

export default function ExperiencePage({ isActive }) {
  // Sample testing array with actual .mp4 links - used only one mp4 link in the public folder
  const videoList = [
    {
      src: '/vid/Driver_compressed.mp4',
      poster: '/vid/driver_cover.png'
    },
    {
      src: '/vid/favourAnimation_compressed.mp4',
      poster: '/vid/favourAnimation.png'
    },
    {
      src: '/vid/KNC_compressed.mp4',
      poster: '/vid/KingdomsAndCards.png'
    },
    {
      src: '/vid/LocusGodot_compressed.mp4',
      poster: '/vid/LocusGodot.png'
    },
    {
      src: '/vid/LocusUnreal_compressed.mp4',
      poster: '/vid/LocusUnreal.png'
    },
    {
      src: '/vid/Mosun_compressed.mp4',
      poster: '/vid/MosunCover.png'
    },
    {
      src: '/vid/Nature_compressed.mp4',
      poster: '/vid/NatureCover.png'
    },
    {
      src: '/vid/PitRush_compressed.mp4',
      poster: '/vid/PitRush.png'
    },
    {
      src: '/vid/StillWalking_compressed.mp4',
      poster: '/vid/StillWalkingCover.png'
    },
    {
      src: '/vid/Swordsman_compressed.mp4',
      poster: '/vid/SwordsMan.png'
    }
  ];

  return (
    <div className="relative flex flex-col min-h-screen w-full items-center justify-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/backgroundlt.png')" }}
      />

      {/* Content */}
      <motion.div
        className="relative flex flex-col h-full w-full"
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={isActive ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 40 }}
        transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Heading */}
        <div className="flex items-end justify-center pt-12 pb-6 md:pt-16 md:pb-8 px-4">
          <h2 className="text-white text-base md:text-2xl font-medium tracking-wide m-0">
            Lots Of Experience
          </h2>
        </div>

        {/* Reel */}
        <div className="w-full">
          <ReelsContainer videos={videoList} isActive={isActive} />
        </div>

        {/* Bottom text */}
        <div className="flex-1 flex items-start justify-center pt-6 md:pt-10 px-4">
          <p className="text-white text-lg md:text-3xl italic font-bold m-0">
            ... More to Experience
          </p>
        </div>
      </motion.div>
    </div>
  );
}