import "server-only";
import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";

import {
  siteDefaults,
  navLinksDefault,
  proofStatsDefault,
  whyPointsDefault,
  serviceOptionsDefault,
  servicesDefault,
  type IconKey,
} from "@/cms/seed-data";

// ── Shapes returned to the UI (plain, serializable) ────────────────────
export interface SiteSettings {
  name: string;
  domain: string;
  url: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  navLinks: { label: string; href: string }[];
  proofStats: { value: string; label: string; caption?: string }[];
  whyPoints: { title: string; detail: string }[];
  serviceOptions: string[];
}

export interface ServiceContent {
  slug: string;
  icon: IconKey;
  title: string;
  summary: string;
  detail: string;
  features: string[];
  order: number;
}

export interface MediaContent {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface PostContent {
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: MediaContent | null;
  content?: unknown;
  publishedAt?: string | null;
}

export interface CaseStudyContent {
  slug: string;
  title: string;
  client?: string;
  summary?: string;
  image?: MediaContent | null;
  content?: unknown;
  results: { value: string; label: string }[];
  publishedAt?: string | null;
}

// React.cache dedupes the client (and each getter) within a single request.
const getClient = cache(async () => getPayload({ config }));

function toMedia(value: unknown): MediaContent | null {
  if (!value || typeof value !== "object") return null;
  const m = value as Record<string, unknown>;
  if (typeof m.url !== "string") return null;
  return {
    url: m.url,
    alt: typeof m.alt === "string" ? m.alt : "",
    width: typeof m.width === "number" ? m.width : undefined,
    height: typeof m.height === "number" ? m.height : undefined,
  };
}

// ── Site settings ──────────────────────────────────────────────────────
const fallbackSettings: SiteSettings = {
  ...siteDefaults,
  navLinks: navLinksDefault,
  proofStats: proofStatsDefault,
  whyPoints: whyPointsDefault,
  serviceOptions: serviceOptionsDefault,
};

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const payload = await getClient();
    const g = (await payload.findGlobal({ slug: "site-settings" })) as Record<string, unknown>;
    if (!g?.name) return fallbackSettings;
    const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
    const navLinks = arr<{ label: string; href: string }>(g.navLinks).map((l) => ({ label: l.label, href: l.href }));
    const proofStats = arr<{ value: string; label: string; caption?: string }>(g.proofStats).map((s) => ({
      value: s.value,
      label: s.label,
      caption: s.caption,
    }));
    const whyPoints = arr<{ title: string; detail: string }>(g.whyPoints).map((p) => ({ title: p.title, detail: p.detail }));
    const serviceOptions = arr<{ label: string }>(g.serviceOptions).map((o) => o.label);
    return {
      name: (g.name as string) ?? siteDefaults.name,
      domain: (g.domain as string) ?? siteDefaults.domain,
      url: (g.url as string) ?? siteDefaults.url,
      tagline: (g.tagline as string) ?? siteDefaults.tagline,
      description: (g.description as string) ?? siteDefaults.description,
      email: (g.email as string) ?? siteDefaults.email,
      phone: (g.phone as string) ?? siteDefaults.phone,
      address: (g.address as string) ?? siteDefaults.address,
      navLinks: navLinks.length ? navLinks : navLinksDefault,
      proofStats: proofStats.length ? proofStats : proofStatsDefault,
      whyPoints: whyPoints.length ? whyPoints : whyPointsDefault,
      serviceOptions: serviceOptions.length ? serviceOptions : serviceOptionsDefault,
    };
  } catch {
    return fallbackSettings;
  }
});

// ── Services ───────────────────────────────────────────────────────────
const fallbackServices: ServiceContent[] = servicesDefault.map((s) => ({
  slug: s.slug,
  icon: s.icon,
  title: s.title,
  summary: s.summary,
  detail: s.detail,
  features: s.features,
  order: s.order,
}));

export const getServices = cache(async (): Promise<ServiceContent[]> => {
  try {
    const payload = await getClient();
    const { docs } = await payload.find({ collection: "services", limit: 100, sort: "order" });
    if (!docs.length) return fallbackServices;
    return docs.map((d) => {
      const doc = d as Record<string, unknown>;
      const features = Array.isArray(doc.features)
        ? (doc.features as { feature?: string }[]).map((f) => f.feature).filter((f): f is string => Boolean(f))
        : [];
      return {
        slug: doc.slug as string,
        icon: (doc.icon as IconKey) ?? "lifebuoy",
        title: doc.title as string,
        summary: (doc.summary as string) ?? "",
        detail: (doc.detail as string) ?? "",
        features,
        order: (doc.order as number) ?? 99,
      };
    });
  } catch {
    return fallbackServices;
  }
});

// ── Blog posts ─────────────────────────────────────────────────────────
export const getPosts = cache(async (): Promise<PostContent[]> => {
  try {
    const payload = await getClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
      limit: 100,
      depth: 1,
    });
    return docs.map((d) => {
      const doc = d as Record<string, unknown>;
      return {
        slug: doc.slug as string,
        title: doc.title as string,
        excerpt: (doc.excerpt as string) ?? "",
        coverImage: toMedia(doc.coverImage),
        content: doc.content,
        publishedAt: (doc.publishedAt as string) ?? null,
      };
    });
  } catch {
    return [];
  }
});

export const getPost = cache(async (slug: string): Promise<PostContent | null> => {
  try {
    const payload = await getClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug }, status: { equals: "published" } },
      limit: 1,
      depth: 1,
    });
    const d = docs[0] as Record<string, unknown> | undefined;
    if (!d) return null;
    return {
      slug: d.slug as string,
      title: d.title as string,
      excerpt: (d.excerpt as string) ?? "",
      coverImage: toMedia(d.coverImage),
      content: d.content,
      publishedAt: (d.publishedAt as string) ?? null,
    };
  } catch {
    return null;
  }
});

// ── Case studies ───────────────────────────────────────────────────────
export const getCaseStudies = cache(async (): Promise<CaseStudyContent[]> => {
  try {
    const payload = await getClient();
    const { docs } = await payload.find({
      collection: "case-studies",
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
      limit: 100,
      depth: 1,
    });
    return docs.map((d) => mapCaseStudy(d as Record<string, unknown>));
  } catch {
    return [];
  }
});

export const getCaseStudy = cache(async (slug: string): Promise<CaseStudyContent | null> => {
  try {
    const payload = await getClient();
    const { docs } = await payload.find({
      collection: "case-studies",
      where: { slug: { equals: slug }, status: { equals: "published" } },
      limit: 1,
      depth: 1,
    });
    const d = docs[0] as Record<string, unknown> | undefined;
    return d ? mapCaseStudy(d) : null;
  } catch {
    return null;
  }
});

function mapCaseStudy(d: Record<string, unknown>): CaseStudyContent {
  const results = Array.isArray(d.results)
    ? (d.results as { value?: string; label?: string }[])
        .filter((r) => r.value && r.label)
        .map((r) => ({ value: r.value as string, label: r.label as string }))
    : [];
  return {
    slug: d.slug as string,
    title: d.title as string,
    client: (d.client as string) ?? "",
    summary: (d.summary as string) ?? "",
    image: toMedia(d.image),
    content: d.content,
    results,
    publishedAt: (d.publishedAt as string) ?? null,
  };
}
