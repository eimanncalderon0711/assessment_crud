#!/bin/bash

set -e

echo "🛑 Stopping Docker Compose..."
docker compose down

echo "✅ All containers stopped and removed."