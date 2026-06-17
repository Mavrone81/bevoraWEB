import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/Reveal";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog & news",
  description: "IT insights, security advice and product news from the Bevora team.",
  alternates: { canonical: "/blog" },
};

function formatDate(value?: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHero
        kicker="Insights"
        title="Blog & news"
        subtitle="Practical IT and security advice for growing Singapore teams — plus the occasional update from the Bevora workshop."
      />

      <section className="bv-section">
        <div style={{ maxWidth: "var(--container-lg)", margin: "0 auto", padding: "0 var(--gutter)" }}>
          {posts.length === 0 ? (
            <p style={{ textAlign: "center", fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", color: "var(--text-secondary)" }}>
              No articles published yet — check back soon.
            </p>
          ) : (
            <div className="bv-grid-3">
              {posts.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80} style={{ display: "flex" }}>
                  <Link
                    href={`/blog/${p.slug}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      background: "var(--surface-card)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-xl)",
                      boxShadow: "var(--shadow-sm)",
                      overflow: "hidden",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        height: 168,
                        background: p.coverImage?.url ? `center / cover no-repeat url(${p.coverImage.url})` : "var(--grad-graphite)",
                      }}
                    />
                    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                      {p.publishedAt && (
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--gold-600)" }}>{formatDate(p.publishedAt)}</span>
                      )}
                      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-xl)", color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                        {p.title}
                      </h2>
                      {p.excerpt && (
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.6, color: "var(--text-secondary)" }}>{p.excerpt}</p>
                      )}
                      <span style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--text-brand)" }}>
                        Read more <ArrowRight size={15} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
