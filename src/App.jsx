import { useState, useCallback } from 'react';
import { useNavigation } from './hooks/useNavigation';
import CardStack from './components/CardStack';
import MenuOverlay from './components/MenuOverlay';
import HamburgerButton from './components/HamburgerButton';
import HeroPage from './pages/HeroPage';
import ExperiencePage from './pages/ExperiencePage';
import AboutPage from './pages/AboutPage';
import JoinPage from './pages/JoinPage';
import SocialPage from './pages/SocialPage';
import ThankYouPage from './pages/ThankYouPage';
import LogoPage from './pages/LogoPage';

/**
 * App - Root component wiring together navigation, card stack, menu overlay,
 * and all 7 page sections.
 *
 * State flow:
 * 1. useNavigation manages pageIndex + keyboard/touch input
 * 2. CardStack renders all pages, applies transforms based on pageIndex
 * 3. MenuOverlay floats above everything (z-50), can jump to any page via goToPage
 * 4. HamburgerButton toggles menu visibility (hidden on hero page per design)
 *
 * Page mapping:
 *   0: Hero (24·04 Studios)
 *   1: Experience (video reel + heading)
 *   2: About (video reel + text)
 *   3: Join Us (signup form)
 *   4: Social (social links)
 *   5: Thank You
 *   6: Logo
 */
const TOTAL_PAGES = 7;

function App() {
  const { pageIndex, navigate, isTransitioning, goToPage } = useNavigation(TOTAL_PAGES);
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className="w-full h-full bg-[#00002b]">
      {/* Card stack fills the entire viewport */}
      <CardStack pageIndex={pageIndex}>
        <HeroPage />
        <ExperiencePage />
        <AboutPage />
        <JoinPage />
        <SocialPage />
        <ThankYouPage />
        <LogoPage />
      </CardStack>

      {/* Hamburger - visible on all pages */}
      <HamburgerButton onClick={openMenu} />

      {/* Page indicator dots */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {Array.from({ length: TOTAL_PAGES }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i)}
            className="w-2 h-2 rounded-full border-none cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center bg-transparent p-0"
            aria-label={`Go to page ${i + 1}`}
          >
            <span
              className={`block w-2 h-2 rounded-full transition-opacity duration-300 ${
                i === pageIndex ? 'bg-white opacity-100' : 'bg-white/40 opacity-60'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Menu overlay */}
      <MenuOverlay isOpen={menuOpen} onClose={closeMenu} goToPage={goToPage} />
    </div>
  );
}

export default App;
