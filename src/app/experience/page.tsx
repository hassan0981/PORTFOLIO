import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { dbService } from "@/lib/dbService";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlideUp, ScrollReveal } from "@/components/Animated";

export const revalidate = 3600;

export default async function ExperiencePage() {
  const experiences = await dbService.getExperiences();

  return (
    <div className="section-shell">
      <div className="section-inner max-w-4xl">
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
          <p className="section-index">Experience</p>
          <h1 className="section-title">Where I&apos;ve made an impact</h1>
          <p className="section-lede mb-14">
            Professional roles, product work, and client engagements.
          </p>
        </SlideUp>

        <div className="space-y-0">
          {experiences.map((exp, idx) => (
            <ScrollReveal key={exp.id} delay={idx * 0.08}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-t border-border/70">
                <div className="md:col-span-3">
                  <p className="font-mono text-xs text-muted-foreground tracking-wide">
                    {exp.duration}
                  </p>
                </div>
                <div className="md:col-span-9">
                  <h2 className="text-xl font-display font-medium text-foreground">{exp.role}</h2>
                  <p className="text-sm text-primary mt-1">{exp.company}</p>
                  <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground leading-relaxed">
                    {exp.responsibilities.map((resp, rid) => (
                      <li
                        key={rid}
                        className="pl-4 relative before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-px before:bg-primary/50"
                      >
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
