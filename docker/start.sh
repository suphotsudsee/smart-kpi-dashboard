#!/bin/sh
echo "📊 Running database migration..."
npx prisma migrate deploy 2>&1 || echo "⚠️ Migration warning"

echo "🌱 Seeding database..."
npx tsx prisma/seed.ts 2>&1 || echo "⚠️ Seed warning (may already have data)"

echo "🚀 Starting Next.js..."
exec node server.js
