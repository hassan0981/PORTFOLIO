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
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 md:h-10 overflow-hidden relative flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="text-lg md:text-xl font-mono font-semibold gradient-text block"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
