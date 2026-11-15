def bar_seconds(step_frames, fps):
    """Whole bars per card, close to 96 BPM even for long reading intervals."""
    seconds = step_frames / fps
    bars = max(1, round(seconds / 2.5))
    return seconds / bars
