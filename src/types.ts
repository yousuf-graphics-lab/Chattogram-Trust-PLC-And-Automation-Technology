/* ============================================================
   Chattogram Trust PLC & Automation Technology — shared types
   ============================================================ */

export type CourseCategory =
  | 'Automation'
  | 'Design'
  | 'Power'
  | 'Security'
  | 'Renewable';

export interface SyllabusModule {
  title: string;
  topics: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  shortTitle: string;
  category: CourseCategory;
  fee: number; // BDT
  duration: string;
  durationBn: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  seats: number;
  schedule: string;
  tagline: string;
  description: string;
  highlights: string[];
  syllabus: SyllabusModule[];
  tools: string[];
  careers: string[];
  featured?: boolean;
  illustration: IllustrationKind;
}

export type IllustrationKind =
  | 'plc'
  | 'vfd'
  | 'autocad'
  | 'substation'
  | 'cctv'
  | 'solar'
  | 'scada'
  | 'motor'
  | 'wiring'
  | 'sensor'
  | 'hmi'
  | 'tools'
  | 'panel'
  | 'network';

export interface Skill {
  id: number;
  title: string;
  titleBn: string;
  category: string;
  description: string;
  topics: string[];
  icon: string; // lucide icon key
  courseSlug?: string;
}

export interface Service {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  features: string[];
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  nameBn: string;
  category: 'Training Kits' | 'Equipment' | 'Tools & Accessories';
  price: number;
  description: string;
  specs: string[];
  illustration: IllustrationKind;
  badge?: string;
}

/* ---------- localStorage-backed dynamic content ---------- */

export type EnrollmentStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Enrollment {
  id: string;
  studentName: string;
  mobile: string;
  courseId: string;
  courseName: string;
  fee: number;
  bkashSender: string;
  trxId: string;
  status: EnrollmentStatus;
  createdAt: string; // ISO
  note?: string;
}

export type NoticeCategory = 'Admission' | 'Exam' | 'Holiday' | 'Event' | 'General';

export interface Notice {
  id: string;
  title: string;
  body: string;
  category: NoticeCategory;
  date: string; // ISO date
  pinned: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown-ish plain text with \n\n paragraphs
  category: string;
  author: string;
  date: string;
  readMinutes: number;
  tags: string[];
  poster: IllustrationKind;
}

export type GalleryType = 'photo' | 'video';

export interface GalleryItem {
  id: string;
  type: GalleryType;
  title: string;
  category: string;
  /** For photos: image URL or data-URI. For videos: optional YouTube embed URL. */
  src?: string;
  /** Code-generated SVG scene used when no photo src is provided. */
  scene?: IllustrationKind;
  /** External link (e.g. Facebook video) opened for video items without embed. */
  link?: string;
  date: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface SiteContent {
  announcement: string;
  heroHeadline: string;
  heroHighlight: string;
  heroSubheadline: string;
  heroSubheadlineBn: string;
  statModules: number;
  statPractical: number;
  statStudents: number;
  statDistricts: number;
}

export interface AdminSession {
  username: string;
  token: string;
  expiresAt: number;
}

export interface ChatMessage {
  id: string;
  role: 'bot' | 'user';
  text: string;
  time: string;
}

export type ThemeMode = 'dark' | 'light';
