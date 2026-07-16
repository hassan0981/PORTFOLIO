import React from "react";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Sparkles,
  Terminal,
  Layers,
  Database,
  Smartphone,
  Cpu,
  Wrench,
  BookOpen,
} from "lucide-react";
import { dbService } from "@/lib/dbService";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SubtitleCycles from "@/components/SubtitleCycles";
import DeveloperVisual from "@/components/DeveloperVisual";
import ContactForm from "@/components/ContactForm";
import { FadeIn, SlideUp, ScrollReveal, HoverLift, TiltCard } from "@/components/Animated";

// Define Skills data structure inline for presentation
const skillsData = [
  {
    category: "Frontend",
    icon: <Layers className="h-4.5 w-4.5 text-indigo-500" />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
  },
  {
    category: "Backend",
    icon: <Terminal className="h-4.5 w-4.5 text-purple-500" />,
    skills: ["Node.js", "Express.js", "Next.js API Routes", "REST APIs", "GraphQL"],
  },
  {
    category: "Databases",
    icon: <Database className="h-4.5 w-4.5 text-emerald-500" />,
    skills: ["MongoDB", "PostgreSQL", "Supabase", "Prisma ORM", "SQL"],
  },
  {
    category: "Mobile & Languages",
    icon: <Smartphone className="h-4.5 w-4.5 text-blue-500" />,
    skills: ["React Native", "JavaScript", "TypeScript", "Python", "Java"],
  },
  {
    category: "AI & Machine Learning",
    icon: <Cpu className="h-4.5 w-4.5 text-rose-500" />,
    skills: ["Python", "OpenCV", "MediaPipe", "Machine Learning", "AI Automation"],
  },
  {
    category: "Tools & DevOps",
    icon: <Wrench className="h-4.5 w-4.5 text-amber-500" />,
    skills: ["Git & GitHub", "Postman", "VS Code", "Vercel", "Docker"],
  },
];

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const projects = await dbService.getProjects();
  const experiences = await dbService.getExperiences();
  const education = await dbService.getEducation();

  // Take top 3 projects for the home page preview
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="relative overflow-hidden">
      {/* Decorative top background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,oklch(0.62_0.19_285/7%),transparent_55%)] pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            <SlideUp delay={0.1}>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold w-fit mx-auto lg:mx-0 mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Available for Full-time Roles & Contracts</span>
              </div>
            </SlideUp>

            <SlideUp delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold tracking-tight text-foreground leading-[1.1] mb-4">
                Muhammad <span className="gradient-text">Hassan Javed</span>
              </h1>
            </SlideUp>

            <SlideUp delay={0.3}>
              <SubtitleCycles />
            </SlideUp>

            <SlideUp delay={0.4}>
              <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                I am a Computer Science graduate passionate about building modern web applications,
                mobile applications, AI-powered systems, and scalable software solutions. I focus
                on writing clean, type-safe code, designing intuitive user experiences, and solving
                complex engineering problems.
              </p>
            </SlideUp>

            {/* CTA Buttons */}
            <SlideUp delay={0.5}>
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/projects"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "px-6 py-5 rounded-xl cursor-pointer inline-flex items-center space-x-2"
                  )}
                >
                  <span>View Projects</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "px-6 py-5 rounded-xl cursor-pointer inline-flex items-center"
                  )}
                >
                  Contact Me
                </Link>
                <Link
                  href="/resume"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                    "px-6 py-5 rounded-xl cursor-pointer inline-flex items-center"
                  )}
                >
                  Get Resume
                </Link>
              </div>
            </SlideUp>

            {/* Social profiles */}
            <SlideUp delay={0.6}>
              <div className="mt-10 flex items-center justify-center lg:justify-start space-x-5">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  Connect:
                </span>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/mhassanjaved"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all"
                    aria-label="GitHub Profile"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/mhassanjaved"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="mailto:mhassanjaved@gmail.com"
                    className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all"
                    aria-label="Email Address"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </SlideUp>
          </div>

          {/* Hero Visual Decoration */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <DeveloperVisual />
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="border-t border-border/80 bg-muted/15 py-20 md:py-28 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Selected Projects
                </h2>
                <p className="text-muted-foreground mt-2 max-w-md">
                  A curated collection of professional products, mobile apps, and machine learning utilities I have engineered.
                </p>
              </div>
              <Link
                href="/projects"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-fit inline-flex items-center space-x-2 text-primary font-semibold hover:text-primary cursor-pointer"
                )}
              >
                <span>View all projects</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx * 0.1} className="h-full">
                <TiltCard className="h-full">
                  <div className="h-full glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between group">
                    {/* Image placeholder with details overlay */}
                    <div className="aspect-video relative overflow-hidden bg-muted flex items-center justify-center border-b border-border">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-10" />
                      {/* Using an elegant CSS graphic wrapper instead of missing real images */}
                      <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
                        <span className="text-white/30 font-mono text-sm tracking-wider uppercase mb-1">Project Build</span>
                        <h4 className="text-white text-lg font-bold tracking-tight">{project.title}</h4>
                        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                          {project.tags.slice(0, 3).map((t) => (
                            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/90 font-semibold">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="text-xs font-semibold text-primary hover:underline flex items-center space-x-1"
                        >
                          <span>Case Study</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                        <div className="flex space-x-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
                              aria-label="GitHub Repo"
                            >
                              <Github className="h-3.5 w-3.5" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
                              aria-label="Live Demo"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Grid Section */}
      <section className="py-20 md:py-28 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Technical Expertise
              </h2>
              <p className="text-muted-foreground mt-2">
                A breakdown of technologies, frameworks, and tools I use to build scalable products.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((category, idx) => (
              <ScrollReveal key={category.category} delay={idx * 0.1}>
                <div className="glass-card glass-card-hover p-6 rounded-2xl h-full flex flex-col justify-start">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-xl bg-secondary border border-border/80">
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-foreground">{category.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1.5 rounded-lg border border-border bg-background hover:border-primary/45 transition-colors text-muted-foreground hover:text-foreground font-medium"
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
      </section>

      {/* Experience & Education Timelines */}
      <section className="border-t border-border/80 bg-muted/15 py-20 md:py-28 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Experience timeline */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <div className="flex items-center space-x-3 mb-10">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Work Experience
                  </h2>
                </div>
              </ScrollReveal>

              <div className="space-y-6 pl-4 border-l border-border relative">
                {experiences.map((exp, idx) => (
                  <ScrollReveal key={exp.id} delay={idx * 0.15}>
                    <div className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-primary border-4 border-background" />

                      <div className="glass-card glass-card-hover p-5 rounded-xl">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                          <h3 className="font-bold text-foreground text-base">
                            {exp.role}
                          </h3>
                          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-secondary text-muted-foreground w-fit">
                            {exp.duration}
                          </span>
                        </div>
                        <h4 className="text-xs font-mono font-bold text-primary mb-4">
                          {exp.company}
                        </h4>
                        <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4 leading-relaxed">
                          {exp.responsibilities.map((resp, rid) => (
                            <li key={rid}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Education timeline */}
            <div className="lg:col-span-5">
              <ScrollReveal>
                <div className="flex items-center space-x-3 mb-10">
                  <GraduationCap className="h-5 w-5 text-indigo-500" />
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Education
                  </h2>
                </div>
              </ScrollReveal>

              <div className="space-y-6 pl-4 border-l border-border relative">
                {education.map((edu, idx) => (
                  <ScrollReveal key={edu.id} delay={idx * 0.15}>
                    <div className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-[#7c6ef6] border-4 border-background" />

                      <div className="glass-card glass-card-hover p-5 rounded-xl">
                        <div className="flex flex-col gap-1 mb-3">
                          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-secondary text-muted-foreground w-fit">
                            {edu.duration}
                          </span>
                          <h3 className="font-bold text-foreground text-sm mt-1">
                            {edu.degree}
                          </h3>
                        </div>
                        <h4 className="text-xs font-mono font-bold text-indigo-500 mb-3">
                          {edu.school}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {edu.details}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="border-t border-border/80 bg-muted/15 py-20 md:py-28 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Info panel */}
            <div className="lg:col-span-5 space-y-6">
              <ScrollReveal>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-500 text-xs font-semibold w-fit mb-4">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Let's collaborate</span>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                  Get In Touch
                </h2>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  Have an exciting project idea, looking for a full stack developer, or just want
                  to say hello? Drop a message and let's construct something premium together.
                </p>
              </ScrollReveal>

              <div className="space-y-4 pt-4">
                <ScrollReveal delay={0.1}>
                  <div className="flex items-center space-x-3.5 text-xs text-muted-foreground">
                    <span className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-primary font-mono shrink-0">
                      @
                    </span>
                    <div>
                      <p className="font-bold text-foreground">Email</p>
                      <a href="mailto:mhassanjaved@gmail.com" className="hover:underline hover:text-primary">
                        mhassanjaved@gmail.com
                      </a>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <div className="flex items-center space-x-3.5 text-xs text-muted-foreground">
                    <span className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-primary font-mono shrink-0">
                      in
                    </span>
                    <div>
                      <p className="font-bold text-foreground">LinkedIn</p>
                      <a
                        href="https://linkedin.com/in/mhassanjaved"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline hover:text-primary"
                      >
                        linkedin.com/in/mhassanjaved
                      </a>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <div className="flex items-center space-x-3.5 text-xs text-muted-foreground">
                    <span className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-primary font-mono shrink-0">
                      loc
                    </span>
                    <div>
                      <p className="font-bold text-foreground">Location & Availability</p>
                      <p className="text-muted-foreground">Available globally for remote work</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Form panel */}
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.1}>
                <ContactForm />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
