# Chattogram Trust PLC & Automation Technology

A complete, production-ready, ultra-modern website for **Chattogram Trust PLC & Automation Technology** — a hands-on industrial automation training institute at GEC, Chattogram, Bangladesh.

Built with **React 18 + Vite 5 + TypeScript + Tailwind CSS 3 + Framer Motion 11**, featuring a premium dark-tech design with cyan/blue glow accents, glassmorphism, full responsiveness, scroll animations, a trilingual AI assistant, bKash checkout with automatic WhatsApp routing, and a full localStorage-backed admin panel.

---

## 🚀 Quick Start

```bash
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:5173)
npm run build      # type-check + production build → dist/
npm run preview    # preview the production build
```

The dev server binds to `0.0.0.0` and accepts any host, so it works behind the Arena live-preview proxy and in local development alike.

---

## 🏛️ Brand & Contact (single source of truth: `src/lib/site.ts`)

| Field | Value |
|---|---|
| Institute | Chattogram Trust PLC & Automation Technology |
| Address | O.R Nizam Road, Nurbag Abasik, Nahar Villa 1st floor, GEC, Chattogram, Bangladesh |
| Phone | +880 1646-241953 → every link uses `tel:+8801646241953` |
| WhatsApp | https://wa.me/8801646241953 |
| Email | uddinnizam701@gmail.com |
| Founder / CEO / Head Trainer | Nezam Uddin (নিজাম উদ্দিন) |
| Facebook Profile | https://www.facebook.com/share/1eN2YZFkU8/ |
| Facebook Page | https://www.facebook.com/share/1EBKkCQVZh/ |

---

## 🛣️ Routes

| Route | Page |
|---|---|
| `/` | Homepage (hero, stats, courses, 20 skills, leadership, gallery, testimonials, notices, blog) |
| `/courses` | Filterable course cards + full fee summary table |
| `/courses/:slug` | Course details, syllabus accordion, tools, careers, FAQ, sticky enroll sidebar |
| `/skills` | All 20 practical skills, filterable by category |
| `/services` | 8 industrial services + 4-step process |
| `/products` | 8 automation kits & equipment, filterable, WhatsApp ordering |
| `/gallery` | Photo & video gallery with lightbox |
| `/about` | Story, mission/vision/values, leadership, timeline |
| `/contact` | Contact form (saved to localStorage), Google Map, hours, socials |
| `/blog` | Searchable, filterable Bangla tech articles |
| `/blog/:slug` | Full article with author sidebar & related posts |
| `/notices` | Notice board with categories & pinned notices |
| `/checkout` | bKash payment UI + instant WhatsApp booking |
| `/admin` | **Admin entry** → login if signed out, dashboard if signed in |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Protected admin panel |
| `*` | Custom 404 |

---

## 🔐 Admin Panel

**Login URL:** `/admin` (or `/admin/login`)
**Credentials:** username `Trust1953` · password `TrustPLC4624`

The dashboard manages all dynamic content via `localStorage`:

- **Overview** — enrollment/revenue/content stats + recent enrollments
- **Enrollments** — search, filter, status (pending/confirmed/cancelled), delete, CSV export
- **Notices** — create/edit/delete, categories, pin-to-top
- **Blog Posts** — full CRUD with SVG poster selection, tags, slugs
- **Gallery** — add photos (upload → data-URI, or URL) & videos (external link + SVG thumbnail)
- **Site Content** — announcement bar, hero text, stats counters
- **Messages** — contact form submissions, read/unread, delete

> Sessions expire after 8 hours. **No certificate verification/management exists anywhere** (removed per requirements).

---

## 💳 bKash Checkout + WhatsApp Routing

`/checkout` lets a student:
1. Select a course (fee & merchant number `+880 1646-241953` shown).
2. Enter name, mobile, bKash sender number and TrxID.
3. Press **Confirm bKash Payment** → the entry is saved to `localStorage` and a WhatsApp chat opens automatically with:

> আসসালামু আলাইকুম, আমি [Name], [Course] কোর্সে ভর্তি হতে bKash করেছি। TrxID: [TrxID], Phone: [Mobile]। অনুগ্রহ করে কনফার্ম করুন।

An **Instant WhatsApp Booking (Pay Later)** option is also provided.

---

## 🤖 Floating Utilities

- **AI Assistant** (bottom-right, above WhatsApp): rule-based, understands **Bangla, English & Banglish**. Answers fees, location, admission, trainer, courses, bKash, timing, jobs & contact. Quick-reply chips + typing animation.
- **WhatsApp button**: green pulsing icon → `https://wa.me/8801646241953` with pre-filled Bangla inquiry.

---

## 🎨 Design System

- **Flat industrial navy** (reference-matched): base `#070D18`, surface `#111A28`, surface-2 `#182334`, line `#243144`. Light theme toggle persisted.
- **Accents:** Electric Blue `#0066FF`, Safety Orange `#F97316`, Cyan `#06B6D4`, bKash `#E2136E`.
- **Typography:** Inter (English) + Hind Siliguri (Bangla). All prices in English numerals with a `Taka` suffix (e.g. `8,000 Taka`).
- Small-radius panels/cards, cyan uppercase eyebrows, orange enrollment CTAs, photo-led course cards, compact stats row, numbered 20-skill grid, flat leadership panel, and a four-column industrial footer.
- Marquee announcement bar with orange “ভর্তি চলছে • LIVE” badge, Framer Motion scroll reveals, animated counters, accordions, and a blue “Trust Assist” chat launcher + green WhatsApp button.

### No broken images
Every course card, blog poster, product image and gallery placeholder uses **code-generated SVG illustrations** (`src/components/illustrations/TechIllustration.tsx` — 14 animated scenes). The four real lab photos ship as optimized WebP in `public/images/lab/` (~120 KB each).

---

## 🗄️ localStorage "Database" (`src/lib/storage.ts`)

Typed, seeded, versioned (`ctpat_v1_*`) storage for: enrollments, notices, blog posts, gallery, contact messages, site content, admin session and theme. Seed content auto-populates on first load; admin edits persist across reloads.

---

## 🔍 SEO

- Per-page `<title>`, meta description/keywords, canonical, Open Graph & Twitter tags via `useSeo` hook.
- JSON-LD structured data: `EducationalOrganization` (home), `Course` (course pages), `BlogPosting` (articles).
- `public/robots.txt` + `public/sitemap.xml`.
- SPA fallback configs included: `vercel.json` (rewrites) and `public/_redirects` (Netlify).

> Note: update the canonical/sitemap domain (`chattogramtrustplc.com`) to your real domain before launch.

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI (Navbar, Footer, cards, ChatBot, etc.)
│   └── illustrations/   # SVG logo, hero visual, founder avatar, 14 tech scenes
├── context/             # Theme, Admin (auth), Data (localStorage content)
├── data/                # Courses, skills, services, products, blog, notices, gallery, FAQ, testimonials
├── lib/                 # site constants, storage, SEO hook
├── pages/               # 16 route pages incl. admin login & dashboard
├── types.ts             # Full TypeScript types
├── App.tsx              # Routing (lazy-loaded)
├── main.tsx             # Entry + providers
└── index.css            # Tailwind + theme tokens + animations
```

---

## 📦 Deployment

```bash
npm run build
```

Deploy the `dist/` folder to any static host (Vercel, Netlify, cPanel, etc.). SPA fallback is pre-configured for Vercel & Netlify. For other hosts, ensure all routes rewrite to `index.html`.

---

© 2026 Chattogram Trust PLC & Automation Technology. All Rights Reserved.
