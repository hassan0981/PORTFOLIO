import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowLeft, BookOpen, CheckSquare } from "lucide-react";
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
          Education & Studies
        </h1>
        <p className="text-muted-foreground mt-3 text-base sm:text-lg max-w-xl leading-relaxed mb-12">
          Academic foundation, degree specifications, and key university coursework.
        </p>
      </SlideUp>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Education Timeline Card */}
        <div className="md:col-span-7 space-y-6">
          <ScrollReveal>
            <div className="flex items-center space-x-2.5 mb-6">
              <GraduationCap className="h-5 w-5 text-indigo-500" />
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Degrees & Institutions
              </h2>
            </div>
          </ScrollReveal>

          <div className="pl-4 border-l border-border space-y-6 relative">
            {educationList.map((edu, idx) => (
              <ScrollReveal key={edu.id} delay={idx * 0.1}>
                <div className="relative">
                  <span className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-[#7c6ef6] border-4 border-background" />

                  <div className="glass-card glass-card-hover p-5 rounded-2xl">
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
        </div>

        {/* Courses Cards */}
        <div className="md:col-span-5 glass-card glass-card-hover p-6 rounded-2xl">
          <ScrollReveal>
            <div className="flex items-center space-x-2 mb-6">
              <BookOpen className="h-4.5 w-4.5 text-primary" />
              <h2 className="text-base font-bold text-foreground">Major Coursework</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
              Course modules and specializations covered during my Bachelor of Science in Computer Science.
            </p>

            <div className="grid grid-cols-1 gap-2.5">
              {keyCourses.map((course, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2.5 text-xs text-muted-foreground p-2 rounded-lg bg-secondary/50 border border-border/40"
                >
                  <CheckSquare className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="font-medium text-foreground">{course}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
