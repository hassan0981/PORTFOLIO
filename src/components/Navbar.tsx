"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLenis } from "@/components/SmoothScrollProvider";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Experience", id: "experience" },
  { name: "Skills", id: "skills" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { scrollTo } = useLenis();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("about");


  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observers: IntersectionObserver[] = [];
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.id);
            window.history.replaceState(null, "", `#${item.id}`);
          }
        },
        { rootMargin: "-35% 0px -50% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const goToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (pathname !== "/") {
      sessionStorage.setItem("scroll-to-section", id);
      router.push("/");
      return;
    }
    scrollTo(`#${id}`);
    window.history.replaceState(null, "", `#${id}`);
    setActiveSection(id);
  };

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled || mobileMenuOpen ? "bg-background/70 backdrop-blur-xl border-b border-border/50 dark:border-transparent" : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4">
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              scrollTo(0);
              window.history.replaceState(null, "", "/");
              setActiveSection("about");
            }
            setMobileMenuOpen(false);
          }}
          className="font-sans text-base sm:text-lg font-semibold tracking-tight text-foreground shrink-0"
        >
          Hassan<span className="text-primary">.</span>
        </Link>

        <nav className="hidden md:flex items-center rounded-full border border-border/70 bg-card/60 backdrop-blur-md p-0.5 lg:p-1 max-w-[min(100%,28rem)] lg:max-w-none overflow-x-auto scrollbar-none dark:border-white/10 dark:bg-white/[0.03]">
          {navItems.map((item) => {
            const isActive = pathname === "/" && activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSection(item.id)}
                className={cn(
                  "shrink-0 px-2.5 lg:px-4 py-1.5 rounded-full text-[12px] lg:text-[13px] transition-all cursor-pointer border-0",
                  isActive
                    ? "bg-primary text-primary-foreground font-medium shadow-sm shadow-primary/20"
                    : "bg-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center shrink-0 gap-2 lg:gap-2.5">
          <button
            type="button"
            onClick={() => goToSection("contact")}
            className="rounded-full bg-primary text-primary-foreground text-[12px] lg:text-[13px] font-medium px-4 lg:px-5 py-1.5 lg:py-2 hover:bg-primary/90 transition-colors cursor-pointer border-0"
          >
            Let&apos;s Talk
          </button>
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full border border-border/80 text-foreground cursor-pointer bg-card/60 dark:border-white/10 dark:bg-transparent"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/70 bg-background/95 backdrop-blur-xl max-h-[calc(100svh-3.5rem)] overflow-y-auto dark:border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === "/" && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToSection(item.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-full text-sm cursor-pointer border-0",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => goToSection("contact")}
              className="mt-2 w-full rounded-full bg-primary text-primary-foreground text-sm font-medium px-4 py-3 cursor-pointer border-0"
            >
              Let&apos;s Talk
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
