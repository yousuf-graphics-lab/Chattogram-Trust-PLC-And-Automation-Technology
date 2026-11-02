export type ArtVariant =
  | "plc"
  | "automation"
  | "cad"
  | "substation"
  | "cctv"
  | "solar"
  | "motor"
  | "scada";
export type CourseCategory =
  "Automation" | "Design & CAD" | "Power systems" | "Security" | "Solar energy";
export type SkillCategory =
  | "Electrical foundations"
  | "Automation"
  | "Design & power"
  | "Applied technology";

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: CourseCategory;
  fee: number;
  duration: string;
  months: number;
  level: string;
  description: string;
  art: ArtVariant;
  featured?: boolean;
  outcomes: string[];
  syllabus: { title: string; topics: string[] }[];
  project: string;
  requirements: string[];
  skillIds: number[];
}

export interface Skill {
  id: number;
  title: string;
  shortTitle: string;
  category: SkillCategory;
  icon: string;
  description: string;
  practice: string[];
  tools: string[];
  courseSlug: string;
}

export interface Notice {
  id: string;
  title: string;
  body: string;
  category: "Admission" | "Schedule" | "General";
  date: string;
  pinned: boolean;
}

export interface ArticleSection {
  heading: string;
  body: string;
}
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  art: ArtVariant;
  sections: ArticleSection[];
  published: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category:
    "Training lab" | "Automation" | "Design & power" | "Field applications";
  type: "image" | "video";
  art: ArtVariant;
  description: string;
  src?: string;
}

export type EnrollmentStatus = "pending" | "confirmed" | "cancelled";
export interface EnrollmentInput {
  studentName: string;
  mobile: string;
  courseId: string;
  senderNumber: string;
  transactionId: string;
}
export interface Enrollment extends EnrollmentInput {
  id: string;
  fee: number;
  status: EnrollmentStatus;
  createdAt: string;
}

export interface SiteContent {
  announcement: string;
  homeIntro: string;
  aboutMission: string;
  contactNote: string;
}

export interface Database {
  enrollments: Enrollment[];
  notices: Notice[];
  articles: Article[];
  gallery: GalleryItem[];
  content: SiteContent;
}
