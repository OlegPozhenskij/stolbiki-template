#!/usr/bin/env bash
# Рендер ролика со звуком и обложки: out/video.mp4, out/thumb.png (~1 мин на 400 кадров).
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/usr/bin/google-chrome}"
npx remotion bundle --out-dir=build --log=error
npx remotion render build Pencil out/video.tmp.mp4 --browser-executable="$CHROME" --crf=18 --concurrency="$(nproc)" --log=error
ffmpeg -y -loglevel error -i out/video.tmp.mp4 -i public/audio/soundtrack.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest out/video.mp4
rm -f out/video.tmp.mp4
npx remotion still build ThumbPencil out/thumb.png --browser-executable="$CHROME" --log=error
echo "ok out/video.mp4 out/thumb.png"
