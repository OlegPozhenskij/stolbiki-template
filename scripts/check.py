"""Стоп-кадры до рендера: заставка, первый столбик, середина, последний столбик, финал и обложка.
Кадры считаются из src/pace.json и src/data.json, как в src/timing.ts. Итог: out/check.jpg."""
import os, json, pathlib, subprocess
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parents[1]
CHROME = "--browser-executable=" + os.environ.get("CHROME", "/usr/bin/google-chrome")
data = json.load(open(ROOT / "src/data.json"))
pace = json.load(open(ROOT / "src/pace.json"))
n = len(data["items"])
p = pace["short"] if data.get("short") else pace["normal"]
intro, step = p["intro"], pace["step"]
card = lambda i: intro + i * step
outro = card(n) + p["holdLast"]
rewind = n > 4
total = outro + (pace["outroRewind"] if rewind else p["outro"])
cta = outro + (96 if rewind else 30)

frames = {"заставка": int(intro * 0.45), "1-й столбик": card(0) + 60}
if n >= 3:
    frames["середина"] = card(n // 2) + 60
frames["последний"] = card(n - 1) + 60
frames["перед вопросом"] = cta - 2
frames["финал"] = total - 10
out = ROOT / "out"; out.mkdir(exist_ok=True)
subprocess.run(["npx", "remotion", "bundle", "--out-dir=build", "--log=error"], cwd=ROOT, check=True)
for name, f in frames.items():
    subprocess.run(["npx", "remotion", "still", "build", "Pencil", f"out/check-{f}.png", f"--frame={f}", CHROME, "--log=error"], cwd=ROOT, check=True)
subprocess.run(["npx", "remotion", "still", "build", "ThumbPencil", "out/thumb.png", CHROME, "--log=error"], cwd=ROOT, check=True)

rows = (len(frames) + 1) // 2 + 1
sheet = Image.new("RGB", (1920, 540 * rows), "white")
d = ImageDraw.Draw(sheet)
try:  # шрифт с кириллицей, иначе подписи выйдут квадратиками
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 26)
except OSError:
    font = ImageFont.load_default()
for j, (name, f) in enumerate(frames.items()):
    im = Image.open(out / f"check-{f}.png").convert("RGB").resize((960, 540))
    x, y = (j % 2) * 960, (j // 2) * 540
    sheet.paste(im, (x, y)); d.text((x + 12, y + 10), f"{name}: кадр {f}", fill="#c4281f", font=font)
th = Image.open(out / "thumb.png").convert("RGB").resize((960, 540))
sheet.paste(th, (480, 540 * (rows - 1))); d.text((492, 540 * (rows - 1) + 10), "обложка", fill="#c4281f", font=font)
sheet.save(out / "check.jpg", quality=85)
print("ok out/check.jpg, всего кадров:", total, f"({total / pace['fps']:.1f} с)")
