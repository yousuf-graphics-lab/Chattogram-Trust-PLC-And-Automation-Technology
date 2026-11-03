import { useMemo, useState } from 'react';
import { Bell, CalendarDays, Pin } from 'lucide-react';
import type { Notice } from '@/types';
import { useData } from '@/context/DataContext';
import { formatDate } from '@/lib/site';
import { useSeo } from '@/lib/seo';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { CtaBanner } from '@/components/CtaBanner';

const categories: (Notice['category'] | 'All')[] = ['All', 'Admission', 'Exam', 'Event', 'Holiday', 'General'];

const categoryColor: Record<Notice['category'], string> = {
  Admission: 'bg-safety/15 text-safety border-safety/30',
  Exam: 'bg-electric/15 text-electric-400 border-electric/30',
  Holiday: 'bg-muted/15 text-muted border-line',
  Event: 'bg-glow/15 text-glow border-glow/30',
  General: 'bg-surface2 text-muted border-line',
};

export default function Notices() {
  const { notices } = useData();
  const [category, setCategory] = useState<(typeof categories)[number]>('All');

  useSeo({
    title: 'Notice Board — Admission, Exams & Events',
    description:
      'Latest notices from Chattogram Trust PLC & Automation Technology: new batch admissions, special discounts, free seminars, project evaluations and lab schedules.',
    path: '/notices',
  });

  const filtered = useMemo(
    () =>
      notices
        .filter((n) => category === 'All' || n.category === category)
        .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.date.localeCompare(a.date)),
    [notices, category]
  );

  return (
    <>
      <PageHero
        eyebrow="নোটিশ বোর্ড"
        title={<>Notice <span className="gradient-text">Board</span></>}
        subtitle="All official announcements — admissions, exams, events and lab schedules. Pinned notices stay on top."
        breadcrumb={[{ label: 'Notices' }]}
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-md px-4 py-1.5 text-xs font-bold transition-all ${
                category === c ? 'bg-electric text-white' : 'border border-line bg-surface text-muted hover:text-glow'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="container-x py-10">
        <div className="mx-auto max-w-3xl space-y-5">
          {filtered.map((n, i) => (
            <Reveal key={n.id} delay={i * 0.05}>
              <article className={`card overflow-hidden ${n.pinned ? 'border-safety/40' : ''}`}>
                {n.pinned && (
                  <div className="flex items-center gap-1.5 bg-safety/10 px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-safety">
                    <Pin size={12} /> Pinned Notice
                  </div>
                )}
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${categoryColor[n.category]}`}>
                      {n.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                      <CalendarDays size={13} className="text-glow" /> {formatDate(n.date)}
                    </span>
                  </div>
                  <h2 className="font-bangla mt-3 text-lg font-bold leading-snug text-ink">{n.title}</h2>
                  <p className="font-bangla mt-2.5 text-sm leading-relaxed text-muted">{n.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
          {filtered.length === 0 && (
            <div className="py-10 text-center">
              <Bell size={40} className="mx-auto mb-3 text-muted/60" />
              <p className="text-muted">No notices in this category.</p>
            </div>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
