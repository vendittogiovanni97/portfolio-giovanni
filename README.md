# Giovanni Venditto — Portfolio

Portfolio bilingue (italiano e inglese) di Giovanni Venditto, con progetti, profilo professionale e demo interattive.

**Live:** [portfolio-giovanni-ebon.vercel.app](https://portfolio-giovanni-ebon.vercel.app)

## Stack

- Next.js App Router, React 19 e TypeScript
- Tailwind CSS 4 per lo stile
- Framer Motion, GSAP e Lenis per le animazioni e lo scroll
- `yaml`, `unified`, `remark` e `rehype` per i contenuti dei progetti
- React Hook Form e Zod per il modulo di contatto; Resend per l'invio email
- Dizionari IT/EN e metadati localizzati

## Cosa contiene

- Homepage con profilo, metriche, competenze, esperienza, credenziali e progetti selezionati
- Pagine Studio, Lab e articoli tecnici bilingui con feed RSS
- Modulo di contatto e CV scaricabile anche da `/cv`
- Lab con simulazione OCR dichiarata come demo con dati mock, tabella HTML con filtro client-side e UI Inspector
- Case study e articoli MDX in italiano e inglese
- Metadati, immagini Open Graph, sitemap e robots per la SEO; manifest e service worker per la PWA
- Animazioni che rispettano `prefers-reduced-motion`

## Avvio locale

```bash
npm install
npm run dev
```

Apri <http://localhost:3000>.

| Script | Descrizione |
| --- | --- |
| `npm run dev` | Avvia il server di sviluppo |
| `npm run build` | Crea la build di produzione e verifica i tipi TypeScript |
| `npm run start` | Avvia la build di produzione |
| `npm run lint` | Esegue ESLint |
| `npm run analyze` | Crea la build con il bundle analyzer |

## Configurazione

Il sito usa valori predefiniti per i dati pubblici in `src/lib/config.ts`. Per personalizzarli, crea `.env.local`:

```bash
# URL canonico: sostituiscilo se colleghi un dominio personalizzato
NEXT_PUBLIC_SITE_URL=https://portfolio-giovanni-ebon.vercel.app
NEXT_PUBLIC_AUTHOR_NAME="Giovanni Venditto"
NEXT_PUBLIC_EMAIL=you@example.com
NEXT_PUBLIC_GITHUB_USERNAME=vendittogiovanni97
NEXT_PUBLIC_LINKEDIN_USERNAME=giovanni-venditto-89b607325
NEXT_PUBLIC_TWITTER_USERNAME=giovannivenditto
NEXT_PUBLIC_CALENDAR_URL=https://calendly.com/vendittogiovanni97/30min

# Necessari per inviare il modulo contatti in produzione
RESEND_API_KEY=re_...
CONTACT_EMAIL=you@example.com
```

Senza `RESEND_API_KEY`, l'endpoint del modulo restituisce un errore di servizio e non dichiara il messaggio inviato.

## Struttura

```text
src/
├─ app/          # Pagine, API, RSS, sitemap, robots e immagini Open Graph
├─ components/   # Sezioni del sito e componenti UI
├─ content/      # Contenuti dei progetti e articoli
├─ i18n/         # Dizionari e gestione locale
└─ lib/          # Configurazione, contenuti e utilità
public/          # Immagini, PDF del CV, manifest e service worker
```

## Design system

Le variabili di stile e i token si trovano in `src/app/globals.css`; il razionale visivo è documentato in [`DESIGN.md`](./DESIGN.md).

## Deploy

Il progetto è configurato per Vercel (`vercel.json`) e può essere eseguito su un host Node.js compatibile con `next build` e `next start`.

## Licenza

© Giovanni Venditto. Tutti i diritti riservati.
