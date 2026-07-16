"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DeveloperVisual() {
  return (
    <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
      {/* Background soft glowing blur accents */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#61dafb]/10 via-[#7c6ef6]/5 to-[#22d3ee]/10 rounded-full blur-3xl opacity-60 dark:opacity-40 animate-pulse duration-4000" />

      {/* Floating abstract code nodes */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 right-6 w-20 h-20 bg-background/40 backdrop-blur-md rounded-xl border border-border p-3 flex flex-col justify-between shadow-lg"
      >
        <span className="text-[10px] font-mono text-[#61dafb]">⚡ next.js</span>
        <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
          <motion.div
            animate={{ width: ["20%", "85%", "20%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="h-full bg-[#61dafb]"
          />
        </div>
        <span className="text-[8px] font-mono text-muted-foreground">Speed: 99/100</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-12 left-4 w-24 h-16 bg-background/40 backdrop-blur-md rounded-xl border border-border p-3 flex flex-col justify-between shadow-lg"
      >
        <span className="text-[10px] font-mono text-[#7c6ef6]">🤖 AI Model</span>
        <span className="text-[12px] font-mono text-foreground font-bold">99.8% Acc</span>
      </motion.div>

      {/* Main Terminal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-5/6 rounded-2xl border border-border/60 glass-card flex flex-col overflow-hidden"
      >
        {/* Window Header */}
        <div className="h-11 border-b border-border bg-muted/30 px-4 flex items-center justify-between">
          <div className="flex space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono text-muted-foreground select-none">
            hassan-javed.tsx
          </span>
          <div className="w-12" /> {/* spacing element */}
        </div>

        {/* Code Content Editor Area */}
        <div className="flex-1 p-5 font-mono text-xs overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            {/* Import statement */}
            <div className="flex space-x-1.5 text-[#61dafb]">
              <span className="text-[#7c6ef6]">import</span>
              <span className="text-foreground">Developer</span>
              <span className="text-[#7c6ef6]">from</span>
              <span className="text-[#22d3ee]">"@/hassan"</span>
              <span className="text-foreground">;</span>
            </div>

            {/* Config declaration */}
            <div className="text-muted-foreground mt-4 text-[11px] italic">
              {"// 4+ years of building web & mobile experiences"}
            </div>

            {/* Object definition */}
            <div className="space-y-1 mt-2">
              <div>
                <span className="text-[#7c6ef6]">const</span>{" "}
                <span className="text-[#61dafb]">skills</span> = {"{"}
              </div>
              <div className="pl-4">
                <span className="text-foreground">core:</span>{" "}
                <span className="text-[#22d3ee]">["Next.js", "TypeScript"]</span>,
              </div>
              <div className="pl-4">
                <span className="text-foreground">mobile:</span>{" "}
                <span className="text-[#22d3ee]">["React Native"]</span>,
              </div>
              <div className="pl-4">
                <span className="text-foreground">backend:</span>{" "}
                <span className="text-[#22d3ee]">["Node.js", "Supabase"]</span>,
              </div>
              <div className="pl-4">
                <span className="text-foreground">ai:</span>{" "}
                <span className="text-[#22d3ee]">["OpenCV", "MediaPipe"]</span>
              </div>
              <div>{"};"}</div>
            </div>

            {/* Loop expression */}
            <div className="space-y-1 mt-4">
              <div>
                <span className="text-[#7c6ef6]">export default function</span>{" "}
                <span className="text-[#61dafb]">BuildApp</span>() {"{"}
              </div>
              <div className="pl-4 text-[#7c6ef6]">
                return <span className="text-foreground">Developer.</span>
                <span className="text-[#61dafb]">code</span>
                <span className="text-foreground">({")"}</span>
              </div>
              <div>{"}"}</div>
            </div>
          </div>

          {/* Typing terminal prompt at the bottom */}
          <div className="border-t border-border pt-4 flex items-center justify-between text-muted-foreground">
            <div className="flex items-center space-x-2">
              <span className="text-primary font-bold">&gt;_</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="w-1.5 h-3.5 bg-primary"
              />
            </div>
            <span className="text-[10px] text-muted-foreground select-none">UTF-8</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
