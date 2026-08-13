"""One-off helper: builds crossfade slideshow GIFs for the Projects page from
each project's existing real screenshots/readme assets — not a fabricated
screen recording, just an honest animated slideshow of real material.
"""
from PIL import Image

OUT_DIR = "D:/VScode/dev/debug/vortex-info-next/public/projects"
CANVAS_BG = (11, 12, 15)  # matches --background in app/globals.css
TARGET_WIDTH = 900
HOLD_MS = 2200
FADE_STEPS = 6
FADE_STEP_MS = 40


def fit_on_canvas(path, width, height, bg=CANVAS_BG):
    im = Image.open(path).convert("RGB")
    scale = min(width / im.width, height / im.height)
    new_size = (max(1, round(im.width * scale)), max(1, round(im.height * scale)))
    im = im.resize(new_size, Image.LANCZOS)
    canvas = Image.new("RGB", (width, height), bg)
    canvas.paste(im, ((width - new_size[0]) // 2, (height - new_size[1]) // 2))
    return canvas


def build_gif(frames_paths, out_path, width, height):
    canvases = [fit_on_canvas(p, width, height) for p in frames_paths]

    sequence = []
    durations = []
    n = len(canvases)
    for i in range(n):
        a = canvases[i]
        b = canvases[(i + 1) % n]
        sequence.append(a)
        durations.append(HOLD_MS)
        for step in range(1, FADE_STEPS + 1):
            t = step / (FADE_STEPS + 1)
            sequence.append(Image.blend(a, b, t))
            durations.append(FADE_STEP_MS)

    # Shared adaptive palette across all frames keeps color banding low
    # while still cutting file size roughly 3-4x vs full RGB-per-frame GIFs.
    base_palette = sequence[0].convert("P", palette=Image.ADAPTIVE, colors=128)
    quantized = [
        f.quantize(palette=base_palette, dither=Image.FLOYDSTEINBERG) for f in sequence
    ]

    quantized[0].save(
        out_path,
        save_all=True,
        append_images=quantized[1:],
        duration=durations,
        loop=0,
        optimize=True,
        disposal=2,
    )
    print(f"wrote {out_path} ({len(sequence)} frames)")


# dota-counter-web: 1600x1000 real screenshots (overview -> hero-click detail)
build_gif(
    [
        "D:/VScode/dev/debug/the-counter-web DOTA2/docs/screenshot.png",
        "D:/VScode/dev/debug/the-counter-web DOTA2/docs/screenshot-detail.png",
    ],
    f"{OUT_DIR}/dota-counter-web.gif",
    width=560,
    height=350,
)

# roflo-pinterest: readme assets (tray icon states -> menu -> workflow)
build_gif(
    [
        "D:/VScode/dev/debug/roflo-pinterest/assets/readme/icon-states.png",
        "D:/VScode/dev/debug/roflo-pinterest/assets/readme/menu-mockup.png",
        "D:/VScode/dev/debug/roflo-pinterest/assets/readme/workflow.png",
    ],
    f"{OUT_DIR}/roflo-pinterest.gif",
    width=560,
    height=311,
)
