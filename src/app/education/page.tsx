import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { dbService } from "@/lib/dbService";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlideUp, ScrollReveal } from "@/components/Animated";

export const revalidate = 3600;

export default async function EducationPage() {
  const educationList = await dbService.getEducation();

  const keyCourses = [
    "Object Oriented Programming (OOP)",
    "Data Structures & Algorithms (DSA)",
    "Database Management Systems (DBMS)",
    "Software Engineering",
    "Computer Vision & OpenCV",
    "Artificial Intelligence & Machine Learning",
    "Web Application Development",
    "Mobile App Development (Android)",
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
          <p className="section-index">Education</p>
          <h1 className="section-title">Education & studies</h1>
          <p className="section-lede mb-14">
            Academic foundation, degrees, and key coursework.
          </p>
        </SlideUp>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7 space-y-0">
            {educationList.map((edu, idx) => (
              <ScrollReveal key={edu.id} delay={idx * 0.08}>
                <div className="py-7 border-t border-border/70 first:border-t-0 first:pt-0">
                  <p className="font-mono text-xs text-muted-foreground mb-2">{edu.duration}</p>
                  <h2 className="text-lg font-display font-medium text-foreground">{edu.degree}</h2>
                  <p className="text-sm text-primary mt-1">{edu.school}</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{edu.details}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="md:col-span-5">
            <ScrollReveal>
              <div className="surface p-6">
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-primary mb-3">
                  Coursework
                </p>
                <h2 className="font-display text-lg font-medium text-foreground mb-2">
                  Major modules
                </h2>
                <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                  Covered during my Bachelor of Science in Computer Science.
                </p>
                <ul className="space-y-2.5">
                  {keyCourses.map((course) => (
                    <li
                      key={course}
                      className="text-sm text-muted-foreground pl-3 relative before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-px before:bg-primary/50"
                    >
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
