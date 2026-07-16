import { MetadataRoute } from "next";
import { dbService } from "@/lib/dbService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mhassanjaved.dev";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/experience",
    "/skills",
    "/contact",
    "/resume",
    "/privacy-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic projects routes
  try {
    const projects = await dbService.getProjects();
    const projectRoutes = projects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...projectRoutes];
  } catch (e) {
    console.error("Error generating sitemap dynamic routes:", e);
    return staticRoutes;
  }
}
