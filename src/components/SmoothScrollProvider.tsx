"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

type LenisContextValue = {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number }) => void;
};

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.4,
      anchors: false,
    });

    setLenis(instance);

    let rafId: number;
    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Scroll to hash / pending section when landing on home
  useEffect(() => {
    if (!lenis || pathname !== "/") return;

    const pending = sessionStorage.getItem("scroll-to-section");
    const hashId = pending || window.location.hash.replace("#", "");

    if (!hashId) return;

    sessionStorage.removeItem("scroll-to-section");

    const timer = window.setTimeout(() => {
      lenis.scrollTo(`#${hashId}`, { offset: -72 });
      window.history.replaceState(null, "", `#${hashId}`);
    }, 80);

    return () => window.clearTimeout(timer);
  }, [lenis, pathname]);

  const scrollTo = (target: string | number | HTMLElement, options?: { offset?: number }) => {
    if (!lenis) {
      if (typeof target === "string") {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    lenis.scrollTo(target, { offset: options?.offset ?? -72 });
  };

  return (
    <LenisContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
