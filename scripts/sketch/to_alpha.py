"""Белый фон -> прозрачность (обратное к наложению на белый). Нужен, чтобы бейдж и линия
ложились на бумагу без белого прямоугольника, даже когда их вращают и масштабируют."""
import sys, numpy as np
from PIL import Image
for path in sys.argv[1:]:
    c = np.asarray(Image.open(path).convert("RGB"), np.float32) / 255
    a = np.clip(1 - c.min(axis=2), 0, 1)
    a = np.clip(a * 1.05, 0, 1)
    rgb = np.where(a[..., None] > 1e-3, (c - (1 - a[..., None])) / np.maximum(a[..., None], 1e-3), 0)
    out = np.dstack([np.clip(rgb, 0, 1), a])
    Image.fromarray((out * 255).astype(np.uint8), "RGBA").save(path)
    print("alpha", path)
