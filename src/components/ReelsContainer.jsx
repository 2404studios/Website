import React, { useRef, useEffect, useCallback } from 'react';

/**
 * ReelsContainer - Horizontal scroll-snap container for video content.
 *
 * Design match: 4 panels flush edge-to-edge across full width,
 * each roughly 25% width on desktop, 60% on mobile.
 * Dark maroon (#5a0000) placeholder color matching the mockup.
 * Thin border between panels, flush to screen edges (no side padding).
 *
 * @param {{ videos: Array<{ src: string, poster?: string }> }} props
 */
const ReelsContainer = React.memo(function ReelsContainer({ videos = [] }) {
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            if (video.dataset.src && !video.src) {
              video.src = video.dataset.src;
            }
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      {
        root: containerRef.current,
        rootMargin: '100px',
        threshold: 0.5,
      }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [videos]);

  const setVideoRef = useCallback((el, index) => {
    videoRefs.current[index] = el;
  }, []);

  const items = videos.length > 0
    ? videos
    : Array.from({ length: 4 }, (_, i) => ({ src: '', poster: '', placeholder: true }));

  return (
    <div
      ref={containerRef}
      data-reels
      className="hide-scrollbar flex overflow-x-auto snap-x snap-mandatory w-full"
      style={{
        touchAction: 'pan-x',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="snap-start shrink-0 w-[60vw] md:w-[25vw] relative"
          style={{ aspectRatio: '4/3' }}
        >
          {item.placeholder ? (
            <div
              className="w-full h-full"
              style={{
                backgroundColor: '#5a0000',
                borderRight: i < items.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}
            />
          ) : (
            <video
              ref={(el) => setVideoRef(el, i)}
              data-src={item.src}
              poster={item.poster}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              preload="none"
            />
          )}
        </div>
      ))}
    </div>
  );
});

export default ReelsContainer;
