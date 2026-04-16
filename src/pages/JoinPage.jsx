import React, { useState, useCallback } from 'react';

/**
 * Page 4 - Join Us: Large italic heading, italic subtitle,
 * benefits list and email form inside a subtle bordered container.
 * Design: all content centered, form area has a visible border/box.
 */
export default function JoinPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('Signup:', email);
  }, [email]);

  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full px-6 bg-[#11002b]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Heading */}
      <h2 className="text-white text-4xl md:text-6xl font-bold italic m-0 mb-3">
        JOIN US
      </h2>

      {/* Subtitle */}
      <p className="text-white/80 text-sm md:text-base italic mb-8 text-center">
        We'd love to have you on this adventure of a life time
      </p>

      {/* Bordered container with benefits + form */}
      <div className="w-full max-w-md border border-white/20 px-6 py-6 md:px-8 md:py-8">
        {/* Benefits */}
        <ul className="text-white text-left text-xs md:text-sm list-none p-0 m-0 space-y-2 mb-6">
          <li className="font-bold">+ Free In-game Credits</li>
          <li className="font-bold">+ First year purchase bonuses on our video games</li>
          <li className="font-bold">+ Exclusive game testing</li>
        </ul>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="youremail@mail.com"
            required
            className="w-full px-4 py-3 bg-transparent border-b border-white/30 text-white text-xs italic min-h-[44px] outline-none"
            style={{ fontFamily: "'Inter', sans-serif" }}
            aria-label="Email address"
          />
          <button
            type="submit"
            className="w-full py-3 bg-transparent text-white font-bold text-sm min-h-[44px] border border-white cursor-pointer mt-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
