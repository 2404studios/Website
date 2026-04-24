import React from 'react';


/**
 * Page 5 - Social: "Don't Miss Out" large bold heading, subtitle with handle,
 * three large social icons (Discord, Instagram, X) centered.
 * Design: heading uses heavy weight, icons are large with generous spacing.
 */
export default function SocialPage() {
  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full px-4 bg-[#11002b]"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >


      <h2 className="text-white text-3xl md:text-5xl font-bold m-0 mb-6 md:mb-17">
        Don't Miss Out
      </h2>

      <p className="text-white italic md:text-base mb-10 md:mb-14 font-bold">
        We are Everywhere @2404studios
      </p>

      <div className="flex flex-wrap gap-5 md:gap-16 justify-center items-center">

        {/* Instagram */}
        <a href="#" className="flex items-center justify-center w-14 h-14 bg-white/2 border border-white/10 rounded-2xl text-white hover:bg-white/10 hover:scale-110 hover:shadow-lg transition duration-300" aria-label="Instagram">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        </a>

        {/* Youtube */}
        <a
          href="#"
          className="min-w-[30px] min-h-[30px] flex items-center justify-center w-14 h-14 bg-white/2 border border-white/10 rounded-2xl text-white hover:bg-white/10 hover:scale-110 hover:shadow-lg transition duration-300"
          aria-label="YouTube"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a2.96 2.96 0 0 0-2.084-2.093C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.414.493A2.96 2.96 0 0 0 .502 6.186 30.9 30.9 0 0 0 0 12a30.9 30.9 0 0 0 .502 5.814 2.96 2.96 0 0 0 2.084 2.093C4.5 20.4 12 20.4 12 20.4s7.5 0 9.414-.493a2.96 2.96 0 0 0 2.084-2.093A30.9 30.9 0 0 0 24 12a30.9 30.9 0 0 0-.502-5.814zM9.75 15.568V8.432L15.818 12l-6.068 3.568z" />
          </svg>
        </a>

        {/* Discord */}
        <a href="#" className="min-w-[30px] min-h-[30px] flex items-center justify-center w-14 h-14 bg-white/2 border border-white/10 rounded-2xl text-white hover:bg-white/10 hover:scale-110 hover:shadow-lg transition duration-300" aria-label="Discord">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
        </a>


        {/* Tiktok*/}
        <a
          href="#"
          className="min-w-[44px] min-h-[44px] flex items-center justify-center w-14 h-14 bg-white/2 border border-white/10 rounded-2xl text-white hover:bg-white/10 hover:scale-110 hover:shadow-lg transition duration-300"
          aria-label="TikTok"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 8.5c-2.1 0-4-1.1-5.1-2.8-.9-1.3-1.2-2.7-1.2-4.2h-3.4v13.6c0 1.5-1.2 2.7-2.7 2.7S6 16.6 6 15.1s1.2-2.7 2.7-2.7c.3 0 .6 0 .9.1V9.2c-.3 0-.6-.1-.9-.1-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6v-6.1c1.4 1.2 3.2 1.9 5 1.9V8.5z" />
          </svg>
        </a>


        {/* Substack */}
        <a
          href="#"
          className="min-w-[44px] min-h-[44px] flex items-center justify-center w-14 h-14 bg-white/2 border border-white/10 rounded-2xl text-white hover:bg-white/10 hover:scale-110 hover:shadow-lg transition duration-300"
          aria-label="Substack"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3h18v3H3V3zm0 6h18v12l-9-5-9 5V9z" />
          </svg>
        </a>


        {/* X / Twitter */}
        <a href="#" className="flex items-center justify-center w-14 h-14 bg-white/2 border border-white/10 rounded-2xl text-white hover:bg-white/10 hover:scale-110 hover:shadow-lg transition duration-300" aria-label="X">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </div>



      <div
        className="flex items-center gap-6 px-7 py-4 bg-white/5 border border-white/10 rounded-2xl mt-10 md:mt-29 max-w-md"
      >
        <div className="flex-shrink-0">
          <img src="/warning.svg" alt="icon" className="w-6 h-6" />
        </div>
        <p className="text-white text-[10px] md:text-xs leading-tight text-center">
          Get your PVC and vote for good governance <br />
          so you can afford our games
        </p>
      </div>
    </div>
  );
}
