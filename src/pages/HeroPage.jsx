import React from 'react';

/**
 * Page 1 - Hero: Official 2404 Studios SVG logo centered with tagline below.
 * Logo is loaded from /logo.svg and sized to dominate the viewport center.
 */
export default function HeroPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-4 bg-[#11002b]">
      {/* Official SVG logo */}
      <img
        src="/logo.svg"
        alt="2404 Studios"
        className="w-[200px] md:w-[300px] lg:w-[360px] h-auto"
      />

      {/* Tagline */}
      <div className="flex flex-col items-center mt-4 md:mt-6">
        <p
          className="text-white/50 text-lg md:text-xl text-center leading-relaxed max-w-lg"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span className="inline-block mr-2 text-xs align-middle opacity-60">&#9702;</span>
          We are here to have irresistible fun and the intention
          <br />
          is to carry the whole world along
        </p>
      </div>
    </div>
  );
}
