import { useMemo, useState } from 'react';
import { Filter, Layers } from 'lucide-react';
import { skillCategories, skills } from '@/data/skills';
import { useSeo } from '@/lib/seo';
import { PageHero } from '@/components/PageHero';
import { SkillCard } from '@/components/SkillCard';
import { Reveal } from '@/components/Reveal';
import { CtaBanner } from '@/components/CtaBanner';

export default function Skills() {
  const [category, setCategory] = useState<string>('All');
  useSeo({
    title: '20 Practical Technical Skills — Full Curriculum Breakdown',
    description:
      'Complete breakdown of all 20 practical skills: House Wiring, Motor Controlling, PLC, VFD, HMI, SCADA, Electrical & Civil AutoCAD, Sub-Station, HT/LT Switchgear, CCTV, Solar PV, Safety, Energy Audit, Project Making, Automobile Electrical.',
    path: '/skills',
    keywords: 'PLC skills, VFD training, HMI SCADA, AutoCAD electrical, substation design, industrial automation curriculum',
  });

  const filtered = useMemo(
    () => (category === 'All' ? skills : skills.filter((s) => s.category === category)),
    [category]
  );

  return (
    <>
      <PageHero
        eyebrow="সম্পূর্ণ কারিকুলাম ব্রেকডাউন"
        title={<>20 Essential <span className="gradient-text">Practical Skills</span></>}
        subtitle="Every skill is taught hands-on with real hardware. Filter by category to explore the complete industrial automation skill stack."
        breadcrumb={[{ label: 'Skills' }]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip"><Filter size={12} /> Category:</span>
          {skillCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition-all ${
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
        <div className="mb-6 flex items-center gap-2 text-sm text-muted">
          <Layers size={16} className="text-glow" />
          Showing <span className="font-bold text-ink">{filtered.length}</span> of {skills.length} skills
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) * 0.05}>
              <SkillCard skill={s} detailed />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
