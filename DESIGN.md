---
name: Editorial Poster
colors:
  background: '#14100b'
  surface: '#1c1712'
  foreground: '#f3ece0'
  accent: '#caa456'
  accent-bright: '#e0bd70'
  accent-deep: '#9c7d3c'
  paper: '#f2ece0'
  ink: '#14100b'
  mark: '#ff5a36'
  neutral-50: '#f6f4f1'
  neutral-100: '#ece9e4'
  neutral-200: '#d6d2c9'
  neutral-300: '#b7b2a7'
  neutral-400: '#928d81'
  neutral-500: '#6d685e'
  neutral-600: '#4d4941'
  neutral-700: '#36322b'
  neutral-800: '#241f19'
  neutral-900: '#1c1712'
  neutral-950: '#14100b'
  border: 'rgba(202, 164, 86, 0.14)'
  shadow-panel: 'rgba(0, 0, 0, 0.28)'
  shadow-panel-hover: 'rgba(0, 0, 0, 0.32)'
  error: '#ffb4ab'
typography:
  display:
    fontFamily: Anton
    note: 'Ultra-bold condensed poster face. Headlines only, always uppercase, tight leading (0.86-0.95).'
  body:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-technical:
    fontFamily: Geist Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  code-snippet:
    fontFamily: Geist Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.6'
  micro-label:
    fontFamily: Geist Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.12em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  '2xl': 1rem
  '3xl': 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  container-max: 1400px
---

## Brand & Style

Portfolio of a Fullstack / Creative Engineer, redesigned as a bold editorial poster
rather than a safe minimal dark dashboard. The direction was pinned by the user from a
concrete reference (a portfolio reel built around huge condensed type, a light/dark
section flip, and GSAP-driven scroll motion) — this is a committed replacement of the
former "Deep Green Terminal" identity, not a variant of it.

The single source of truth for color lives in `src/app/globals.css` (`:root` and the
`@theme` blocks). This document mirrors those values; if they diverge, the CSS wins.

## Colors

One warm-ink base, one warm-gold accent. `--color-mark` (the coral-red underline in the
Hero name reveal) is a deliberate exception: a rare, one-off flourish scoped to that
single moment, not a reusable utility color — it never appears on a button, chip, link,
or focus state.

- **Base canvas:** warm near-black ink `#14100b` (warm-tinted, not the cooler
  near-black-plus-neon-glow look that reads as AI-generated). Surfaces step up through
  the neutral ramp (`#1c1712`, `#241f19`, ...), which is warm/taupe-tinted rather than
  blue- or green-tinted.
- **Single accent:** warm brass/gold `#caa456`. Used for the one focal element per view
  (primary CTA, active state, key metric, brand highlight, link hover). `#e0bd70`
  (bright) and `#9c7d3c` (deep) are the only permitted variations.
- **The flip:** specific sections (currently the Hero) commit to the inverse ground —
  paper `#f2ece0` with ink `#14100b` text — as a structural light/dark section device,
  not a user-facing theme toggle. Every migrated flip section owns its own full
  viewport; the flip never happens mid-card.
- **Text:** warm off-white `#f3ece0` for headings/body on the dark ground, `#928d81` for
  muted/secondary (clears ~5.7:1). On the paper ground, ink `#14100b` for headings/body.
  The neutral ramp is warm-*gray*, not brown: keep the red/blue channel gap under ~20
  points at every step (an early pass drifted to a 30-40pt gap and read as tan/khaki on
  real copy — catch that by eye on any future adjustment, not just by contrast ratio).
- **No gradient text.** Emphasis comes from a solid accent color, weight, or size.

Legacy Tailwind accent families (`cyan`, `sky`, `indigo`, `violet`) are remapped to the
single gold accent in `@theme`, and `slate` is remapped to the warm neutral ramp, so
utility classes across the whole codebase reskin from this one place — this is how the
redesign reaches every page without a full per-component rewrite.

## Typography

**Anton** is the one loud voice: ultra-bold condensed poster type, uppercase, tight
leading, used only for headlines — it IS content, not a decorative label over content.
**Manrope** carries body copy and UI text, a warm humanist counterpart to Anton's shout.
**Geist Mono** is kept only for genuine metadata: technical labels, timestamps, code,
tech-stack tags, and small UI descriptors — never paragraphs or section copy.

