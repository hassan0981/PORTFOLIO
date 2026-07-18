import React from "react";
import Link from "next/link";
import { ArrowLeft, FileDown } from "lucide-react";
import { dbService } from "@/lib/dbService";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlideUp } from "@/components/Animated";

export const revalidate = 0;

export default async function ResumePage() {
  const resumeUrl = await dbService.getResumeUrl();
  const experiences = await dbService.getExperiences();
  const education = await dbService.getEducation();
  const certificates = await dbService.getCertificates();

  return (
    <div className="section-shell">
      <div className="section-inner max-w-4xl">
        <SlideUp delay={0.05}>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "cursor-pointer inline-flex items-center gap-1.5 -ml-2"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className={cn(
                buttonVariants({ size: "sm" }),
                "inline-flex items-center gap-1.5 cursor-pointer"
              )}
            >
              <FileDown className="h-4 w-4" />
              <span>Download PDF</span>
            </a>
          </div>
        </SlideUp>

        <SlideUp delay={0.1}>
          <p className="section-index">Resume</p>
          <div className="surface p-6 sm:p-10 space-y-10 select-text">
            <div className="border-b border-border/70 pb-8">
              <h1 className="text-3xl sm:text-4xl font-display font-medium tracking-tight text-foreground">
                Muhammad Hassan Javed
              </h1>
              <p className="text-sm font-mono text-primary mt-2">
                Full Stack Developer & AI Automation Engineer
              </p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground font-mono">
                <span>hass.javed25@gmail.com</span>
                <span className="text-border">·</span>
                <span>linkedin.com/in/muhammad-hassan-javed-4197212b7</span>
                <span className="text-border">·</span>
                <span>github.com/mhassanjaved</span>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary">
                Summary
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Computer Science graduate passionate about building modern web applications,
                mobile applications, AI-powered systems, and scalable software solutions. I enjoy
                creating clean, user-friendly experiences with modern technologies while continuously
                learning and improving.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary">
                Technical expertise
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div>
                  <p className="font-medium text-foreground mb-1">Languages & Frameworks</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    JavaScript, TypeScript, Python, Java, HTML5, CSS3, React, Next.js, Express.js, Node.js
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Databases & Tools</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    MongoDB, PostgreSQL, Supabase, Prisma, Git, GitHub, Postman, VS Code
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Mobile & AI</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    React Native, Java (Android SDK), OpenCV, MediaPipe, AI Automations
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Methodologies</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    REST APIs, state management, SEO, responsive layouts, client CRUD
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary">
                Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <p className="text-sm font-medium text-foreground">
                        {exp.role}{" "}
                        <span className="text-primary font-mono text-xs">@ {exp.company}</span>
                      </p>
                      <span className="text-xs font-mono text-muted-foreground">{exp.duration}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-muted-foreground leading-relaxed">
                      {exp.responsibilities.map((resp, rid) => (
                        <li
                          key={rid}
                          className="pl-3 relative before:absolute before:left-0 before:top-[0.5em] before:w-1 before:h-px before:bg-primary/40"
                        >
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <p className="text-sm font-medium text-foreground">{edu.degree}</p>
                      <span className="text-xs font-mono text-muted-foreground">{edu.duration}</span>
                    </div>
                    <p className="text-xs font-mono text-primary">{edu.school}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {certificates.length > 0 && (
              <div className="space-y-5">
                <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary">
                  Certifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="space-y-1">
                      <div className="flex justify-between items-baseline gap-1">
                        <p className="text-sm font-medium text-foreground">{cert.title}</p>
                        <span className="text-xs font-mono text-muted-foreground shrink-0">{cert.issueDate}</span>
                      </div>
                      <p className="text-xs font-mono text-primary">{cert.issuer}</p>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-muted-foreground hover:text-primary transition-colors inline-flex items-center font-mono mt-0.5"
                        >
                          Verify Credential &rarr;
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SlideUp>
      </div>
    </div>
  );
}
