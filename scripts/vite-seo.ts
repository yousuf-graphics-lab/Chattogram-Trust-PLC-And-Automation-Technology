import type { Plugin } from "vite";
import { BRAND } from "../src/data/brand";
import { COURSES } from "../src/data/courses";
import { SEED_ARTICLES } from "../src/data/seed";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const pages = [
  {
    path: "/",
    title: "Master PLC, SCADA & Industrial Automation",
    description:
      "Hands-on technical training at GEC, Chattogram. Explore PLC, SCADA, AutoCAD, CCTV and solar courses with transparent fees and practical projects.",
  },
  {
    path: "/courses",
    title: "Practical Courses & Course Fees",
    description:
      "Compare six practical technical courses in Chattogram: PLC, advanced automation, AutoCAD, sub-station design, CCTV and solar PV. Fees from 3,000 Taka.",
  },
  {
    path: "/skills",
    title: "20 Practical Industrial & Technical Skills",
    description:
      "Explore all 20 hands-on skills: house wiring, motor control, PLC, VFD, HMI, SCADA, AutoCAD, sub-stations, CCTV, solar, safety and industrial projects.",
  },
  {
    path: "/services",
    title: "Industrial Automation Services & Consultancy",
    description:
      "PLC and HMI programming, control-panel integration, SCADA, electrical AutoCAD, energy studies and industrial maintenance support in Chattogram.",
  },
  {
    path: "/products",
    title: "Automation Training Kits & Equipment",
    description:
      "Explore PLC learning stations, VFD motor kits, HMI integration packages, motor-control panels and solar training equipment. Request current availability and a quotation.",
  },
  {
    path: "/gallery",
    title: "Technical Gallery — Artwork, Photos & Videos",
    description:
      "Explore industrial automation illustrations, technical systems and institute media. View training photos and videos added by Chattogram Trust.",
  },
  {
    path: "/about",
    title: "About the Institute & Our Leadership",
    description:
      "Meet Nezam uddin (Md. Anas Nezam), founder and head trainer at Chattogram Trust PLC & Automation Technology. Practical technical education at GEC, Chattogram.",
  },
  {
    path: "/contact",
    title: "Contact, Admission Guidance & GEC Location",
    description:
      "Contact Chattogram Trust PLC & Automation Technology at O.R Nizam Road, GEC, Chattogram. Call +880 1646-241953 or send a direct WhatsApp inquiry.",
  },
  {
    path: "/blog",
    title: "Technical Blog, News & Practical Guides",
    description:
      "Practical Bangla guides to PLC learning, VFD control, solar design and industrial automation from Chattogram Trust. Read, understand and build.",
  },
  {
    path: "/notices",
    title: "Notice Board — Admissions & Institute Updates",
    description:
      "Read the latest admission notices, lab orientation information and enrollment guidance from Chattogram Trust PLC & Automation Technology.",
  },
];

/** Emit crawlable route-specific metadata without inventing a production domain. */
export function seoPlugin(origin: string): Plugin {
  const routes = [
    ...pages,
    ...COURSES.map((course) => ({
      path: `/courses/${course.slug}`,
      title: course.title,
      description: course.description,
      schema: {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.title,
        description: course.description,
        provider: { "@type": "EducationalOrganization", name: BRAND.name },
        offers: {
          "@type": "Offer",
          price: course.fee,
          priceCurrency: "BDT",
          category: "Paid",
        },
        timeRequired: `P${course.months}M`,
      },
    })),
    ...SEED_ARTICLES.filter((article) => article.published).map((article) => ({
      path: `/blog/${article.slug}`,
      title: article.title,
      description: article.excerpt,
      schema: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: "bn",
        author: { "@type": "Person", name: BRAND.founder },
        publisher: { "@type": "Organization", name: BRAND.name },
      },
    })),
  ];
  return {
    name: "trust-seo-metadata",
    enforce: "post",
    generateBundle: {
      order: "post",
      handler(_options, bundle) {
        const asset = bundle["index.html"];
        if (!asset || asset.type !== "asset") return;
        const template =
          typeof asset.source === "string"
            ? asset.source
            : Buffer.from(asset.source).toString("utf8");
        for (const route of routes) {
          const fullTitle = escapeHtml(`${route.title} | ${BRAND.shortName}`);
          const description = escapeHtml(route.description);
          const url = origin
            ? `${origin}${route.path === "/" ? "/" : route.path}`
            : "";
          const schema =
            "schema" in route
              ? route.schema
              : {
                  "@context": "https://schema.org",
                  "@type": "WebPage",
                  name: route.title,
                  description: route.description,
                  about: {
                    "@type": "EducationalOrganization",
                    name: BRAND.name,
                    telephone: "+8801646241953",
                  },
                };
          const tags = [
            `<meta name="description" content="${description}" />`,
            `<meta property="og:title" content="${fullTitle}" />`,
            `<meta property="og:description" content="${description}" />`,
            `<meta property="og:type" content="${route.path.startsWith("/blog/") ? "article" : "website"}" />`,
            `<meta name="twitter:title" content="${fullTitle}" />`,
            `<meta name="twitter:description" content="${description}" />`,
            `<meta name="twitter:card" content="${origin ? "summary_large_image" : "summary"}" />`,
            url
              ? `<link rel="canonical" href="${escapeHtml(url)}" /><meta property="og:url" content="${escapeHtml(url)}" /><meta property="og:image" content="${origin}/social-card.png" /><meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" /><meta property="og:image:alt" content="Chattogram Trust industrial automation training" /><meta name="twitter:image" content="${origin}/social-card.png" />`
              : "",
            `<script type="application/ld+json" id="page-schema">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
          ].join("\n");
          const html = template
            .replace(/<title>[\s\S]*?<\/title>/, `<title>${fullTitle}</title>`)
            .replace(
              /<meta\b(?=[^>]*\b(?:name|property)="(?:description|og:title|og:description|og:type|twitter:card|twitter:title|twitter:description)")[^>]*>/g,
              "",
            )
            .replace("</head>", `${tags}\n</head>`);
          if (route.path === "/") asset.source = html;
          else
            this.emitFile({
              type: "asset",
              fileName: `${route.path.slice(1)}.html`,
              source: html,
            });
        }
        const redirects = `${routes
          .filter((route) => route.path !== "/")
          .map((route) => `${route.path} ${route.path}.html 200`)
          .join("\n")}\n/* /index.html 200\n`;
        this.emitFile({
          type: "asset",
          fileName: "_redirects",
          source: redirects,
        });
        if (origin) {
          const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${escapeHtml(origin + route.path)}</loc></url>`).join("\n")}\n</urlset>\n`;
          this.emitFile({
            type: "asset",
            fileName: "sitemap.xml",
            source: sitemap,
          });
        }
      },
    },
  };
}
