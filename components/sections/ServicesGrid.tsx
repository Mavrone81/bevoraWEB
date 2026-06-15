import { ServiceCard } from "@/components/marketing/ServiceCard";
import { Reveal } from "@/components/Reveal";
import { getServices } from "@/lib/content";
import { iconFor } from "@/lib/icons";

export async function ServicesGrid({ withLinks = true }: { withLinks?: boolean }) {
  const services = await getServices();
  return (
    <div className="bv-grid-3" style={{ marginTop: 48 }}>
      {services.map((s, i) => {
        const Icon = iconFor(s.icon);
        return (
          <Reveal key={s.slug} delay={(i % 3) * 80} style={{ display: "flex" }}>
            <ServiceCard
              icon={<Icon size={24} />}
              title={s.title}
              href={withLinks ? `/services#${s.slug}` : undefined}
              linkLabel="Learn more"
              style={{ width: "100%" }}
            >
              {s.summary}
            </ServiceCard>
          </Reveal>
        );
      })}
    </div>
  );
}
