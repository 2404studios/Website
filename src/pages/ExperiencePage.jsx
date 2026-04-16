import React from 'react';
import ReelsContainer from '../components/ReelsContainer';

/**
 * Page 2 - "Lots Of Experience"
 * Layout from design: heading in upper third, edge-to-edge video reel in middle,
 * "... More to Experience" italic bold text below the reel.
 * Background matches site bg color.
 */
export default function ExperiencePage() {
  return (
    <div className="flex flex-col h-full w-full bg-[#11002b]">
      {/* Top section with heading */}
      <div className="flex items-end justify-center pt-12 pb-6 md:pt-16 md:pb-8 px-4">
        <h2
          className="text-white text-base md:text-lg font-medium tracking-wide m-0"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Lots Of Experience
        </h2>
      </div>

      {/* Edge-to-edge video reel */}
      <div className="w-full">
        <ReelsContainer videos={[]} />
      </div>

      {/* More to Experience text */}
      <div className="flex-1 flex items-start justify-center pt-6 md:pt-10 px-4">
        <p
          className="text-white text-lg md:text-2xl italic font-bold m-0"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          ... More to Experience
        </p>
      </div>
    </div>
  );
}
