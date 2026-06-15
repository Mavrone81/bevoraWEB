import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 12, textDecoration: "none" }} aria-label={`${site.name} home`}>
      <Image src="/assets/bevora-mark.svg" alt="" width={40} height={40} style={{ borderRadius: 9 }} priority />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 22,
          letterSpacing: "-0.02em",
          color: dark ? "#fff" : "var(--text-primary)",
        }}
      >
        {site.name}
      </span>
    </Link>
  );
}
