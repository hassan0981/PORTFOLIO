"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { ProjectData } from "@/lib/dbService";
import { TiltCard } from "@/components/Animated";

interface ProjectsGridProps {
  projects: ProjectData[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

  // Extract unique tags across all projects
  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((proj) => {
      proj.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, [projects]);

  // Filter projects by selected tag
  const filteredProjects = React.useMemo(() => {
    if (!selectedTag) return projects;
    return projects.filter((p) => p.tags.includes(selectedTag));
  }, [projects, selectedTag]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <button
          onClick={() => setSelectedTag(null)}
          className={`text-xs px-3.5 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
            selectedTag === null
              ? "bg-primary border-primary text-primary-foreground shadow-sm shadow-primary/10"
              : "border-border hover:border-muted-foreground/35 bg-card text-muted-foreground hover:text-foreground"
          }`}
        >
          All Projects
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`text-xs px-3.5 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
              selectedTag === tag
                ? "bg-primary border-primary text-primary-foreground shadow-sm shadow-primary/10"
                : "border-border hover:border-muted-foreground/35 bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Projects Grid Layout */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              key={project.id}
              className="h-full"
            >
              <TiltCard className="h-full">
                <div className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between group h-full">
                  {/* Graphic/Image cover representation */}
                  <div className="aspect-video relative overflow-hidden bg-slate-950 flex flex-col justify-center items-center p-6 text-center border-b border-border">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
                    <span className="text-[10px] font-mono tracking-widest text-indigo-400/80 uppercase mb-1">
                      Engineered Solution
                    </span>
                    <h3 className="text-white text-xl font-bold tracking-tight mb-2">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-1.5 mt-2 max-w-xs">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-white/90 font-semibold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-xs md:text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Highlights list */}
                      <div className="mt-4 space-y-1">
                        {project.features.slice(0, 2).map((feat, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer links */}
                    <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-xs font-semibold text-primary hover:underline flex items-center space-x-1"
                      >
                        <span>Read Study Case</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>

                      <div className="flex space-x-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="GitHub Repository"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Live Website"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
