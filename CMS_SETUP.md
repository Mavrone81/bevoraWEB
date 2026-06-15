# Bevora CMS — admin platform

The site is powered by [Payload CMS](https://payloadcms.com) (self-hosted, embedded in
this Next.js app) backed by PostgreSQL. Editors manage all content from an admin
dashboard; the public pages read live from the database with a static fallback.

## What you can manage

Log in at **`/admin`**. Collections & globals:

| Where | What |
| --- | --- |
| **Site settings** (global) | Company name, contact details, tagline, navigation links, proof stats, "Why Bevora" points, contact-form service options |
| **Services** | The IT services (title, slug, icon, summary, detail, features, order) |
| **Posts** | Blog & news articles (rich text, cover image, publish status) → `/blog` |
| **Case studies** | Client showcases (rich text, image, headline results) → `/case-studies` |
| **Contact submissions** | Inbox of messages sent through the contact form (read-only, tick "handled") |
| **Media** | Uploaded images (stored in `public/media`) |
| **Users** | Admin accounts |

Only **published** posts and case studies appear on the public site.

## Local development

```bash
# 1. Start Postgres (Docker)
docker compose up -d db

# 2. Install deps (first time)
npm install

# 3. Run the app  →  http://localhost:30001  (admin at /admin)
npm run dev
```

On first boot the app **auto-seeds**: it creates the first admin user from
`PAYLOAD_ADMIN_EMAIL` / `PAYLOAD_ADMIN_PASSWORD`, plus the 6 default services and the
site settings. Seeding is idempotent — it never overwrites edits made in the admin.

Default login (change it after first sign-in):
`admin@bevorasg.com` / `ChangeMe!2026`

## Environment

Copy `.env.example` to `.env` and fill in values:

| Var | Purpose |
| --- | --- |
| `DATABASE_URI` | Postgres connection string (default points at the Docker DB on port 5433) |
| `PAYLOAD_SECRET` | Long random string used to sign tokens — generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `PAYLOAD_ADMIN_EMAIL` / `PAYLOAD_ADMIN_PASSWORD` | First admin user, created on first boot only |

## Self-hosted production (VPS + Docker)

1. Provision Postgres (the bundled `docker-compose.yml` runs one; for production use a
   managed instance or a hardened container, and set a strong password).
2. Set production env vars (`DATABASE_URI`, a fresh `PAYLOAD_SECRET`, admin creds).
3. Build & run:
   ```bash
   npm run build
   npm run start      # serves on port 30001
   ```
   Put Nginx/Caddy in front for TLS and proxy to `:30001`.
4. Uploaded media lives in `public/media` — mount it on a persistent volume.

## Notes

- The standalone `payload` CLI (`npm run generate:types` / `generate:importmap`) currently
  fails under Node 26 (a `tsx` ESM-resolution bug). It is **not required** to run or build
  the app — the admin import map is generated automatically by the Next dev/build pipeline.
  Use Node 22 LTS if you need the CLI.
- If the database is unreachable, public pages fall back to the static defaults in
  `cms/seed-data.ts`, so the marketing site stays up.
