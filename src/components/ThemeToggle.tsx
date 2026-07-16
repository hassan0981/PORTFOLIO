"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      disabled={!mounted}
      className={cn(
        "inline-flex h-9 w-9 lg:h-9 lg:w-9 items-center justify-center rounded-full border border-border/80 bg-card/70 text-foreground shadow-sm backdrop-blur-md transition-colors hover:border-primary/40 hover:text-primary cursor-pointer disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none",
        className
      )}
      aria-label={mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )
      ) : (
        <Sun className="h-4 w-4 opacity-0" />
      )}
    </button>
  );
}
