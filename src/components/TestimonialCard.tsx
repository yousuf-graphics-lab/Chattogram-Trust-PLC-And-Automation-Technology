import { BadgeCheck, Quote, Star } from 'lucide-react';
import type { Testimonial } from '@/data/testimonials';

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="card relative flex h-full flex-col p-5">
      <Quote size={24} className="absolute right-4 top-4 text-glow/20" />
      <div className="mb-3 flex gap-0.5">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={13} className="fill-safety text-safety" />
        ))}
      </div>
      <p className="font-bangla flex-1 text-xs leading-relaxed text-ink/90">“{t.text}”</p>
      <div className="mt-4 border-t border-line pt-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-electric text-sm font-extrabold text-white">
            {t.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="font-bangla truncate text-sm font-bold text-ink">{t.name}</div>
            <div className="truncate text-[11px] text-muted">{t.role}</div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 rounded-sm bg-glow/10 px-2.5 py-1.5 text-[11px] font-bold text-glow">
          <BadgeCheck size={12} /> {t.outcome}
        </div>
        <div className="font-bangla mt-2 text-[11px] text-muted">কোর্স: {t.course}</div>
      </div>
    </article>
  );
}
