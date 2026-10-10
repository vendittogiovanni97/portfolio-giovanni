# Portfolio Implementation Task List

## P0 - CRITICO (Employer-ready)

### Content Layer & Case Studies
- [x] Create `src/content/projects/` directory
- [x] Create project MDX files (3 projects: Assicurativo Studio, InkFlow, Neural Field Explorer)
- [x] Create `src/lib/content.ts` with MDX parsing utilities (gray-matter)
- [x] Create `src/lib/markdown.ts` with unified/remark/rehype markdown renderer
- [x] Refactor `SelectedWork` to use dynamic data (server props)
- [x] Create dynamic route `src/app/work/[slug]/page.tsx` for case studies
- [x] Create `CaseStudyLayout` component (hero, metrics, tech stack, prev/next nav)

### Hero Updates
- [x] Update Hero bio to mention Agilae as current company
- [x] Update competencies to "Current Focus" (Next.js 14 + RSC, tRPC + Prisma, Design Systems, WebGPU)

### Contact Form
- [x] Create `src/app/api/contact/route.ts` (Resend integration, rate limiting, honeypot)
- [x] Create `ContactForm` component (react-hook-form + Zod + sonner)
- [x] Create `src/app/contact/page.tsx` dedicated page with sidebar info

### SEO & Meta
- [x] Dynamic OG metadata per case study pages
- [x] Create `src/app/sitemap.ts`
- [x] Create `src/app/robots.ts`
- [x] JSON-LD structured data in CaseStudyLayout

### Studio/About Page
- [x] Create `src/app/studio/page.tsx`
- [x] Create `StudioContent` component (bio, values, timeline, tech stack)
- [x] Timeline animata con scroll-reveal
- [x] Values (5 principles) con cards
- [x] Tech Stack grid (Frontend, Backend, Tools, Learning)

### Theme Toggle & Accessibility
- [x] Create `ThemeToggle` component (sole/luna, localStorage, prefers-color-scheme)
- [x] Add theme initialization script in layout.tsx (anti-flash)
- [x] Add skip link "Skip to main content" (sr-only → visible on focus)
- [x] Add Toaster (sonner) con theme-aware styling
- [x] `suppressHydrationWarning` su html tag

### Navigation Updates
- [x] Update NavBar links: Work (hash), Studio, Contact → pages reali (Link/next/link)
- [x] Add ThemeToggle in NavBar (desktop + mobile)
- [x] Add `GV.` → Link to home
- [x] Footer: real social links (LinkedIn, GitHub, Email), Link to contact page

## P0 — COMPLETATO ✅

---

## P1 - HIGH IMPACT (Wow factor)
- [x] Interactive project cards with Framer Motion layoutId shared transitions
- [x] Technical blog/writing section (`/writing`) — 3 articles, list + detail pages
- [x] Skills/Tech stack visualization interattiva (16 skills, animated bars, category colors)
- [x] Scroll-triggered WebGL effects (ScrollDivider between sections)
- [x] Scroll progress indicator (NavBar progress bar)
- [x] Page transition animations (AnimatePresence wrapper)

## P2 - DIFFERENZIANTE (Senior signal)
- [x] Live code playground (CodeMirror — JS/HTML/CSS, eval, preview)
- [x] Open source contributions wall (GitHub API — 8 repos, live data)
- [x] Speaking/talks section (4 talks: talks, workshops, panels)
- [x] Full WCAG 2.1 AA compliance audit (focus-visible, aria-labels, contrast, reduced motion)
- [x] Internationalization (EN/IT) con context API + LanguageToggle

## P3 - NICE TO HAVE
- [x] Downloadable CV PDF (`/cv` redirects to the current PDF file)
- [x] Easter eggs (Konami code ↑↑↓↓←→←→BA, cursor trail particles)
- [x] RSS feed (/rss.xml via Route Handler)
- [x] PWA/Offline support (service worker + manifest)

## Infra & Polish
- [x] Self-host fonts (Geist, Geist Mono via @font-face + public/fonts/)
- [x] Reduced motion support (CSS @media + Framer Motion useReducedMotion wrappers)
- [x] Light mode palette (CSS [data-theme="light"] tokens)
- [x] WebGL canvas lazy-load (IntersectionObserver pause/play)
- [x] Bento grid card sizing fix (auto-rows minmax, responsive spans)
- [x] Magnetic effect hook (useMagnetic reusable)
- [x] Bundle analysis setup (@next/bundle-analyzer + `npm run analyze`)
- [x] Vercel deploy config (vercel.json + .env.example)
- [x] Favicon SVG + manifest.json
- [x] Dynamic imports / code splitting (CodeMirror, WebGL, ScrollDivider, ContributionWall, TechStack, Speaking)
- [x] WCAG 2.1 AA audit fixes (form labels, landmarks, contrast, focus-visible, keyboard)
- [x] NavBar/Footer in layout (consistent landmarks on all pages)
- [ ] Images with next/image + blur placeholder
- [ ] Sentry error tracking integration

---
*Last updated: 2026-08-10*
*Status: ALL PRIORITIES COMPLETED. Build passes. 17 static pages. Production-ready.*
