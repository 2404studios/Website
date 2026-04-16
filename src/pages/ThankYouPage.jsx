import React from 'react';

/**
 * Page 6 - Thank You: "THANKYOU" (no space) in ultra-bold condensed white text.
 * Design shows it as a single word with tight tracking, very heavy weight.
 */
export default function ThankYouPage() {
  return (
    <div className="flex items-center justify-center h-full w-full bg-[#11002b]">
      <h1
        className="text-white text-5xl md:text-8xl font-black tracking-tight m-0"
        style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
      >
        THANKYOU
      </h1>
    </div>
  );
}
