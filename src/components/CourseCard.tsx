import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MessageCircle } from 'lucide-react';
import type { Course } from '@/types';
import { formatTaka, waLink } from '@/lib/site';
import { TechIllustration } from './illustrations/TechIllustration';

const COURSE_IMAGES: Record<string, string> = {
  'industrial-automation-plc': '/images/lab/lab-2.webp',
  'advance-automation-plc-vfd-hmi': '/images/lab/lab-1.webp',
  'electrical-autocad': '/images/lab/lab-2.webp',
  'electrical-substation-design': '/images/lab/lab-4.webp',
  'advanced-cctv': '/images/lab/lab-1.webp',
  'solar-pv-system': '/images/lab/lab-3.webp',
};

const BN_SUMMARY: Record<string, string> = {
  'industrial-automation-plc': 'রিলে লজিক, মোটর কন্ট্রোল, সিমেন্স ও ডেল্টা পিএলসি প্রোগ্রামিং, সেন্সর ইন্টারফেস ও প্র্যাকটিক্যাল প্যানেল ওয়্যারিং।',
  'advance-automation-plc-vfd-hmi': 'সম্পূর্ণ ইন্ডাস্ট্রিয়াল অটোমেশন: পিএলসি, ভিএফডি প্যারামিটারাইজেশন, এইচএমআই স্ক্রিন ডিজাইন ও মডবাস কমিউনিকেশন।',
  'electrical-autocad': 'ইলেকট্রিক্যাল এসএলডি, ফ্লোর প্ল্যান, এমডিবি/এসডিবি লোড ডিজাইন এবং প্যানেল জিএ ড্রয়িং।',
  'electrical-substation-design': '১১/০.৪ কেভি সাব-স্টেশন ডিজাইন, এইচটি/এলটি সুইচগিয়ার, পিএফআই এবং প্রোটেকশন কো-অর্ডিনেশন।',
  'advanced-cctv': 'আইপি ক্যামেরা, এনভিআর, পিওই নেটওয়ার্ক, রিমোট ভিউ এবং সিসিটিভি মেইনটেন্যান্স।',
  'solar-pv-system': 'অন-গ্রিড/অফ-গ্রিড সোলার ডিজাইন, ইনভার্টার ও ব্যাটারি সাইজিং, রুফটপ ইনস্টলেশন ও নেট মিটারিং।',
};

function CourseMedia({ course }: { course: Course }) {
  const [failed, setFailed] = useState(false);
  const src = COURSE_IMAGES[course.slug];
  if (!src || failed) {
    return <TechIllustration kind={course.illustration} uid={`card-${course.id}`} className="aspect-[16/9] w-full" />;
  }
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-base">
      <img
        src={src}
        alt={course.title}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 caption-scrim" />
    </div>
  );
}

export function CourseCard({ course }: { course: Course; index?: number }) {
  const waText = `আসসালামু আলাইকুম, আমি "${course.title}" কোর্সটি (${formatTaka(course.fee)}, ${course.duration}) সম্পর্কে বিস্তারিত জানতে চাই।`;
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Link to={`/courses/${course.slug}`} className="relative block overflow-hidden">
        <CourseMedia course={course} />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 rounded-sm bg-glow/10 px-2 py-0.5 text-[10px] font-bold text-glow">
            <Clock size={11} /> {course.duration}
          </span>
          <span className="text-base font-extrabold text-safety">{formatTaka(course.fee)}</span>
        </div>
        <Link to={`/courses/${course.slug}`}>
          <h3 className="text-[15px] font-extrabold leading-snug text-ink transition-colors group-hover:text-glow">
            {course.title}
          </h3>
        </Link>
        <p className="font-bangla mt-2 line-clamp-3 text-xs leading-relaxed text-muted">
          {BN_SUMMARY[course.slug] ?? course.tagline}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {course.tools.slice(0, 3).map((t) => (
            <span key={t} className="chip !normal-case !tracking-normal">{t}</span>
          ))}
        </div>

        <div className="mt-4 flex flex-1 items-end gap-2">
          <Link to={`/checkout?course=${course.slug}`} className="btn-orange flex-1 !py-2 text-xs">
            Enroll in Course
          </Link>
          <Link to={`/courses/${course.slug}`} className="btn-ghost !px-2 !py-2 text-xs">
            View Details
          </Link>
          <a
            href={waLink(waText)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline !px-2.5 !py-2"
            aria-label={`WhatsApp inquiry for ${course.title}`}
            title="WhatsApp Inquiry"
          >
            <MessageCircle size={15} className="text-whatsapp" />
          </a>
        </div>
      </div>
    </article>
  );
}
