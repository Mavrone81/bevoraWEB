// Builders for schema.org structured data (JSON-LD). These are pure functions
// that take already-loaded content (so they stay safe to call from any server
// component) and return plain objects for the <JsonLd> component to render.
import type { SiteSettings, PostContent, CaseStudyContent, ServiceContent } from "@/lib/content";

// Resolve a possibly-relative media URL (e.g. "/api/media/file/x.png") against
// the site origin so structured data and OG tags always carry absolute URLs.
function abs(siteUrl: string, path?: string | null): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//.test(path)) return path;
  return `${siteUrl.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;
}

const orgId = (siteUrl: string) => `${siteUrl}/#organization`;
const siteId = (siteUrl: string) => `${siteUrl}/#website`;

// Stable, always-200 brand image for structured data. (The social OG card is a
// code-generated route with a hashed URL, so it isn't safe to hard-code here.)
const fallbackImage = (siteUrl: string) => `${siteUrl}/assets/bevora-logo-square.png`;

// Typed as both Organization and ProfessionalService (a LocalBusiness subtype)
// so the same node powers brand knowledge-panel signals AND local-pack /
// "IT services near me" eligibility for Singapore searches.
export function organizationSchema(site: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": orgId(site.url),
    name: site.name,
    legalName: site.name,
    url: site.url,
    logo: fallbackImage(site.url),
    image: fallbackImage(site.url),
    description: site.description,
    slogan: site.tagline,
    email: site.email,
    telephone: site.phone,
    priceRange: "$$",
    knowsLanguage: ["en-SG"],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Singapore",
      addressCountry: "SG",
    },
    // Approximate coordinates for the Robinson Road business district.
    geo: { "@type": "GeoCoordinates", latitude: 1.2789, longitude: 103.8487 },
    areaServed: { "@type": "Country", name: "Singapore" },
    serviceArea: { "@type": "Country", name: "Singapore" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.email,
      telephone: site.phone,
      areaServed: "SG",
      availableLanguage: ["English"],
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function websiteSchema(site: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteId(site.url),
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en-SG",
    publisher: { "@id": orgId(site.url) },
  };
}

export function breadcrumbSchema(site: SiteSettings, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export function articleSchema(site: SiteSettings, post: PostContent) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || site.description,
    image: abs(site.url, post.coverImage?.url) ?? fallbackImage(site.url),
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.publishedAt ?? undefined,
    inLanguage: "en-SG",
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": orgId(site.url) },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/blog/${post.slug}` },
  };
}

export function caseStudySchema(site: SiteSettings, study: CaseStudyContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.summary || site.description,
    image: abs(site.url, study.image?.url) ?? fallbackImage(site.url),
    datePublished: study.publishedAt ?? undefined,
    dateModified: study.publishedAt ?? undefined,
    inLanguage: "en-SG",
    about: study.client || undefined,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": orgId(site.url) },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/case-studies/${study.slug}` },
  };
}

export function servicesSchema(site: SiteSettings, services: ServiceContent[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "IT services by Bevora",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.summary,
        url: `${site.url}/services#${s.slug}`,
        serviceType: s.title,
        areaServed: { "@type": "Country", name: "Singapore" },
        provider: { "@id": orgId(site.url) },
      },
    })),
  };
}
