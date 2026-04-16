import React, { useRef, useEffect } from 'react';

/**
 * CardStack - Renders children as a stack of full-viewport cards with CSS transform animations.
 *
 * Animation model (stacking from bottom):
 * - Going DOWN (page 0→1): new card slides up from translateY(100%) to translateY(0),
 *   covering the current card. Old card stays in place (no transform change needed
 *   since new card covers it).
 * - Going UP (page 1→0): current card slides down from translateY(0) to translateY(100%),
 *   revealing the previous card underneath which was scaled down slightly.
 *
 * Z-index: Higher-index pages always stack on top of lower-index pages.
 * This means page 1 naturally covers page 0 when it slides in.
 *
 * @param {{ children: React.ReactNode[], pageIndex: number }} props
 */
const CardStack = React.memo(function CardStack({ children, pageIndex }) {
  const cards = React.Children.toArray(children);
  const totalCards = cards.length;
  const prevPageRef = useRef(pageIndex);

  useEffect(() => {
    prevPageRef.current = pageIndex;
  }, [pageIndex]);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ touchAction: 'none' }}
    >
      {cards.map((child, i) => {
        const isActive = i === pageIndex;
        const isBehind = i < pageIndex;  // pages already passed (below in stack)
        const isAhead = i > pageIndex;   // pages not yet visited

        let transform;
        let opacity;

        if (isActive) {
          // Current page: fully visible, no transform
          transform = 'translateY(0%) scale(1)';
          opacity = 1;
        } else if (isBehind) {
          // Pages behind active: scaled down slightly, visible underneath
          // When user navigates UP, the active card slides away revealing these
          transform = 'translateY(0%) scale(0.92)';
          opacity = 0.4;
        } else {
          // Pages ahead: parked below viewport, ready to slide up
          transform = 'translateY(100%) scale(1)';
          opacity = 1;
        }

        // Z-index: each card stacks on top of the previous.
        // Higher page index = higher z-index, so page 1 covers page 0, etc.
        const zIndex = i;

        return (
          <div
            key={i}
            className="card-transition absolute inset-0 w-full h-full"
            style={{
              transform,
              opacity,
              zIndex,
              pointerEvents: isActive ? 'auto' : 'none',
            }}
            aria-hidden={!isActive}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
});

export default CardStack;
