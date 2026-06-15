import type { MetadataRoute } from "next";
import { getSiteSettings, getPosts, getCaseStudies } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, posts, caseStudies] = await Promise.all([getSiteSettings(), getPosts(), getCaseStudies()]);

  const staticRoutes = ["", "/services", "/about", "/blog", "/case-studies", "/contact"].map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : undefined,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const caseRoutes = caseStudies.map((c) => ({
    url: `${site.url}/case-studies/${c.slug}`,
    lastModified: c.publishedAt ? new Date(c.publishedAt) : undefined,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...caseRoutes];
}
