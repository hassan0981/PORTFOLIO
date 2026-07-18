import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { dbService } from "@/lib/dbService";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlideUp, FadeIn } from "@/components/Animated";

export const revalidate = 0;

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
    <div className="section-shell">
      <div className="section-inner max-w-4xl">
        <SlideUp delay={0.05}>
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "mb-10 cursor-pointer inline-flex items-center gap-1.5 -ml-2"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to projects</span>
          </Link>
        </SlideUp>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start mb-12">
          <div className="md:col-span-8">
            <SlideUp delay={0.1}>
              <p className="section-index">Case study</p>
              <h1 className="section-title">{project.title}</h1>
              <p className="section-lede">{project.description}</p>
            </SlideUp>
          </div>

          <div className="md:col-span-4">
            <SlideUp delay={0.15}>
              <div className="surface p-5 space-y-5">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-3">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 border border-border/80 text-foreground font-mono text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Role</span>
                  <span className="text-foreground">Developer</span>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-full inline-flex items-center justify-center gap-2 text-xs cursor-pointer"
                      )}
                    >
                      <Github className="h-4 w-4" />
                      <span>Repository</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "w-full inline-flex items-center justify-center gap-2 text-xs cursor-pointer"
                      )}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live demo</span>
                    </a>
                  )}
                </div>
              </div>
            </SlideUp>
          </div>
        </div>

        <FadeIn delay={0.2}>
          <div className="w-full aspect-video border border-border/70 bg-[#0a0b0f] overflow-hidden flex flex-col items-center justify-center relative p-8 mb-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,234,212,0.08),transparent_65%)] pointer-events-none" />
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary/70 z-10 mb-3">
              Project
            </p>
            <h2 className="text-white text-2xl sm:text-3xl font-display font-medium tracking-tight z-10 text-center">
              {project.title}
            </h2>
          </div>
        </FadeIn>

        <SlideUp delay={0.25}>
          <div className="max-w-none text-sm md:text-base leading-relaxed text-muted-foreground space-y-8">
            <div>
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                Overview
              </h2>
              <div className="whitespace-pre-line">{project.content}</div>
            </div>

            <div>
              <h3 className="font-display text-xl font-medium text-foreground mb-5">
                Core specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border/60 border border-border/60">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="p-4 bg-background flex items-start gap-3">
                    <span className="font-mono text-[10px] text-primary mt-0.5 shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-muted-foreground leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SlideUp>
      </div>
    </div>
  );
}
