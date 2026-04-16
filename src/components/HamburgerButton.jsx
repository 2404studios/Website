import React from 'react';

/**
 * HamburgerButton - Fixed-position menu toggle button.
 * Minimum 44px touch target for mobile accessibility.
 *
 * @param {{ onClick: () => void }} props
 */
const HamburgerButton = React.memo(function HamburgerButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 right-4 z-40 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-[6px] bg-transparent border-none cursor-pointer p-2"
      aria-label="Open menu"
    >
      <span className="block w-6 h-[2px] bg-white" />
      <span className="block w-6 h-[2px] bg-white" />
    </button>
  );
});

export default HamburgerButton;
