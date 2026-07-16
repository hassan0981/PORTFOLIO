"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "@/components/SmoothScrollProvider";
import { cn } from "@/lib/utils";

type SectionLinkProps = {
  sectionId: string;
  children: React.ReactNode;
  className?: string;
};

export default function SectionLink({ sectionId, children, className }: SectionLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { scrollTo } = useLenis();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const hash = `#${sectionId}`;

    if (pathname !== "/") {
      sessionStorage.setItem("scroll-to-section", sectionId);
      router.push("/");
      return;
    }

    scrollTo(hash);
    window.history.replaceState(null, "", hash);
  };

  return (
    <a href={`/#${sectionId}`} onClick={handleClick} className={cn(className)}>
      {children}
    </a>
  );
}
