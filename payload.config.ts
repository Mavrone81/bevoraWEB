import path from "path";
import { fileURLToPath } from "url";

import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import sharp from "sharp";

import { Users } from "./cms/collections/Users";
import { Media } from "./cms/collections/Media";
import { Services } from "./cms/collections/Services";
import { Posts } from "./cms/collections/Posts";
import { CaseStudies } from "./cms/collections/CaseStudies";
import { ContactSubmissions } from "./cms/collections/ContactSubmissions";
import { LiveChats } from "./cms/collections/LiveChats";
import { SiteSettings } from "./cms/globals/SiteSettings";
import { seed } from "./cms/seed";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Outgoing email over SMTP (e.g. Zoho). Only enabled when SMTP_HOST is set;
// otherwise Payload falls back to logging emails to the console.
const smtpPort = Number(process.env.SMTP_PORT || 465);
const emailAdapter = process.env.SMTP_HOST
  ? nodemailerAdapter({
      defaultFromName: "Bevora",
      defaultFromAddress: process.env.SMTP_FROM || process.env.SMTP_USER || "enquiries@bevorasg.com",
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: smtpPort,
        secure: smtpPort === 465, // SSL on 465
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    })
  : undefined;

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "— Bevora CMS",
    },
  },
  email: emailAdapter,
  collections: [Services, Posts, CaseStudies, ContactSubmissions, LiveChats, Media, Users],
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
