import React, { useRef, useEffect, useCallback, useMemo } from 'react';

const ReelsContainer = React.memo(function ReelsContainer({ videos = [] }) {
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const animationRef = useRef(null);
  const isPausedRef = useRef(false);

  // 🔥 Duplicate items for seamless looping
  const items = useMemo(() => {
    const base =
      videos.length > 0
        ? videos
        : Array.from({ length: 4 }, () => ({
            src: '',
            poster: '',
            placeholder: true,
          }));

    return [...base, ...base]; // duplicate
  }, [videos]);

  // 🎥 Intersection Observer (unchanged)
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
  }, [items]);

  // 🔥 SEAMLESS AUTO SCROLL
 useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  const speed = 0.8;

  let itemWidth = 0;
  let loopWidth = 0;

  const calculateSizes = () => {
    const firstItem = container.children[0];
    if (!firstItem) return;

    itemWidth = firstItem.getBoundingClientRect().width;
    const originalCount = items.length / 2;
    loopWidth = itemWidth * originalCount;

    // 🔥 START IN THE MIDDLE (CRUCIAL FIX)
    container.scrollLeft = loopWidth;
  };

  calculateSizes();
  window.addEventListener('resize', calculateSizes);

  const scrollStep = () => {
    if (!container) return;

    if (!isPausedRef.current) {
      container.scrollLeft += speed;
    }

    // 🔥 RESET EARLY (before edge shows)
    if (container.scrollLeft >= loopWidth * 2 - container.clientWidth) {
      container.scrollLeft = loopWidth;
    }

    animationRef.current = requestAnimationFrame(scrollStep);
  };

  animationRef.current = requestAnimationFrame(scrollStep);

  return () => {
    cancelAnimationFrame(animationRef.current);
    window.removeEventListener('resize', calculateSizes);
  };
}, [items]);

  const setVideoRef = useCallback((el, index) => {
    videoRefs.current[index] = el;
  }, []);

  return (
    <div
      ref={containerRef}
      className="hide-scrollbar flex overflow-x-auto w-full"
      style={{
        touchAction: 'pan-x',
        WebkitOverflowScrolling: 'touch',
      }}
      onMouseEnter={() => (isPausedRef.current = true)}
      onMouseLeave={() => (isPausedRef.current = false)}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="shrink-0 w-[60vw] md:w-[25vw] relative"
          style={{ aspectRatio: '4/3' }}
        >
          {item.placeholder ? (
            <div
              className="w-full h-full"
              style={{
                backgroundColor: '#5a0000',
                borderRight:
                  i < items.length - 1
                    ? '1px solid rgba(42, 20, 121, 0.1)'
                    : 'none',
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