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
    <div className="section-shell">
      <div className="section-inner max-w-5xl">
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
          <p className="section-index">Projects</p>
          <h1 className="section-title">Selected work & case studies</h1>
          <p className="section-lede mb-14">
            Systems, web services, and mobile applications I have designed, built, and shipped.
          </p>
        </SlideUp>

        <SlideUp delay={0.2}>
          <ProjectsGrid projects={projects} />
        </SlideUp>
      </div>
    </div>
  );
}
