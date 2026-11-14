#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."
node scripts/episode.mjs render "${1:-animal-longevity}" "${@:2}"
