// Static fallback content + single source of default values. Live content is
// served by the CMS via lib/content.ts (server-only); this module stays safe to
// import from client components and build-time metadata routes.
import {
  siteDefaults,
  navLinksDefault,
  proofStatsDefault,
  whyPointsDefault,
  serviceOptionsDefault,
} from "@/cms/seed-data";

export const site = siteDefaults;
export const navLinks = navLinksDefault;
export const proofStats = proofStatsDefault;
export const whyPoints = whyPointsDefault;
export const serviceOptions = serviceOptionsDefault;
