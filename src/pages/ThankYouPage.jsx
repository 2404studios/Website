import React from 'react';
import { motion } from 'framer-motion';

/**
 * Page 6 - Thank You: Arced "THANK YOU" text rotating around a sun symbol.
 * This implementation uses SVG <textPath> for the arced text and Framer Motion for the rotation.
 */
export default function ThankYouPage() {
  const text = "THANK YOU ☉ THANK YOU ☉ THANK YOU ☉ ";
  
  return (
    <div className="relative flex items-center justify-center h-full w-full bg-[#00002b] overflow-hidden">
      {/* Background with stars */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none"
        style={{ backgroundImage: "url('/new_stars.png')" }}
      />

      {/* Central Visual Container */}
      <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">
        
        {/* Arced Text Layer */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <path
                id="textPath"
                d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
              />
            </defs>
            <text fill="white" style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 'bold', letterSpacing: '6.2px', textTransform: 'uppercase', opacity: 0.8 }}>
              <textPath xlinkHref="#textPath">
                {text}
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Central Sun Symbol */}
        <div className="relative flex items-center justify-center">
          {/* Outer Ring */}
          <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border-4 md:border-8 border-white opacity-90 shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
          
          {/* Inner Circle */}
          <div className="absolute w-12 h-12 md:w-20 md:h-20 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
        </div>

      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-6 text-white/30 font-medium tracking-widest text-[10px] md:text-[11px] leading-relaxed uppercase pointer-events-none">
        <p>OPEN PORTAL LANDING [ HEX ]</p>
        <p>COPYRIGHT 2026, 2404STUDIOS</p>
        <p>ALL RIGHTS INTRICATELY RESERVED.</p>
      </div>
    </div>
  );
}
