import React, { useEffect, useCallback, useRef } from 'react';

/**
 * MenuOverlay - Full-screen navigation overlay matching the hamburger-menu-dropdown design.
 *
 * Layout: X close top-right, large left-aligned nav links vertically centered,
 * pixel logo + social icons at bottom center.
 *
 * Closes on: Escape key, clicking backdrop, clicking a nav link.
 *
 * @param {{ isOpen: boolean, onClose: () => void, goToPage: (index: number) => void }} props
 */
const MenuOverlay = React.memo(function MenuOverlay({ isOpen, onClose, goToPage }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleBackdropClick = useCallback((e) => {
    if (contentRef.current && !contentRef.current.contains(e.target)) {
      onClose();
    }
  }, [onClose]);

  const handleNavClick = useCallback((index) => {
    goToPage(index);
    onClose();
  }, [goToPage, onClose]);

  const navLinks = [
    { label: 'HOME', pageIndex: 0 },
    { label: 'SIGN UP', pageIndex: 3 },
    { label: 'PORTFOLIO', pageIndex: 1 },
  ];

  return (
    <div
      className={`menu-transition fixed inset-0 z-50 flex flex-col ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      style={{
             background: "linear-gradient(135deg, rgb(1, 1, 139), rgba(9, 0, 49, 0.95))"
            }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Close X button - top right */}
      <div className="flex justify-end p-5 md:p-6">
        <button
          onClick={onClose}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white bg-white/2 border border-white/10 rounded-2xl text-white hover:bg-white/10 hover:scale-110 hover:shadow-lg transition duration-300 cursor-pointer"
          aria-label="Close menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Nav content */}
      <nav
        ref={contentRef}
        className="flex flex-col flex-1 justify-between px-8 md:px-16 pb-8"
      >
        {/* Links - left aligned, vertically centered */}
        <div className="flex-1 flex flex-col justify-center">
          <ul className="list-none p-0 m-0 flex flex-col gap-4 md:gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNavClick(link.pageIndex)}
                  className="min-h-[44px] text-white/70 hover:text-white transition-colors duration-300 cursor-pointer text-3xl md:text-5xl font-bold bg-transparent border-none text-left w-full p-1"
                  style={{ fontFamily: "'Archivo', sans-serif" }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer: pixel logo + social icons */}
        <div className="flex flex-col items-center gap-4">
          {/* Official SVG logo */}
          <img
            src="/logo.png"
            alt="2404 Studios"
            className="w-[120px] md:w-[160px] h-auto"
          />

          {/* Social icons */}
          <div className="mt-2 border border-white/20 rounded-2xl px-4 py-3 flex flex-wrap justify-center py-3 flex gap-6 items-center max-w-[90vw] bg-black/50 backdrop-blur-md shadow-lg">

            <a href="#" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white" aria-label="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>

            <a href="#" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white" aria-label="YouTube">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
               <path d="M23.498 6.186a2.96 2.96 0 0 0-2.084-2.093C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.414.493A2.96 2.96 0 0 0 .502 6.186 30.9 30.9 0 0 0 0 12a30.9 30.9 0 0 0 .502 5.814 2.96 2.96 0 0 0 2.084 2.093C4.5 20.4 12 20.4 12 20.4s7.5 0 9.414-.493a2.96 2.96 0 0 0 2.084-2.093A30.9 30.9 0 0 0 24 12a30.9 30.9 0 0 0-.502-5.814zM9.75 15.568V8.432L15.818 12l-6.068 3.568z"/>
                 </svg>
            </a>
            

            <a href="#" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white" aria-label="Discord">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>

            <a href="#" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white" aria-label="TikTok">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 8.5c-2.1 0-4-1.1-5.1-2.8-.9-1.3-1.2-2.7-1.2-4.2h-3.4v13.6c0 1.5-1.2 2.7-2.7 2.7S6 16.6 6 15.1s1.2-2.7 2.7-2.7c.3 0 .6 0 .9.1V9.2c-.3 0-.6-.1-.9-.1-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6v-6.1c1.4 1.2 3.2 1.9 5 1.9V8.5z"/>
              </svg>
            </a>

            <a href="#" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white" aria-label="Substack">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 3h18v3H3V3zm0 6h18v12l-9-5-9 5V9z"/>
            </svg>
            </a>

            <a href="#" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white" aria-label="X">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
});

export default MenuOverlay;
