#!/bin/bash
cd "$(dirname "$0")"

# Start Vite dev server if not already listening
if ! lsof -i :5173 -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Starting GeoLab Offer Generator server..."
  npm run dev &
  sleep 1.5
fi

open "http://localhost:5173"
