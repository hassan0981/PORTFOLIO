import React from "react";
import Link from "next/link";
import { ArrowLeft, Layers, Terminal, Database, Smartphone, Cpu, Wrench } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlideUp, ScrollReveal } from "@/components/Animated";

const categories = [
  {
    title: "Frontend Development",
    icon: <Layers className="h-5 w-5 text-indigo-500" />,
    description: "Designing modern, pixel-perfect user interfaces and highly responsive web layouts.",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Zustand", "HTML5 & CSS3"],
  },
  {
    title: "Backend Services",
    icon: <Terminal className="h-5 w-5 text-purple-500" />,
    description: "Building scalable backend microservices, REST APIs, and database sync routing.",
    skills: ["Node.js", "Express.js", "Next.js Route Handlers", "REST APIs", "JSON Web Tokens (JWT)"],
  },
  {
    title: "Database Systems",
    icon: <Database className="h-5 w-5 text-emerald-500" />,
    description: "Structuring relational databases and document storage engines with fast querying indexes.",
    skills: ["PostgreSQL", "Supabase", "MongoDB", "Prisma ORM", "Mongoose"],
  },
  {
    title: "Mobile Development",
    icon: <Smartphone className="h-5 w-5 text-blue-500" />,
    description: "Creating cross-platform mobile apps for iOS and Android with native bridging.",
    skills: ["React Native", "Java", "Android SDK", "State Management", "Native API Integrations"],
  },
  {
    title: "AI & Machine Learning",
    icon: <Cpu className="h-5 w-5 text-rose-500" />,
    description: "Implementing computer vision algorithms and integrating machine learning edge models.",
    skills: ["Python", "OpenCV", "MediaPipe", "Face Landmark Tracking", "Automation Pipelines"],
  },
  {
    title: "Developer Tools",
    icon: <Wrench className="h-5 w-5 text-amber-500" />,
    description: "Utilizing modern collaboration, debugging, and deployment infrastructure.",
    skills: ["Git & GitHub", "Postman API", "VS Code IDE", "Vercel", "npm / yarn / pnpm", "Linux Bash"],
  },
];

export default function SkillsPage() {
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
          Skills & Technologies
        </h1>
        <p className="text-muted-foreground mt-3 text-base sm:text-lg max-w-xl leading-relaxed mb-12">
          An overview of my tech stack, programming languages, libraries, and utilities.
        </p>
      </SlideUp>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => (
          <ScrollReveal key={cat.title} delay={idx * 0.08}>
            <div className="p-6 glass-card glass-card-hover rounded-2xl h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-secondary border border-border/80 rounded-xl">
                    {cat.icon}
                  </div>
                  <h2 className="font-bold text-foreground text-base">{cat.title}</h2>
                </div>
                <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1.5 rounded-lg border border-border bg-background hover:border-primary/50 transition-colors text-muted-foreground hover:text-foreground font-semibold"
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
  );
}
