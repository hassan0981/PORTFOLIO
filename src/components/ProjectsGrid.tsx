"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { ProjectData } from "@/lib/dbService";
import { HoverLift } from "@/components/Animated";

interface ProjectsGridProps {
  projects: ProjectData[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((proj) => {
      proj.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, [projects]);

  const filteredProjects = React.useMemo(() => {
    if (!selectedTag) return projects;
    return projects.filter((p) => p.tags.includes(selectedTag));
  }, [projects, selectedTag]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-12">
        <button
          onClick={() => setSelectedTag(null)}
          className={`text-xs px-3 py-1.5 border font-medium transition-colors cursor-pointer ${
            selectedTag === null
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:text-foreground hover:border-primary/35"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`text-xs px-3 py-1.5 border font-medium transition-colors cursor-pointer ${
              selectedTag === tag
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-primary/35"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              key={project.id}
              className="h-full"
            >
              <HoverLift className="h-full">
                <article className="panel-surface h-full rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-teal-500/35 hover:shadow-lg hover:shadow-teal-500/[0.02] dark:hover:shadow-[0_20px_50px_-25px_rgba(94,234,212,0.15)] transition-all duration-300">
                  <div className="aspect-[16/10] bg-gradient-to-br from-teal-500/5 via-background to-teal-500/[0.02] border-b border-border/70 dark:from-[#081b1c] dark:via-[#07080c] dark:to-[#091518] dark:border-white/10 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.12),transparent_55%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(94,234,212,0.12),transparent_55%)]" />
                    <span className="relative font-mono text-[9px] tracking-[0.2em] uppercase text-teal-600 dark:text-teal-300 font-semibold mb-1.5">
                      Project
                    </span>
                    <h3 className="relative text-foreground text-xl font-display font-medium tracking-tight mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">
                      {project.title}
                    </h3>
                    <div className="relative flex flex-wrap justify-center gap-1.5 max-w-xs">
                      {project.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-[9px] px-2.5 py-0.5 rounded-full border border-teal-200/60 bg-teal-50/50 text-teal-700 font-mono font-bold dark:border-teal-500/30 dark:bg-teal-500/10 dark:text-teal-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-2 leading-relaxed line-clamp-3 font-medium">
                        {project.description}
                      </p>

                      <div className="mt-4 space-y-1.5">
                        {project.features.slice(0, 2).map((feat, idx) => (
                          <div
                            key={idx}
                            className="text-xs text-muted-foreground pl-4 relative before:absolute before:left-0 before:top-[0.55em] before:w-1.2 before:h-1.2 before:rounded-full before:bg-primary/50"
                          >
                            {feat}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-xs font-medium text-primary inline-flex items-center gap-1 hover:underline"
                      >
                        Case study <ArrowRight className="h-3 w-3" />
                      </Link>

                      <div className="flex gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="GitHub"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Live demo"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </HoverLift>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
