import type { Database } from "../types";
import {
  DEFAULT_CONTENT,
  SEED_ARTICLES,
  SEED_GALLERY,
  SEED_NOTICES,
} from "../data/seed";
import { isSiteContent, validators } from "./validation";

export const STORAGE_KEYS = {
  enrollments: "trust-plc:enrollments:v1",
  notices: "trust-plc:notices:v1",
  articles: "trust-plc:articles:v1",
  gallery: "trust-plc:gallery:v1",
  content: "trust-plc:content:v1",
  theme: "trust-plc:theme:v1",
  session: "trust-plc:admin-session:v1",
} as const;
export type CollectionKey = keyof typeof validators;
export const SEEDS = {
  enrollments: [] as Database["enrollments"],
  notices: SEED_NOTICES,
  articles: SEED_ARTICLES,
  gallery: SEED_GALLERY,
  content: DEFAULT_CONTENT,
};
export const STORAGE_MESSAGE =
  "Browser storage is unavailable or full. Your changes were not saved. Enable site storage or remove large gallery uploads, then try again. You can still contact us by phone or WhatsApp.";

export function readSlice<K extends keyof Database>(key: K): Database[K] {
  const fallback = SEEDS[key];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS[key]);
    if (raw === null) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (key === "content")
      return (isSiteContent(parsed) ? parsed : fallback) as Database[K];
    const guard = validators[key as CollectionKey];
    return (
      Array.isArray(parsed) && parsed.length <= 2000 && parsed.every(guard)
        ? parsed
        : fallback
    ) as Database[K];
  } catch {
    return fallback;
  }
}

export function writeSlice<K extends keyof Database>(
  key: K,
  value: Database[K],
): void {
  const valid =
    key === "content"
      ? isSiteContent(value)
      : Array.isArray(value) &&
        value.length <= 2000 &&
        value.every(validators[key as CollectionKey]);
  if (!valid)
    throw new Error(
      "The content could not be validated. Please check the fields and try again.",
    );
  try {
    localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
  } catch {
    throw new Error(STORAGE_MESSAGE);
  }
}

export function downloadJson(filename: string, data: unknown) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function readTheme(): "dark" | "light" {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.theme) || '"dark"') ===
      "light"
      ? "light"
      : "dark";
  } catch {
    return "dark";
  }
}
export function writeTheme(theme: "dark" | "light"): void {
  try {
    localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify(theme));
  } catch {
    /* Preference still applies for this page. */
  }
}
