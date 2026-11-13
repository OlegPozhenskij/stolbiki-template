#!/usr/bin/env bash
# После правки src/data.json и scripts/scenes.mjs: рисунки -> музыка -> лист проверки out/check.jpg.
set -e
cd "$(dirname "$0")/.."
npx tsc --noEmit
node scripts/scenes.mjs
ids=$(python3 -c "import json; print(' '.join(i['id'] for i in json.load(open('src/data.json'))['items']))")
python3 scripts/sketch/sketch.py badge $ids
python3 scripts/sketch/to_alpha.py public/pencil/badge.png
python3 scripts/music.py
python3 scripts/check.py
