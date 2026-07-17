import React from "react";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  ExternalLink,
  ArrowDown,
} from "lucide-react";
import { dbService } from "@/lib/dbService";
import ContactForm from "@/components/ContactForm";
import SectionLink from "@/components/SectionLink";
import ProfileCard from "@/components/ProfileCard";
import PageAtmosphere from "@/components/PageAtmosphere";
import SectionAccentLazy from "@/components/SectionAccentLazy";
import { SlideUp, ScrollReveal, HoverLift, TiltCard } from "@/components/Animated";

const skillsData = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "Next.js API Routes", "REST APIs", "GraphQL"],
  },
  {
    category: "Databases",
    skills: ["MongoDB", "PostgreSQL", "Supabase", "Prisma ORM", "SQL"],
  },
  {
    category: "Mobile & Languages",
    skills: ["React Native", "JavaScript", "TypeScript", "Python", "Java"],
  },
  {
    category: "AI & Machine Learning",
    skills: ["Python", "OpenCV", "MediaPipe", "Machine Learning", "AI Automation"],
  },
  {
    category: "Tools & DevOps",
    skills: ["Git & GitHub", "Postman", "VS Code", "Vercel", "Docker"],
  },
];

export const revalidate = 3600;

export default async function Home() {
  const projects = await dbService.getProjects();
  const experiences = await dbService.getExperiences();
  const education = await dbService.getEducation();
  const featuredProjects = projects.slice(0, 3);
  const projectCount = Math.max(projects.length, 20);
  const topEducation = education[0];

  return (
    <div className="relative overflow-x-hidden">
      {/* Persistent 3D atmosphere for the whole page */}
      <PageAtmosphere />

      {/* Hero */}
      <section
        id="home"
        className="relative min-h-[100svh] flex flex-col justify-center pt-2 pb-8 sm:pt-4 sm:pb-10 overflow-x-hidden"
      >
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/10 via-transparent to-background/45 dark:from-background/30 dark:via-background/15 dark:to-background/70" />

        <div className="section-inner relative z-10 w-full flex-1 flex flex-col justify-center py-6 sm:py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-12 items-center">
            <div className="md:col-span-7 text-center md:text-left order-1">
              <SlideUp delay={0.05}>
                <h1 className="text-[2.35rem] sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium tracking-[-0.02em] text-foreground leading-[1.1] sm:leading-[1.08]">
                  Muhammad Hassan
                  <br />
                  Javed
                </h1>
              </SlideUp>

              <SlideUp delay={0.15}>
                <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0 leading-relaxed px-1 sm:px-0">
                  I build modern web applications, mobile products, and AI-powered systems
                  for startups and product teams — clean architecture, type-safe code, and thoughtful UX.
                </p>
              </SlideUp>

              <SlideUp delay={0.25}>
                <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
                  <SectionLink
                    sectionId="contact"
                    className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-5 sm:px-6 py-2.5 text-sm font-medium text-foreground hover:border-primary/50 hover:text-primary transition-colors min-h-11 dark:border-white/25"
                  >
                    Book a call
                  </SectionLink>

                  <div className="flex items-center gap-2.5">
                    <a
                      href="https://github.com/mhassanjaved"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-chip h-11 w-11 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href="https://linkedin.com/in/muhammad-hassan-javed-4197212b7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-chip h-11 w-11 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href="mailto:hass.javed25@gmail.com"
                      className="icon-chip h-11 w-11 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </SlideUp>
            </div>

            <div className="md:col-span-5 relative order-2">
              <ProfileCard projectCount={projectCount} />
            </div>
          </div>

          <div className="mt-10 sm:mt-12 md:mt-16 grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {[
              { value: `${projectCount}+`, label: "Projects Delivered" },
              {
                value: topEducation?.degree?.includes("Bachelor")
                  ? "BSCS"
                  : topEducation?.degree?.split(" ")[0] || "CS",
                label: topEducation?.school
                  ? topEducation.school
                  : "Computer Science",
              },
              { value: "3+", label: "Years Building" },
            ].map((stat, i) => (
              <SlideUp key={stat.label} delay={0.3 + i * 0.08}>
                <div className="panel-surface rounded-xl sm:rounded-2xl px-2 py-3.5 sm:px-5 sm:py-5 text-center hover:-translate-y-1 transition-transform duration-300 h-full">
                  <p className="font-sans text-lg sm:text-2xl md:text-3xl font-bold text-primary tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-1 sm:mt-1.5 text-[10px] sm:text-xs text-muted-foreground line-clamp-2 sm:line-clamp-1 leading-snug">
                    {stat.label}
                  </p>
                </div>
              </SlideUp>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 flex justify-center">
            <SectionLink
              sectionId="about"
              className="inline-flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase">
                Scroll down
              </span>
              <ArrowDown className="h-4 w-4 animate-bounce-y" />
            </SectionLink>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="section-shell hairline scroll-mt-24 relative z-10 bg-background/55 backdrop-blur-[2px]"
      >
        <SectionAccentLazy
          variant="orb"
          className="hidden md:block left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[380px] md:h-[380px] opacity-45 pointer-events-none"
          opacity={0.32}
        />
        <div className="section-inner relative">
          <ScrollReveal>
            <p className="section-index">01 — About</p>
            <h2 className="section-title max-w-3xl">
              A developer who ships across the stack
            </h2>
            <p className="section-lede">
              Computer Science graduate focused on modern web apps, mobile experiences,
              AI-powered systems, and scalable software — from concept to production.
            </p>
          </ScrollReveal>

          <div className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <ScrollReveal delay={0.1}>
              <div className="panel-surface rounded-2xl p-5 sm:p-6 md:p-7 h-full [transform-style:preserve-3d] hover:-translate-y-1 hover:border-primary/25 transition-all duration-300">
                <h3 className="font-display text-lg sm:text-xl text-foreground">What I focus on</h3>
                <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  Writing clean, type-safe code, designing intuitive interfaces, and solving
                  complex engineering problems end to end — frontend, backend, mobile, and AI automation.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="panel-surface rounded-2xl p-5 sm:p-6 md:p-7 h-full hover:-translate-y-1 hover:border-primary/30 hover:shadow-md hover:shadow-primary/[0.01] transition-all duration-300">
                <h3 className="font-display text-lg sm:text-xl text-foreground mb-4 sm:mb-5">Education</h3>
                <div className="space-y-4">
                  {education.slice(0, 2).map((edu) => (
                    <div key={edu.id} className="group border-l-2 border-primary/25 hover:border-primary pl-4 transition-colors duration-300">
                      <p className="font-mono text-[11px] tracking-wide text-muted-foreground group-hover:text-primary transition-colors">
                        {edu.duration}
                      </p>
                      <p className="text-sm font-medium text-foreground mt-1">{edu.degree}</p>
                      <p className="text-xs text-primary mt-0.5 font-medium">{edu.school}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="section-shell hairline scroll-mt-24 relative z-10 bg-background/60 backdrop-blur-[2px]"
      >
        <SectionAccentLazy
          variant="lattice"
          className="hidden md:block left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[240px] h-[240px] md:w-[320px] md:h-[320px] opacity-40 pointer-events-none"
          opacity={0.26}
        />
        <div className="section-inner relative">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 md:mb-14">
              <div>
                <p className="section-index">02 — Projects</p>
                <h2 className="section-title">Selected work</h2>
                <p className="section-lede">
                  Products, mobile apps, and tools I have engineered.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 [perspective:1200px]">
            {featuredProjects.map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx * 0.08}>
                <TiltCard className="h-full">
                  <HoverLift className="h-full">
                    <article className="panel-surface h-full rounded-2xl overflow-hidden flex flex-col group hover:border-teal-500/35 hover:shadow-lg hover:shadow-teal-500/[0.02] dark:hover:shadow-[0_20px_50px_-25px_rgba(94,234,212,0.15)] transition-all duration-300">
                      <div className="aspect-[16/10] bg-gradient-to-br from-teal-500/5 via-background to-teal-500/[0.02] border-b border-border/70 dark:from-[#081b1c] dark:via-[#07080c] dark:to-[#091518] dark:border-white/10 flex flex-col items-center justify-center p-5 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.12),transparent_55%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(94,234,212,0.12),transparent_55%)]" />
                        <span className="relative font-mono text-[9px] tracking-[0.2em] uppercase text-teal-600 dark:text-teal-300 font-semibold mb-1.5">
                          Project
                        </span>
                        <h3 className="relative text-foreground text-base font-display font-medium tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">
                          {project.title}
                        </h3>
                        <div className="relative flex flex-wrap justify-center gap-1.5 mt-3">
                          {project.tags.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="text-[9px] px-2.5 py-0.5 rounded-full border border-teal-200/60 bg-teal-50/50 text-teal-700 font-mono font-bold dark:border-teal-500/30 dark:bg-teal-500/10 dark:text-teal-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 flex-grow flex flex-col items-center text-center justify-between">
                        <div>
                          <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-1.5 line-clamp-2 leading-relaxed font-medium">
                            {project.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-border/70 dark:border-white/10 w-full flex items-center justify-center gap-4">
                          <Link
                            href={`/projects/${project.slug}`}
                            className="text-[11px] font-medium text-primary inline-flex items-center gap-1 hover:underline"
                          >
                            Case study{" "}
                            <ArrowRight className="h-3 w-3 animate-bounce-x" />
                          </Link>
                          <div className="flex gap-2">
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="GitHub"
                              >
                                <Github className="h-3.5 w-3.5" />
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
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  </HoverLift>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-10 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                Browse all projects <ArrowRight className="h-3.5 w-3.5 animate-bounce-x" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="section-shell hairline scroll-mt-24 relative z-10 bg-background/55 backdrop-blur-[2px]"
      >
        <SectionAccentLazy
          variant="prism"
          className="hidden md:block left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[240px] h-[240px] md:w-[300px] md:h-[300px] opacity-45 pointer-events-none"
          opacity={0.28}
        />
        <div className="section-inner relative">
          <ScrollReveal>
            <p className="section-index">03 — Experience</p>
            <h2 className="section-title">Where I&apos;ve made an impact</h2>
            <p className="section-lede">
              Roles across product teams, startups, and client work.
            </p>
          </ScrollReveal>

          <div className="mt-10 sm:mt-12 md:mt-14 space-y-3 sm:space-y-4">
            {experiences.map((exp, idx) => (
              <ScrollReveal key={exp.id} delay={idx * 0.08}>
                <div className="panel-surface relative grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 rounded-2xl px-4 py-5 sm:px-5 sm:py-6 md:px-7 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md hover:shadow-primary/[0.02] dark:hover:shadow-[0_20px_50px_-30px_rgba(94,234,212,0.1)] transition-all duration-300 overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
                  <div className="md:col-span-3">
                    <p className="font-mono text-[11px] sm:text-xs text-muted-foreground tracking-wide group-hover:text-primary transition-colors">
                      {exp.duration}
                    </p>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="text-base sm:text-lg font-display font-medium text-foreground group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-primary mt-1 font-medium">{exp.company}</p>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed">
                      {exp.responsibilities.slice(0, 3).map((resp, rid) => (
                        <li
                          key={rid}
                          className="pl-5 relative before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/50"
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
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="section-shell hairline scroll-mt-24 relative z-10 bg-background/60 backdrop-blur-[2px]"
      >
        <SectionAccentLazy
          variant="nodes"
          className="hidden md:block left-1/2 -translate-x-1/2 top-8 w-[220px] h-[220px] md:w-[280px] md:h-[280px] opacity-50"
          opacity={0.3}
        />
        <div className="section-inner relative">
          <ScrollReveal>
            <p className="section-index">04 — Skills</p>
            <h2 className="section-title">Tools & technologies</h2>
            <p className="section-lede">
              A toolkit spanning frontend, backend, mobile, AI, and delivery.
            </p>
          </ScrollReveal>

          <div className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 [perspective:1000px]">
            {skillsData.map((category, idx) => (
              <ScrollReveal key={category.category} delay={idx * 0.05}>
                <HoverLift className="h-full">
                  <div className="panel-surface h-full rounded-2xl p-4 sm:p-5 md:p-6 hover:border-primary/30 transition-colors duration-300">
                    <h3 className="font-mono text-[11px] tracking-[0.18em] uppercase text-primary mb-4">
                      {category.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2.5 py-1.5 border border-border bg-muted/50 text-muted-foreground hover:text-foreground hover:border-primary/35 transition-colors dark:border-white/10 dark:bg-white/[0.02]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </HoverLift>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="section-shell hairline scroll-mt-24 relative z-10 bg-background/70 backdrop-blur-[2px]"
      >
        <SectionAccentLazy
          variant="rings"
          className="hidden md:block left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] opacity-45 pointer-events-none"
          opacity={0.3}
        />
        <div className="section-inner relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <p className="section-index">05 — Contact</p>
                <h2 className="section-title">Let&apos;s work together</h2>
                <p className="section-lede">
                  Have a project idea, looking for a full-stack developer, or want to say hello?
                  Drop a message.
                </p>
              </ScrollReveal>

              <div className="mt-8 sm:mt-10 space-y-3 sm:space-y-5">
                <ScrollReveal delay={0.1}>
                  <div className="panel-surface rounded-xl px-4 py-3">
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:hass.javed25@gmail.com"
                      className="text-sm text-foreground hover:text-primary transition-colors break-all"
                    >
                      hass.javed25@gmail.com
                    </a>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.15}>
                  <div className="panel-surface rounded-xl px-4 py-3">
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                      LinkedIn
                    </p>
                    <a
                      href="https://www.linkedin.com/in/muhammad-hassan-javed-4197212b7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground hover:text-primary transition-colors break-all"
                    >
                      linkedin.com/in/muhammad-hassan-javed-4197212b7
                    </a>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <div className="panel-surface rounded-xl px-4 py-3">
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                      Availability
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Open to remote roles and contract work
                    </p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.25}>
                  <Link
                    href="/resume"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline pt-2 min-h-11"
                  >
                    View resume <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </ScrollReveal>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ScrollReveal delay={0.1}>
                <div className="relative">
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-primary/5 opacity-70 pointer-events-none" />
                  <div className="relative">
                    <ContactForm />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
