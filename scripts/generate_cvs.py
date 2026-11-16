#!/usr/bin/env python3
"""
Professional Single-Page A4 CV Generator for Giovanni Venditto
Perfect vertical rhythm, zero awkward bottom blank space (ends precisely at ~35 pt),
complete 4-project showcase + Agilae, Anthropic credentials.
Generates:
  - public/documents/CV_Giovanni_Venditto_IT.pdf
  - public/documents/CV_Giovanni_Venditto_EN.pdf
  - public/documents/CV_Giovanni_Venditto.pdf (copy of IT)
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib import colors

WIDTH, HEIGHT = A4  # 595.28 x 841.89 pt
SIDEBAR_W = 172
MAIN_X = 192
MAIN_W = WIDTH - MAIN_X - 24  # 379.28 pt

# Palette
C_DARK_BG = colors.HexColor("#141311")
C_GOLD = colors.HexColor("#c89b53")
C_GOLD_LIGHT = colors.HexColor("#dfb97a")
C_SIDE_TEXT = colors.HexColor("#e8e3dc")
C_SIDE_LABEL = colors.HexColor("#9b9287")
C_SIDE_LINE = colors.HexColor("#2d2925")

C_MAIN_TITLE = colors.HexColor("#0f0e0d")
C_MAIN_ROLE = colors.HexColor("#b37d34")
C_MAIN_MUTED = colors.HexColor("#5c564e")
C_MAIN_BODY = colors.HexColor("#2a2723")
C_LINE = colors.HexColor("#dcd6cc")
C_TAG_BG = colors.HexColor("#f6f3ee")
C_TAG_BORDER = colors.HexColor("#e5dfd5")

def wrap_text(c, text, width, font_name, font_size):
    words = text.split()
    lines = []
    curr = []
    for w in words:
        test = " ".join(curr + [w])
        if c.stringWidth(test, font_name, font_size) <= width:
            curr.append(w)
        else:
            if curr:
                lines.append(" ".join(curr))
            curr = [w]
    if curr:
        lines.append(" ".join(curr))
    return lines

def draw_bullet(c, x, y, text, width, font_name="Helvetica", font_size=8.15, leading=11.6):
    # Diamond / Square bullet
    c.setFont("ZapfDingbats", 5.5)
    c.setFillColor(C_MAIN_ROLE)
    c.drawString(x, y + 2, "n")
    
    c.setFont(font_name, font_size)
    c.setFillColor(C_MAIN_BODY)
    lines = wrap_text(c, text, width - 12, font_name, font_size)
    curr_y = y
    for line in lines:
        c.drawString(x + 11, curr_y, line)
        curr_y -= leading
    return y - curr_y

def generate_cv(locale="it", output_path="public/documents/CV_Giovanni_Venditto.pdf"):
    c = canvas.Canvas(output_path, pagesize=A4)
    c.setTitle(f"Giovanni Venditto - CV ({locale.upper()})")
    c.setAuthor("Giovanni Venditto")
    c.setSubject("Curriculum Vitae - Fullstack & AI Engineer")

    # 1. SIDEBAR BACKGROUND (Full page top-to-bottom edge-to-edge)
    c.setFillColor(C_DARK_BG)
    c.rect(0, 0, SIDEBAR_W, HEIGHT, fill=1, stroke=0)

    # 2. SIDEBAR CONTENT
    side_x = 18
    side_w = SIDEBAR_W - 36
    sy = HEIGHT - 34

    def side_header(title):
        nonlocal sy
        c.setFont("Helvetica-Bold", 8.8)
        c.setFillColor(C_GOLD)
        c.drawString(side_x, sy, title.upper())
        sy -= 4
        c.setStrokeColor(C_SIDE_LINE)
        c.setLineWidth(0.8)
        c.line(side_x, sy, side_x + side_w, sy)
        sy -= 11

    def side_item(label, val):
        nonlocal sy
        c.setFont("Helvetica-Bold", 7.4)
        c.setFillColor(C_SIDE_LABEL)
        c.drawString(side_x, sy, label)
        sy -= 10
        c.setFont("Helvetica", 7.8)
        c.setFillColor(C_SIDE_TEXT)
        lines = wrap_text(c, val, side_w, "Helvetica", 7.8)
        for l in lines:
            c.drawString(side_x, sy, l)
            sy -= 10.5
        sy -= 3.5

    # SIDEBAR: QUICK PROFILE
    side_header("Profilo Rapido" if locale == "it" else "Quick Profile")
    side_item("Ruolo Principale" if locale == "it" else "Core Role", "Fullstack & AI Engineer")
    side_item("Esperienza" if locale == "it" else "Experience", "2+ anni su sistemi SaaS" if locale == "it" else "2+ yrs production SaaS")
    side_item("Sede" if locale == "it" else "Location", "Napoli / Remoto (Worldwide)" if locale == "it" else "Italy / Remote Worldwide")
    side_item("Disponibilità" if locale == "it" else "Availability", "Aperto a progetti & contratti" if locale == "it" else "Open to select opportunities")

    # SIDEBAR: CONTACTS
    sy -= 6
    side_header("Contatti & Social" if locale == "it" else "Contacts & Social")
    side_item("Email", "vendittogiovanni97@hotmail.it")
    side_item("Portfolio", "giovannivenditto.dev")
    side_item("GitHub", "github.com/vendittogiovanni97")
    side_item("LinkedIn", "linkedin.com/in/giovannivenditto")

    # SIDEBAR: LANGUAGES
    sy -= 6
    side_header("Lingue" if locale == "it" else "Languages")
    side_item("Italiano" if locale == "it" else "Italian", "Madrelingua (C2)" if locale == "it" else "Native speaker (C2)")
    side_item("Inglese" if locale == "it" else "English", "Professionale fluente (B2/C1)" if locale == "it" else "Professional Working (B2/C1)")

    # SIDEBAR: TECH STACK
    sy -= 6
    side_header("Tech Stack Principale" if locale == "it" else "Core Tech Stack")
    side_item("Linguaggi" if locale == "it" else "Languages", "TypeScript, JavaScript, Python, SQL")
    side_item("Frontend", "React 19, Next.js 16, AG Grid 32, Tailwind 4, Three.js, Framer")
    side_item("Backend & API", "Node.js, Express 5, RESTful APIs, Microfrontend, NestJS")
    side_item("Database & Cloud", "PostgreSQL 17, MongoDB, Prisma 7, Docker, Vercel, Supabase")
    side_item("AI Engineering", "Anthropic Claude API, Agentic CLI, OCR Pipelines (Claude/Gemini)")

    # SIDEBAR: CERTIFICATIONS & EDUCATION
    sy -= 6
    side_header("Certificazioni & Studi" if locale == "it" else "Certifications & Edu")
    
    # Anthropic
    c.setFont("Helvetica-Bold", 7.6)
    c.setFillColor(C_GOLD_LIGHT)
    c.drawString(side_x, sy, "Anthropic Claude Official (2026)")
    sy -= 10.5
    c.setFont("Helvetica", 7.4)
    c.setFillColor(C_SIDE_TEXT)
    certs = [
        "• Claude 101: Prompt & LLMs",
        "• Claude Code 101: Agentic CLI",
        "• Platform 101: Tool-Use & API",
        "• Claude Cowork: Multi-Agent"
    ]
    for cr in certs:
        c.drawString(side_x + 2, sy, cr)
        sy -= 10
    sy -= 5

    # University
    c.setFont("Helvetica-Bold", 7.6)
    c.setFillColor(C_SIDE_LABEL)
    c.drawString(side_x, sy, "Link Campus University (2025)")
    sy -= 10
    c.setFont("Helvetica", 7.4)
    c.setFillColor(C_SIDE_TEXT)
    c.drawString(side_x + 2, sy, "Specializzazione Full Stack Web")
    sy -= 13

    # Nexus
    c.setFont("Helvetica-Bold", 7.6)
    c.setFillColor(C_SIDE_LABEL)
    c.drawString(side_x, sy, "Nexus Pozzuoli (2025)")
    sy -= 10
    c.setFont("Helvetica", 7.4)
    c.setFillColor(C_SIDE_TEXT)
    c.drawString(side_x + 2, sy, "Ingegneria Frontend & React")
    sy -= 12

    # Metodologia
    c.setFont("Helvetica-Bold", 7.6)
    c.setFillColor(C_SIDE_LABEL)
    c.drawString(side_x, sy, "Metodologia & Pratiche" if locale == "it" else "Methodology & Best Practices")
    sy -= 10
    c.setFont("Helvetica", 7.3)
    c.setFillColor(C_SIDE_TEXT)
    practices = (
        ["• Monorepo & Modular Architecture", "• Strict Type Safety & Clean Code", "• CI/CD & Automated Testing (Jest)", "• Security Hardening & Zero-Trust"]
        if locale == "it" else
        ["• Monorepo & Modular Architecture", "• Strict Type Safety & Clean Code", "• CI/CD & Automated Testing (Jest)", "• Security Hardening & Zero-Trust"]
    )
    for pr in practices:
        c.drawString(side_x + 2, sy, pr)
        sy -= 9.5

    # -------------------------------------------------------------
    # 3. MAIN COLUMN CONTENT (Refined layout, zero empty void)
    # -------------------------------------------------------------
    my = HEIGHT - 34

    # Header Name & Title
    c.setFont("Helvetica-Bold", 22)
    c.setFillColor(C_MAIN_TITLE)
    c.drawString(MAIN_X, my, "GIOVANNI VENDITTO")
    my -= 16

    c.setFont("Helvetica-Bold", 10.5)
    c.setFillColor(C_MAIN_ROLE)
    sub_title = "FULLSTACK & AI-READY ENGINEER" if locale == "en" else "INGEGNERE FULLSTACK & AI-READY"
    c.drawString(MAIN_X, my, sub_title)
    
    c.setFont("Helvetica", 8.2)
    c.setFillColor(C_MAIN_MUTED)
    location_str = "Napoli / Remoto · vendittogiovanni97@hotmail.it · giovannivenditto.dev" if locale == "it" else "Italy / Remote · vendittogiovanni97@hotmail.it · giovannivenditto.dev"
    c.drawRightString(MAIN_X + MAIN_W, my, location_str)
    my -= 10

    c.setStrokeColor(C_LINE)
    c.setLineWidth(0.9)
    c.line(MAIN_X, my, MAIN_X + MAIN_W, my)
    my -= 16

    def main_section_title(title):
        nonlocal my
        c.setFont("Helvetica-Bold", 10.2)
        c.setFillColor(C_MAIN_TITLE)
        c.drawString(MAIN_X, my, title.upper())
        my -= 4.5
        c.setStrokeColor(C_LINE)
        c.setLineWidth(0.6)
        c.line(MAIN_X, my, MAIN_X + MAIN_W, my)
        my -= 11

    # PROFILE SUMMARY
    main_section_title("Profilo Professionale" if locale == "it" else "Executive Summary")
    if locale == "it":
        p_text = (
            "Ingegnere del software specializzato nella progettazione e sviluppo end-to-end di architetture enterprise, "
            "piattaforme SaaS ad alte prestazioni e flussi di automazione agentica con AI (Anthropic Claude). "
            "Combino solida competenza architetturale frontend (React 19, Next.js 16, AG Grid, Tailwind) con robustezza "
            "backend (Node.js, Express, PostgreSQL, MongoDB, pipeline OCR con Claude/Gemini) e rigore di sicurezza (RBAC a più livelli, validazione MIME magic bytes, mitigazione path traversal e rate limiting)."
        )
    else:
        p_text = (
            "Software Engineer specializing in end-to-end architecture and engineering of enterprise platforms, "
            "high-performance SaaS applications, and Agentic AI workflows (Anthropic Claude). "
            "Combining advanced frontend engineering (React 19, Next.js 16, AG Grid, Tailwind) with resilient backend systems "
            "(Node.js, Express, PostgreSQL, MongoDB, multimodal OCR vision pipelines with Claude/Gemini) and production-grade security (multi-tier RBAC, MIME magic byte validation, path traversal mitigation, and rate limiting)."
        )
    p_lines = wrap_text(c, p_text, MAIN_W, "Helvetica", 8.3)
    c.setFont("Helvetica", 8.3)
    c.setFillColor(C_MAIN_BODY)
    for pl in p_lines:
        c.drawString(MAIN_X, my, pl)
        my -= 11.6
    my -= 9

    # EXPERIENCE & FLAGSHIP SYSTEMS
    main_section_title("Esperienza Professionale & Sistemi in Produzione" if locale == "it" else "Professional Experience & Production Systems")

    def job_entry(title, company, period, bullets, stack):
        nonlocal my
        # Title + Company
        c.setFont("Helvetica-Bold", 9.4)
        c.setFillColor(C_MAIN_TITLE)
        c.drawString(MAIN_X, my, title)
        
        # Period on the right
        c.setFont("Helvetica-Bold", 8.2)
        c.setFillColor(C_MAIN_MUTED)
        c.drawRightString(MAIN_X + MAIN_W, my, period)
        my -= 11

        # Subtitle / Project
        c.setFont("Helvetica-Oblique", 8.3)
        c.setFillColor(C_MAIN_ROLE)
        c.drawString(MAIN_X, my, company)
        my -= 11

        # Bullets
        for b in bullets:
            consumed = draw_bullet(c, MAIN_X + 2, my, b, MAIN_W - 4, "Helvetica", 8.1, 11.4)
            my -= consumed + 3.0

        # Tech stack pill line
        c.setFont("Helvetica-Bold", 7.5)
        c.setFillColor(C_MAIN_MUTED)
        c.drawString(MAIN_X + 13, my, f"Stack: {stack}")
        my -= 15.5

    # 1. Agilae
    if locale == "it":
        job_entry(
            title="Fullstack Engineer",
            company="Agilae · Piattaforma SaaS Assicurativa Enterprise",
            period="Marzo 2025 – Presente",
            bullets=[
                "Progettazione e sviluppo dell'architettura SaaS monorepo per la digitalizzazione delle agenzie e broker su scala nazionale.",
                "Realizzazione di interfacce reattive in React 19 / Next.js 16 con data grids virtualizzate e routing client ad alte prestazioni.",
                "Ingegnerizzazione di microservizi RESTful in Node.js integrati con modelli multimodali per elaborazione documenti in streaming."
            ],
            stack="React 19, Next.js 16, TypeScript, Node.js, REST APIs, Tailwind CSS, Docker"
        )
    else:
        job_entry(
            title="Fullstack Engineer",
            company="Agilae · Enterprise Insurance SaaS Platform",
            period="March 2025 – Present",
            bullets=[
                "Architecting and scaling monorepo SaaS infrastructure empowering digital transformation for multi-tier insurance agencies.",
                "Building high-speed responsive interfaces in React 19 / Next.js 16 with virtualized data grids and resilient client-side state.",
                "Designing Node.js RESTful microservices integrated with multimodal vision models for streaming document extraction."
            ],
            stack="React 19, Next.js 16, TypeScript, Node.js, REST APIs, Tailwind CSS, Docker"
        )

    # 2. Portale Assicurativo
    if locale == "it":
        job_entry(
            title="Tech Lead & Fullstack Developer",
            company="VG Assicurazioni · Portale Assicurativo & Pipeline AI OCR",
            period="Gennaio 2025 – Presente",
            bullets=[
                "Piattaforma monorepo enterprise per gestione centralizzata di anagrafiche clienti, polizze, titoli e scadenziari.",
                "Pipeline di ingestione automatizzata con watcher Chokidar, estrazione OCR (Tesseract) e normalizzazione semantica LLM.",
                "Hardening di sicurezza enterprise: RBAC a 3 livelli, verifica byte MIME contro spoofing, rate limiting e mitigazione path traversal.",
                "Data grid analitica ad altissime prestazioni con AG Grid 32: filtri complessi, ricerca full-text ed esportazione massiva XLSX/PDF."
            ],
            stack="React 19, Vite, TypeScript, AG Grid 32, Material UI, Node.js, Express, MongoDB, Docker"
        )
    else:
        job_entry(
            title="Tech Lead & Fullstack Developer",
            company="VG Assicurazioni · Portale Assicurativo & AI OCR Pipeline",
            period="January 2025 – Present",
            bullets=[
                "Enterprise monorepo management platform centralizing customer archives, active policies, quotas, and expiration agendas.",
                "Automated ingestion pipeline with file watcher (Chokidar), multimodal OCR parsing (Tesseract), and LLM semantic extraction.",
                "Comprehensive security hardening: 3-tier RBAC, MIME magic byte validation to thwart spoofing, rate limiting, and traversal mitigation.",
                "High-performance analytical datagrid with AG Grid 32: multi-column filters, instant search, and asynchronous Excel/PDF exports."
            ],
            stack="React 19, Vite, TypeScript, AG Grid 32, Material UI, Node.js, Express, MongoDB, Docker"
        )

    # 3. Nagma Tattoo CRM
    if locale == "it":
        job_entry(
            title="Creator & Lead Fullstack Engineer",
            company="Nagma Tattoo Studio · Nagma CRM & Agenda Real-time",
            period="Gennaio 2024 – Presente",
            bullets=[
                "CRM gestionale a 360° per studi artistici: agenda interattiva (FullCalendar + AG Grid), booking online e consensi digitali.",
                "Generazione dinamica di consensi informati medico-legali in PDF (PDFKit) con tracciamento firma digitale e storico clinico.",
                "Gestione contabile avanzata: dashboard entrate/uscite, calcolo automatico percentuali resident/guest e reportistica fiscale.",
                "Architettura production-ready: PostgreSQL 17, Prisma 7, containerizzazione multi-stage Docker e test suite Jest/Playwright."
            ],
            stack="Next.js 16, React 19, Material UI, AG Grid 32, Node.js, Express, Prisma 7, PostgreSQL 17, Docker"
        )
    else:
        job_entry(
            title="Creator & Lead Fullstack Engineer",
            company="Nagma Tattoo Studio · Nagma CRM & Real-time Agenda",
            period="January 2024 – Present",
            bullets=[
                "Production SaaS CRM for tattoo & body art studios: real-time collaborative agenda (FullCalendar + AG Grid) and online booking.",
                "Automated generation of legal informed consent PDFs (PDFKit) with digital signature tracking and complete client clinical history.",
                "Financial tracking and analytics: revenue/expense metrics, automated resident/guest artist splits, and CSV/Excel exports.",
                "Production-ready monorepo: PostgreSQL 17, Prisma 7, multi-stage Docker Compose, with Jest & Playwright test coverage."
            ],
            stack="Next.js 16, React 19, Material UI, AG Grid 32, Node.js, Express, Prisma 7, PostgreSQL 17, Docker"
        )

    # 4. N2G Inkflow
    if locale == "it":
        job_entry(
            title="Lead Architect & Fullstack Engineer",
            company="N2G Inkflow · Creative Studio Platform & Agenda Engine",
            period="Ottobre 2025 – Presente",
            bullets=[
                "Piattaforma gestionale scalabile con calendarizzazione avanzata (FullCalendar 6) per sessioni artistiche simultanee.",
                "Sistema di rubrica paginata ad alte prestazioni con ricerca istantanea, tag categorici e media vault integrato (Cloudinary).",
                "Autenticazione con JWT stateless e RBAC granulare (Admin, Artist, Receptionist) a protezione di endpoint sensibili."
            ],
            stack="React 19, FullCalendar 6, AG Grid, Node.js, Express 5, MongoDB, Cloudinary, Tailwind 4"
        )
    else:
        job_entry(
            title="Lead Architect & Fullstack Engineer",
            company="N2G Inkflow · Creative Studio Platform & Agenda Engine",
            period="October 2025 – Present",
            bullets=[
                "Scalable studio platform featuring advanced visual scheduling (FullCalendar 6) for concurrent multi-artist sessions.",
                "High-speed paginated client directory with instant full-text filtering, custom tagging, and secure Cloudinary media vault.",
                "Stateless JWT authentication paired with granular RBAC (Admin, Artist, Receptionist) protecting sensitive billing routes."
            ],
            stack="React 19, FullCalendar 6, AG Grid, Node.js, Express 5, MongoDB, Cloudinary, Tailwind 4"
        )

    # CORE ENGINEERING PRINCIPLES / VALORI DI INGEGNERIA
    main_section_title("Competenze Chiave & Principi Architetturali" if locale == "it" else "Core Engineering Competencies & Architecture Principles")

    # 4-block grid of competencies
    card_w = (MAIN_W - 10) / 2
    card_h = 30
    
    competencies_it = [
        ("Agentic AI & Multimodal LLMs", "Sistemi autonomi Anthropic Claude, Tool-Use strutturato e pipeline OCR."),
        ("Microfrontend & Scalabilità Monorepo", "Architetture modulari ad alte prestazioni, riutilizzo componenti e clean code."),
        ("Sicurezza & Hardening Enterprise", "Autenticazione stateless, RBAC multilivello, validazione MIME e rate-limiting."),
        ("UI & Data Visualization di Precisione", "AG Grid 32, FullCalendar, Three.js e interfacce tattili ad alta usabilità.")
    ]
    
    competencies_en = [
        ("Agentic AI & Multimodal LLMs", "Anthropic Claude autonomous agents, structured Tool-Use, and OCR pipelines."),
        ("Microfrontends & Monorepo Scale", "High-performance modular architectures, reusable tokens, clean review."),
        ("Enterprise Hardening & Security", "Stateless auth, multi-tier RBAC, MIME magic byte guards, and sanitization."),
        ("Precision UI & Data Visualization", "AG Grid 32, FullCalendar, Three.js, and tactile, high-usability reactive interfaces.")
    ]

    competencies = competencies_it if locale == "it" else competencies_en
    
    for i, (head, desc) in enumerate(competencies):
        col = i % 2
        row = i // 2
        cx = MAIN_X + col * (card_w + 10)
        cy = my - row * (card_h + 7)

        # Background tag
        c.setFillColor(C_TAG_BG)
        c.setStrokeColor(C_TAG_BORDER)
        c.setLineWidth(0.6)
        c.roundRect(cx, cy - card_h + 10, card_w, card_h, 4, fill=1, stroke=1)

        c.setFont("Helvetica-Bold", 7.7)
        c.setFillColor(C_MAIN_TITLE)
        c.drawString(cx + 8, cy - 1, head)

        c.setFont("Helvetica", 7.0)
        c.setFillColor(C_MAIN_MUTED)
        c.drawString(cx + 8, cy - 11.5, desc)

    my -= 2 * (card_h + 7) + 6

    # Bottom footer note
    c.setStrokeColor(C_LINE)
    c.setLineWidth(0.6)
    c.line(MAIN_X, my + 6, MAIN_X + MAIN_W, my + 6)
    
    c.setFont("Helvetica-Oblique", 7.4)
    c.setFillColor(C_MAIN_MUTED)
    f_text = (
        "Portfolio interattivo, case studies completi e codice sorgente disponibili su giovannivenditto.dev"
        if locale == "it" else
        "Interactive portfolio, live case studies, and engineering deep dives available at giovannivenditto.dev"
    )
    c.drawString(MAIN_X, my - 5, f_text)

    c.showPage()
    c.save()
    print(f"Generated {output_path} successfully (final footer pos: {my:.1f} pt from bottom)")

if __name__ == "__main__":
    generate_cv("it", "public/documents/CV_Giovanni_Venditto_IT.pdf")
    generate_cv("en", "public/documents/CV_Giovanni_Venditto_EN.pdf")
    # For backward compatibility, also write CV_Giovanni_Venditto.pdf as the IT version
    generate_cv("it", "public/documents/CV_Giovanni_Venditto.pdf")
    print("All CVs generated successfully!")
