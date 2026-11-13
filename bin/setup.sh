#!/usr/bin/env bash
# Один раз после клонирования: зависимости, шрифты, бумага, бейдж (~1 мин).
set -e
cd "$(dirname "$0")/.."
npm i --no-audit --no-fund --loglevel=error
mkdir -p public/fonts public/art public/pencil public/audio out
cp node_modules/@fontsource/nunito/files/nunito-{cyrillic,latin}-{800,900}-normal.woff2 public/fonts/
cp node_modules/@fontsource/caveat/files/caveat-{cyrillic,latin}-700-normal.woff2 public/fonts/
npx esbuild scripts/sketch/entry.js --bundle --format=iife --outfile=scripts/sketch/bundle.js --log-level=warning
[ -f public/pencil/meta.json ] || echo '{}' > public/pencil/meta.json
node scripts/scenes.mjs
python3 scripts/sketch/textures.py
python3 scripts/sketch/sketch.py badge
python3 scripts/sketch/to_alpha.py public/pencil/badge.png public/pencil/vline.png
echo "setup ok"
