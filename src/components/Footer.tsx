import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/80 bg-background/50 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <Link
            href="/"
            className="font-mono text-sm font-semibold tracking-tight text-foreground hover:opacity-85 transition-opacity"
          >
            <span className="text-primary">&lt;</span>
            <span>Hassan Javed</span>
            <span className="text-primary"> /&gt;</span>
          </Link>
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Muhammad Hassan Javed. All rights reserved.
          </p>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex items-center space-x-5 text-xs text-muted-foreground">
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <span>&bull;</span>
          <Link href="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
          <span>&bull;</span>
          <Link href="/resume" className="hover:text-primary transition-colors">
            Resume
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/mhassanjaved"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/in/mhassanjaved"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="mailto:mhassanjaved@gmail.com"
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
