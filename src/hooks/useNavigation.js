import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * useNavigation - Handles page navigation via keyboard (WASD/Arrow keys) and touch swipe.
 *
 * State flow:
 * 1. User triggers navigation (key press or swipe)
 * 2. isTransitioningRef prevents race conditions — checked synchronously via ref
 * 3. pageIndex updates, triggering CardStack re-render with new transforms
 * 4. After transitionDuration, ref clears to allow next navigation
 *
 * @param {number} totalPages - Total number of pages/cards
 * @param {number} [transitionDuration=600] - Duration of card transition in ms
 * @returns {{ pageIndex: number, navigate: (dir: 'up'|'down') => void, isTransitioning: boolean, goToPage: (index: number) => void }}
 */
export function useNavigation(totalPages, transitionDuration = 600) {
  const [pageIndex, setPageIndex] = useState(0);
  const isTransitioningRef = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const transitionTimer = useRef(null);

  /** Lock transitions for the animation duration */
  const lockTransition = useCallback(() => {
    isTransitioningRef.current = true;
    setIsTransitioning(true);
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => {
      isTransitioningRef.current = false;
      setIsTransitioning(false);
    }, transitionDuration);
  }, [transitionDuration]);

  /**
   * Navigate one page up or down.
   * Uses ref guard (not state) so the check is synchronous and race-free.
   */
  const navigate = useCallback((direction) => {
    if (isTransitioningRef.current) return;

    setPageIndex((prev) => {
      let next = prev;
      if (direction === 'down' && prev < totalPages - 1) next = prev + 1;
      if (direction === 'up' && prev > 0) next = prev - 1;
      if (next === prev) return prev; // no change, don't lock
      return next;
    });

    lockTransition();
  }, [totalPages, lockTransition]);

  /**
   * Jump directly to a specific page index (used by menu links and dot nav).
   */
  const goToPage = useCallback((index) => {
    if (isTransitioningRef.current) return;
    if (index < 0 || index >= totalPages) return;

    setPageIndex(index);
    lockTransition();
  }, [totalPages, lockTransition]);

  // Keyboard: ArrowUp/W = up, ArrowDown/S = down
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          navigate('down');
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          navigate('up');
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Touch/swipe handler
  useEffect(() => {
    const SWIPE_THRESHOLD = 50;

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      const deltaX = Math.abs(touchStartX.current - e.changedTouches[0].clientX);

      if (Math.abs(deltaY) > SWIPE_THRESHOLD && Math.abs(deltaY) > deltaX) {
        navigate(deltaY > 0 ? 'down' : 'up');
      }
    };

    const handleTouchMove = (e) => {
      if (e.target.closest('[data-reels]')) return;
      e.preventDefault();
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [navigate]);

  useEffect(() => {
    return () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  return { pageIndex, navigate, isTransitioning, goToPage };
}
