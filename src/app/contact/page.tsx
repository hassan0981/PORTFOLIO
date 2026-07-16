import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ContactForm from "@/components/ContactForm";
import { SlideUp } from "@/components/Animated";

export default function ContactPage() {
  return (
    <div className="section-shell">
      <div className="section-inner max-w-5xl">
        <SlideUp delay={0.05}>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "mb-10 cursor-pointer inline-flex items-center gap-1.5 -ml-2"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
        </SlideUp>

        <SlideUp delay={0.1}>
          <p className="section-index">Contact</p>
          <h1 className="section-title">Let&apos;s work together</h1>
          <p className="section-lede mb-14">
            Discuss a project, collaboration, or role — use the form or reach out directly.
          </p>
        </SlideUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-6">
            <SlideUp delay={0.15}>
              <div className="space-y-6">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                    Email
                  </p>
                  <a
                    href="mailto:mhassanjaved@gmail.com"
                    className="text-sm text-foreground hover:text-primary transition-colors"
                  >
                    mhassanjaved@gmail.com
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                    LinkedIn
                  </p>
                  <a
                    href="https://linkedin.com/in/mhassanjaved"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground hover:text-primary transition-colors"
                  >
                    linkedin.com/in/mhassanjaved
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                    GitHub
                  </p>
                  <a
                    href="https://github.com/mhassanjaved"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground hover:text-primary transition-colors"
                  >
                    github.com/mhassanjaved
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                    Availability
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Open to remote roles and contract work
                  </p>
                </div>
              </div>
            </SlideUp>
          </div>

          <div className="lg:col-span-8">
            <SlideUp delay={0.2}>
              <ContactForm />
            </SlideUp>
          </div>
        </div>
      </div>
    </div>
  );
}
