# Chattogram Trust PLC & Automation Technology

A complete, responsive institute website built with **React 19, Vite, TypeScript, Tailwind CSS, Framer Motion, React Router and Lucide**. The default interface is premium dark tech, with a persistent light theme, locally bundled Inter/Hind Siliguri fonts, original SVG technical illustrations, and no external image dependencies.

## Run locally

Use Node.js **22.12+** (the project was checked with Node 22.22).

```bash
npm ci
npm run dev
```

The development server binds to `0.0.0.0:5173` and accepts the Arena preview host.

```bash
npm run check          # lint + unit/integration tests + production build
npm run preview        # serve the production build on port 4173
npm run format:check   # formatting check
```

## Included pages

| Route                              | Features                                                                                                                       |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `/`                                | Animated industrial hero, all 20 skill links, institute statistics, featured courses, leadership, notices and journal previews |
| `/courses`                         | Six courses, category filters, search, exact fee comparison table                                                              |
| `/courses/:slug`                   | Course-specific syllabus, outcomes, capstone, prerequisites, related skills and enrollment                                     |
| `/skills`                          | All 20 curriculum topics, searchable interactive breakdowns, tools and related courses                                         |
| `/services`                        | Six consultancy services, project process and service-specific WhatsApp inquiries                                              |
| `/products`                        | Six configurable training/equipment offerings, detail dialogs and quotation requests                                           |
| `/gallery`                         | Original technical artwork, locally stored photo uploads, YouTube media, filters and accessible media viewer                   |
| `/about`                           | Mission, teaching principles, both supplied Bangla slogans and leadership                                                      |
| `/contact`                         | Full address, map, contact links and validated WhatsApp inquiry preparation                                                    |
| `/blog`, `/blog/:slug`             | Searchable Bangla technical articles, categories, reading time and article navigation                                          |
| `/notices`                         | Pinned announcements, categories, search and deep links                                                                        |
| `/checkout`                        | Manual bKash payment recording, validation, duplicate TrxID protection and WhatsApp routing                                    |
| `/admin/login`, `/admin/dashboard` | Browser-local administration, enrollment review, notices, gallery, articles, editorial content and JSON exports                |

A custom 404 page handles unknown routes. There are no certificate-related pages, navigation items or admin tabs.

## Institute information

- **Address:** O.R Nizam Road, Nurbag Abasik, Nahar Villa 1st floor, GEC, Chattogram, Bangladesh
- **Phone:** +880 1646-241953
- **Phone links:** `tel:+8801646241953`
- **WhatsApp:** `https://wa.me/8801646241953`
- **Email:** uddinnizam701@gmail.com
- **Founder / owner / CEO / head trainer:** Nezam uddin
- **Leadership profile display:** Md. Anas Nezam, with Nezam uddin also identified on the card and About page

The two supplied leadership names are retained and explicitly associated rather than silently replacing either. The profile monogram is original artwork, not a claimed photograph. Replace it with an authorized portrait if desired.

### Exact course fees

| Course                                                 |        Fee | Duration   |
| ------------------------------------------------------ | ---------: | ---------- |
| Industrial Automation & PLC Controlling                | 8,000 Taka | 3 Months   |
| Advance Automation & PLC, VFD, HMI, Sensor Controlling | 9,600 Taka | 3 Months   |
| Electrical AutoCAD (2D & 3D)                           | 5,000 Taka | 2 Months   |
| Electrical Sub-Station Design & High Voltage           | 5,500 Taka | 2 Months   |
| Advanced CCTV Installation & Maintenance               | 3,000 Taka | 1 Month    |
| Solar PV System Design & Installation                  | 5,000 Taka | 1.5 Months |

Course definitions live in `src/data/courses.ts`; the 20 skills live in `src/data/skills.ts`. All displayed prices use English numerals and the `Taka` suffix.

## Important: how the local system works

### Manual bKash enrollment — not a payment gateway

The checkout **does not charge an account, communicate with bKash, or verify a transaction**. It:

1. Validates the student name, Bangladesh mobile numbers, selected course and TrxID.
2. Checks for a duplicate transaction reference already stored in the current browser.
3. Saves a **pending** enrollment, with the fee taken from the course definition rather than the form.
4. Builds the requested Bangla WhatsApp message and opens `https://wa.me/8801646241953`.
5. Provides a visible fallback link if the browser blocks the new tab.
6. Leaves verification and admission confirmation to the institute.

The payment number is the supplied institute contact number. Its bKash account type and accepted payment method must be confirmed by the institute; the UI deliberately does not assume that a phone number is an enabled merchant account. No PIN, password or OTP is requested.

### Browser-local administration

Requested local credentials:

- **Username:** `TrustPlc12`
- **Password:** `TrustPlc01`

Sessions expire after two hours. The dashboard supports:

