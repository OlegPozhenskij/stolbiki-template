"""Бумага для фона ролика и обложки + карандашная линия-разделитель."""
import pathlib, numpy as np
from PIL import Image, ImageFilter, ImageDraw
OUT = pathlib.Path(__file__).resolve().parents[2] / "public" / "pencil"
rng = np.random.default_rng(42)

def paper(w, h, base=(250, 244, 228)):
    n = rng.normal(0, 1, (h // 3, w // 3)).astype(np.float32)
    n = np.array(Image.fromarray(n).resize((w, h), Image.BICUBIC))
    fine = rng.normal(0, 1, (h, w)).astype(np.float32)
    from scipy.ndimage import uniform_filter
    fib = uniform_filter(rng.normal(0, 1, (h, w)).astype(np.float32), 5)
    g = 1 + 0.02 * n + 0.028 * fine + 0.03 * fib
    return Image.fromarray(np.clip(np.array(base, np.float32)[None, None] * g[..., None], 0, 255).astype(np.uint8))

paper(1920, 1080).save(OUT / "paper.jpg", quality=92)
paper(1280, 720).save(OUT / "paper-thumb.jpg", quality=92)

# вертикальная карандашная линия (на белом, ложится через multiply)
w, h = 24, 1080
img = Image.new("L", (w, h), 255); d = ImageDraw.Draw(img)
for k in range(3):
    x0 = 12 + rng.normal(0, 1.2)
    pts = [(x0 + np.sin(y / 140 + k) * 1.8 + rng.normal(0, 0.4), y) for y in range(0, h + 20, 20)]
    d.line(pts, fill=int(rng.uniform(70, 120)), width=2)
arr = np.asarray(img, np.float32) / 255
grain = rng.random((h, w)) * 0.5 + 0.5
arr = 1 - (1 - arr) * grain
Image.fromarray((arr * 255).astype(np.uint8)).convert("RGB").save(OUT / "vline.png")
print("ok")
