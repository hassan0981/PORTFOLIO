"use client";

import React from "react";
import { motion } from "framer-motion";

type ProfileCardProps = {
  projectCount?: number;
};

export default function ProfileCard({ projectCount = 20 }: ProfileCardProps) {
  const [hasPhoto, setHasPhoto] = React.useState(false);

  React.useEffect(() => {
    const img = new window.Image();
    img.onload = () => setHasPhoto(true);
    img.onerror = () => setHasPhoto(false);
    img.src = "/profile.png";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[17.5rem] sm:max-w-[18rem] md:max-w-[16.5rem] lg:max-w-sm mx-auto"
    >
      <div className="panel-surface relative rounded-2xl sm:rounded-3xl px-5 py-6 sm:px-6 sm:py-8 overflow-hidden dark:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.08] via-transparent to-transparent pointer-events-none dark:from-primary/[0.06]" />

        <div className="relative flex flex-col items-center text-center">
          <div className="icon-chip inline-flex items-center gap-2 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 mb-5 sm:mb-7">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 dark:bg-emerald-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            </span>
            <span className="text-[11px] sm:text-xs text-muted-foreground">
              Available for new projects
            </span>
          </div>

          <div className="relative mb-5 sm:mb-7">
            <div className="absolute -inset-3 rounded-full bg-primary/20 blur-2xl dark:bg-primary/25" />
            <div className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44 rounded-full border border-primary/30 overflow-hidden bg-gradient-to-br from-muted via-card to-background dark:from-[#1a2332] dark:via-[#0f141c] dark:to-[#0a0b0f] flex items-center justify-center">
              {hasPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/profile.png"
                  alt="Muhammad Hassan Javed"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <span className="font-display text-3xl sm:text-4xl font-medium tracking-tight gradient-text select-none">
                  HJ
                </span>
              )}
            </div>
          </div>

          <div className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 sm:px-3.5 py-1 sm:py-1.5">
            <span className="text-[11px] sm:text-xs font-medium text-primary">
              {projectCount}+ projects delivered
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
