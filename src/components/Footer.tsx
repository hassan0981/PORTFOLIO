"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { useLenis } from "@/components/SmoothScrollProvider";

const sectionLinks = [
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Experience", id: "experience" },
  { name: "Skills", id: "skills" },
  { name: "Contact", id: "contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { scrollTo } = useLenis();

  const goToSection = (id: string) => {
    if (window.location.pathname !== "/") {
      sessionStorage.setItem("scroll-to-section", id);
      window.location.href = "/";
      return;
    }
    scrollTo(`#${id}`);
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <footer className="w-full border-t border-border/60 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <button
              type="button"
              onClick={() => {
                if (window.location.pathname !== "/") {
                  window.location.href = "/";
                  return;
                }
                scrollTo(0);
                window.history.replaceState(null, "", "/");
              }}
              className="font-sans text-base sm:text-lg font-semibold tracking-tight text-foreground hover:text-primary transition-colors cursor-pointer bg-transparent border-0 p-0"
            >
              Muhammad Hassan Javed
            </button>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto md:mx-0 leading-relaxed">
              Full Stack Developer & AI Automation Engineer — building modern web, mobile, and AI-powered products.
            </p>
            <p className="text-xs text-muted-foreground/80 pt-2">
              &copy; {currentYear} Muhammad Hassan Javed
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center md:justify-end gap-8 sm:gap-12 text-center sm:text-left">
            <div className="space-y-3">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                Navigate
              </p>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground items-center sm:items-start">
                {sectionLinks.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goToSection(item.id)}
                    className="hover:text-foreground transition-colors cursor-pointer bg-transparent border-0 p-0 min-h-10 sm:min-h-0"
                  >
                    {item.name}
                  </button>
                ))}
                <Link href="/resume" className="hover:text-foreground transition-colors min-h-10 sm:min-h-0 inline-flex items-center">
                  Resume
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                Connect
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <a
                  href="https://github.com/mhassanjaved"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-md border border-border/70 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors bg-card/50 dark:bg-transparent"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com/in/mhassanjaved"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-md border border-border/70 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors bg-card/50 dark:bg-transparent"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="mailto:mhassanjaved@gmail.com"
                  className="w-9 h-9 rounded-md border border-border/70 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors bg-card/50 dark:bg-transparent"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
