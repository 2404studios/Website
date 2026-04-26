import React, { useRef, useEffect, useCallback, useMemo } from 'react';

const ReelsContainer = React.memo(function ReelsContainer({ videos = [], isActive = false }) {
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

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

  // 🎥 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting && isActive) {
            if (video.dataset.src && !video.src) {
              video.src = video.dataset.src;
            }
            video.play().catch(() => { });
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
  }, [items, isActive]);

  const setVideoRef = useCallback((el, index) => {
    videoRefs.current[index] = el;
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
    >
      <div className={`flex w-max animate-marquee ${!isActive ? 'paused' : ''}`}>
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
    </div>
  );
});

export default ReelsContainer;