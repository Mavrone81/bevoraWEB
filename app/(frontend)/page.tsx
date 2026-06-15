import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { StatsBand } from "@/components/sections/StatsBand";
import { WhyBevora } from "@/components/sections/WhyBevora";
import { CtaBand } from "@/components/sections/CtaBand";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { SectionHeading } from "@/components/marketing/SectionHeading";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />

      <section id="services" style={{ padding: "var(--section-y) 0", background: "var(--bg-page)" }}>
        <div style={{ maxWidth: "var(--container-lg)", margin: "0 auto", padding: "0 var(--gutter)" }}>
          <SectionHeading
            kicker="What we do"
            title="One partner for everything IT"
            subtitle="From the help desk to the data centre, Bevora runs the technology so your team can run the business."
            align="center"
          />
          <ServicesGrid />
        </div>
      </section>

      <StatsBand />
      <WhyBevora />
      <CtaBand />
    </>
  );
}
