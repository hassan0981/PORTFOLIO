"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const orbitTags = [
  { label: "Next.js", angle: 18 },
  { label: "TypeScript", angle: 95 },
  { label: "React Native", angle: 175 },
  { label: "AI", angle: 255 },
  { label: "Node.js", angle: 320 },
];

export default function DeveloperVisual() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-14, 14]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      className="relative w-full max-w-md aspect-square flex items-center justify-center [perspective:1200px]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Soft atmosphere */}
      <div className="absolute inset-[12%] rounded-full bg-primary/[0.09] blur-3xl" />
      <div className="absolute inset-[22%] rounded-full bg-primary/[0.05] blur-2xl" />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[86%] h-[86%] flex items-center justify-center"
      >
        {/* Back plane */}
        <div
          className="absolute inset-0 border border-border/40 bg-card/20 backdrop-blur-sm"
          style={{ transform: "translateZ(-48px) rotateY(-8deg)" }}
        />

        {/* Mid plane */}
        <div
          className="absolute inset-[8%] border border-primary/15 bg-gradient-to-br from-primary/[0.08] via-transparent to-transparent"
          style={{ transform: "translateZ(-16px) rotateY(4deg)" }}
        />

        {/* Orbit rings */}
        <motion.div
          className="absolute inset-[6%] rounded-full border border-border/50"
          style={{ transform: "translateZ(8px) rotateX(68deg)" }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-[16%] rounded-full border border-primary/25"
          style={{ transform: "translateZ(20px) rotateX(68deg)" }}
          animate={{ rotateZ: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-[28%] rounded-full border border-dashed border-border/40"
          style={{ transform: "translateZ(36px) rotateX(68deg)" }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        {/* Core monogram card */}
        <motion.div
          className="relative z-10 w-[42%] aspect-square border border-primary/30 bg-background/80 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_20px_60px_-20px_rgba(94,234,212,0.25)]"
          style={{ transform: "translateZ(56px)" }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-display text-4xl sm:text-5xl font-medium tracking-tight gradient-text">
            HJ
          </span>
          <span className="mt-2 font-mono text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
            Full Stack
          </span>
        </motion.div>

        {/* Floating skill chips on orbit */}
        {orbitTags.map((tag, i) => {
          const rad = (tag.angle * Math.PI) / 180;
          const r = 42;
          const left = 50 + Math.cos(rad) * r;
          const top = 50 + Math.sin(rad) * r * 0.55;
          return (
            <motion.div
              key={tag.label}
              className="absolute z-20 px-2.5 py-1 border border-border/70 bg-background/85 backdrop-blur-md font-mono text-[10px] text-muted-foreground whitespace-nowrap"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: "translate(-50%, -50%) translateZ(72px)",
              }}
              animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
              transition={{
                duration: 4 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            >
              {tag.label}
            </motion.div>
          );
        })}

        {/* Accent nodes */}
        <motion.span
          className="absolute w-2 h-2 rounded-full bg-primary"
          style={{ left: "18%", top: "22%", transform: "translateZ(80px)" }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.35, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/70"
          style={{ right: "16%", bottom: "26%", transform: "translateZ(64px)" }}
          animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.4, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />
      </motion.div>
    </div>
  );
}
