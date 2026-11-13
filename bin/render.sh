#!/usr/bin/env bash
# Рендер кусками по 20 с в out/chunks, потом склейка без перекодирования и звук.
#   bash bin/render.sh            — весь ролик заново
#   bash bin/render.sh cat,dog    — перерисовать только куски, где видны эти карточки
#                                   (если число карточек и темп не менялись; иначе весь ролик)
# Куски рендерятся параллельно: JOBS процессов по CONC вкладок Chrome. Один процесс Remotion
# не загружает процессор целиком, несколько параллельных — да. Замер на 6 ядрах / 12 потоках, 16 ГБ,
# ролик 220 с: 1 × 12 — 14 мин, 2 × 4 — 8,4 мин, 3 × 4 — 7,3 мин (свободной памяти оставалось от 2,3 ГБ).
# По умолчанию от числа потоков: 12+ → 3 × 4, 8+ → 2 × 4, меньше → 1 × все потоки.
# Свои значения: JOBS=3 CONC=4 bash bin/render.sh. Каждый процесс берёт ~3–4 ГБ памяти: при её нехватке
# куски падают с ERR_INSUFFICIENT_RESOURCES.
# Упавшие куски повторяются по одному, с CONC = числу потоков.
set -e
cd "$(dirname "$0")/.."
# Временные файлы Remotion и Chrome (профили, кадры) — в tmp/ проекта (папка в исключениях Защитника).
# Профили упавших рендеров сами не удаляются, поэтому tmp/ чистится при каждом запуске.
rm -rf tmp && mkdir -p tmp
TMPWIN="$PWD/tmp"; command -v cygpath >/dev/null && TMPWIN=$(cygpath -w "$PWD/tmp")
export TEMP="$TMPWIN" TMP="$TMPWIN" TMPDIR="$TMPWIN"
if [ -z "$CHROME" ]; then
  for p in "C:/Program Files/Google/Chrome/Application/chrome.exe" "/usr/bin/google-chrome"; do
    [ -x "$p" ] && CHROME="$p" && break
  done
fi
CH=600
CPUS=$(nproc)
if   [ "$CPUS" -ge 12 ]; then DJ=3; DC=4
elif [ "$CPUS" -ge 8 ];  then DJ=2; DC=4
else                          DJ=1; DC=$CPUS
fi
JOBS="${JOBS:-$DJ}"
CONC="${CONC:-$DC}"
npx remotion bundle --out-dir=build --log=error
mkdir -p out/chunks
TOTAL=$(python3 scripts/chunks.py total)
if [ -z "$1" ] || [ "$(cat out/chunks/total.txt 2>/dev/null)" != "$TOTAL" ]; then
  rm -f out/chunks/*.mp4
else
  for c in $(python3 scripts/chunks.py cards "$1"); do rm -f "out/chunks/$(printf %03d "$c").mp4"; done
fi
rm -f out/chunks/*.tmp.mp4 out/chunks/*.log
echo "$TOTAL" > out/chunks/total.txt
N=$(( (TOTAL + CH - 1) / CH ))

chunk() {
  local c=$1 f a b
  f="out/chunks/$(printf %03d "$c").mp4"
  a=$((c * CH)); b=$(( (c + 1) * CH - 1 )); [ "$b" -ge "$TOTAL" ] && b=$((TOTAL - 1))
  if npx remotion render build Pencil "$f.tmp.mp4" --frames="$a-$b" --browser-executable="$CHROME" \
       --crf=18 --concurrency="$CONC" --log=error > "out/chunks/$(printf %03d "$c").log" 2>&1; then
    mv "$f.tmp.mp4" "$f" && rm -f "out/chunks/$(printf %03d "$c").log"
    echo "кусок $((c + 1))/$N готов (кадры $a-$b)"
  else
    echo "кусок $((c + 1))/$N упал, см. out/chunks/$(printf %03d "$c").log"
  fi
}

todo() { for ((c = 0; c < N; c++)); do [ -f "out/chunks/$(printf %03d "$c").mp4" ] || echo "$c"; done; }

echo "рендер: $JOBS процесса × $CONC вкладок, кусков $N"
for pass in 1 2; do
  for c in $(todo); do
    while [ "$(jobs -rp | wc -l)" -ge "$JOBS" ]; do wait -n || true; done
    chunk "$c" &
  done
  wait
  [ -z "$(todo)" ] && break
  # Повтор по одному процессу: куски обычно падают от нехватки памяти при параллельной работе
  JOBS=1; CONC=$CPUS
  echo "повтор упавших кусков по одному ($CONC вкладок): $(todo | tr '\n' ' ')"
done
if [ -n "$(todo)" ]; then
  for c in $(todo); do echo "--- кусок $c:"; tail -20 "out/chunks/$(printf %03d "$c").log"; done
  exit 1
fi

( cd out/chunks && ls [0-9][0-9][0-9].mp4 | sed "s/.*/file '&'/" > list.txt )
ffmpeg -y -loglevel error -f concat -safe 0 -i out/chunks/list.txt -i public/audio/soundtrack.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest out/video.mp4
npx remotion still build ThumbPencil out/thumb.png --browser-executable="$CHROME" --log=error
echo "ok out/video.mp4 out/thumb.png"
