import React, { useEffect, useRef } from 'react';

export interface ParticleCanvasProps {
  className?: string;
  nodeCount?: number;
  maxDistance?: number;
  speed?: number;
  interactive?: boolean;
  opacity?: number;
  accentColors?: string[];
  showGlow?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  color: string;
  glowColor: string;
  pulsePhase: number;
  pulseSpeed: number;
}

const DEFAULT_ACCENTS = [
  '#00F0FF', // Cyber Cyan
  '#D4FF00', // Cyber Volt
  '#00F0FF', // Cyan weighted
  '#A855F7', // Cyber Violet
  '#10B981', // Cyber Emerald
];

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  className = 'absolute inset-0 pointer-events-none z-0',
  nodeCount,
  maxDistance = 125,
  speed = 0.5,
  interactive = true,
  opacity = 0.8,
  accentColors = DEFAULT_ACCENTS,
  showGlow = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const isVisibleRef = useRef<boolean>(true);
  const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({
    x: null,
    y: null,
    radius: 140,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Check prefers-reduced-motion
    const reducedMotionQuery = typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;
    let isReducedMotion = reducedMotionQuery ? reducedMotionQuery.matches : false;

    const getAdaptiveCount = (w: number) => {
      if (nodeCount !== undefined) return nodeCount;
      if (w < 640) return 24;
      if (w < 1024) return 42;
      return 68;
    };

    const initParticles = () => {
      const count = getAdaptiveCount(width);
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const color = accentColors[Math.floor(Math.random() * accentColors.length)];
        const baseRadius = Math.random() * 1.6 + 1.2; // 1.2px to 2.8px
        const pSpeed = (Math.random() * 0.6 + 0.4) * speed;
        const angle = Math.random() * Math.PI * 2;

        particles.push({
          x: Math.random() * (width || 800),
          y: Math.random() * (height || 600),
          vx: Math.cos(angle) * pSpeed,
          vy: Math.sin(angle) * pSpeed,
          baseRadius,
          radius: baseRadius,
          color,
          glowColor: color,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.03 + 0.015,
        });
      }

      particlesRef.current = particles;
    };

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width || canvas.parentElement?.clientWidth || window.innerWidth;
      height = rect.height || canvas.parentElement?.clientHeight || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Bound existing particles or re-initialize if empty
      if (particlesRef.current.length === 0) {
        initParticles();
      } else {
        particlesRef.current.forEach((p) => {
          if (p.x > width) p.x = width * Math.random();
          if (p.y > height) p.y = height * Math.random();
        });
      }

      if (isReducedMotion) {
        drawStaticFrame();
      }
    };

    const drawStaticFrame = () => {
      if (!ctx || width === 0 || height === 0) return;
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const len = particles.length;

      // Draw connecting lines
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.25 * opacity;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = showGlow ? 6 : 0;
        ctx.shadowColor = p.glowColor;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const render = () => {
      if (!isVisibleRef.current || isReducedMotion) {
        return;
      }

      if (!ctx || width === 0 || height === 0) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const len = particles.length;
      const mouse = mouseRef.current;

      // 1. Draw connecting lines between nodes
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.3 * opacity;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            // Blended line styling
            if (p1.color === p2.color) {
              ctx.strokeStyle = p1.color.startsWith('#')
                ? `${p1.color}${Math.floor(lineAlpha * 255).toString(16).padStart(2, '0')}`
                : `rgba(0, 240, 255, ${lineAlpha})`;
            } else {
              ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
            }

            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 2. Mouse connections and interaction if interactive
      if (interactive && mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < len; i++) {
          const p = particles[i];
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const lineAlpha = (1 - dist / mouse.radius) * 0.45 * opacity;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(212, 255, 0, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Subtle gentle pull towards mouse
            if (dist > 30) {
              p.x += (dx / dist) * 0.3;
              p.y += (dy / dist) * 0.3;
            }
          }
        }
      }

      // 3. Update & Draw individual particles
      for (let i = 0; i < len; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Bounce gently at borders with padding
        if (p.x < 0) {
          p.x = 0;
          p.vx = Math.abs(p.vx);
        } else if (p.x > width) {
          p.x = width;
          p.vx = -Math.abs(p.vx);
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy = Math.abs(p.vy);
        } else if (p.y > height) {
          p.y = height;
          p.vy = -Math.abs(p.vy);
        }

        // Pulse radius subtly
        p.pulsePhase += p.pulseSpeed;
        p.radius = p.baseRadius + Math.sin(p.pulsePhase) * 0.5;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;

        if (showGlow) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.glowColor;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for line rendering efficiency
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    // Initialize layout
    handleResize();

    if (isReducedMotion) {
      drawStaticFrame();
    } else {
      animationFrameRef.current = requestAnimationFrame(render);
    }

    // Window resize observer / listener
    window.addEventListener('resize', handleResize);

    // Reduced motion listener
    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
      if (isReducedMotion) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        drawStaticFrame();
      } else {
        if (!animationFrameRef.current) {
          animationFrameRef.current = requestAnimationFrame(render);
        }
      }
    };

    if (reducedMotionQuery) {
      if (reducedMotionQuery.addEventListener) {
        reducedMotionQuery.addEventListener('change', handleMotionChange);
      } else if (reducedMotionQuery.addListener) {
        reducedMotionQuery.addListener(handleMotionChange);
      }
    }

    // Page visibility listener
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisibleRef.current = false;
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      } else {
        isVisibleRef.current = true;
        if (!isReducedMotion && !animationFrameRef.current) {
          animationFrameRef.current = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // IntersectionObserver for pausing off-screen
    let observer: IntersectionObserver | null = null;
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) {
            isVisibleRef.current = entry.isIntersecting;
            if (entry.isIntersecting) {
              if (!isReducedMotion && !animationFrameRef.current) {
                animationFrameRef.current = requestAnimationFrame(render);
              }
            } else {
              if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
              }
            }
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(canvas);
    }

    // Mouse movement interaction handlers
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (reducedMotionQuery) {
        if (reducedMotionQuery.removeEventListener) {
          reducedMotionQuery.removeEventListener('change', handleMotionChange);
        } else if (reducedMotionQuery.removeListener) {
          reducedMotionQuery.removeListener(handleMotionChange);
        }
      }
      if (observer) {
        observer.disconnect();
      }
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [nodeCount, maxDistance, speed, interactive, opacity, accentColors, showGlow]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        data-testid="particle-canvas"
        role="presentation"
        aria-hidden="true"
      />
    </div>
  );
};
