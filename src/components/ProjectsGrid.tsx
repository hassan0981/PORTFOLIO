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
                <article className="surface surface-hover flex flex-col justify-between group h-full">
                  <div className="aspect-[16/10] relative overflow-hidden bg-muted/80 dark:bg-[#0a0b0f] flex flex-col justify-center items-center p-6 text-center border-b border-border/70">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary/70 mb-2">
                      Project
                    </span>
                    <h3 className="text-foreground text-xl font-display font-medium tracking-tight mb-3">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-1.5 max-w-xs">
                      {project.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 border border-border text-muted-foreground font-mono dark:border-white/15 dark:text-white/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      <div className="mt-4 space-y-1.5">
                        {project.features.slice(0, 2).map((feat, idx) => (
                          <div
                            key={idx}
                            className="text-xs text-muted-foreground pl-3 relative before:absolute before:left-0 before:top-[0.5em] before:w-1.5 before:h-px before:bg-primary/50"
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