- Searching and filtering enrollment records, reviewing TrxIDs, manually confirming/cancelling, deleting and exporting JSON.
- Creating, editing, pinning and deleting notices.
- Adding/editing/removing gallery artwork, compressed local photo uploads and valid YouTube videos.
- Creating/editing/deleting articles, managing sections and publishing/unpublishing drafts.
- Editing the announcement, homepage introduction, mission and contact introduction.
- Exporting a JSON backup of all local content and enrollment data.

**This is not secure authentication.** The supplied credentials are present in client-side code, and anyone with browser/devtools access can inspect or modify local data. The login is only a convenience gate for the requested browser-local workflow. Do not use it to protect sensitive records on public/shared devices.

For a real multi-user production deployment, replace this layer with server-side authentication, role-based authorization, a shared database, server-validated payment records, audit logging, rate limiting and an approved payment integration. Never treat a client-supplied TrxID or status as proof of payment.

### Storage and privacy

Data is stored under versioned `trust-plc:*:v1` keys in `localStorage`; the admin session uses `sessionStorage`.

- Records do **not** sync between visitors, devices or browsers.
- An administrator only sees enrollments saved in that same browser origin.
- Clearing site data removes local records and content edits.
- Storage failures and quota errors are surfaced rather than reported as successful saves.
- Gallery uploads are resized to at most 1,200 px and compressed before storage.
- Exported JSON contains personal/payment-reference information and must be kept private.
- The contact form does not persist its fields; it prepares a WhatsApp message.
- The floating assistant is a deterministic, multilingual guidance component, not a connected LLM or live advisor.

## SEO and hosting

Set the real production origin before building:

```bash
cp .env.example .env
# Set VITE_SITE_URL=https://your-real-domain.example
npm run build
```

The build emits:

- Route-specific HTML files with unique titles, descriptions and structured data for all public pages, six courses and the initial published articles.
- Absolute canonical URLs, Open Graph/Twitter metadata and `/sitemap.xml` when `VITE_SITE_URL` is a valid HTTPS origin.
- A locally generated 1,200 × 630 social card (`public/social-card.png`, with SVG source).
- SPA redirects and security-focused hosting configuration.

Without a production origin, the site still builds and emits route metadata, but does not invent canonical URLs or a sitemap domain. React updates metadata during client-side navigation. Admin and checkout routes are excluded from indexing and the sitemap.

The sitemap covers build-time public content. Browser-local admin edits are not server-published content and cannot be crawled across devices. For indexable, shared content management, connect a backend/CMS and generate the sitemap from that source.

### Vercel

`vercel.json` configures the Vite build, `dist` output, clean URLs, SPA fallback and response headers. Set `VITE_SITE_URL` in the hosting environment before deploying. No deployment has been performed automatically.

### Netlify or static hosting

Publish `dist`. The generated `_redirects` maps the known public routes to their metadata HTML files and supplies an SPA fallback. For Nginx, use a fallback such as:

```nginx
location / {
  try_files $uri $uri.html $uri/ /index.html;
}
```

Serve over HTTPS. Keep `/admin/*` and `/checkout` out of search indexes. Review the map/video providers’ privacy requirements for your deployment.

## Project structure

```text
src/
  components/       Shared UI, navigation, original SVG art, assistant and cards
  context/          Versioned local database and enrollment operations
  data/             Brand, exact courses, 20 skills, products and initial content
  hooks/            Per-route SEO metadata
  lib/              Validation, storage, local session, utilities and assistant logic
  pages/            Public pages and admin workspace
  test/             Data, storage, route, enrollment and admin integration tests
  styles.css        Tailwind layers, visual system, responsive and reduced-motion rules
scripts/
  vite-seo.ts       Build-time route metadata, redirects and sitemap
  generate-social.mjs
  browser-env.mjs   Packaged Chromium setup for Linux browser checks
  smoke-ui.mjs      End-to-end browser flows
  audit-ui.mjs      Responsive, image, runtime and axe accessibility checks
public/             Local favicon and generated social assets
```

## Verification

The implementation includes:

- **41 unit/integration tests** covering exact fees, all skills, contact endpoints, validation, local persistence, storage failure, admin sessions, routes, enrollment and notice publishing.
- **11 real-browser flows** covering mobile navigation, filters, theme persistence, checkout, admin verification/export, notice/gallery/article publishing, site content, assistant and contact routing.
- **28 automated accessibility page/theme checks** across 14 public/admin-entry routes.
- Horizontal overflow checks at **320, 390, 768 and 1,440 px**, image-load checks and application runtime-error checks.
- Production TypeScript/build, ESLint and dependency audits.

With the development server running:

```bash
npm run test:browser
npm run audit:ui
```

The Linux browser tooling uses an npm-packaged Chromium and its NSS libraries, so it does not need a browser CDN. On another OS, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to a locally installed Chromium. Browser reports/screenshots are written to the ignored `artifacts/` directory. Automated accessibility checks are helpful but do not replace a full manual accessibility review.

To regenerate the original social artwork:

```bash
npm run assets:social
```
