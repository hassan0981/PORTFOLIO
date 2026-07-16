"use client";

import React from "react";
import { motion, HTMLMotionProps, useMotionValue, useTransform, useSpring } from "framer-motion";

interface AnimationProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, duration = 0.5, className = "" }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideUp({ children, delay = 0, duration = 0.7, className = "" }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, delay = 0, duration = 0.5, className = "" }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollReveal({ children, delay = 0, duration = 0.75, className = "" }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HoverLift({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        rotateX: 4,
        rotateY: -3,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      }}
      style={{ transformStyle: "preserve-3d", perspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface TextRevealProps {
  text: string;
  delay?: number;
  className?: string;
  tagName?: "h1" | "h2" | "h3" | "p";
}

export function TextReveal({ text, delay = 0, className = "", tagName = "h1" }: TextRevealProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i },
    }),
  } as const;

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 120,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  } as const;

  const Tag = motion[tagName] as any;

  return (
    <Tag
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.25em", display: "inline-block" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

export function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [enabled, setEnabled] = React.useState(false);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [0, 1], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-10, 10]);

  React.useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) / width;
    const mouseY = (e.clientY - rect.top) / height;

    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
