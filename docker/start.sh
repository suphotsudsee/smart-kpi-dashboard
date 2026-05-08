#!/bin/sh
echo "📊 Pushing Prisma schema..."
npx prisma db push --skip-generate --accept-data-loss 2>&1 || echo "⚠️ DB push warning"

echo "🌱 Seeding database..."
npx tsx prisma/seed.ts 2>&1 || echo "⚠️ Seed warning (may already have data)"

echo "🚀 Starting Next.js..."
exec node server.js
