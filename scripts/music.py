"""Саундтрек под ролик: светлая мелодия (темп из pace.json: столбик = 2 такта) (укулеле, бас, колокольчики, лёгкие барабаны)
+ звуки на появление каждого столбика. Тайминг совпадает с src/timing.ts:
один столбик = 2 такта (при step 150 это 5 секунд, 96 BPM). Всё синтезируется кодом, никаких чужих сэмплов."""
import json, pathlib, subprocess, os, numpy as np
from music_timing import bar_seconds
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile

ROOT = pathlib.Path(__file__).resolve().parents[1]
SR = 44100
# Темп берётся из того же src/pace.json, что и src/timing.ts (формулы те же)
timeline=json.loads(pathlib.Path(os.environ.get("TIMELINE_PATH",ROOT/"src/generated/timeline.json")).read_text())
n_items=len(timeline["cardStarts"])
FPS,STEP,INTRO,HOLD_LAST,OUTRO=(timeline[k] for k in ["fps","step","intro","holdLast","outro"])
BAR = bar_seconds(STEP, FPS)
BEAT = BAR / 4
BPM = 60 / BEAT
card_t = [f / FPS for f in timeline["cardStarts"]]
outro_t = timeline["outroStart"] / FPS
total = timeline["total"] / FPS
intro_bars = round(INTRO / FPS / BAR)
N = int(total * SR) + SR
rng = np.random.default_rng(17 if os.environ.get("MUSIC_PRESET") == "calm" else 7)
CALM = os.environ.get("MUSIC_PRESET") == "calm"
mixL, mixR = np.zeros(N), np.zeros(N)

def hz(m): return 440 * 2 ** ((m - 69) / 12)

def put(sig, t, gain=1.0, pan=0.0):
    i = int(t * SR)
    if i < 0:
        sig = sig[-i:]
        i = 0
    if i >= N: return
    sig = sig[: N - i] * gain
    mixL[i:i + len(sig)] += sig * np.sqrt((1 - pan) / 2)
    mixR[i:i + len(sig)] += sig * np.sqrt((1 + pan) / 2)

def env(n, a=0.005, d=0.3):
    t = np.arange(n) / SR
    return np.minimum(1, t / a) * np.exp(-t / d)

def lp(x, f, order=2):
    return sosfilt(butter(order, f, "low", fs=SR, output="sos"), x)

def bp(x, lo, hi):
    return sosfilt(butter(2, [lo, hi], "band", fs=SR, output="sos"), x)

def pluck(f, dur=1.2, bright=0.5):
    # Карплус-Стронг: звучит как щипок струны
    n = int(dur * SR); p = max(2, int(SR / f))
    buf = rng.uniform(-1, 1, p); buf = lp(buf, 2000 + 5000 * bright, 1)
    out = np.zeros(n)
    for i in range(n):
        out[i] = buf[i % p]
        buf[i % p] = 0.5 * (buf[i % p] + buf[(i + 1) % p]) * 0.996
    return out * env(n, 0.002, dur * 0.6)

_cache = {}
def pl(m, bright=0.5):
    k = (m, round(bright, 1))
    if k not in _cache: _cache[k] = pluck(hz(m), 1.1, bright)
    return _cache[k]

def glock(m, dur=1.6):
    n = int(dur * SR); t = np.arange(n) / SR; f = hz(m)
    s = np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t * 6) + 0.08 * np.sin(2 * np.pi * f * 5.4 * t) * np.exp(-t * 12)
    return s * env(n, 0.002, 0.55)

def bass(m, dur=0.45):
    n = int(dur * SR); t = np.arange(n) / SR; f = hz(m)
    s = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(4 * np.pi * f * t) + 0.12 * np.sin(6 * np.pi * f * t)
    return lp(s * env(n, 0.006, 0.28), 900)

def kick():
    n = int(0.3 * SR); t = np.arange(n) / SR
    f = 50 + 70 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.002, 0.12)

def clap():
    n = int(0.22 * SR)
    return bp(rng.uniform(-1, 1, n), 900, 3500) * env(n, 0.003, 0.06)

def shaker():
    n = int(0.07 * SR)
    return sosfilt(butter(2, 5000, "high", fs=SR, output="sos"), rng.uniform(-1, 1, n)) * env(n, 0.01, 0.025)

def whoosh(d=0.55):
    n = int(d * SR); t = np.arange(n) / SR
    x = rng.uniform(-1, 1, n); x = bp(x, 500, 4000)
    return x * np.sin(np.pi * t / d) ** 2

def pop(m):
    n = int(0.25 * SR); t = np.arange(n) / SR
    f = hz(m) * (1 + 0.6 * np.exp(-t * 40))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.002, 0.07)

# Аккорды: C - G - Am - F (по такту), голоса укулеле
CHORDS = [[60, 64, 67, 72], [59, 62, 67, 71], [57, 60, 64, 69], [57, 60, 65, 69]]
ROOTS = [36, 43, 45, 41]
STRUM = [(0, 1, 1.0), (1, 1, 0.5), (1.5, -1, 0.55), (2.5, -1, 0.6), (3, 1, 0.8), (3.5, -1, 0.55)]
# мелодия колокольчиков: на 4 такта, (доля, нота)
MEL_A = [(0, 76), (1, 79), (2, 81), (3, 79), (4, 74), (5.5, 76), (6, 79), (8, 81), (9, 79), (10, 76), (11, 72), (12, 77), (13, 76), (14, 74), (15, 72)]
MEL_B = [(0, 72), (0.5, 74), (1, 76), (2, 79), (4, 79), (5, 81), (6, 79), (7, 76), (8, 76), (9, 72), (10, 74), (12, 72), (14, 69), (15, 72)]

