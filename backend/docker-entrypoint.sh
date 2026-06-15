#!/usr/bin/env bash
set -euo pipefail

# Run database migrations then start the app.
cd /app || exit 1

if command -v alembic >/dev/null 2>&1; then
  echo "Running alembic upgrade head"
  alembic upgrade head || true
else
  echo "alembic not available, skipping migrations"
fi

exec "$@"
