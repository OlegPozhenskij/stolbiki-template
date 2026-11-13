"""Куски рендера по 20 с (600 кадров). Формулы темпа — те же, что в src/timing.ts.
python3 scripts/chunks.py total            — всего кадров
python3 scripts/chunks.py cards cat,dog    — номера кусков, где видны эти карточки (и заставка, если они в ней)"""
import json, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
CH = 600
data = json.load(open(ROOT / "src/data.json"))
pace = json.load(open(ROOT / "src/pace.json"))
p = pace["short"] if data.get("short") else pace["normal"]
ids = [i["id"] for i in data["items"]]
n = len(ids)
card = lambda i: p["intro"] + i * pace["step"]
total = card(n) + p["holdLast"] + p["outro"]

if sys.argv[1] == "total":
    print(total)
elif sys.argv[1] == "cards":
    chunks = set()
    intro_ids = {ids[0], ids[min(1, n - 1)], ids[max(0, n - 2)], ids[-1]}
    for cid in sys.argv[2].split(","):
        i = ids.index(cid)
        a = card(i) - 10
        # карточка видна, пока справа не появятся ещё 4 (лента уводит её за край), последние — до конца
        b = card(i + 4) + 20 if i + 4 < n else total - 1
        if cid in intro_ids:
            a = 0 if i < 2 else a
            chunks.update(range(0, p["intro"] // CH + 1))
        chunks.update(range(max(0, a) // CH, min(b, total - 1) // CH + 1))
    print(" ".join(str(c) for c in sorted(chunks)))
