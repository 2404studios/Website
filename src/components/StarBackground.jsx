import React, { useEffect, useRef } from 'react';

/**
 * StarBackground - A high-performance canvas-based background 
 * featuring twinkling stars and occasional shooting stars.
 * 
 * Props:
 *   pageIndex - used to hide stars on specific pages (e.g., About page)
 */
const StarBackground = ({ pageIndex }) => {
  const canvasRef = useRef(null);
  const isAboutPage = pageIndex === 3;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Star configuration - Increased intensity
    const STAR_COUNT = 350;
    
    let stars = [];
    let shootingStars = [];

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
        
        // More dance
        this.isDancing = Math.random() < 0.3; // 30% stars dance
        this.orbitRadius = Math.random() * 15 + 5; // Larger orbits
        this.orbitSpeed = Math.random() * 0.015 + 0.002;
        this.orbitAngle = Math.random() * Math.PI * 2;
        
        // Subtle floating motion for everyone
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

        // Apply floating motion
        this.anchorX += this.vx;
        this.anchorY += this.vy;

        if (this.isDancing) {
          this.orbitAngle += this.orbitSpeed;
          this.x = this.anchorX + Math.cos(this.orbitAngle) * this.orbitRadius;
          this.y = this.anchorY + Math.sin(this.orbitAngle) * this.orbitRadius;
        } else {
          this.x = this.anchorX;
          this.y = this.anchorY;
        }

        // Wrap around screen
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
      constructor() {
        this.reset();
      }

      reset() {
        this.active = false;
        this.opacity = 0;
      }

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
        // Trail length logic
        const trailX = this.x - (this.len * (this.speed / Math.abs(this.speed)));
        const trailY = this.y - (Math.abs(this.len) * 0.4);
        ctx.lineTo(trailX, trailY);
        ctx.stroke();
        ctx.restore();
      }
    }

    const init = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(new Star());
      }
      shootingStars = [new ShootingStar(), new ShootingStar(), new ShootingStar()];
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      shootingStars.forEach(ss => {
        if (!ss.active && Math.random() < 0.005) { // Increased frequency
          ss.trigger();
        }
        ss.update();
        ss.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-10 transition-opacity duration-1000 ${isAboutPage ? 'opacity-0' : 'opacity-100'}`}
      style={{ background: 'transparent' }}
    />
  );
};

export default StarBackground;
