"use client";

import dynamic from "next/dynamic";

const PageTerrain = dynamic(() => import("@/components/PageTerrain"), {
  ssr: false,
});

export default function PageAtmosphere() {
  return <PageTerrain />;
}
