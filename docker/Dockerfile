FROM node:20-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prisma generate needs DATABASE_URL set (even though it doesn't connect)
ENV DATABASE_URL=mysql://dummy:dummy@localhost:3306/dummy
RUN npx prisma generate

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app

# Accept Coolify-injected build args
ARG COOLIFY_FQDN
ARG SERVICE_URL_APP
ARG SERVICE_FQDN_APP
ARG COOLIFY_BUILD_SECRETS_HASH

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=4445
ENV HOSTNAME="0.0.0.0"

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# Copy Prisma client + CLI for db push
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/tsx ./node_modules/tsx

COPY --from=builder /app/docker/start.sh ./start.sh
RUN chmod +x ./start.sh

USER nextjs

EXPOSE 4445
HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=5 \
  CMD curl -f http://localhost:4445/api/health || exit 1

CMD ["./start.sh"]
