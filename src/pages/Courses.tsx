import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter, MessageCircle, Table2 } from 'lucide-react';
import { courseCategories, courses } from '@/data/courses';
import { formatTaka, waLink } from '@/lib/site';
import { useSeo } from '@/lib/seo';
import { PageHero } from '@/components/PageHero';
import { CourseCard } from '@/components/CourseCard';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { CtaBanner } from '@/components/CtaBanner';

export default function Courses() {
  const [category, setCategory] = useState<string>('All');
  useSeo({
    title: 'Courses & Fee Structure — PLC, SCADA, AutoCAD, CCTV, Solar',
    description:
      'Explore all 6 job-oriented courses with exact fees: Industrial Automation & PLC (8,000 Taka), Advance Automation PLC VFD HMI (9,600 Taka), Electrical AutoCAD (5,000 Taka), Sub-Station (5,500 Taka), CCTV (3,000 Taka), Solar PV (5,000 Taka).',
    path: '/courses',
    keywords: 'PLC course fee Bangladesh, automation course Chattogram, AutoCAD course fee, CCTV training, solar PV course',
  });

  const filtered = useMemo(
    () => (category === 'All' ? courses : courses.filter((c) => c.category === category)),
    [category]
  );

  return (
    <>
      <PageHero
        eyebrow="কোর্স তালিকা ও ফি স্ট্রাকচার"
        title={<>Our <span className="gradient-text">Courses</span> & Fee Structure</>}
        subtitle="Six industry-designed programs with transparent pricing. Every course includes hands-on lab access, project work and job guidance."
        breadcrumb={[{ label: 'Courses' }]}
      >
        <div className="flex flex-wrap gap-2">
          <span className="chip"><Filter size={12} /> Filter:</span>
          {courseCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-md px-4 py-1.5 text-xs font-bold transition-all ${
                category === c
                  ? 'bg-electric text-white shadow-glow-blue'
                  : 'border border-line bg-surface text-muted hover:border-glow/50 hover:text-glow'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="container-x py-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 0.08}>
              <CourseCard course={c} index={i} />
            </Reveal>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-10 text-center text-muted">No courses in this category yet.</p>
        )}
      </section>

      {/* Fee summary table */}
      <section className="border-y border-line bg-surface/40 py-10">
        <div className="container-x">
          <SectionHeading
            eyebrow="সম্পূর্ণ ফি তালিকা"
            title={<>Course Fee <span className="gradient-text">Summary</span></>}
            subtitle="All fees in BDT. Installment options available on selected courses — ask on WhatsApp."
          />
          <Reveal>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-line bg-surface2/60 text-xs uppercase tracking-wider text-muted">
                      <th className="px-5 py-4 font-bold">#</th>
                      <th className="px-5 py-4 font-bold">Course</th>
                      <th className="px-5 py-4 font-bold">Duration</th>
                      <th className="px-5 py-4 font-bold">Level</th>
                      <th className="px-5 py-4 font-bold">Fee</th>
                      <th className="px-5 py-4 font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c, i) => (
                      <tr key={c.id} className="border-b border-line/60 transition-colors last:border-0 hover:bg-surface2/40">
                        <td className="px-5 py-4 font-bold text-muted">{String(i + 1).padStart(2, '0')}</td>
                        <td className="px-5 py-4">
                          <Link to={`/courses/${c.slug}`} className="font-bold text-ink hover:text-glow">
                            {c.title}
                          </Link>
                          <div className="font-bangla text-xs text-muted">{c.titleBn}</div>
                        </td>
                        <td className="px-5 py-4 text-muted">{c.duration}</td>
                        <td className="px-5 py-4"><span className="chip">{c.level}</span></td>
                        <td className="px-5 py-4 text-base font-extrabold text-glow">{formatTaka(c.fee)}</td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            <Link to={`/checkout?course=${c.slug}`} className="btn-bkash !px-3 !py-1.5 text-[11px]">
                              bKash
                            </Link>
                            <a
                              href={waLink(`আসসালামু আলাইকুম, "${c.title}" কোর্সে ভর্তি হতে চাই।`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-whatsapp !px-3 !py-1.5 text-[11px]"
                            >
                              <MessageCircle size={13} />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface2/40 px-5 py-4">
                <span className="inline-flex items-center gap-2 text-xs text-muted">
                  <Table2 size={14} className="text-glow" />
                  Fees include lab materials, project components & course certificate.
                </span>
                <Link to="/checkout" className="btn-orange !py-2 text-xs">
                  Enroll Now <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
