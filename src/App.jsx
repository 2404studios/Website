import { useState, useCallback } from 'react';
import { useNavigation } from './hooks/useNavigation';
import CardStack from './components/CardStack';
import MenuOverlay from './components/MenuOverlay';
import HamburgerButton from './components/HamburgerButton';
import HeroPage from './pages/HeroPage';
import OurStoryPage from './pages/OurStoryPage';
import ExperiencePage from './pages/ExperiencePage';
import AboutPage from './pages/AboutPage';
import JoinPage from './pages/JoinPage';
import SocialPage from './pages/SocialPage';
import ThankYouPage from './pages/ThankYouPage';
import StarBackground from './components/StarBackground';
import { useSFX } from './hooks/useSFX';

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
 *   1: Our Story (Constellation + Sub-pages)
 *   2: Experience (video reel + heading)
 *   3: About (Team Showcase)
 *   4: Join Us (signup form)
 *   5: Social (social links)
 *   6: Thank You
 */
const TOTAL_PAGES = 7;

function App() {
  const { pageIndex, navigate, isTransitioning, goToPage: _goToPage } = useNavigation(TOTAL_PAGES);
  const { playNav } = useSFX();
  const [menuOpen, setMenuOpen] = useState(false);

  const goToPage = (idx) => {
    if (idx !== pageIndex) playNav();
    _goToPage(idx);
  };

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className="w-full h-full bg-[#00002b]">
      <StarBackground pageIndex={pageIndex} />
      {/* Card stack fills the entire viewport */}
      <CardStack pageIndex={pageIndex}>
        <HeroPage isActive={pageIndex === 0} />
        <OurStoryPage isActive={pageIndex === 1} />
        <ExperiencePage isActive={pageIndex === 2} />
        <AboutPage isActive={pageIndex === 3} />
        <JoinPage isActive={pageIndex === 4} />
        <SocialPage isActive={pageIndex === 5} />
        <ThankYouPage isActive={pageIndex === 6} />
      </CardStack>

      {/* Hamburger - visible on all pages */}
      <HamburgerButton onClick={openMenu} />

      {/* Page indicator dots */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 md:gap-2">
        {Array.from({ length: TOTAL_PAGES }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i)}
            className="group relative flex items-center justify-center min-w-[32px] min-h-[32px] md:min-w-[44px] md:min-h-[44px] bg-transparent p-0 border-none cursor-pointer"
            aria-label={`Go to page ${i + 1}`}
          >
            <span
              className={`transition-all duration-500 ease-out font-bold ${
                i === pageIndex 
                  ? 'text-white scale-125 opacity-100 text-xl md:text-2xl' 
                  : 'text-white/20 scale-100 opacity-40 text-sm md:text-base hover:text-white/60'
              }`}
              style={{ textShadow: i === pageIndex ? '0 0 10px rgba(255,255,255,0.5)' : 'none' }}
            >
              {i === pageIndex ? '☉' : '•'}
            </span>
          </button>
        ))}
      </div>

      {/* Menu overlay */}
      <MenuOverlay isOpen={menuOpen} onClose={closeMenu} goToPage={goToPage} />
    </div>
  );
}

export default App;
