import os
from PIL import Image, ImageDraw, ImageFont

def create_app_icon(size=(1024, 1024)):
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    w, h = size
    
    # Gradient background
    for y in range(h):
        r = int(30 + (37 - 30) * (y / h))
        g = int(64 + (99 - 64) * (y / h))
        b = int(175 + (235 - 175) * (y / h))
        draw.line([(0, y), (w, y)], fill=(r, g, b, 255))

    # White rounded inner card
    card_margin = int(w * 0.18)
    card_rect = [card_margin, card_margin, w - card_margin, h - card_margin]
    card_radius = int(w * 0.15)
    draw.rounded_rectangle(card_rect, radius=card_radius, fill=(255, 255, 255, 255))

    # User head
    cx, cy = w // 2, h // 2 - int(h * 0.08)
    head_r = int(w * 0.12)
    draw.ellipse([cx - head_r, cy - head_r, cx + head_r, cy + head_r], fill=(37, 99, 235, 255))

    # User shoulders/body
    body_w = int(w * 0.38)
    body_h = int(h * 0.20)
    body_top = cy + head_r + int(h * 0.03)
    draw.chord([cx - body_w//2, body_top - body_h, cx + body_w//2, body_top + body_h],
            start=180, end=360, fill=(37, 99, 235, 255))

    # Text UPQ below card
    try:
        font = ImageFont.truetype("arialbd.ttf", int(w * 0.10))
    except:
        font = ImageFont.load_default()
    
    text = "UPQ"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((cx - tw//2, cy + head_r + body_h - int(h * 0.02)), text, fill=(30, 64, 175, 255), font=font)

    return img

def create_adaptive_icon(size=(1024, 1024)):
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    w, h = size

    cx, cy = w // 2, h // 2 - int(h * 0.05)

    # White circular background for logo badge
    badge_r = int(w * 0.32)
    draw.ellipse([cx - badge_r, cy - badge_r, cx + badge_r, cy + badge_r], fill=(255, 255, 255, 255))

    # User head
    head_r = int(w * 0.12)
    head_cy = cy - int(h * 0.06)
    draw.ellipse([cx - head_r, head_cy - head_r, cx + head_r, head_cy + head_r], fill=(37, 99, 235, 255))

    # User body
    body_w = int(w * 0.36)
    body_h = int(h * 0.18)
    body_top = head_cy + head_r + int(h * 0.02)
    draw.chord([cx - body_w//2, body_top - body_h, cx + body_w//2, body_top + body_h],
               start=180, end=360, fill=(37, 99, 235, 255))

    # UPQ text
    try:
        font = ImageFont.truetype("arialbd.ttf", int(w * 0.09))
    except:
        font = ImageFont.load_default()
    text = "UPQ"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    draw.text((cx - tw//2, body_top + int(h * 0.02)), text, fill=(30, 64, 175, 255), font=font)

    return img

def create_splash_icon(size=(1024, 1024)):
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    w, h = size

    cx, cy = w // 2, h // 2 - int(h * 0.08)

    # Outer glow / circle
    outer_r = int(w * 0.28)
    draw.ellipse([cx - outer_r, cy - outer_r, cx + outer_r, cy + outer_r], fill=(37, 99, 235, 255))

    # Inner user icon
    head_r = int(w * 0.09)
    head_cy = cy - int(h * 0.05)
    draw.ellipse([cx - head_r, head_cy - head_r, cx + head_r, head_cy + head_r], fill=(255, 255, 255, 255))

    body_w = int(w * 0.28)
    body_h = int(h * 0.14)
    body_top = head_cy + head_r + int(h * 0.02)
    draw.chord([cx - body_w//2, body_top - body_h, cx + body_w//2, body_top + body_h],
            start=180, end=360, fill=(255, 255, 255, 255))

    # App title below
    try:
        font_title = ImageFont.truetype("arialbd.ttf", int(w * 0.065))
        font_sub = ImageFont.truetype("arial.ttf", int(w * 0.038))
    except:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    text_title = "USUARIOS UPQ"
    bbox_t = draw.textbbox((0, 0), text_title, font=font_title)
    tw_t = bbox_t[2] - bbox_t[0]
    draw.text((cx - tw_t//2, cy + outer_r + int(h * 0.05)), text_title, fill=(30, 64, 175, 255), font=font_title)

    text_sub = "Gestión de Usuarios & API"
    bbox_s = draw.textbbox((0, 0), text_sub, font=font_sub)
    tw_s = bbox_s[2] - bbox_s[0]
    draw.text((cx - tw_s//2, cy + outer_r + int(h * 0.13)), text_sub, fill=(100, 116, 139, 255), font=font_sub)

    return img

assets_dir = "assets"
os.makedirs(assets_dir, exist_ok=True)

icon = create_app_icon()
icon.save(os.path.join(assets_dir, "icon.png"))

adaptive = create_adaptive_icon()
adaptive.save(os.path.join(assets_dir, "adaptive-icon.png"))

splash = create_splash_icon()
splash.save(os.path.join(assets_dir, "splash-icon.png"))

favicon = icon.resize((48, 48), Image.Resampling.LANCZOS)
favicon.save(os.path.join(assets_dir, "favicon.png"))

print("Assets creados exitosamente en /assets!")
