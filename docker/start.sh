#!/bin/sh
echo "📊 Waiting for MariaDB to be ready..."
until npx prisma db push --skip-generate --accept-data-loss 2>&1; do
  echo "⏳ MariaDB not ready yet, retrying in 5s..."
  sleep 5
done

echo "🌱 Seeding database..."
npx tsx prisma/seed.ts 2>&1 || echo "⚠️ Seed warning (may already have data)"

echo "🚀 Starting Next.js..."
exec node server.js
