import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { Prose } from "@/components/marketing/Prose";
import { getPost, getPosts } from "@/lib/content";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt };
}

function formatDate(value?: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-SG", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <article className="bv-section">
        <div style={{ maxWidth: "var(--container-sm, 760px)", margin: "0 auto", padding: "0 var(--gutter)" }}>
          <Link
            href="/blog"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--text-secondary)", textDecoration: "none" }}
          >
            <ArrowLeft size={15} /> All articles
          </Link>

          {post.publishedAt && (
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--gold-600)", marginTop: 28 }}>{formatDate(post.publishedAt)}</div>
          )}
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem,4.5vw,3rem)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--text-primary)", margin: "10px 0 0" }}>
            {post.title}
          </h1>
          {post.excerpt && (
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", lineHeight: 1.6, color: "var(--text-secondary)", margin: "16px 0 0" }}>{post.excerpt}</p>
          )}

          {post.coverImage?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              style={{ width: "100%", borderRadius: "var(--radius-xl)", margin: "32px 0 0", border: "1px solid var(--border-subtle)" }}
            />
          )}

          <div style={{ marginTop: 36 }}>
            <Prose data={post.content} />
          </div>
        </div>
      </article>

      <CtaBand />
    </>
  );
}
