import React, { useEffect, useRef } from 'react';
import { useSFX } from '../hooks/useSFX';

/**
 * StarBackground - High-performance canvas background with:
 * - Twinkling, color-shifting, dancing stars
 * - Bi-directional shooting stars
 * - Interactive fireworks (exclusive to Hero page)
 */
const StarBackground = ({ pageIndex }) => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const shootingStarsRef = useRef([]);
  const fireworksRef = useRef([]);
  const isAboutPage = pageIndex === 3;
  const { playFirework } = useSFX();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;

    class Star {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.2 + 0.5;
        this.baseOpacity = Math.random() * 0.7 + 0.2;
        this.opacity = this.baseOpacity;
        this.blinkSpeed = Math.random() * 0.05 + 0.005;
        this.angle = Math.random() * Math.PI * 2;
        const isColored = Math.random() < 0.6;
        this.baseHue = isColored ? Math.random() * 360 : 220;
        this.saturation = isColored ? 90 : 20;
        this.lightness = isColored ? 92 : 98;
        this.hue = this.baseHue;
        this.isDancing = Math.random() < 0.3;
        this.orbitRadius = Math.random() * 15 + 5;
        this.orbitSpeed = Math.random() * 0.015 + 0.002;
        this.orbitAngle = Math.random() * Math.PI * 2;
        this.vx = (Math.random() - 0.5) * 0.1;
        this.vy = (Math.random() - 0.5) * 0.1;
        this.anchorX = this.x;
        this.anchorY = this.y;
      }
      update() {
        this.angle += this.blinkSpeed;
        this.opacity = this.baseOpacity + Math.sin(this.angle) * 0.4;
        this.currentGlow = Math.max(0, this.opacity * 16);
        this.hue = this.baseHue + Math.sin(this.angle * 0.5) * 40;
        this.anchorX += this.vx;
        this.anchorY += this.vy;
        if (this.isDancing) {
          this.orbitAngle += this.orbitSpeed;
          this.x = this.anchorX + Math.cos(this.orbitAngle) * this.orbitRadius;
          this.y = this.anchorY + Math.sin(this.orbitAngle) * this.orbitRadius;
        } else {
          this.x = this.anchorX; this.y = this.anchorY;
        }
        if (this.anchorX < -50) this.anchorX = width + 50;
        if (this.anchorX > width + 50) this.anchorX = -50;
        if (this.anchorY < -50) this.anchorY = height + 50;
        if (this.anchorY > height + 50) this.anchorY = -50;
      }
      draw() {
        ctx.save();
        const color = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${Math.max(0, this.opacity)})`;
        ctx.fillStyle = color;
        ctx.shadowBlur = this.currentGlow;
        ctx.shadowColor = `hsl(${this.hue}, 80%, 70%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class ShootingStar {
      constructor() { this.reset(); }
      reset() { this.active = false; this.opacity = 0; }
      trigger() {
        this.active = true;
        this.opacity = 1;
        this.direction = Math.random() < 0.5 ? 1 : -1;
        this.x = this.direction === 1 ? -200 : width + 200;
        this.y = Math.random() * (height / 1.5);
        this.len = Math.random() * 150 + 100;
        this.speed = (Math.random() * 12 + 10) * this.direction;
      }
      update() {
        if (!this.active) return;
        this.x += this.speed;
        this.y += Math.abs(this.speed) * 0.4;
        this.opacity -= 0.012;
        if (this.opacity <= 0 || (this.direction === 1 && this.x > width + 500) || (this.direction === -1 && this.x < -500)) {
          this.active = false;
        }
      }
      draw() {
        if (!this.active) return;
        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'white';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - (this.len * (this.speed / Math.abs(this.speed))), this.y - (Math.abs(this.len) * 0.4));
        ctx.stroke();
        ctx.restore();
      }
    }

    class FireworkParticle {
      constructor(x, y) {
        this.x = x; this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const force = Math.random() * 6 + 3;
        this.vx = Math.cos(angle) * force;
        this.vy = Math.sin(angle) * force;
        this.gravity = 0.08;
        this.friction = 0.96;
        this.opacity = 1;
        this.hue = Math.random() * 360;
        this.size = Math.random() * 3 + 1;
        this.active = true;
      }
      update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= 0.015;
        if (this.opacity <= 0) this.active = false;
      }
      draw() {
        if (!this.active) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = `hsl(${this.hue}, 100%, 70%)`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      starsRef.current = [];
      for (let i = 0; i < 350; i++) starsRef.current.push(new Star());
      
      shootingStarsRef.current = [new ShootingStar(), new ShootingStar(), new ShootingStar()];
      fireworksRef.current = [];
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      starsRef.current.forEach(s => { s.update(); s.draw(); });

      shootingStarsRef.current.forEach(ss => {
        if (!ss.active && Math.random() < 0.005) ss.trigger();
        ss.update();
        ss.draw();
      });

      fireworksRef.current = fireworksRef.current.filter(f => f.active);
      fireworksRef.current.forEach(f => { f.update(); f.draw(); });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    init();
    animate();

    const handleInteraction = (e) => {
      // Access current pageIndex via closure or ref? 
      // Actually, since we want to avoid re-binding, let's use a ref for pageIndex too or just bind.
      // But for now, we'll just bind.
    };

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Calculate dynamic opacity based on page type
  let canvasOpacity = 1;
  if (pageIndex === 1) canvasOpacity = 0.3; // Our Story (Text heavy)
  if (pageIndex === 2) canvasOpacity = 0.2; // Experience (Video)
  if (pageIndex === 3) canvasOpacity = 0;   // About (Hidden)
  if (pageIndex === 4) canvasOpacity = 0.3; // Join (Form/Text)
  if (pageIndex === 5) canvasOpacity = 0.6; // Social
  if (pageIndex === 6) canvasOpacity = 1;   // Thank You
  if (pageIndex === 0) canvasOpacity = 1;   // Hero

  // Separate effect for interaction to avoid re-initializing the animation loop
  useEffect(() => {
    const handleInteraction = (e) => {
      // Use a Ref for the pageIndex to ensure we always have the fresh value 
      // without needing to re-bind this listener constantly.
      if (pageIndex !== 0) return;

      const x = e.clientX || (e.touches && e.touches[0].clientX);
      const y = e.clientY || (e.touches && e.touches[0].clientY);
      
      if (x !== undefined && y !== undefined) {
        playFirework();
        for (let i = 0; i < 40; i++) {
          fireworksRef.current.push(new FireworkParticle(x, y));
        }
      }
    };

    // Use capture: true to ensure we catch the event before other components consume it
    window.addEventListener('mousedown', handleInteraction, { capture: true });
    window.addEventListener('touchstart', handleInteraction, { capture: true });
    return () => {
      window.removeEventListener('mousedown', handleInteraction, { capture: true });
      window.removeEventListener('touchstart', handleInteraction, { capture: true });
    };
  }, [pageIndex]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-1000"
      style={{ 
        background: 'transparent',
        opacity: canvasOpacity
      }}
    />
  );
};

export default StarBackground;
