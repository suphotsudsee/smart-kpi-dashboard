#!/bin/sh
echo "📊 Running database migration..."
npx prisma migrate deploy 2>&1 || echo "⚠️ Migration warning"

echo "🚀 Starting Next.js..."
exec node server.js
