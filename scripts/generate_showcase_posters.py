#!/usr/bin/env python3
"""
Generate 3:4 (1200x1600) Magazine-Grade Showcase Posters for Featured Work
Zero cut-off screenshots: all UIs are scaled, framed in macOS window mockups, and fully legible.
Projects:
  1. Portale Assicurativo (public/projects/assicurativo-studio/showcase.png)
  2. Nagma Tattoo CRM (public/projects/nagma-tattoo-crm/showcase.png)
  3. N2G InkFlow (public/projects/n2g-inkflow/showcase.png)
"""

import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 1600

# Fonts
FONT_TITLE = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 62)
FONT_SUBTITLE = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 26)
FONT_BADGE = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 22)
FONT_TAG = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 20)
FONT_WIN_TITLE = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 18)

def create_gradient(w, h, color1, color2):
    """Vertical gradient"""
    base = Image.new("RGBA", (w, h), color1)
    top = Image.new("RGBA", (w, h), color2)
    mask = Image.new("L", (w, h))
    mask_data = []
    for y in range(h):
        val = int(255 * (y / h))
        mask_data.extend([val] * w)
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

def draw_window_frame(content_img, title="window", win_width=1060, header_h=40, bg_bar=(30, 32, 38)):
    """Wraps an image in a macOS-style rounded window frame with titlebar dots"""
    # Scale content to win_width maintaining aspect ratio
    cw = win_width
    ch = int(content_img.size[1] * (cw / content_img.size[0]))
    content_resized = content_img.resize((cw, ch), Image.Resampling.LANCZOS)
    
    total_h = header_h + ch
    frame = Image.new("RGBA", (cw, total_h), (0, 0, 0, 0))
    
    # Rounded mask for whole window
    mask = Image.new("L", (cw, total_h), 0)
    d_mask = ImageDraw.Draw(mask)
    d_mask.rounded_rectangle((0, 0, cw, total_h), radius=22, fill=255)
    
    # Draw header bar
    d_frame = ImageDraw.Draw(frame)
    d_frame.rectangle((0, 0, cw, header_h), fill=bg_bar)
    
    # macOS window traffic lights
    dot_y = header_h // 2
    d_frame.ellipse((20, dot_y - 6, 32, dot_y + 6), fill=(255, 95, 86))   # Red
    d_frame.ellipse((40, dot_y - 6, 52, dot_y + 6), fill=(255, 189, 46))  # Yellow
    d_frame.ellipse((60, dot_y - 6, 72, dot_y + 6), fill=(39, 201, 63))   # Green
    
    # Title in header
    d_frame.text((86, dot_y - 10), title, font=FONT_WIN_TITLE, fill=(180, 185, 195))
    
    # Paste content below header
    frame.paste(content_resized, (0, header_h))
    
    # Apply rounded corners mask
    rounded_frame = Image.new("RGBA", (cw, total_h), (0, 0, 0, 0))
    rounded_frame.paste(frame, (0, 0), mask)
    
    # Border
    d_rounded = ImageDraw.Draw(rounded_frame)
    d_rounded.rounded_rectangle((0, 0, cw - 1, total_h - 1), radius=22, outline=(255, 255, 255, 40), width=2)
    
    return rounded_frame

def add_drop_shadow(img, offset=(0, 20), blur=35, shadow_color=(0, 0, 0, 140)):
    """Creates a soft blurred drop shadow around a RGBA image"""
    sw = img.size[0] + blur * 2 + abs(offset[0])
    sh = img.size[1] + blur * 2 + abs(offset[1])
    shadow = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    
    # Extract alpha mask of image
    alpha = img.split()[3]
    shadow_mask = Image.new("RGBA", img.size, shadow_color)
    shadow_mask.putalpha(alpha)
    
    # Position shadow
    sx = blur + max(0, offset[0])
    sy = blur + max(0, offset[1])
    shadow.paste(shadow_mask, (sx, sy))
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    
    # Paste actual image over shadow
    ix = blur - min(0, offset[0])
    iy = blur - min(0, offset[1])
    shadow.paste(img, (ix, iy), img)
    return shadow, (ix, iy)

