import React from "react";
import Link from "next/link";
import { Briefcase, ArrowLeft } from "lucide-react";
import { dbService } from "@/lib/dbService";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlideUp, ScrollReveal } from "@/components/Animated";

export const revalidate = 3600;

export default async function ExperiencePage() {
  const experiences = await dbService.getExperiences();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Back button */}
      <SlideUp delay={0.05}>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "mb-8 cursor-pointer inline-flex items-center space-x-1"
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </SlideUp>

      {/* Header */}
      <SlideUp delay={0.1}>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Work History
        </h1>
        <p className="text-muted-foreground mt-3 text-base sm:text-lg max-w-xl leading-relaxed mb-12">
          A record of my professional experience, developer roles, and projects.
        </p>
      </SlideUp>

      {/* Experience timeline */}
      <div className="pl-4 border-l border-border relative space-y-8">
        {experiences.map((exp, idx) => (
          <ScrollReveal key={exp.id} delay={idx * 0.1}>
            <div className="relative">
              {/* Timeline indicator dot */}
              <span className="absolute -left-[21px] top-2 w-3 h-3 rounded-full bg-primary border-4 border-background" />

              <div className="glass-card glass-card-hover p-6 rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {exp.role}
                    </h3>
                    <p className="text-xs font-mono font-bold text-primary mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-medium px-3 py-1 rounded-lg bg-secondary text-muted-foreground w-fit h-fit">
                    {exp.duration}
                  </span>
                </div>

                <div className="mt-6">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-3">
                    Key Responsibilities & Achievements
                  </h4>
                  <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-4 leading-relaxed">
                    {exp.responsibilities.map((resp, rid) => (
                      <li key={rid}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
