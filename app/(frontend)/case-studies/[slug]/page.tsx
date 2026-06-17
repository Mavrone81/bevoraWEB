import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { Prose } from "@/components/marketing/Prose";
import { JsonLd } from "@/components/JsonLd";
import { getCaseStudy, getCaseStudies, getSiteSettings } from "@/lib/content";
import { caseStudySchema, breadcrumbSchema } from "@/lib/seo";

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return { title: "Case study not found" };
  const url = `/case-studies/${study.slug}`;
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: study.title,
      description: study.summary,
      url,
      publishedTime: study.publishedAt ?? undefined,
      images: study.image?.url ? [{ url: study.image.url, alt: study.image.alt || study.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.summary,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [study, site] = await Promise.all([getCaseStudy(slug), getSiteSettings()]);
  if (!study) notFound();

  return (
    <>
      <JsonLd
        data={[
          caseStudySchema(site, study),
          breadcrumbSchema(site, [
            { name: "Home", path: "/" },
            { name: "Case studies", path: "/case-studies" },
            { name: study.title, path: `/case-studies/${study.slug}` },
          ]),
        ]}
      />
      <article className="bv-section">
        <div style={{ maxWidth: "var(--container-md)", margin: "0 auto", padding: "0 var(--gutter)" }}>
          <Link
            href="/case-studies"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--text-secondary)", textDecoration: "none" }}
          >
            <ArrowLeft size={15} /> All case studies
          </Link>

          {study.client && (
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--gold-600)", textTransform: "uppercase", letterSpacing: ".08em", marginTop: 28 }}>{study.client}</div>
          )}
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem,4.5vw,3rem)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--text-primary)", margin: "10px 0 0" }}>
            {study.title}
          </h1>
          {study.summary && (
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", lineHeight: 1.6, color: "var(--text-secondary)", margin: "16px 0 0" }}>{study.summary}</p>
          )}

          {study.results.length > 0 && (
            <div className="bv-grid-3" style={{ marginTop: 32, gap: 16 }}>
              {study.results.map((r) => (
                <div key={r.label} style={{ background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "var(--space-6)" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "var(--text-2xl)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{r.value}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, color: "var(--text-secondary)", marginTop: 4 }}>{r.label}</div>
                </div>
              ))}
            </div>
          )}

          {study.image?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={study.image.url}
              alt={study.image.alt || study.title}
              style={{ width: "100%", borderRadius: "var(--radius-xl)", margin: "32px 0 0", border: "1px solid var(--border-subtle)" }}
            />
          )}

          <div style={{ marginTop: 36 }}>
            <Prose data={study.content} />
          </div>
        </div>
      </article>

      <CtaBand />
    </>
  );
}
