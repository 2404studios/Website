import React, { useEffect, useCallback, useRef } from 'react';

/**
 * MenuOverlay - Full-screen navigation overlay matching the hamburger-menu-dropdown design.
 *
 * Layout: X close top-right, large left-aligned nav links vertically centered,
 * pixel logo at bottom center.
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
    { label: 'SIGN UP', pageIndex: 4 },
    { label: 'HOME', pageIndex: 0 },
    { label: 'STORY', pageIndex: 1 },
    { label: 'TEAM', pageIndex: 3 },
    { label: 'SOCIALS', pageIndex: 5 },

  ];

  return (
    <div
      className={`menu-transition fixed inset-0 z-50 flex flex-col ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
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

        {/* Footer: pixel logo only */}
        <div className="flex flex-col items-center gap-4">
          <img
            src="/logo.png"
            alt="2404 Studios"
            className="w-[120px] md:w-[160px] h-auto"
          />
        </div>
      </nav>
    </div>
  );
});

export default MenuOverlay;
