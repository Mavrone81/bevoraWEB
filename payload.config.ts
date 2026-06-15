import path from "path";
import { fileURLToPath } from "url";

import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./cms/collections/Users";
import { Media } from "./cms/collections/Media";
import { Services } from "./cms/collections/Services";
import { Posts } from "./cms/collections/Posts";
import { CaseStudies } from "./cms/collections/CaseStudies";
import { ContactSubmissions } from "./cms/collections/ContactSubmissions";
import { SiteSettings } from "./cms/globals/SiteSettings";
import { seed } from "./cms/seed";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "— Bevora CMS",
    },
  },
  collections: [Services, Posts, CaseStudies, ContactSubmissions, Media, Users],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "cms/payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
    // Auto-create/sync the schema on boot (incl. in production), so a fresh
    // deploy provisions its tables and new CMS fields apply without a separate
    // migration step. Set PAYLOAD_DB_PUSH=false to disable and use migrations.
    push: process.env.PAYLOAD_DB_PUSH !== "false",
  }),
  sharp,
  onInit: async (payload) => {
    await seed(payload);
  },
});
