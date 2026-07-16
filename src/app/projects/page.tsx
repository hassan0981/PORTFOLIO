import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { dbService } from "@/lib/dbService";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProjectsGrid from "@/components/ProjectsGrid";
import { SlideUp } from "@/components/Animated";

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await dbService.getProjects();

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

      {/* Title */}
      <SlideUp delay={0.1}>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          My Engineering Projects
        </h1>
        <p className="text-muted-foreground mt-3 text-base sm:text-lg max-w-xl leading-relaxed mb-12">
          Explore a selection of systems, web services, and mobile applications I have designed,
          coded, and deployed.
        </p>
      </SlideUp>

      {/* Grid container */}
      <SlideUp delay={0.2}>
        <ProjectsGrid projects={projects} />
      </SlideUp>
    </div>
  );
}
