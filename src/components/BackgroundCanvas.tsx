"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface Ring {
  x: number;
  y: number;
  progress: number; // 0 to 1
  delay: number;
  speed: number;
}

export default function BackgroundCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const pathname = usePathname();

  // Mouse position tracking
  const mouseRef = React.useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    // Particles array
    const particles: Particle[] = [];
    const particleCount = 28;

    // Rings array
    const rings: Ring[] = [
      { x: 0, y: 0, progress: 0, delay: 0.0, speed: 0.0018 },
      { x: 0, y: 0, progress: 0, delay: 0.33, speed: 0.0018 },
      { x: 0, y: 0, progress: 0, delay: 0.66, speed: 0.0018 },
    ];

    let targetX = width / 2;
    let targetY = height * 0.85;
    let hasTarget = false;

    const updateTargetPosition = () => {
      const el = document.getElementById("contact") || document.querySelector("form");
      if (el) {
        const rect = el.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        const scrollX = window.scrollX || window.pageXOffset;
        targetX = rect.left + scrollX + rect.width / 2;
        targetY = rect.top + scrollY + rect.height / 2;
        hasTarget = true;
      } else {
        hasTarget = false;
        targetX = width / 2;
        targetY = height * 0.85;
      }
    };

    // Initialize dimensions and particles
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Re-initialize particles to fit screen boundaries
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          size: 1 + Math.random() * 1.5,
          alpha: 0.08 + Math.random() * 0.16,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      updateTargetPosition();
    };

    resize();
    window.addEventListener("resize", resize);
    const positionInterval = setInterval(updateTargetPosition, 1000);

    // Track mouse
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // Animation Loop
    let lastTime = 0;
    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Connected Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Boundary collision
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Pulse size and alpha
        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulsePhase));
        const currentSize = p.size * (0.85 + 0.15 * Math.sin(p.pulsePhase));

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94, 234, 212, ${currentAlpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const lineAlpha = (1 - dist / 100) * 0.045;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(94, 234, 212, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        if (mouseRef.current.active) {
          const mdx = p.x - mouseRef.current.x;
          const mdy = p.y - mouseRef.current.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140) {
            const mouseLineAlpha = (1 - mdist / 140) * 0.07;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = `rgba(94, 234, 212, ${mouseLineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 2. Draw Concentric Expanding Rings
      let ringCenterX = targetX;
      let ringCenterY = targetY;

      if (hasTarget) {
        const scrollY = window.scrollY || window.pageYOffset;
        ringCenterY = targetY - scrollY;
      }

      rings.forEach((ring) => {
        // Update progress
        ring.progress += ring.speed;
        if (ring.progress > 1.0) {
          ring.progress = 0;
        }

        // Calculate scaling
        const activeProgress = (ring.progress + ring.delay) % 1.0;
        const currentScale = 40 + activeProgress * 340; // Grow from 40px to 380px radius

        // Smooth opacity envelope to prevent popping/flickering:
        let opacity = 0;
        if (activeProgress < 0.15) {
          opacity = (activeProgress / 0.15) * 0.12;
        } else {
          opacity = ((1.0 - activeProgress) / 0.85) * 0.12;
        }

        if (ringCenterY > -400 && ringCenterY < height + 400) {
          ctx.beginPath();
          ctx.arc(ringCenterX, ringCenterY, currentScale, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(94, 234, 212, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      clearInterval(positionInterval);
      cancelAnimationFrame(animationId);
    };
  }, [pathname]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 select-none opacity-45 dark:opacity-55"
    />
  );
}
