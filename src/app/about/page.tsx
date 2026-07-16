import React from "react";
import Link from "next/link";
import { GraduationCap, Award, ExternalLink, ArrowLeft, Heart, Shield, Code, Lightbulb } from "lucide-react";
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
      description: "Writing code that is easily readable, testable, and robust using modern TypeScript and best practices.",
      icon: <Code className="h-5 w-5 text-primary" />,
    },
    {
      title: "User-Centric Design",
      description: "Ensuring applications have excellent UX, smooth transitions, and accessibility compliance.",
      icon: <Heart className="h-5 w-5 text-indigo-500" />,
    },
    {
      title: "Security & Scale",
      description: "Adhering to secure authentication, optimized database queries, and clean architecture.",
      icon: <Shield className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Continuous Learning",
      description: "Always learning new frameworks, exploring AI automations, and refining existing capabilities.",
      icon: <Lightbulb className="h-5 w-5 text-rose-500" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Back button */}
      <SlideUp delay={0.05}>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "mb-8 cursor-pointer inline-flex items-center space-x-1"
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </SlideUp>

      {/* Header */}
      <SlideUp delay={0.1}>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          My Professional Story
        </h1>
        <p className="text-muted-foreground mt-3 text-base sm:text-lg max-w-2xl leading-relaxed">
          I am a Computer Science graduate passionate about building modern web applications,
          mobile applications, AI-powered systems, and scalable software solutions.
        </p>
      </SlideUp>

      {/* Story Narrative */}
      <div className="mt-12 space-y-6 text-sm md:text-base text-muted-foreground leading-relaxed">
        <ScrollReveal delay={0.1}>
          <p>
            My journey into computer science began with a deep curiosity about how software shapes our daily interactions. 
            Throughout my academic career at the{" "}
            <strong className="text-foreground">University of Central Punjab</strong>, I developed a strong foundation in 
            algorithmic thinking, software architecture, and computer vision. I translated this theory into practice 
            by building products for various domains—ranging from influencer marketing trackers to ISO lead management CMS systems.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p>
            As a developer, I specialize in the <strong className="text-foreground">MERN Stack</strong>, 
            <strong className="text-foreground">Next.js</strong>, and <strong className="text-foreground">React Native</strong>. 
            I enjoy bridging the gap between web backend routing and highly responsive client layouts. My recent research and projects 
            delve into <strong className="text-foreground">AI Automations</strong> using OpenCV and MediaPipe, creating low-latency computer 
            vision tools that provide intelligent solutions in real time.
          </p>
        </ScrollReveal>
      </div>

      {/* Strengths & Core Values */}
      <section className="mt-20">
        <ScrollReveal>
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8">
            What I Value
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v, idx) => (
            <ScrollReveal key={v.title} delay={idx * 0.08}>
              <div className="p-5 rounded-2xl glass-card glass-card-hover flex flex-col justify-start">
                <div className="p-2 bg-secondary rounded-xl w-fit mb-4">
                  {v.icon}
                </div>
                <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Education Timeline */}
      <section className="mt-20">
        <ScrollReveal>
          <div className="flex items-center space-x-2.5 mb-8">
            <GraduationCap className="h-5 w-5 text-indigo-500" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Education
            </h2>
          </div>
        </ScrollReveal>

        <div className="pl-4 border-l border-border space-y-6">
          {education.map((edu, idx) => (
            <ScrollReveal key={edu.id} delay={idx * 0.1}>
              <div className="relative">
                <span className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-[#7c6ef6] border-4 border-background" />
                <div className="p-5 glass-card glass-card-hover rounded-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h3 className="font-bold text-foreground text-sm">{edu.degree}</h3>
                    <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-secondary text-muted-foreground w-fit">
                      {edu.duration}
                    </span>
                  </div>
                  <h4 className="text-xs font-mono font-bold text-[#7c6ef6] mb-3">
                    {edu.school}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{edu.details}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Certifications */}
      {certificates.length > 0 && (
        <section className="mt-20">
          <ScrollReveal>
            <div className="flex items-center space-x-2.5 mb-8">
              <Award className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Certifications & Badges
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certificates.map((cert, idx) => (
              <ScrollReveal key={cert.id} delay={idx * 0.08}>
                <div className="p-4 glass-card glass-card-hover rounded-xl flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-foreground text-xs">{cert.title}</h3>
                    <p className="text-[10px] font-mono text-muted-foreground mt-1">
                      Issued by {cert.issuer} &bull; {cert.issueDate}
                    </p>
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="View Credential"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
