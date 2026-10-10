# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: founders/small teams evaluating Giovanni Venditto as a freelance fullstack
engineer for a client project — they look for case studies with real outcomes and
signs of taste/craft, not just a resume. Secondary: other developers/the dev community
(GitHub visitors, blog readers) who look at code quality, writing, and working method.
Not primarily optimized for large-company recruiter keyword-scanning, though the CV/
resume path still needs to work for that audience.

## Product Purpose

A personal portfolio for Giovanni Venditto (fullstack / creative engineer, currently at
Agilae). It exists to get him hired or contracted: it showcases real shipped products
(not toy demos), his working process, and his technical writing, and it converts
interest into a contact/CV download.

## Positioning

The claim a generic "developer portfolio" cannot make: these are real, currently-running
production systems he built and operates end-to-end (Portale Assicurazioni for VG
Assicurazioni, Demo Nagma CRM) — not portfolio-only demo apps — including real product
screenshots, OCR/LLM pipelines, and security hardening decisions documented in the case
studies.

## Operating Context

Content lives as MDX under `src/content/projects` and `src/content/writing` (IT/EN,
locale subfolders). Real product screenshots live under `public/projects/<slug>/`.
Certificate images live under `public/certificates/`. The current CV PDF is served from
`/documents/CV_Giovanni_Venditto.pdf`; `/cv` redirects to that file. The writing archive
is available under `/writing`, with localized article routes and an English RSS feed at
`/rss.xml`. Site is bilingual (IT/EN) via a custom i18n context and locale-prefixed
routes, not a routing-based i18n framework.

## Capabilities and Constraints

- Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4.
- Framer Motion is already used site-wide for animation.
- Redesign explicitly adds GSAP + Lenis for scroll-driven and text-distortion effects
  (confirmed by the user); Framer Motion stays for the animation it already covers well
  rather than being ripped out wholesale.
- Existing feature surface: dashboard-style case study pages with real
  screenshots/galleries, a credentials/certifications grid, a live code playground
  (`/lab`), a blog (`/writing`), a studio/about page with timeline, a contact page/form,
  a downloadable PDF CV, and bilingual navigation. The earlier contribution wall,
  printable CV generator, and theme toggle are not present in the current build.
- Must keep passing `tsc --noEmit` with no new errors; this is checked after each
  change.

## Brand Commitments

- Name/initials mark: "GV." Real name: Giovanni Venditto.
- Existing real assets to keep using as-is: the two product screenshot sets already
  captured (Portale Assicurazioni: dashboard/pratiche/elaborazione-polizze) and four
  Anthropic Claude certification images — content and copy are factual, not to be
  invented or altered by the redesign.
- Existing social links (GitHub, LinkedIn, email) and CV download are load-bearing
  and must keep working.

## Evidence on Hand

- `public/projects/assicurativo-studio/*.png` — real screenshots of a production app.
- `public/certificates/*.png` — real Anthropic certificates (Claude 101, Claude Code
  101, Claude Platform 101, Claude Cowork).
- `src/content/projects/*.mdx`, `src/content/writing/*.mdx` — real case study and
  article copy already written; do not fabricate additional claims, metrics, or
  testimonials beyond what these files state.

## Product Principles

1. Every visual claim must be backed by a real artifact (screenshot, certificate,
   shipped repo) — no placeholder content standing in as if it were final.
2. Bold and memorable wins over safe, but never at the cost of the technical content
   being scannable — the audience still needs to evaluate real engineering work.
3. Bilingual (IT/EN) is a permanent constraint. (Correction after code inspection: there
   is no working light/dark mode toggle in the current build — `data-theme` is hardcoded
   to `"dark"` and no `[data-theme="light"]` tokens exist despite a stale TASKS.md entry
   claiming otherwise — so the redesign is free to use committed per-section light/dark
   backgrounds as a layout device rather than treating light mode as a user-facing toggle
   to preserve.)
4. Motion should read as authored and purposeful, not decorative noise stacked on every
   section.
