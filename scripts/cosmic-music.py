"""Original space soundtrack: warm synth pads, glass arpeggios and quiet pulses."""
import json, os, pathlib, subprocess
import numpy as np
from scipy.signal import butter, sosfilt
from scipy.io import wavfile

ROOT=pathlib.Path(__file__).resolve().parents[1]
timeline=json.loads(pathlib.Path(os.environ['TIMELINE_PATH']).read_text())
SR=44100; total=timeline['total']/timeline['fps']; N=round(total*SR)
mix=np.zeros((N,2),dtype=np.float32); rng=np.random.default_rng(7524)
def put(sig,t,gain=1,pan=0):
    start=round(t*SR)
    if start<0: sig=sig[-start:];start=0
    if start>=N:return
    sig=sig[:N-start]*gain
    mix[start:start+len(sig),0]+=sig*np.sqrt((1-pan)/2)
    mix[start:start+len(sig),1]+=sig*np.sqrt((1+pan)/2)
def hz(m):return 440*2**((m-69)/12)
def pad(notes,duration):
    t=np.arange(round(duration*SR),dtype=np.float32)/SR
    s=np.zeros_like(t)
    for m in notes:
        f=hz(m)
        s+=np.sin(2*np.pi*f*t+.16*np.sin(t*.7))*.7
        s+=np.sin(2*np.pi*f*1.0021*t)*.23
        s+=np.sin(2*np.pi*f*2*t)*.045
    envelope=np.minimum(1,t/1.6)*np.minimum(1,(duration-t)/2.1)
    return s/len(notes)*np.maximum(envelope,0)
def glass(m,duration=2.8):
    t=np.arange(round(duration*SR),dtype=np.float32)/SR;f=hz(m)
    s=np.sin(2*np.pi*f*t)+.18*np.sin(2*np.pi*f*2.005*t)*np.exp(-t*2)
    return s*np.minimum(1,t/.008)*np.exp(-t*1.6)
chords=[[50,57,60,64],[46,53,57,62],[53,60,64,67],[48,55,62,64]]
for index,start in enumerate(np.arange(0,total,8)):
    chord=chords[index%4]
    put(pad(chord,10.5),start-.6,.30,pan=.16*np.sin(index))
    # Subtle bass heartbeat, with space between phrases.
    for beat in range(8):
        t=np.arange(round(.6*SR),dtype=np.float32)/SR
        pulse=np.sin(2*np.pi*hz(chord[0]-12)*t)*np.minimum(1,t/.025)*np.exp(-t*7)
        put(pulse,start+beat,.12)
    # Patterns change every phrase, while the mood remains gentle.
    pattern=[0,2,1,3,2,1,3,0] if index%2==0 else [3,1,2,0,1,2,0,3]
    for beat,key in enumerate(pattern):
        put(glass(chord[key]+12),start+beat+.33,.065 if index%8<6 else .035,pan=(-.45 if beat%2 else .45))
for index,frame in enumerate(timeline['cardStarts']):
    t=np.arange(round(.7*SR),dtype=np.float32)/SR
    air=sosfilt(butter(2,[900,3800],'bandpass',fs=SR,output='sos'),rng.normal(0,1,len(t))).astype(np.float32)
    put(air*np.sin(np.pi*t/.7)**2,frame/timeline['fps']-.1,.018,pan=.2*(-1)**index)
    if index%4==0:put(glass([86,81,89,84][(index//4)%4]),frame/timeline['fps']+.4,.035)
# Sparse echoes give space without heavy long convolution or external samples.
for delay,gain in [(.29,.15),(.53,.1),(.83,.06)]:
    shift=round(delay*SR);mix[shift:]+=mix[:-shift,::-1].copy()*gain
fade=min(N//2,round(2*SR));mix[:fade]*=np.linspace(0,1,fade)[:,None];mix[-fade:]*=np.linspace(1,0,fade)[:,None]
peak=np.abs(mix).max();mix=np.tanh(mix/max(peak,.01)*1.2)*.82
out=pathlib.Path(os.environ['OUTPUT_AUDIO']);out.parent.mkdir(parents=True,exist_ok=True)
raw=out.with_name('cosmic-raw.wav');wavfile.write(raw,SR,(mix*32767).astype(np.int16))
subprocess.run(['ffmpeg','-y','-loglevel','error','-i',str(raw),'-af','loudnorm=I=-16:TP=-1:LRA=10','-ar',str(SR),'-c:a','pcm_s16le','-t',str(total),str(out)],check=True)
print(f'Cosmic soundtrack: {total:.3f}s, original synthesis, no external samples.')
