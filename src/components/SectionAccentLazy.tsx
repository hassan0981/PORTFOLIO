"use client";

import dynamic from "next/dynamic";
import type { AccentVariant } from "@/components/SectionAccent";

const SectionAccent = dynamic(() => import("@/components/SectionAccent"), {
  ssr: false,
});

type Props = {
  variant: AccentVariant;
  className?: string;
  opacity?: number;
};

export default function SectionAccentLazy({ variant, className, opacity }: Props) {
  return <SectionAccent variant={variant} className={className} opacity={opacity} />;
}
