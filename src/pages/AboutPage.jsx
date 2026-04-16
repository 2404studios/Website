import React from 'react';
import ReelsContainer from '../components/ReelsContainer';

/**
 * Page 3 - About: Video reel flush to top, mission statement centered below.
 * Design: reel sits high (near top), text is centered in remaining space.
 */
export default function AboutPage() {
  return (
    <div className="flex flex-col h-full w-full bg-[#11002b]">
      {/* Reel at top */}
      <div className="w-full pt-8 md:pt-12">
        <ReelsContainer videos={[]} />
      </div>

      {/* Mission statement centered in remaining space */}
      <div className="flex-1 flex items-start justify-center pt-6 md:pt-8 px-6 md:px-12">
        <p
          className="text-white text-lg md:text-xl text-center leading-relaxed max-w-xl m-0"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          We are group of friends who Love video games
          <br />
          we believe that because of the games we make
          <br />
          the world can become a better place.
        </p>
      </div>
    </div>
  );
}
