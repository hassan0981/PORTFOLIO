"use client";

import dynamic from "next/dynamic";

const HeroTerrain = dynamic(() => import("@/components/HeroTerrain"), {
  ssr: false,
});

export default function HeroBackground() {
  return <HeroTerrain />;
}
