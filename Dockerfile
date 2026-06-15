# Multi-stage build for the Bevora Next.js + Payload CMS app (container: bevora-web).
# Built with the deployed commit baked in:
#   GIT_SHA=$(git rev-parse --short HEAD) docker compose build web
# The build does not require a database — content getters fall back to the static
# defaults in cms/seed-data.ts when the DB is unreachable, so `next build` succeeds
# without Postgres. Runtime config (DATABASE_URI/PAYLOAD_SECRET) comes from the
# compose environment / .env.local at container start, never baked into the image.

FROM node:20-slim AS build
WORKDIR /app
# libc6/openssl are present in slim; sharp ships prebuilt binaries for linux-x64-glibc.
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG GIT_SHA=unknown
ENV GIT_SHA=$GIT_SHA
ENV NEXT_TELEMETRY_DISABLED=1
# Build, then drop dev-only deps (typescript/@types) to shrink the runtime image.
RUN npm run build && npm prune --omit=dev

FROM node:20-slim AS run
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
ARG GIT_SHA=unknown
ENV GIT_SHA=$GIT_SHA
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/next.config.mjs ./next.config.mjs
COPY --from=build /app/payload.config.ts ./payload.config.ts
COPY --from=build /app/cms ./cms
COPY --from=build /app/tsconfig.json ./tsconfig.json
# Uploaded media is a bind-mounted volume at runtime (see docker-compose.yml).
EXPOSE 3000
# Bind explicitly on 3000 (the npm "start" script hardcodes 30001 for local dev).
CMD ["./node_modules/.bin/next", "start", "-H", "0.0.0.0", "-p", "3000"]