Font sizes come from tokens, never arbitrary `text-[Npx]`, except display headlines
which intentionally use viewport-relative clamps (`text-[Nvw]`) so the poster type keeps
scaling as the one thing that fills the first viewport.

- **Headlines:** Anton, uppercase, tight tracking, leading 0.86–0.95.
- **Body:** Manrope, generous line height for reading on the dark canvas.
- **Section headers:** one system everywhere — a display-face title plus a short
  Manrope subtitle. No uppercase eyebrows and no numbered markers (`01 //`, `02 //`)
  above sections.

## Layout & Spacing

- 4px baseline unit; 24px gutters; 48px desktop / 16px mobile margins.
- Container max 1400px.
- Content grouped into modules separated by generous vertical rhythm.

## Elevation & Depth

Depth via solid ink surfaces and a hard-edged offset shadow (the poster's "sticker"
depth — earned here because the whole surface committed to an editorial/poster world),
not glass or blur. Glass/backdrop-blur was the previous world's device and has been
removed from cards, chips, and the nav pill; a `backdrop-blur` is now reserved strictly
for an actual modal scrim (dimming page content behind a dialog), never for a panel's
own surface.

- **Panels:** `.glass-panel` (name kept for compatibility) — solid `neutral-900`, a
  hairline `neutral-800` border, and a small hard offset shadow
  (`5px 6px 0 rgba(0,0,0,.28)`). On hover the border warms toward the accent and the
  panel nudges up-left 2px.
- **Floating nav:** a solid ink pill (no blur), fixed with a top scrim so page content
  fades out behind it instead of bleeding through.
- **Proof over decoration:** where a card or hero has a real screenshot to show, the
  screenshot IS the artwork at full opacity/color — no grayscale-until-hover treatment,
  no gradient vignette standing in for content.
- **Hero diorama:** the desktop Hero may use a restrained Three.js scene to mount real
  project screenshots on paper-and-brass frames. Keep the headline, copy, and actions
  in semantic HTML. Load the scene only while it is visible, pause when it leaves view,
  and keep a CSS screenshot collage for touch screens, reduced-motion preferences, and
  browsers without WebGL.
- **Project depth:** screenshot tilt is limited to fine pointers, stays subtle, and is
  disabled for reduced-motion preferences. Project titles and descriptions remain flat
  and easy to read.
- **Depth panels:** service, process, and experience cards share a thin brass edge,
  raised icon tiles, and a restrained perspective response on desktop. Keep their
  surfaces solid, avoid glow gradients, and disable hover motion for reduced-motion users.

## Shapes

Disciplined radii: 0.25rem for buttons/inputs, 0.75rem–1.5rem for cards and panels,
full radius for pills and chips.

## Components

- **Buttons:** Primary is solid gold with ink text. Secondary is a ghost outline with a
  hairline border that fills solid on hover.
- **Chips/Badges:** small pills, solid ink or accent-tinted backgrounds — no blur.
- **Cards:** solid ink panels with a hairline border and hard offset shadow; a real
  product screenshot leads the card wherever one exists.
- **Empty / error states:** never bare text. A solid panel with an icon, a
  plain-language message, and a recovery action.
- **Scrollbars:** ultra-thin with a neutral thumb that turns gold on hover.

## Rollout status

Reaches every page: global tokens (warm ink/gold palette replacing green/lime
everywhere, including previously-hardcoded hex/rgba values that the token remap alone
would have missed), the solid non-glass `.glass-panel`/`GlassPanel`/`Chip` system, and
`font-headline` now resolving to Manrope instead of silently doing nothing.

Every page's main title (and the largest sub-section titles) now render in the Anton
display face, uppercase: Hero, Selected Work, Impact Metrics values, How I Work, Studio
(page title plus its four sub-section headings), Lab, Writing (list + post), Contact,
Credentials, Tech Radar, Tech Stack, Contribution Wall, Project Quick View modal, the
case study page (hero title, metric values, and the MDX body's own H2/H3s), and the
404 page.

Structurally rebuilt beyond a token/type reskin: Hero (paper flip, GSAP text-assemble
intro, Lenis smooth scroll, real screenshot in a browser-frame specimen) and Selected
Work's project cards (real screenshot leads each card, no grayscale-until-hover).
Everything else inherited the new palette, panel system, and heading face but keeps its
prior layout/composition — a further pass could give Studio's timeline, Lab's
playground, and the case study body the same bespoke poster-layout treatment as Hero
and Selected Work, if that level of overhaul is wanted next.
