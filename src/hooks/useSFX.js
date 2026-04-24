import useSound from 'use-sound';

/**
 * useSFX - A custom hook to manage all sound effects for the site.
 * It uses the 'use-sound' library for optimized playback.
 */
export const useSFX = () => {
  // 1. Hero Page / Star Interactions
  const [playFirework] = useSound('/sfx/firework.mp3', { volume: 0.5 });
  
  // 2. Navigation / UI
  const [playNav] = useSound('/sfx/nav_click.mp3', { volume: 0.4 });
  const [playMenuOpen] = useSound('/sfx/menu_open.mp3', { volume: 0.5 });
  const [playMenuClose] = useSound('/sfx/menu_close.mp3', { volume: 0.5 });
  
  // 3. Hover / Micro-interactions
  const [playHover] = useSound('/sfx/hover.mp3', { volume: 0.2 });

  return {
    playFirework,
    playNav,
    playMenuOpen,
    playMenuClose,
    playHover
  };
};