n_bars = int(np.ceil(total / BAR))
outro_bar = int(round(outro_t / BAR))
for b in range(n_bars):
    t0 = b * BAR
    if t0 > total - 1.5: break
    ci = b % 4
    full = intro_bars <= b < outro_bar
    last = b == n_bars - 1 or t0 + BAR > total - 1.5
    # укулеле
    for beat, direction, vel in (STRUM[:1] if last else STRUM):
        notes = CHORDS[ci] if direction > 0 else CHORDS[ci][::-1]
        for k, m in enumerate(notes):
            put(pl(m, 0.35 + 0.3 * vel), t0 + beat * BEAT + k * 0.012, 0.16 * vel, pan=-0.25)
    # бас и барабаны — после заставки
    if full:
        r = ROOTS[ci]
        for beat, m in [(0, r), (1.5, r), (2, r + 7 if ci != 2 else r + 3), (3, r)]:
            put(bass(m), t0 + beat * BEAT, 0.42)
        for beat in (0, 2): put(kick(), t0 + beat * BEAT, 0.16 if CALM else 0.55)
        for beat in (1, 3): put(clap(), t0 + beat * BEAT, 0.03 if CALM else 0.16, pan=0.1)
        for e in range(4 if CALM else 8): put(shaker(), t0 + e * BEAT / 2, 0.05 + 0.03 * (e % 2), pan=0.4)
    # колокольчики: заставка + каждые вторые 4 такта
    if b < intro_bars or (full and (b // 4) % 2 == 1) or b >= outro_bar:
        mel = MEL_A if (b // 8) % 2 == 0 else MEL_B
        part = (b % 4) * 4
        for beat, m in mel:
            if part <= beat < part + 4:
                put(glock(m), t0 + (beat - part) * BEAT, 0.11, pan=0.3)
    if last:
        for k, m in enumerate([48, 60, 64, 67, 72, 76]):
            put(pluck(hz(m), 3.5, 0.5), t0 + k * 0.03, 0.18)
        put(glock(84, 3), t0 + 0.2, 0.12)
        break

# Звуки появления столбиков: шорох + «поп» с нотой, которая поднимается к финалу
scale = [72, 74, 76, 79, 81, 84, 86, 88, 91, 93, 96, 98]
for i, t in enumerate(card_t):
    put(whoosh(), t - 0.12, 0.22, pan=-0.2 + 0.4 * (i % 2))
    put(pop(scale[i % len(scale)]), t + 12 / FPS, 0.28)
    put(glock(scale[i % len(scale)] - 12), t + 12 / FPS, 0.07)
# Особый последний столбик: звенящее арпеджио вверх, как фанфары из колокольчиков
if n_items > 1:
    t_last = card_t[-1] + 20 / FPS
    for k, m in enumerate([72, 76, 79, 84, 88, 91, 96]):
        put(glock(m, 2.2), t_last + k * 0.07, 0.13, pan=-0.3 + 0.1 * k)
    put(whoosh(1.0), card_t[-1] - 0.3, 0.3)
put(whoosh(1.4), outro_t, 0.25)

# Немного зала (реверберация) и мягкий лимитер
ir_n = int(1.8 * SR); ir_t = np.arange(ir_n) / SR
ir = rng.normal(0, 1, ir_n) * np.exp(-ir_t * 3.2); ir = lp(ir, 5000); ir /= np.abs(ir).sum() / 6
L = mixL + 0.16 * fftconvolve(mixL, ir)[:N]
R = mixR + 0.16 * fftconvolve(mixR, ir[::-1].copy())[:N]
st = np.stack([L, R], 1)[: int(total * SR)]
fade = int(0.8 * SR); st[-fade:] *= np.linspace(1, 0, fade)[:, None]
st = st / np.abs(st).max() * 1.2
st = np.tanh(st) / np.tanh(1.2) * 0.89
out = pathlib.Path(os.environ.get("OUTPUT_AUDIO",ROOT/"public/audio/soundtrack.wav"))
out.parent.mkdir(parents=True,exist_ok=True)
raw = out.with_name("_raw.wav")
wavfile.write(raw, SR, (st * 32767).astype(np.int16))

# Громкость −14 LUFS (норма YouTube): два прохода ffmpeg loudnorm. Без этого короткий трек выходит тише нормы
LN = "loudnorm=I=-14:TP=-1:LRA=11"
log = subprocess.run(["ffmpeg", "-hide_banner", "-i", raw, "-af", LN + ":print_format=json", "-c:a", "pcm_s16le", "-f", "null", "-"],
                     capture_output=True, text=True).stderr
m = json.loads(log[log.rindex("{"): log.rindex("}") + 1])
LN += (f":measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}"
       f":measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true")
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", raw, "-af", LN, "-ar", str(SR), "-c:a", "pcm_s16le", out], check=True)
raw.unlink()
print("ok", out, round(total, 2), "s")
