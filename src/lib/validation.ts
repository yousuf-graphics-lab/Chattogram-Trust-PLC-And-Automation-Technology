import { COURSES } from "../data/courses";
import type {
  Article,
  Enrollment,
  EnrollmentInput,
  GalleryItem,
  Notice,
  SiteContent,
} from "../types";

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
export const isString = (value: unknown, max = 2000): value is string =>
  typeof value === "string" && value.length <= max;
const hasStrings = (value: Record<string, unknown>, fields: string[]) =>
  fields.every((key) => isString(value[key]));
const validDate = (value: unknown) =>
  isString(value, 40) && !Number.isNaN(Date.parse(value));
const validList = (
  value: unknown,
  guard: (item: unknown) => boolean,
  max = 1000,
): value is unknown[] =>
  Array.isArray(value) && value.length <= max && value.every(guard);

export function normalizeBangladeshPhone(value: string): string {
  return value.replace(/[\s()-]/g, "").replace(/^(?:\+?880|880)/, "0");
}
export function validBangladeshPhone(value: string): boolean {
  return /^01[3-9]\d{8}$/.test(normalizeBangladeshPhone(value));
}
export function safeImageSource(value: unknown): value is string {
  return (
    isString(value, 1_500_000) &&
    /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(value)
  );
}
export function youTubeId(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase();
    let id = "";
    if (host === "youtu.be" || host === "www.youtu.be")
      id = url.pathname.split("/")[1] || "";
    else if (
      [
        "youtube.com",
        "www.youtube.com",
        "m.youtube.com",
        "youtube-nocookie.com",
        "www.youtube-nocookie.com",
      ].includes(host)
    ) {
      id =
        url.searchParams.get("v") ||
        url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1] ||
        "";
    }
    return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

export type EnrollmentErrors = Partial<Record<keyof EnrollmentInput, string>>;
export function validateEnrollment(input: EnrollmentInput): EnrollmentErrors {
  const errors: EnrollmentErrors = {};
  if (
    input.studentName.trim().length < 2 ||
    input.studentName.trim().length > 80
  )
    errors.studentName = "Enter your full name (2–80 characters).";
  if (!validBangladeshPhone(input.mobile))
    errors.mobile = "Enter a valid Bangladesh mobile number, e.g. 01712345678.";
  if (!COURSES.some((course) => course.id === input.courseId))
    errors.courseId = "Select an available course.";
  if (!validBangladeshPhone(input.senderNumber))
    errors.senderNumber =
      "Enter the valid bKash sender number used for this payment.";
  if (!/^[A-Za-z0-9]{6,30}$/.test(input.transactionId.trim()))
    errors.transactionId =
      "Enter the 6–30 letter/number transaction ID from your bKash receipt.";
  return errors;
}

export const isEnrollment = (value: unknown): value is Enrollment =>
  isRecord(value) &&
  hasStrings(value, [
    "id",
    "studentName",
    "mobile",
    "courseId",
    "senderNumber",
    "transactionId",
    "createdAt",
  ]) &&
  typeof value.fee === "number" &&
  Number.isFinite(value.fee) &&
  ["pending", "confirmed", "cancelled"].includes(String(value.status)) &&
  validDate(value.createdAt) &&
  Object.keys(validateEnrollment(value as unknown as EnrollmentInput))
    .length === 0 &&
  COURSES.some(
    (course) => course.id === value.courseId && course.fee === value.fee,
  );

export const isNotice = (value: unknown): value is Notice =>
  isRecord(value) &&
  hasStrings(value, ["id", "title", "body", "date"]) &&
  String(value.title).trim().length > 0 &&
  ["Admission", "Schedule", "General"].includes(String(value.category)) &&
  typeof value.pinned === "boolean" &&
  validDate(value.date);

export const isArticle = (value: unknown): value is Article =>
  isRecord(value) &&
  hasStrings(value, [
    "id",
    "slug",
    "title",
    "excerpt",
    "category",
    "date",
    "art",
  ]) &&
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(value.slug)) &&
  String(value.title).trim().length > 0 &&
  typeof value.readMinutes === "number" &&
  value.readMinutes > 0 &&
  value.readMinutes <= 120 &&
  [
    "plc",
    "automation",
    "cad",
    "substation",
    "cctv",
    "solar",
    "motor",
    "scada",
  ].includes(String(value.art)) &&
  typeof value.published === "boolean" &&
  validDate(value.date) &&
  validList(
    value.sections,
    (section) => isRecord(section) && hasStrings(section, ["heading", "body"]),
    100,
  );

export const isGalleryItem = (value: unknown): value is GalleryItem =>
  isRecord(value) &&
  hasStrings(value, [
    "id",
    "title",
    "category",
    "type",
    "art",
    "description",
  ]) &&
  [
    "Training lab",
    "Automation",
    "Design & power",
    "Field applications",
  ].includes(String(value.category)) &&
  [
    "plc",
    "automation",
    "cad",
    "substation",
    "cctv",
    "solar",
    "motor",
    "scada",
  ].includes(String(value.art)) &&
  (value.type === "image"
    ? value.src === undefined || safeImageSource(value.src)
    : value.type === "video" &&
      isString(value.src) &&
      youTubeId(value.src) !== null);

export const isSiteContent = (value: unknown): value is SiteContent =>
  isRecord(value) &&
  hasStrings(value, [
    "announcement",
    "homeIntro",
    "aboutMission",
    "contactNote",
  ]) &&
  Object.values(value).every(
    (item) => isString(item, 1500) && item.trim().length > 0,
  );

export const validators = {
  enrollments: isEnrollment,
  notices: isNotice,
  articles: isArticle,
  gallery: isGalleryItem,
};
export const makeId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 11)}`;
export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
