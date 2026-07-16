import React from "react";
import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { dbService } from "@/lib/dbService";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlideUp, ScrollReveal } from "@/components/Animated";

export const revalidate = 3600;

export default async function AboutPage() {
  const education = await dbService.getEducation();
  const certificates = await dbService.getCertificates();

  const values = [
    {
      title: "Clean & Type-safe Code",
      description:
        "Writing code that is easily readable, testable, and robust using modern TypeScript and best practices.",
    },
    {
      title: "User-Centric Design",
      description:
        "Ensuring applications have excellent UX, smooth transitions, and accessibility compliance.",
    },
    {
      title: "Security & Scale",
      description:
        "Adhering to secure authentication, optimized database queries, and clean architecture.",
    },
    {
      title: "Continuous Learning",
      description:
        "Always learning new frameworks, exploring AI automations, and refining existing capabilities.",
    },
  ];

  return (
    <div className="section-shell">
      <div className="section-inner max-w-4xl">
        <SlideUp delay={0.05}>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "mb-10 cursor-pointer inline-flex items-center gap-1.5 -ml-2"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
        </SlideUp>

        <SlideUp delay={0.1}>
          <p className="section-index">About</p>
          <h1 className="section-title">My professional story</h1>
          <p className="section-lede">
            I am a Computer Science graduate passionate about building modern web applications,
            mobile applications, AI-powered systems, and scalable software solutions.
          </p>
        </SlideUp>

        <div className="mt-12 space-y-6 text-sm md:text-base text-muted-foreground leading-relaxed">
          <ScrollReveal delay={0.1}>
            <p>
              My journey into computer science began with a deep curiosity about how software shapes
              our daily interactions. Throughout my academic career at the{" "}
              <strong className="text-foreground font-medium">University of Central Punjab</strong>, I
              developed a strong foundation in algorithmic thinking, software architecture, and
              computer vision — then translated that theory into products across influencer marketing,
              CMS systems, and more.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p>
              I specialize in the <strong className="text-foreground font-medium">MERN Stack</strong>,{" "}
              <strong className="text-foreground font-medium">Next.js</strong>, and{" "}
              <strong className="text-foreground font-medium">React Native</strong>. Recent work
              explores <strong className="text-foreground font-medium">AI Automations</strong> with
              OpenCV and MediaPipe — low-latency computer vision tools that deliver intelligent
              solutions in real time.
            </p>
          </ScrollReveal>
        </div>

        <section className="mt-20">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-foreground mb-10">
              What I value
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border/60 border border-border/60">
            {values.map((v, idx) => (
              <ScrollReveal key={v.title} delay={idx * 0.06}>
                <div className="p-6 md:p-7 bg-background h-full">
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-primary mb-3">
                    0{idx + 1}
                  </p>
                  <h3 className="font-display text-lg font-medium text-foreground mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-foreground mb-10">
              Education
            </h2>
          </ScrollReveal>

          <div className="space-y-0">
            {education.map((edu, idx) => (
              <ScrollReveal key={edu.id} delay={idx * 0.08}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7 border-t border-border/70">
                  <div className="md:col-span-3">
                    <p className="font-mono text-xs text-muted-foreground">{edu.duration}</p>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="text-base font-medium text-foreground">{edu.degree}</h3>
                    <p className="text-sm text-primary mt-1">{edu.school}</p>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                      {edu.details}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {certificates.length > 0 && (
          <section className="mt-20">
            <ScrollReveal>
              <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-foreground mb-10">
                Certifications
              </h2>
            </ScrollReveal>

            <div className="space-y-0">
              {certificates.map((cert, idx) => (
                <ScrollReveal key={cert.id} delay={idx * 0.06}>
                  <div className="flex items-center justify-between gap-4 py-5 border-t border-border/70">
                    <div>
                      <h3 className="text-sm font-medium text-foreground">{cert.title}</h3>
                      <p className="font-mono text-[11px] text-muted-foreground mt-1">
                        {cert.issuer} · {cert.issueDate}
                      </p>
                    </div>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                        aria-label="View credential"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