# =========================================================================
# 1. PORTALE ASSICURATIVO SHOWCASE (3:4)
# =========================================================================
def generate_assicurativo_poster():
    poster = create_gradient(W, H, (11, 20, 42), (18, 32, 64))
    draw = ImageDraw.Draw(poster)
    
    # Background subtle grid pattern
    for x in range(0, W, 60):
        draw.line((x, 0, x, H), fill=(255, 255, 255, 8), width=1)
    for y in range(0, H, 60):
        draw.line((0, y, W, y), fill=(255, 255, 255, 8), width=1)
        
    # Ambient glowing circle in center
    glow = Image.new("RGBA", (800, 800), (0, 0, 0, 0))
    d_glow = ImageDraw.Draw(glow)
    d_glow.ellipse((0, 0, 800, 800), fill=(40, 110, 240, 45))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    poster.paste(glow, (200, 450), glow)

    # 1. Top Badge Pill
    badge_text = "ENTERPRISE ERP & AI OCR PIPELINE"
    bbox = FONT_BADGE.getbbox(badge_text)
    bw, bh = bbox[2] - bbox[0] + 50, bbox[3] - bbox[1] + 24
    bx = (W - bw) // 2
    by = 70
    draw.rounded_rectangle((bx, by, bx + bw, by + bh), radius=bh // 2, fill=(28, 48, 92), outline=(64, 120, 240), width=2)
    draw.ellipse((bx + 18, by + bh // 2 - 5, bx + 28, by + bh // 2 + 5), fill=(46, 213, 115))  # Green status dot
    draw.text((bx + 38, by + 10), badge_text, font=FONT_BADGE, fill=(235, 245, 255))
    
    # 2. Main Title & Subtitle
    title = "PORTALE ASSICURATIVO"
    t_bbox = FONT_TITLE.getbbox(title)
    draw.text(((W - (t_bbox[2] - t_bbox[0])) // 2, 135), title, font=FONT_TITLE, fill=(255, 255, 255))
    
    subtitle = "Gestione Polizze Enterprise · Ingestione Automatica · AG Grid 32"
    s_bbox = FONT_SUBTITLE.getbbox(subtitle)
    draw.text(((W - (s_bbox[2] - s_bbox[0])) // 2, 215), subtitle, font=FONT_SUBTITLE, fill=(160, 190, 235))

    # 3. Primary Window Mockup: Full Dashboard
    im_dash = Image.open("public/projects/assicurativo-studio/dashboard.png")
    win1 = draw_window_frame(im_dash, title="Portale Assicurativo — Dashboard & Scadenziario", win_width=1040, header_h=46, bg_bar=(20, 30, 52))
    win1_shadow, (ix, iy) = add_drop_shadow(win1, offset=(0, 25), blur=40, shadow_color=(0, 5, 20, 170))
    poster.paste(win1_shadow, ((W - win1_shadow.size[0]) // 2, 280), win1_shadow)

    # 4. Secondary Window Mockup (Overlapping): AI OCR Pipeline
    im_ocr = Image.open("public/projects/assicurativo-studio/elaborazione-polizze.png")
    win2 = draw_window_frame(im_ocr, title="Pipeline Ingestione AI & Watcher Chokidar", win_width=980, header_h=42, bg_bar=(24, 38, 68))
    win2_shadow, _ = add_drop_shadow(win2, offset=(0, 30), blur=45, shadow_color=(0, 5, 20, 190))
    poster.paste(win2_shadow, ((W - win2_shadow.size[0]) // 2 + 10, 890), win2_shadow)

    # 5. Bottom Tags
    tags = ["REACT 19", "NEXT.JS 16", "AG GRID 32", "CLAUDE VISION OCR", "MONGODB"]
    tx = 90
    ty = 1500
    for tag in tags:
        t_box = FONT_TAG.getbbox(tag)
        tw = t_box[2] - t_box[0] + 32
        th = t_box[3] - t_box[1] + 18
        draw.rounded_rectangle((tx, ty, tx + tw, ty + th), radius=th // 2, fill=(24, 42, 80), outline=(50, 90, 170), width=1)
        draw.text((tx + 16, ty + 8), tag, font=FONT_TAG, fill=(210, 230, 255))
        tx += tw + 14

    os.makedirs("public/projects/assicurativo-studio", exist_ok=True)
    poster.convert("RGB").save("public/projects/assicurativo-studio/showcase-poster.png", "PNG", quality=95)
    print("Generated public/projects/assicurativo-studio/showcase-poster.png")

# =========================================================================
# 2. NAGMA TATTOO CRM SHOWCASE (3:4)
# =========================================================================
def generate_nagma_poster():
    poster = create_gradient(W, H, (14, 16, 22), (22, 26, 36))
    draw = ImageDraw.Draw(poster)
    
    # Ambient cyan/amber glow
    glow1 = Image.new("RGBA", (700, 700), (0, 0, 0, 0))
    d_glow1 = ImageDraw.Draw(glow1)
    d_glow1.ellipse((0, 0, 700, 700), fill=(0, 210, 255, 30))
    glow1 = glow1.filter(ImageFilter.GaussianBlur(130))
    poster.paste(glow1, (50, 400), glow1)

    glow2 = Image.new("RGBA", (600, 600), (0, 0, 0, 0))
    d_glow2 = ImageDraw.Draw(glow2)
    d_glow2.ellipse((0, 0, 600, 600), fill=(255, 140, 50, 25))
    glow2 = glow2.filter(ImageFilter.GaussianBlur(130))
    poster.paste(glow2, (550, 800), glow2)

    # 1. Top Badge Pill
    badge_text = "ENTERPRISE CRM & STUDIO SUITE"
    bbox = FONT_BADGE.getbbox(badge_text)
    bw, bh = bbox[2] - bbox[0] + 50, bbox[3] - bbox[1] + 24
    bx = (W - bw) // 2
    by = 70
    draw.rounded_rectangle((bx, by, bx + bw, by + bh), radius=bh // 2, fill=(28, 32, 46), outline=(0, 180, 240), width=2)
    draw.ellipse((bx + 18, by + bh // 2 - 5, bx + 28, by + bh // 2 + 5), fill=(0, 220, 255))
    draw.text((bx + 38, by + 10), badge_text, font=FONT_BADGE, fill=(235, 248, 255))
    
    # 2. Title & Subtitle
    title = "NAGMA TATTOO CRM"
    t_bbox = FONT_TITLE.getbbox(title)
    draw.text(((W - (t_bbox[2] - t_bbox[0])) // 2, 135), title, font=FONT_TITLE, fill=(255, 255, 255))
    
    subtitle = "Agenda Real-Time · Bilancio Dinamico · Consensi Informati PDFKit"
    s_bbox = FONT_SUBTITLE.getbbox(subtitle)
    draw.text(((W - (s_bbox[2] - s_bbox[0])) // 2, 215), subtitle, font=FONT_SUBTITLE, fill=(160, 180, 210))

    # 3. Primary Window Mockup: Dark Dashboard
    im_dash = Image.open("public/projects/nagma-tattoo-crm/dashboard.png")
    win1 = draw_window_frame(im_dash, title="Nagma Studio — Panoramica Finanziaria & Bilancio", win_width=1040, header_h=46, bg_bar=(20, 23, 32))
    win1_shadow, _ = add_drop_shadow(win1, offset=(0, 25), blur=40, shadow_color=(0, 0, 0, 180))
    poster.paste(win1_shadow, ((W - win1_shadow.size[0]) // 2, 280), win1_shadow)

    # 4. Secondary Window Mockup: Agenda & Kanban
    im_agenda = Image.open("public/projects/nagma-tattoo-crm/agenda-kanban.png")
    win2 = draw_window_frame(im_agenda, title="FullCalendar 6 — Planning Appuntamenti & Staff", win_width=980, header_h=42, bg_bar=(24, 28, 40))
    win2_shadow, _ = add_drop_shadow(win2, offset=(0, 30), blur=45, shadow_color=(0, 0, 0, 200))
    poster.paste(win2_shadow, ((W - win2_shadow.size[0]) // 2 + 10, 890), win2_shadow)

    # 5. Bottom Tags
    tags = ["NEXT.JS 16", "POSTGRESQL 17", "PRISMA 7", "AG GRID 32", "PDFKIT"]
    tx = 100
    ty = 1500
    for tag in tags:
        t_box = FONT_TAG.getbbox(tag)
        tw = t_box[2] - t_box[0] + 32
        th = t_box[3] - t_box[1] + 18
        draw.rounded_rectangle((tx, ty, tx + tw, ty + th), radius=th // 2, fill=(28, 32, 46), outline=(60, 80, 120), width=1)
        draw.text((tx + 16, ty + 8), tag, font=FONT_TAG, fill=(210, 230, 255))
        tx += tw + 14

    os.makedirs("public/projects/nagma-tattoo-crm", exist_ok=True)
    poster.convert("RGB").save("public/projects/nagma-tattoo-crm/showcase-poster.png", "PNG", quality=95)
    print("Generated public/projects/nagma-tattoo-crm/showcase-poster.png")

# =========================================================================
# 3. N2G INKFLOW SHOWCASE (3:4)
# =========================================================================
def generate_inkflow_poster():
    poster = create_gradient(W, H, (20, 19, 18), (32, 30, 28))
    draw = ImageDraw.Draw(poster)
    
    # Ambient warm glow
    glow = Image.new("RGBA", (750, 750), (0, 0, 0, 0))
    d_glow = ImageDraw.Draw(glow)
    d_glow.ellipse((0, 0, 750, 750), fill=(215, 175, 120, 28))
    glow = glow.filter(ImageFilter.GaussianBlur(130))
    poster.paste(glow, (220, 500), glow)

    # 1. Top Badge Pill
    badge_text = "CREATIVE STUDIO SUITE & SCHEDULING"
    bbox = FONT_BADGE.getbbox(badge_text)
    bw, bh = bbox[2] - bbox[0] + 50, bbox[3] - bbox[1] + 24
    bx = (W - bw) // 2
    by = 70
    draw.rounded_rectangle((bx, by, bx + bw, by + bh), radius=bh // 2, fill=(40, 36, 32), outline=(200, 160, 95), width=2)
    draw.ellipse((bx + 18, by + bh // 2 - 5, bx + 28, by + bh // 2 + 5), fill=(225, 175, 100))
    draw.text((bx + 38, by + 10), badge_text, font=FONT_BADGE, fill=(250, 245, 235))
    
    # 2. Title & Subtitle
    title = "N2G INKFLOW"
    t_bbox = FONT_TITLE.getbbox(title)
    draw.text(((W - (t_bbox[2] - t_bbox[0])) // 2, 135), title, font=FONT_TITLE, fill=(255, 255, 255))
    
    subtitle = "Tinta Santa Studio · FullCalendar 6 · Media Vault Cloudinary"
    s_bbox = FONT_SUBTITLE.getbbox(subtitle)
    draw.text(((W - (s_bbox[2] - s_bbox[0])) // 2, 215), subtitle, font=FONT_SUBTITLE, fill=(210, 195, 175))

    # 3. Primary Window Mockup: Tinta Santa Desktop with "Il lavoro di oggi." 100% VISIBLE
    im_desk = Image.open("/Users/giovannivenditto/Documents/progetto-NIK/n2g-inkflow/files/tinta-santa-desktop.png")
    win1 = draw_window_frame(im_desk, title="Tinta Santa Spazio di lavoro — Il lavoro di oggi", win_width=1040, header_h=46, bg_bar=(28, 27, 26))
    win1_shadow, _ = add_drop_shadow(win1, offset=(0, 25), blur=40, shadow_color=(0, 0, 0, 180))
    poster.paste(win1_shadow, ((W - win1_shadow.size[0]) // 2, 280), win1_shadow)

    # 4. Secondary Device Mockup: Mobile Phone View + Calendar View
    im_mob = Image.open("/Users/giovannivenditto/Documents/progetto-NIK/n2g-inkflow/files/tinta-santa-mobile.png")
    # Wrap mobile in rounded phone mockup
    mw, mh = 380, int(im_mob.size[1] * (380 / im_mob.size[0]))
    im_mob_res = im_mob.resize((mw, mh), Image.Resampling.LANCZOS)
    phone = Image.new("RGBA", (mw, mh), (0, 0, 0, 0))
    p_mask = Image.new("L", (mw, mh), 0)
    p_draw = ImageDraw.Draw(p_mask)
    p_draw.rounded_rectangle((0, 0, mw, mh), radius=36, fill=255)
    phone.paste(im_mob_res, (0, 0), p_mask)
    p_border = ImageDraw.Draw(phone)
    p_border.rounded_rectangle((0, 0, mw - 1, mh - 1), radius=36, outline=(255, 255, 255, 90), width=4)
    phone_shadow, _ = add_drop_shadow(phone, offset=(0, 25), blur=35, shadow_color=(0, 0, 0, 210))

    # Also secondary window mockup of presentation / agenda
    im_pres = Image.open("public/projects/n2g-inkflow/dashboard.png")
    win2 = draw_window_frame(im_pres, title="FullCalendar Engine & Gestione Rubrica", win_width=680, header_h=40, bg_bar=(32, 30, 28))
    win2_shadow, _ = add_drop_shadow(win2, offset=(0, 25), blur=40, shadow_color=(0, 0, 0, 190))

    poster.paste(win2_shadow, (70, 930), win2_shadow)
    poster.paste(phone_shadow, (740, 880), phone_shadow)

    # 5. Bottom Tags
    tags = ["REACT 19", "FULLCALENDAR 6", "AG GRID", "CLOUDINARY", "JWT RBAC"]
    tx = 85
    ty = 1500
    for tag in tags:
        t_box = FONT_TAG.getbbox(tag)
        tw = t_box[2] - t_box[0] + 32
        th = t_box[3] - t_box[1] + 18
        draw.rounded_rectangle((tx, ty, tx + tw, ty + th), radius=th // 2, fill=(40, 36, 32), outline=(100, 85, 65), width=1)
        draw.text((tx + 16, ty + 8), tag, font=FONT_TAG, fill=(235, 220, 200))
        tx += tw + 14

    os.makedirs("public/projects/n2g-inkflow", exist_ok=True)
    poster.convert("RGB").save("public/projects/n2g-inkflow/showcase-poster.png", "PNG", quality=95)
    print("Generated public/projects/n2g-inkflow/showcase-poster.png")

if __name__ == "__main__":
    generate_assicurativo_poster()
    generate_nagma_poster()
    generate_inkflow_poster()
    print("All 3 showcase posters generated successfully!")
