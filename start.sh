#!/bin/bash

set -e

# Step 1: Start containers
echo "🚀 Starting Docker Compose..."
docker compose up -d

# Step 2: Wait for Postgres to be ready
echo "⏳ Waiting for Postgres to be ready..."
until docker exec postgres_db pg_isready -U ejuser -d nestdb > /dev/null 2>&1; do
  sleep 2
done
echo "✅ Postgres is ready!"

# Step 3: Run SQL import
echo "📂 Importing SQL data..."
docker exec -i postgres_db psql -U ejuser -d nestdb < backup.sql

echo "🎉 Done! Database has been initialized with backup.sql"