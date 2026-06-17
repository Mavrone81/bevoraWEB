import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#11151c",
    theme_color: "#11151c",
    icons: [
      { src: "/assets/bevora-logo-square.png", sizes: "512x512", type: "image/png" },
      { src: "/assets/bevora-mark.png", sizes: "any", type: "image/png" },
    ],
  };
}
