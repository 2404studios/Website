import { useEffect } from 'react';

export function useVideoPreload(videoUrls, triggerPageIndex = 0) {
    useEffect(() => {
        if (!videoUrls || videoUrls.length === 0) return;

        const preloadVideos = () => {
            videoUrls.forEach((url, index) => {
                // Add preload link to document head
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'video';
                link.href = url;
                link.type = 'video/mp4';
                document.head.appendChild(link);

                // Create hidden video element for buffering
                const video = document.createElement('video');
                video.src = url;
                video.preload = 'auto';
                video.muted = true;
                video.style.display = 'none';
                video.setAttribute('data-preload', 'true');
                document.body.appendChild(video);

                console.log(`Preloading video ${index + 1}/${videoUrls.length}: ${url}`);
            });
        };

        // Small delay to avoid blocking initial page load
        const timer = setTimeout(preloadVideos, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [triggerPageIndex, videoUrls]);
}