import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BRAND } from "../data/brand";

interface SeoOptions {
  title: string;
  description: string;
  noIndex?: boolean;
  schema?: Record<string, unknown>;
}
function setMeta(key: string, content: string, property = false) {
  const attribute = property ? "property" : "name";
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}
export function getSiteOrigin(): string {
  try {
    const url = new URL(
      (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, ""),
    );
    return url.protocol === "https:" &&
      url.pathname === "/" &&
      !url.search &&
      !url.hash
      ? url.origin
      : "";
  } catch {
    return "";
  }
}

export function useSeo({
  title,
  description,
  noIndex = false,
  schema,
}: SeoOptions) {
  const { pathname } = useLocation();
  const schemaJson = schema ? JSON.stringify(schema) : "";
  useEffect(() => {
    const fullTitle = `${title} | ${BRAND.shortName}`;
    document.title = fullTitle;
    setMeta("description", description);
    setMeta(
      "robots",
      noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
    );
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta(
      "og:type",
      pathname.startsWith("/blog/") ? "article" : "website",
      true,
    );
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    const origin = getSiteOrigin();
    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (origin && !noIndex) {
      const url = `${origin}${pathname}`;
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = url;
      setMeta("og:url", url, true);
      setMeta("og:image", `${origin}/social-card.png`, true);
      setMeta(
        "og:image:alt",
        "Chattogram Trust — practical PLC and industrial automation training",
        true,
      );
      setMeta("og:image:width", "1200", true);
      setMeta("og:image:height", "630", true);
      setMeta("twitter:card", "summary_large_image");
      setMeta("twitter:image", `${origin}/social-card.png`);
    } else {
      canonical?.remove();
      [
        "og:url",
        "og:image",
        "og:image:alt",
        "og:image:width",
        "og:image:height",
      ].forEach((key) =>
        document.head.querySelector(`meta[property="${key}"]`)?.remove(),
      );
      document.head.querySelector('meta[name="twitter:image"]')?.remove();
      setMeta("twitter:card", "summary");
    }
    let script = document.getElementById(
      "page-schema",
    ) as HTMLScriptElement | null;
    if (schemaJson) {
      if (!script) {
        script = document.createElement("script");
        script.id = "page-schema";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = schemaJson.replace(/</g, "\\u003c");
    } else script?.remove();
    return () => {
      document.getElementById("page-schema")?.remove();
    };
  }, [title, description, noIndex, pathname, schemaJson]);
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: BRAND.name,
  description:
    "Practical PLC, SCADA and industrial automation training in GEC, Chattogram.",
  telephone: "+8801646241953",
  email: BRAND.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "O.R Nizam Road, Nurbag Abasik, Nahar Villa 1st floor, GEC",
    addressLocality: "Chattogram",
    addressCountry: "BD",
  },
  founder: {
    "@type": "Person",
    name: BRAND.founder,
    alternateName: BRAND.profileName,
  },
  sameAs: [BRAND.facebookPage, BRAND.facebookProfile, BRAND.youtube],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+8801646241953",
    contactType: "admissions",
    availableLanguage: ["Bengali", "English"],
  },
};
