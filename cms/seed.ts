import type { Payload } from "payload";
import {
  siteDefaults,
  navLinksDefault,
  servicesDefault,
  proofStatsDefault,
  whyPointsDefault,
  serviceOptionsDefault,
} from "./seed-data";
import { postsSeed, caseStudiesSeed, lexical } from "./content-seed";

// Runs on every boot (onInit). Idempotent: only creates data that is missing,
// so it bootstraps a fresh database without clobbering edits made in the admin.
export async function seed(payload: Payload): Promise<void> {
  // ── First admin user ────────────────────────────────────────────────
  try {
    const { totalDocs } = await payload.count({ collection: "users" });
    const email = process.env.PAYLOAD_ADMIN_EMAIL;
    const password = process.env.PAYLOAD_ADMIN_PASSWORD;
    if (totalDocs === 0 && email && password) {
      await payload.create({
        collection: "users",
        data: { email, password, name: "Admin" },
      });
      payload.logger.info(`Seeded first admin user: ${email}`);
    }
  } catch (err) {
    payload.logger.error({ err }, "Failed seeding admin user");
  }

  // ── Services ────────────────────────────────────────────────────────
  try {
    const { totalDocs } = await payload.count({ collection: "services" });
    if (totalDocs === 0) {
      for (const s of servicesDefault) {
        await payload.create({
          collection: "services",
          data: {
            title: s.title,
            slug: s.slug,
            icon: s.icon,
            summary: s.summary,
            detail: s.detail,
            order: s.order,
            features: s.features.map((feature) => ({ feature })),
          },
        });
      }
      payload.logger.info(`Seeded ${servicesDefault.length} services`);
    }
  } catch (err) {
    payload.logger.error({ err }, "Failed seeding services");
  }

  // ── Site settings global ────────────────────────────────────────────
  try {
    const current = await payload.findGlobal({ slug: "site-settings" });
    if (!current?.name) {
      await payload.updateGlobal({
        slug: "site-settings",
        data: {
          name: siteDefaults.name,
          domain: siteDefaults.domain,
          url: siteDefaults.url,
          tagline: siteDefaults.tagline,
          description: siteDefaults.description,
          email: siteDefaults.email,
          phone: siteDefaults.phone,
          address: siteDefaults.address,
          navLinks: navLinksDefault,
          proofStats: proofStatsDefault,
          whyPoints: whyPointsDefault,
          serviceOptions: serviceOptionsDefault.map((label) => ({ label })),
        },
      });
      payload.logger.info("Seeded site settings");
    }
  } catch (err) {
    payload.logger.error({ err }, "Failed seeding site settings");
  }

  // ── Blog posts ──────────────────────────────────────────────────────
  try {
    const { totalDocs } = await payload.count({ collection: "posts" });
    if (totalDocs === 0) {
      for (const p of postsSeed) {
        await payload.create({
          collection: "posts",
          data: {
            title: p.title,
            slug: p.slug,
            excerpt: p.excerpt,
            content: lexical(p.blocks),
            status: "published",
            publishedAt: p.publishedAt,
          },
        });
      }
      payload.logger.info(`Seeded ${postsSeed.length} blog posts`);
    }
  } catch (err) {
    payload.logger.error({ err }, "Failed seeding blog posts");
  }

  // ── Case studies ────────────────────────────────────────────────────
  try {
    const { totalDocs } = await payload.count({ collection: "case-studies" });
    if (totalDocs === 0) {
      for (const c of caseStudiesSeed) {
        await payload.create({
          collection: "case-studies",
          data: {
            title: c.title,
            slug: c.slug,
            client: c.client,
            summary: c.summary,
            content: lexical(c.blocks),
            results: c.results,
            status: "published",
            publishedAt: c.publishedAt,
          },
        });
      }
      payload.logger.info(`Seeded ${caseStudiesSeed.length} case studies`);
    }
  } catch (err) {
    payload.logger.error({ err }, "Failed seeding case studies");
  }
}
