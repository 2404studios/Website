import React from 'react';

/**
 * Page 7 - Logo: Centered concentric circle bullseye mark.
 * Design: thick white outer ring with a gap, then solid white inner circle.
 * The gap between ring and dot shows the background color through.
 */
export default function LogoPage() {
  return (
    <div className="flex items-center justify-center h-full w-full bg-[#11002b]">
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none" className="md:w-[220px] md:h-[220px]">
        {/* Outer ring */}
        <circle cx="80" cy="80" r="65" stroke="white" strokeWidth="20" fill="none" />
        {/* Inner dot */}
        <circle cx="80" cy="80" r="25" fill="white" />
      </svg>
    </div>
  );
}
