import { LinkButton } from "@/components/ui/LinkButton";

export default function NotFound() {
  return (
    <section style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", padding: "var(--section-y) var(--gutter)" }}>
      <div style={{ textAlign: "center", maxWidth: 460 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "clamp(3rem,10vw,5rem)", color: "var(--gold-500)", lineHeight: 1 }}>404</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-2xl)", color: "var(--text-primary)", marginTop: 12 }}>
          We couldn&apos;t find that page
        </h1>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-md)", lineHeight: 1.6, color: "var(--text-secondary)", marginTop: 12 }}>
          The link may be broken or the page may have moved. Let&apos;s get you back on track.
        </p>
        <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <LinkButton href="/" variant="accent">Back to home</LinkButton>
          <LinkButton href="/services" variant="secondary">Browse services</LinkButton>
        </div>
      </div>
    </section>
  );
}
