import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlideUp, ScrollReveal } from "@/components/Animated";

const categories = [
  {
    title: "Frontend Development",
    description: "Modern, responsive interfaces and polished web layouts.",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Zustand", "HTML5 & CSS3"],
  },
  {
    title: "Backend Services",
    description: "Scalable APIs, auth, and service architecture.",
    skills: ["Node.js", "Express.js", "Next.js Route Handlers", "REST APIs", "JSON Web Tokens (JWT)"],
  },
  {
    title: "Database Systems",
    description: "Relational and document stores with solid querying.",
    skills: ["PostgreSQL", "Supabase", "MongoDB", "Prisma ORM", "Mongoose"],
  },
  {
    title: "Mobile Development",
    description: "Cross-platform iOS and Android experiences.",
    skills: ["React Native", "Java", "Android SDK", "State Management", "Native API Integrations"],
  },
  {
    title: "AI & Machine Learning",
    description: "Computer vision and automation pipelines.",
    skills: ["Python", "OpenCV", "MediaPipe", "Face Landmark Tracking", "Automation Pipelines"],
  },
  {
    title: "Developer Tools",
    description: "Collaboration, debugging, and deployment tooling.",
    skills: ["Git & GitHub", "Postman API", "VS Code IDE", "Vercel", "npm / yarn / pnpm", "Linux Bash"],
  },
];

export default function SkillsPage() {
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
          <p className="section-index">Skills</p>
          <h1 className="section-title">Tools & technologies</h1>
          <p className="section-lede mb-14">
            Languages, frameworks, and utilities I use to ship products.
          </p>
        </SlideUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {categories.map((cat, idx) => (
            <ScrollReveal key={cat.title} delay={idx * 0.06}>
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-primary mb-2">
                  0{idx + 1}
                </p>
                <h2 className="font-display text-xl font-medium text-foreground mb-2">
                  {cat.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  {cat.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2.5 py-1.5 border border-border/80 text-muted-foreground hover:text-foreground hover:border-primary/35 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
