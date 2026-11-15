"""Превращает плоские SVG из public/art в рисунки цветными карандашами.
1) svg2roughjs (в headless Chrome) перерисовывает фигуры дрожащей линией и штриховкой;
2) Python кладёт рисунок на бумагу с зерном, как будто штрихи легли на шероховатый лист."""
import os, sys, json, pathlib
import numpy as np
from PIL import Image, ImageFilter, ImageChops
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parents[2]
ART = pathlib.Path(os.environ.get("ART_DIR", ROOT / "public" / "art"))
OUT = pathlib.Path(os.environ.get("OUTPUT_DIR", ROOT / "public" / "pencil"))
OUT.mkdir(parents=True, exist_ok=True)
W, H = 960, 1280  # 2x от 480x640 — с запасом под наезд камеры
names = sys.argv[1:] or sorted({p.stem.removesuffix("-bg").removesuffix("-fg") for p in ART.glob("*.svg")})
WHITE = {"badge"}  # эти рисуем на белом, в ролике они ложатся на бумагу режимом multiply
bundle = (ROOT / "scripts/sketch/bundle.js").read_text()

def paper(seed=1):
    rng = np.random.default_rng(seed)
    base = np.array([250, 244, 228], np.float32)
    n = rng.normal(0, 1, (H // 2, W // 2)).astype(np.float32)
    n = np.array(Image.fromarray(n).resize((W, H), Image.BICUBIC))
    fine = rng.normal(0, 1, (H, W)).astype(np.float32)
    g = 1 + 0.018 * n + 0.03 * fine
    img = np.clip(base[None, None, :] * g[..., None], 0, 255)
    return img

def hatching(seed=3, angle=58):
    # штриховка цветного карандаша: много коротких параллельных штрихов разной силы
    from PIL import ImageDraw
    rng = np.random.default_rng(seed)
    big = Image.new("L", (W * 2, H * 2), 0)
    d = ImageDraw.Draw(big)
    a = np.deg2rad(angle)
    dx, dy = np.cos(a), -np.sin(a)
    for _ in range(9000):
        x, y = rng.uniform(-200, W * 2 + 200), rng.uniform(-200, H * 2 + 200)
        L = rng.uniform(60, 260)
        j = rng.normal(0, 0.06)
        ex, ey = x + L * (dx + j), y + L * (dy + j)
        d.line([(x, y), (ex, ey)], fill=int(rng.uniform(90, 255)), width=int(rng.integers(2, 5)))
    t = np.asarray(big.resize((W, H), Image.LANCZOS), np.float32) / 255.0
    return t

def grain_mask(seed=2):
    # бумажное зерно: в «впадинах» карандаш не оставляет цвета
    rng = np.random.default_rng(seed)
    n = rng.random((H, W)).astype(np.float32)
    n = np.array(Image.fromarray((n * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7))) / 255.0
    return np.clip((n - 0.18) * 1.6, 0, 1)

PAGE = """<html><body style='margin:0;background:#fff'><div id='out'></div>
<script>%s</script></body></html>""" % bundle

with sync_playwright() as p:
    b = p.chromium.launch(executable_path=os.environ.get("CHROME", "/usr/bin/google-chrome"), args=["--no-sandbox"])
    pg = b.new_page(viewport={"width": W, "height": H})
    pg.set_content(PAGE)
    def sketch_svg(src, seed, wobble):
            svg_out = pg.evaluate(
                """async ([src, seed, W, H, wobble]) => {
                  const NS = 'http://www.w3.org/2000/svg';
                  const out = document.getElementById('out'); out.innerHTML = '';
                  const doc = new DOMParser().parseFromString(src, 'image/svg+xml');
                  const svg = document.importNode(doc.documentElement, true);
                  const hold = document.createElement('div');
                  hold.style.cssText = 'position:absolute;left:-9999px;top:0';
                  hold.appendChild(svg); document.body.appendChild(hold);
                  svg.querySelectorAll('[stroke-width]').forEach(e => e.setAttribute('stroke-width', parseFloat(e.getAttribute('stroke-width')) * 0.62));

                  // --- Рука не рисует идеально: каждую фигуру чуть искривляем, поворачиваем и сдвигаем ---
                  let st = seed * 9301 + 49297;
                  const rnd = () => { st = (st * 16807) % 2147483647; return st / 2147483647; };
                  const smooth = (P, closed) => {
                    const n = P.length, at = k => closed ? P[(k + n) % n] : P[Math.max(0, Math.min(n - 1, k))];
                    let d = `M${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}`;
                    const last = closed ? n : n - 1;
                    for (let k = 0; k < last; k++) {
                      const p0 = at(k - 1), p1 = at(k), p2 = at(k + 1), p3 = at(k + 2);
                      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
                      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
                      d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
                    }
                    return closed ? d + 'Z' : d;
                  };
                  const GEOM = ['d', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'width', 'height', 'points'];
                  if (wobble) for (const el of [...svg.querySelectorAll('path,circle,ellipse,rect,polygon')]) {
                    if (el.closest('defs')) continue;
                    const bb = el.getBBox();
                    // одинаковые фигуры (контур + заливка поверх) искривляем одинаково, иначе они разъедутся
                    const key = el.tagName + GEOM.map(a => el.getAttribute(a) || '').join('|');
                    let h = seed; for (let q = 0; q < key.length; q++) h = (h * 31 + key.charCodeAt(q)) % 2147483647;
                    st = h || 1;
                    if (bb.width >= 430 || bb.height >= 600) continue; // фон, землю и небо не трогаем: иначе у краёв появятся щели
                    const parts = el.tagName === 'path' ? el.getAttribute('d').split(/(?=M)/).map(x => x.trim()).filter(Boolean) : [null];
                    // поворот и сдвиг всей фигуры: ±2°, ±2px
                    const ang = (rnd() - 0.5) * 4 * Math.PI / 180, ox = (rnd() - 0.5) * 4, oy = (rnd() - 0.5) * 4;
                    const cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2;
                    let d = '';
                    for (const sp of parts) {
                      let g = el, tmp = null;
                      if (sp !== null) { tmp = document.createElementNS(NS, 'path'); tmp.setAttribute('d', sp); el.parentNode.insertBefore(tmp, el); g = tmp; }
                      const L = g.getTotalLength();
                      const closed = sp === null || /[zZ]\\s*$/.test(sp);
                      if (!(L > 0)) { if (tmp) tmp.remove(); d += sp || ''; continue; }
                      const n = Math.max(8, Math.min(70, Math.round(L / 22)));
                      let P = [];
                      for (let k = 0; k < (closed ? n : n + 1); k++) { const q = g.getPointAtLength(L * k / n); P.push([q.x, q.y]); }
                      if (tmp) tmp.remove();
                      const xs = P.map(q => q[0]), ys = P.map(q => q[1]);
                      const size = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
                      const amp = closed ? Math.max(0.5, Math.min(7, size * 0.04)) : Math.max(0.4, Math.min(4, size * 0.025));
                      const k1 = closed ? 2 + Math.floor(rnd() * 2) : 1, k2 = closed ? 4 + Math.floor(rnd() * 3) : 2;
                      const f1 = rnd() * 6.283, f2 = rnd() * 6.283, w2 = 0.25 + rnd() * 0.25;
                      P = P.map((q, k) => {
                        const a = P[(k - 1 + P.length) % P.length], b = P[(k + 1) % P.length];
                        let tx = b[0] - a[0], ty = b[1] - a[1]; const tl = Math.hypot(tx, ty) || 1; tx /= tl; ty /= tl;
                        const t = k / P.length;
                        const off = amp * (Math.sin(6.283 * k1 * t + f1) + w2 * Math.sin(6.283 * k2 * t + f2));
                        let x = q[0] - ty * off, y = q[1] + tx * off;
                        const rx = x - cx, ry = y - cy;
                        return [cx + rx * Math.cos(ang) - ry * Math.sin(ang) + ox, cy + rx * Math.sin(ang) + ry * Math.cos(ang) + oy];
                      });
                      d += smooth(P, closed);
                    }
                    const np = document.createElementNS(NS, 'path');
                    for (const at of el.attributes) if (!GEOM.includes(at.name)) np.setAttribute(at.name, at.value);
                    np.setAttribute('d', d);
                    el.replaceWith(np);
                  }

                  const c = new Svg2Roughjs('#out', OutputType.SVG, {
                    seed, roughness: 1.05, bowing: 1.2, fillStyle: 'solid',
                    hachureGap: 5, fillWeight: 1.6, strokeWidth: 3.2,
                  });
                  c.svg = svg;
                  c.randomize = true; c.pencilFilter = false; c.backgroundColor = null;
                  c.sketchPatterns = true;
                  await c.sketch();
                  hold.remove();
                  const s = out.querySelector('svg');
                  s.setAttribute('viewBox', '0 0 480 640'); s.setAttribute('width', W); s.setAttribute('height', H);
                  return new XMLSerializer().serializeToString(s);
                }""",
                [src, seed, W, H, wobble],
            )
            return svg_out

    def shoot(svg_out, transparent):
        bg = "transparent" if transparent else "#fff"
        pg.set_content(f"<html><body style='margin:0;background:{bg}'>{svg_out}</body></html>")
        tmp = OUT / "_raw.png"
        pg.screenshot(path=str(tmp), clip={"x": 0, "y": 0, "width": W, "height": H}, omit_background=transparent)
        pg.set_content(PAGE)
        arr = np.asarray(Image.open(tmp).convert("RGBA"), np.float32)
        tmp.unlink()
        return arr[..., :3], arr[..., 3:] / 255.0

    def pencil(drawing, k, white=False):
        # Бумага + штриховка + зерно; контуры — плотный тёплый графит
        ink = 1 - drawing / 255.0
        mask = grain_mask(100 + k)[..., None]
        hatch = hatching(300 + k)[..., None]
        ink = ink * (0.50 + 0.50 * hatch) * (0.62 + 0.38 * mask)
        dist = np.sqrt(((drawing - np.array([29, 27, 46], np.float32)) ** 2).sum(axis=2, keepdims=True))
        dark = np.clip((60 - dist) / 30, 0, 1)
        graphite = np.array([0.70, 0.72, 0.76], np.float32)
        ink = np.maximum(ink, graphite * dark * (0.55 + 0.45 * mask))
        pap = np.ones((H, W, 3), np.float32) if white else paper(200 + k) / 255.0
        return np.clip(pap * (1 - ink), 0, 1)

    def soften(rgb):
        img = Image.fromarray((rgb * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.35))
        return np.asarray(img, np.float32) / 255.0

    meta_path = OUT / "meta.json"
    meta = json.loads(meta_path.read_text()) if meta_path.exists() else {}
    for i, name in enumerate(names):
        k = sum(map(ord, name)) % 997  # одинаковые зерно и штриховка для слоёв одной сцены
        seed = 7 + k * 13
        if (ART / f"{name}-fg.svg").exists():
            src_bg = (ART / f"{name}-bg.svg").read_text()
            src_fg = (ART / f"{name}-fg.svg").read_text()
            # рамка животного: от неё в ролике считается точка опоры для движения
            meta[name] = pg.evaluate("""(src) => {
                const d = new DOMParser().parseFromString(src, 'image/svg+xml');
                const s = document.importNode(d.documentElement, true); document.body.appendChild(s);
                const b = s.getBBox(); s.remove();
                return { x: b.x / 480, y: b.y / 640, w: b.width / 480, h: b.height / 640 };
            }""", src_fg)
            bg_rgb, _ = shoot(sketch_svg(src_bg, seed, True), False)
            fg_rgb, fg_a = shoot(sketch_svg(src_fg, seed + 1, True), True)
            bg_p = soften(pencil(bg_rgb, k))
            fg_p = soften(pencil(fg_rgb, k))
            Image.fromarray((bg_p * 255).astype(np.uint8)).save(OUT / f"{name}-bg.jpg", quality=92)
            rgba = np.dstack([fg_p, fg_a])
            Image.fromarray((rgba * 255).astype(np.uint8), "RGBA").save(OUT / f"{name}-fg.png")
            full = bg_p * (1 - fg_a) + fg_p * fg_a
            Image.fromarray((full * 255).astype(np.uint8)).save(OUT / f"{name}.jpg", quality=92)
        else:
            src = (ART / f"{name}.svg").read_text()
            rgb, _ = shoot(sketch_svg(src, seed, name not in WHITE), False)
            out = soften(pencil(rgb, k, white=name in WHITE))
            img = Image.fromarray((out * 255).astype(np.uint8))
            img.save(OUT / (f"{name}.png" if name in WHITE else f"{name}.jpg"), **({} if name in WHITE else {"quality": 92}))
        print("ok", name, flush=True)
    meta_path.write_text(json.dumps(meta, indent=1))
    b.close()
