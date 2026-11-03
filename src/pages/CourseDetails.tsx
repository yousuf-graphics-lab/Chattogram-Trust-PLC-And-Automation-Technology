import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight, Briefcase, CheckCircle2, Clock, GraduationCap, Layers,
  MessageCircle, Users, Wrench, Zap,
} from 'lucide-react';
import { courses, getCourseBySlug } from '@/data/courses';
import { faqs } from '@/data/faq';
import { formatTaka, waLink } from '@/lib/site';
import { useSeo } from '@/lib/seo';
import { TechIllustration } from '@/components/illustrations/TechIllustration';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { AccordionItem } from '@/components/Accordion';
import { CourseCard } from '@/components/CourseCard';
import { CtaBanner } from '@/components/CtaBanner';
import NotFound from './NotFound';

export default function CourseDetails() {
  const { slug } = useParams();
  const course = slug ? getCourseBySlug(slug) : undefined;

  useSeo({
    title: course ? `${course.title} — ${formatTaka(course.fee)}` : 'Course',
    description: course
      ? `${course.title} at Chattogram Trust PLC. Fee ${formatTaka(course.fee)}, duration ${course.duration}. ${course.tagline} Full syllabus, tools and career outcomes.`
      : 'Course details',
    path: `/courses/${slug ?? ''}`,
    jsonLd: course
      ? {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: course.title,
          description: course.description,
          provider: { '@type': 'EducationalOrganization', name: 'Chattogram Trust PLC & Automation Technology' },
          offers: { '@type': 'Offer', price: course.fee, priceCurrency: 'BDT', availability: 'https://schema.org/InStock' },
          timeRequired: course.duration,
        }
      : undefined,
  });

  if (!course) return <NotFound />;

  const related = courses.filter((c) => c.id !== course.id).slice(0, 3);
  const waText = `আসসালামু আলাইকুম, আমি "${course.title}" কোর্সে (${formatTaka(course.fee)}) ভর্তি হতে চাই। বিস্তারিত জানাবেন।`;

  return (
    <>
      <PageHero
        eyebrow={`${course.category} • ${course.level}`}
        title={course.title}
        subtitle={course.tagline}
        breadcrumb={[{ label: 'Courses', to: '/courses' }, { label: course.shortTitle }]}
      >
        <div className="flex flex-wrap gap-2">
          <span className="chip border-glow/40 text-glow"><Clock size={13} /> {course.duration}</span>
          <span className="chip border-glow/40 text-glow"><Users size={13} /> {course.seats} seats / batch</span>
          <span className="chip border-safety/40 text-safety"><GraduationCap size={13} /> {course.level}</span>
          <span className="chip border-electric/40 text-electric-400 text-sm font-extrabold">{formatTaka(course.fee)}</span>
        </div>
      </PageHero>

      <section className="container-x grid gap-10 py-10 lg:grid-cols-[1fr_360px]">
        {/* Main content */}
        <div className="space-y-12">
          <Reveal>
            <TechIllustration kind={course.illustration} uid={`detail-${course.id}`} className="w-full rounded-2xl border border-line" />
          </Reveal>

          <Reveal>
            <div>
              <h2 className="mb-3 text-2xl font-extrabold text-ink">About This Course</h2>
              <p className="font-bangla mb-2 text-base font-bold text-glow">{course.titleBn}</p>
              <p className="text-base leading-relaxed text-muted">{course.description}</p>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-2xl font-extrabold text-ink">
                <CheckCircle2 className="text-glow" size={24} /> What You'll Master
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {course.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2.5 rounded-xl border border-line bg-surface/60 p-3.5">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-glow" />
                    <span className="text-sm text-ink/90">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-2xl font-extrabold text-ink">
                <Layers className="text-glow" size={24} /> Full Syllabus
              </h2>
              <div className="space-y-3">
                {course.syllabus.map((m, i) => (
                  <AccordionItem key={m.title} title={m.title} defaultOpen={i === 0}>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {m.topics.map((t) => (
                        <li key={t} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-glow" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </AccordionItem>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal>
              <div className="card h-full p-6">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-ink">
                  <Wrench size={20} className="text-glow" /> Tools & Platforms
                </h3>
                <ul className="space-y-2">
                  {course.tools.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-electric-400" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card h-full p-6">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-ink">
                  <Briefcase size={20} className="text-glow" /> Career Outcomes
                </h3>
                <ul className="space-y-2">
                  {course.careers.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-safety" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div>
              <h2 className="mb-4 text-2xl font-extrabold text-ink">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.slice(0, 4).map((f) => (
                  <AccordionItem key={f.q} title={<span className="font-bangla">{f.q}</span>}>
                    <span className="font-bangla">{f.a}</span>
                  </AccordionItem>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Sticky enrollment sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <div className="card overflow-hidden">
              <div className="bg-bkash p-5 text-white">
                <div className="text-xs font-bold uppercase tracking-widest text-white/80">Course Fee</div>
                <div className="mt-1 text-4xl font-black">{formatTaka(course.fee)}</div>
                <div className="mt-1 text-xs text-white/80">One-time • Lab materials included</div>
              </div>
              <div className="space-y-4 p-5">
                <div className="space-y-2.5 text-sm">
                  {[
                    { k: 'Duration', v: course.duration },
                    { k: 'Schedule', v: course.schedule },
                    { k: 'Batch Size', v: `${course.seats} students` },
                    { k: 'Level', v: course.level },
                    { k: 'Language', v: 'বাংলা + English terms' },
                  ].map((r) => (
                    <div key={r.k} className="flex items-start justify-between gap-3 border-b border-line/60 pb-2.5 last:border-0">
                      <span className="text-muted">{r.k}</span>
                      <span className="text-right font-semibold text-ink">{r.v}</span>
                    </div>
                  ))}
                </div>
                <Link to={`/checkout?course=${course.slug}`} className="btn-bkash w-full">
                  <Zap size={16} /> Enroll via bKash
                </Link>
                <a href={waLink(waText)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
                  <MessageCircle size={16} /> WhatsApp Inquiry
                </a>
                <p className="text-center text-[11px] leading-relaxed text-muted">
                  বিকাশে Send Money করার পর Checkout ফর্মে TrxID দিন — সাথে সাথে WhatsApp কনফার্মেশন পাবেন।
                </p>
              </div>
            </div>
          </Reveal>
        </aside>
      </section>

      <section className="border-t border-line bg-surface/40 py-10">
        <div className="container-x">
          <SectionHeading
            eyebrow="আরও কোর্স"
            title={<>Related <span className="gradient-text">Courses</span></>}
            action={<Link to="/courses" className="btn-outline text-xs">View All <ArrowRight size={14} /></Link>}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.08}>
                <CourseCard course={c} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
