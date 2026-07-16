import React from "react";
import Link from "next/link";
import { ArrowLeft, FileDown, Briefcase, GraduationCap, Code2, Award, Terminal } from "lucide-react";
import { dbService } from "@/lib/dbService";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlideUp, ScrollReveal } from "@/components/Animated";

export const revalidate = 3600;

export default async function ResumePage() {
  const resumeUrl = await dbService.getResumeUrl();
  const experiences = await dbService.getExperiences();
  const education = await dbService.getEducation();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Back button & Download Action */}
      <SlideUp delay={0.05}>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "cursor-pointer flex items-center space-x-1"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className={cn(
              buttonVariants({ size: "sm" }),
              "flex items-center space-x-1.5 cursor-pointer"
            )}
          >
            <FileDown className="h-4 w-4" />
            <span>Download PDF Resume</span>
          </a>
        </div>
      </SlideUp>

      {/* Printable / Viewable Resume Frame */}
      <SlideUp delay={0.1}>
        <div className="w-full bg-card border border-border p-6 sm:p-10 rounded-3xl shadow-sm space-y-8 select-text">
          {/* Header */}
          <div className="border-b border-border/80 pb-6 text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-foreground">Muhammad Hassan Javed</h1>
            <p className="text-sm font-mono font-bold text-primary mt-1">
              Full Stack Developer & AI Automation Engineer
            </p>
            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs text-muted-foreground font-mono">
              <span>Email: mhassanjaved@gmail.com</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>LinkedIn: linkedin.com/in/mhassanjaved</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>GitHub: github.com/mhassanjaved</span>
            </div>
          </div>

          {/* Intro summary */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center space-x-2">
              <Terminal className="h-4 w-4 text-primary" />
              <span>Professional Summary</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              I am a Computer Science graduate passionate about building modern web applications,
              mobile applications, AI-powered systems, and scalable software solutions. I enjoy
              creating clean, user-friendly experiences with modern technologies while continuously
              learning and improving my skills.
            </p>
          </div>

          {/* Skills block */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center space-x-2">
              <Code2 className="h-4 w-4 text-indigo-500" />
              <span>Technical Expertise</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs sm:text-sm">
              <div className="space-y-1">
                <p className="font-bold text-foreground">Languages & Frameworks</p>
                <p className="text-xs text-muted-foreground">
                  JavaScript, TypeScript, Python, Java, HTML5, CSS3, React, Next.js, Express.js, Node.js
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-foreground">Databases & Tools</p>
                <p className="text-xs text-muted-foreground">
                  MongoDB, PostgreSQL, Supabase, Prisma, Git, GitHub, Postman API, VS Code
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-foreground">Mobile & AI</p>
                <p className="text-xs text-muted-foreground">
                  React Native, Java (Android SDK), OpenCV, MediaPipe, AI Automations
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-foreground">Methodologies</p>
                <p className="text-xs text-muted-foreground">
                  REST APIs integration, state management, SEO optimization, responsive layouts, client CRUD
                </p>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center space-x-2">
              <Briefcase className="h-4 w-4 text-purple-500" />
              <span>Work Experience</span>
            </h2>

            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                    <p className="font-bold text-foreground">
                      {exp.role} <span className="text-primary font-mono text-xs">@ {exp.company}</span>
                    </p>
                    <span className="text-xs font-mono text-muted-foreground">{exp.duration}</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-muted-foreground leading-relaxed">
                    {exp.responsibilities.map((resp, rid) => (
                      <li key={rid}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center space-x-2">
              <GraduationCap className="h-4 w-4 text-rose-500" />
              <span>Education</span>
            </h2>

            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                    <p className="font-bold text-foreground">{edu.degree}</p>
                    <span className="text-xs font-mono text-muted-foreground">{edu.duration}</span>
                  </div>
                  <p className="text-xs font-mono text-indigo-500">{edu.school}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{edu.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SlideUp>
    </div>
  );
}
