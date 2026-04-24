import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { id: 'up', mobileLabel: 'SWIPE UP', pcLabel: 'PRESS ↑ or W', key: 'ArrowUp', wasd: 'w' },
  { id: 'down', mobileLabel: 'SWIPE DOWN', pcLabel: 'PRESS ↓ or S', key: 'ArrowDown', wasd: 's' },
  { id: 'left', mobileLabel: 'SWIPE LEFT', pcLabel: 'PRESS ← or A', key: 'ArrowLeft', wasd: 'a' },
  { id: 'right', mobileLabel: 'SWIPE RIGHT', pcLabel: 'PRESS → or D', key: 'ArrowRight', wasd: 'd' },
];

export default function TutorialOverlay({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [flash, setFlash] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [ripple, setRipple] = useState(0); // increments on each successful step for juicy feedback

  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const step = STEPS[currentStep];
      if (e.key === step.key || e.key.toLowerCase() === step.wasd) {
        e.preventDefault();
        completeStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep]);

  const completeStep = () => {
    setRipple(prev => prev + 1);
    
    if (currentStep < STEPS.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 400);
    } else {
      setTimeout(() => triggerFinal(), 600);
    }
  };

  const triggerFinal = () => {
    setFlash(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
    
    // Attempt fullscreen on first interaction
    if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    
    const deltaX = e.changedTouches[0].clientX - touchStart.x;
    const deltaY = e.changedTouches[0].clientY - touchStart.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    
    const threshold = 50;
    const step = STEPS[currentStep];

    if (absX > threshold || absY > threshold) {
      let direction = '';
      if (absY > absX) {
        direction = deltaY > 0 ? 'down' : 'up';
      } else {
        direction = deltaX > 0 ? 'right' : 'left';
      }

      if (direction === step.id) {
        completeStep();
      }
    }
    setTouchStart(null);
  };

  // Progress ratio for circle animation intensity
  const progress = currentStep / STEPS.length;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#00002b] touch-none select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Subtle star background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('/new_stars.png')" }}
      />

      {/* Main Circle Container */}
      <div className="relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64">
        
        {/* Outer Pulse Ring — grows with each step */}
        <motion.div
          className="absolute rounded-full border border-white/10"
          animate={{
            width: [180 + ripple * 30, 200 + ripple * 30, 180 + ripple * 30],
            height: [180 + ripple * 30, 200 + ripple * 30, 180 + ripple * 30],
            opacity: [0.1 + ripple * 0.1, 0.3 + ripple * 0.1, 0.1 + ripple * 0.1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Secondary Pulse Ring */}
        <motion.div
          className="absolute rounded-full border border-white/5"
          animate={{
            width: [220 + ripple * 40, 250 + ripple * 40, 220 + ripple * 40],
            height: [220 + ripple * 40, 250 + ripple * 40, 220 + ripple * 40],
            opacity: [0.05, 0.15 + ripple * 0.05, 0.05],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Main Circle with Sun */}
        <motion.div
          className="relative flex items-center justify-center w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-white/30"
          animate={{
            scale: [1, 1.03, 1],
            borderColor: [
              `rgba(255,255,255,${0.2 + ripple * 0.15})`,
              `rgba(255,255,255,${0.4 + ripple * 0.15})`,
              `rgba(255,255,255,${0.2 + ripple * 0.15})`,
            ],
            boxShadow: [
              `0 0 ${20 + ripple * 15}px rgba(255,255,255,${0.05 + ripple * 0.08})`,
              `0 0 ${40 + ripple * 20}px rgba(255,255,255,${0.15 + ripple * 0.1})`,
              `0 0 ${20 + ripple * 15}px rgba(255,255,255,${0.05 + ripple * 0.08})`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            className="text-6xl md:text-8xl text-white select-none"
            animate={{
              textShadow: [
                `0 0 ${10 + ripple * 8}px rgba(255,255,255,${0.4 + ripple * 0.15})`,
                `0 0 ${25 + ripple * 12}px rgba(255,255,255,${0.8 + ripple * 0.05})`,
                `0 0 ${10 + ripple * 8}px rgba(255,255,255,${0.4 + ripple * 0.15})`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ☉
          </motion.span>
        </motion.div>

        {/* Step Completion Ripple */}
        <AnimatePresence>
          {ripple > 0 && (
            <motion.div
              key={`ripple-${ripple}`}
              className="absolute rounded-full border-2 border-white/60"
              initial={{ width: 120, height: 120, opacity: 0.8 }}
              animate={{ width: 350, height: 350, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {/* Direction Arrow Indicator */}
        <motion.div
          key={`arrow-${currentStep}`}
          className="absolute text-white/30 text-4xl md:text-5xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.2, 0.5, 0.2], 
            scale: [0.9, 1, 0.9],
            ...(STEPS[currentStep].id === 'up' && { y: [-80, -90, -80] }),
            ...(STEPS[currentStep].id === 'down' && { y: [80, 90, 80] }),
            ...(STEPS[currentStep].id === 'left' && { x: [-80, -90, -80] }),
            ...(STEPS[currentStep].id === 'right' && { x: [80, 90, 80] }),
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {STEPS[currentStep].id === 'up' && '↑'}
          {STEPS[currentStep].id === 'down' && '↓'}
          {STEPS[currentStep].id === 'left' && '←'}
          {STEPS[currentStep].id === 'right' && '→'}
        </motion.div>
      </div>

      {/* Instructions */}
      <div className="mt-14 text-center relative z-10">
        {/* Step Counter */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {STEPS.map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              animate={{
                backgroundColor: i < currentStep ? '#ffffff' : i === currentStep ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.15)',
                scale: i === currentStep ? [1, 1.4, 1] : 1,
              }}
              transition={i === currentStep ? { duration: 1, repeat: Infinity } : { duration: 0.3 }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.h2 
            key={currentStep}
            initial={{ y: 20, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="text-white text-xl md:text-3xl font-black uppercase tracking-widest"
          >
            {isMobile ? STEPS[currentStep].mobileLabel : STEPS[currentStep].pcLabel}
          </motion.h2>
        </AnimatePresence>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1 }}
          className="mt-6 text-white text-[10px] md:text-xs uppercase tracking-[0.3em] font-press-start"
        >
          {isMobile ? 'Swipe to interact' : 'Use keyboard to interact'}
        </motion.p>
      </div>

      {/* White Flash Transition */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-white z-[110]"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
