"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "React Native Developer",
  "AI Automation Engineer",
];

export default function SubtitleCycles() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-7 md:h-8 overflow-hidden relative flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg font-mono tracking-wide text-primary block"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
