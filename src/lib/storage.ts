/* ============================================================
   localStorage "database" — typed, seeded, versioned storage.
   All dynamic content (enrollments, notices, gallery, blog,
   site content, messages, admin session) lives here.
   ============================================================ */

import type {
  AdminSession,
  BlogPost,
  ContactMessage,
  Enrollment,
  GalleryItem,
  Notice,
  SiteContent,
} from '@/types';
import { ANNOUNCEMENT_DEFAULT } from './site';
import { seedNotices } from '@/data/notices';
import { seedPosts } from '@/data/blog';
import { seedGallery } from '@/data/gallery';

const PREFIX = 'ctpat_v1_';

export const KEYS = {
  enrollments: `${PREFIX}enrollments`,
  notices: `${PREFIX}notices`,
  posts: `${PREFIX}posts`,
  gallery: `${PREFIX}gallery`,
  messages: `${PREFIX}messages`,
  content: `${PREFIX}content`,
  // v2 key invalidates sessions created with the previous admin credentials.
  session: 'ctpat_v2_admin_session',
  theme: `${PREFIX}theme`,
} as const;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    // Storage quota exceeded (e.g. large base64 images) — surface gracefully.
    console.warn('[CTPAT storage] write failed', err);
    throw new Error(
      'Storage is full. Try a smaller image or remove old gallery items.'
    );
  }
}

export function uid(prefix = 'id'): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

/* ---------------- Enrollments ---------------- */

export function getEnrollments(): Enrollment[] {
  return read<Enrollment[]>(KEYS.enrollments, []);
}

export function addEnrollment(
  entry: Omit<Enrollment, 'id' | 'createdAt' | 'status'>
): Enrollment {
  const enrollment: Enrollment = {
    ...entry,
    id: uid('enr'),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  write(KEYS.enrollments, [enrollment, ...getEnrollments()]);
  return enrollment;
}

export function updateEnrollment(
  id: string,
  patch: Partial<Enrollment>
): Enrollment[] {
  const next = getEnrollments().map((e) =>
    e.id === id ? { ...e, ...patch } : e
  );
  write(KEYS.enrollments, next);
  return next;
}

export function deleteEnrollment(id: string): Enrollment[] {
  const next = getEnrollments().filter((e) => e.id !== id);
  write(KEYS.enrollments, next);
  return next;
}

/* ---------------- Notices ---------------- */

export function getNotices(): Notice[] {
  const stored = read<Notice[] | null>(KEYS.notices, null);
  if (stored) return stored;
  write(KEYS.notices, seedNotices);
  return seedNotices;
}

export function saveNotices(notices: Notice[]): void {
  write(KEYS.notices, notices);
}

/* ---------------- Blog ---------------- */

export function getPosts(): BlogPost[] {
  const stored = read<BlogPost[] | null>(KEYS.posts, null);
  if (stored) return stored;
  write(KEYS.posts, seedPosts);
  return seedPosts;
}

export function savePosts(posts: BlogPost[]): void {
  write(KEYS.posts, posts);
}

/* ---------------- Gallery ---------------- */

export function getGallery(): GalleryItem[] {
  const stored = read<GalleryItem[] | null>(KEYS.gallery, null);
  if (stored) return stored;
  write(KEYS.gallery, seedGallery);
  return seedGallery;
}

export function saveGallery(items: GalleryItem[]): void {
  write(KEYS.gallery, items);
}

/* ---------------- Contact messages ---------------- */

export function getMessages(): ContactMessage[] {
  return read<ContactMessage[]>(KEYS.messages, []);
}

export function addMessage(
  msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>
): ContactMessage {
  const message: ContactMessage = {
    ...msg,
    id: uid('msg'),
    createdAt: new Date().toISOString(),
    read: false,
  };
  write(KEYS.messages, [message, ...getMessages()]);
  return message;
}

export function updateMessage(
  id: string,
  patch: Partial<ContactMessage>
): ContactMessage[] {
  const next = getMessages().map((m) => (m.id === id ? { ...m, ...patch } : m));
  write(KEYS.messages, next);
  return next;
}

export function deleteMessage(id: string): ContactMessage[] {
  const next = getMessages().filter((m) => m.id !== id);
  write(KEYS.messages, next);
  return next;
}

/* ---------------- Site content ---------------- */

export const DEFAULT_CONTENT: SiteContent = {
  announcement: ANNOUNCEMENT_DEFAULT,
  heroHeadline: 'Master PLC, SCADA &',
  heroHighlight: 'Industrial Automation',
  heroSubheadline:
    'Hands-on technical training at GEC, Chattogram. 100% job-oriented practical learning.',
  heroSubheadlineBn:
    'ইন্ডাস্ট্রিয়াল অটোমেশন, PLC, SCADA, VFD, HMI ও AutoCAD-এর হাতে-কলমে প্রশিক্ষণ নিন চট্টগ্রামের জিইসি-তে।',
  statModules: 25,
  statPractical: 100,
  statStudents: 2500,
  statDistricts: 60,
};

export function getContent(): SiteContent {
  return { ...DEFAULT_CONTENT, ...read<Partial<SiteContent>>(KEYS.content, {}) };
}

export function saveContent(content: SiteContent): void {
  write(KEYS.content, content);
}

/* ---------------- Admin session ---------------- */

const SESSION_TTL = 1000 * 60 * 60 * 8; // 8 hours

export function createSession(username: string): AdminSession {
  const session: AdminSession = {
    username,
    token: uid('adm'),
    expiresAt: Date.now() + SESSION_TTL,
  };
  write(KEYS.session, session);
  return session;
}

export function getSession(): AdminSession | null {
  const s = read<AdminSession | null>(KEYS.session, null);
  if (!s) return null;
  if (Date.now() > s.expiresAt) {
    window.localStorage.removeItem(KEYS.session);
    return null;
  }
  return s;
}

export function destroySession(): void {
  window.localStorage.removeItem(KEYS.session);
}

/* ---------------- CSV export helper ---------------- */

export function enrollmentsToCsv(rows: Enrollment[]): string {
  const header = [
    'ID',
    'Student Name',
    'Mobile',
    'Course',
    'Fee (Taka)',
    'bKash Sender',
    'TrxID',
    'Status',
    'Date',
  ];
  const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const lines = rows.map((r) =>
    [
      r.id,
      r.studentName,
      r.mobile,
      r.courseName,
      r.fee,
      r.bkashSender,
      r.trxId,
      r.status,
      new Date(r.createdAt).toLocaleString('en-GB'),
    ]
      .map(esc)
      .join(',')
  );
  return [header.map(esc).join(','), ...lines].join('\n');
}
