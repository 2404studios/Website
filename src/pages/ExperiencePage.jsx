import React from 'react';
import ReelsContainer from '../components/ReelsContainer';

/**
 * Page 2 - "Lots Of Experience"
 * Layout from design: heading in upper third, edge-to-edge video reel in middle,
 * "... More to Experience" italic bold text below the reel.
 * Background matches site bg color.
 */
export default function ExperiencePage() {
  // Sample testing array with actual .mp4 links - used only one mp4 link in the public folder
const videoList = [
  { 
    src: '/vid/Driver.mp4', 
    poster: '' 
  },
  { 
    src: '/vid/favourAnimation.mp4', 
    poster: '' 
  },
  { 
    src: '/vid/KNC.mp4',
    poster: '' 
  },
  { 
    src: '/vid/LocusGodot.mp4', 
    poster: '' 
  },

   { 
    src: '/vid/LocusUnreal.mp4', 
    poster: '' 
  },
   { 
    src: '/vid/Mosun.mp4', 
    poster: '' 
  },
   { 
    src: '/vid/Nature.mp4', 
    poster: '' 
  },
   { 
    src: '/vid/PitRush.mp4', 
    poster: '' 
  },
   { 
    src: '/vid/StillWalking.mp4', 
    poster: '' 
  },
   { 
    src: '/vid/Swordsman.mp4', 
    poster: '' 
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
      <div className="relative flex flex-col h-full w-full">
        {/* Heading */}
        <div className="flex items-end justify-center pt-12 pb-6 md:pt-16 md:pb-8 px-4">
          <h2 className="text-white text-base md:text-2xl font-medium tracking-wide m-0">
            Lots Of Experience
          </h2>
        </div>

        {/* Reel */}
        <div className="w-full">
          <ReelsContainer videos={videoList} />
        </div>

        {/* Bottom text */}
        <div className="flex-1 flex items-start justify-center pt-6 md:pt-10 px-4">
          <p className="text-white text-lg md:text-3xl italic font-bold m-0">
            ... More to Experience
          </p>
        </div>
      </div>
    </div>
  );
}