#!/usr/bin/env bash
# Рендер кусками по 20 с в out/chunks, потом склейка без перекодирования и звук.
#   bash bin/render.sh            — весь ролик заново
#   bash bin/render.sh cat,dog    — перерисовать только куски, где видны эти карточки
#                                   (если число карточек и темп не менялись; иначе весь ролик)
# 3 минуты на 2 ядрах — около 25 минут целиком; правка одной карточки — 3–6 минут.
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/usr/bin/google-chrome}"
CH=600
npx remotion bundle --out-dir=build --log=error
mkdir -p out/chunks
TOTAL=$(python3 scripts/chunks.py total)
if [ -z "$1" ] || [ "$(cat out/chunks/total.txt 2>/dev/null)" != "$TOTAL" ]; then
  rm -f out/chunks/*.mp4
else
  for c in $(python3 scripts/chunks.py cards "$1"); do rm -f "out/chunks/$(printf %03d "$c").mp4"; done
fi
echo "$TOTAL" > out/chunks/total.txt
N=$(( (TOTAL + CH - 1) / CH ))
for ((c = 0; c < N; c++)); do
  f="out/chunks/$(printf %03d "$c").mp4"
  [ -f "$f" ] && continue
  a=$((c * CH)); b=$(( (c + 1) * CH - 1 )); [ "$b" -ge "$TOTAL" ] && b=$((TOTAL - 1))
  echo "кусок $((c + 1))/$N: кадры $a-$b"
  npx remotion render build Pencil "$f.tmp.mp4" --frames="$a-$b" --browser-executable="$CHROME" --crf=18 --concurrency="$(nproc)" --log=error
  mv "$f.tmp.mp4" "$f"
done
( cd out/chunks && ls [0-9][0-9][0-9].mp4 | sed "s/.*/file '&'/" > list.txt )
ffmpeg -y -loglevel error -f concat -safe 0 -i out/chunks/list.txt -i public/audio/soundtrack.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest out/video.mp4
npx remotion still build ThumbPencil out/thumb.png --browser-executable="$CHROME" --log=error
echo "ok out/video.mp4 out/thumb.png"
