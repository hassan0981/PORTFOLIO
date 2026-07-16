import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink, ShieldCheck } from "lucide-react";
import { dbService } from "@/lib/dbService";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlideUp, FadeIn } from "@/components/Animated";

interface ProjectDetailsProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const projects = await dbService.getProjects();
    return projects.map((p) => ({ slug: p.slug }));
  } catch (e) {
    console.error("Error in generateStaticParams for projects:", e);
    return [];
  }
}

export async function generateMetadata({ params }: ProjectDetailsProps) {
  const { slug } = await params;
  const project = await dbService.getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Muhammad Hassan Javed",
    };
  }

  return {
    title: `${project.title} - Case Study | Muhammad Hassan Javed`,
    description: project.description,
    openGraph: {
      title: `${project.title} - Case Study | Muhammad Hassan Javed`,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailsProps) {
  const { slug } = await params;
  const project = await dbService.getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Back to projects link */}
      <SlideUp delay={0.05}>
        <Link
          href="/projects"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "mb-8 cursor-pointer inline-flex items-center space-x-1"
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Projects</span>
        </Link>
      </SlideUp>

      {/* Main Grid: Header & Meta Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start mb-12">
        {/* Title & Desc */}
        <div className="md:col-span-8">
          <SlideUp delay={0.1}>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {project.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-base sm:text-lg leading-relaxed">
              {project.description}
            </p>
          </SlideUp>
        </div>

        {/* Info list */}
        <div className="md:col-span-4 glass-card glass-card-hover p-5 rounded-2xl space-y-4">
          <SlideUp delay={0.15}>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Project Meta
            </h3>
            <div className="space-y-3 pt-2 text-xs">
              <div>
                <p className="text-muted-foreground">Technologies</p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-secondary text-foreground font-mono font-semibold text-[10px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-border flex items-center justify-between">
                <span className="text-muted-foreground">Role</span>
                <span className="font-medium text-foreground">Developer</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2 mt-6">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full flex items-center justify-center space-x-2 text-xs cursor-pointer"
                  )}
                >
                  <Github className="h-4 w-4" />
                  <span>View Repository</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "w-full flex items-center justify-center space-x-2 text-xs cursor-pointer"
                  )}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Demonstration</span>
                </a>
              )}
            </div>
          </SlideUp>
        </div>
      </div>

      {/* Decorative Project visual cover */}
      <FadeIn delay={0.25}>
        <div className="w-full aspect-video rounded-3xl bg-slate-950 border border-border overflow-hidden flex flex-col items-center justify-center relative p-8 mb-12 shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.62_0.19_285/10%),transparent_70%)] pointer-events-none" />
          <h2 className="text-white text-3xl font-extrabold tracking-tight z-10 text-center">
            {project.title}
          </h2>
          <p className="text-indigo-200 text-sm mt-3 z-10 text-center max-w-md">
            Interactive application architecture detail and live schema view.
          </p>
        </div>
      </FadeIn>

      {/* Case Study Content */}
      <SlideUp delay={0.3}>
        <div className="prose prose-slate dark:prose-invert max-w-none text-sm md:text-base leading-relaxed text-muted-foreground space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">Case Study Overview</h2>
          <div className="whitespace-pre-line">{project.content}</div>

          {/* Project Highlights list */}
          <h3 className="text-lg font-bold text-foreground mt-8 mb-4">Core Specifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl glass-card glass-card-hover flex items-start space-x-3"
              >
                <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-muted-foreground">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </SlideUp>
    </div>
  );
}
