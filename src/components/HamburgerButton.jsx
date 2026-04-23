import React from "react";
import { motion } from "framer-motion";

const HamburgerButton = React.memo(function HamburgerButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className="
        fixed top-4 right-4 z-40
        w-12 h-12
        flex flex-col items-center justify-center gap-[5px]
        rounded-xl
        backdrop-blur-md
        border bg-white/2 border border-white/10 rounded-2xl text-white hover:bg-white/8 hover:scale-110 hover:shadow-lg transition duration-300
        shadow-[0_0_20px_rgba(0,0,0,0.4)]
        cursor-pointer
       " aria-label="Open menu"
    >
      {/* Line 1 */}
      <span className="block w-6 h-[2px] bg-white/80 rounded-full" />

      {/* Line 2 */}
      <span className="block w-6 h-[2px] bg-white/80 rounded-full" />
    </motion.button>
  );
});

export default HamburgerButton;