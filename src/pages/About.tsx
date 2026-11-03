import { Award, CheckCircle2, Eye, Heart, Target, Users } from 'lucide-react';
import { SITE } from '@/lib/site';
import { useSeo } from '@/lib/seo';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { LeadershipCard } from '@/components/LeadershipCard';
import { ImranInstructorCard } from '@/components/ImranInstructorCard';
import { StatsCounter } from '@/components/StatsCounter';
import { CtaBanner } from '@/components/CtaBanner';
import { TechIllustration } from '@/components/illustrations/TechIllustration';
import { Logo } from '@/components/illustrations/Logo';

const timeline = [
  { year: '2018', title: 'The Idea', desc: 'Nezam Uddin starts informal PLC training for local electricians and diploma engineers in Chattogram.' },
  { year: '2020', title: 'First Lab', desc: 'A dedicated lab with Siemens & Delta PLC stations opens at GEC, Chattogram.' },
  { year: '2022', title: 'Full Curriculum', desc: '20 practical skill modules launched covering automation, design, power, security and renewable energy.' },
  { year: '2024', title: '2500+ Alumni', desc: 'Graduates placed in factories across Bangladesh and overseas in the Middle East & Malaysia.' },
  { year: '2026', title: 'Industry 4.0 Ready', desc: 'Advanced SCADA, IIoT networking and solar programs added. New expanded lab facility.' },
];

const values = [
  { icon: Target, title: 'Our Mission', desc: 'To produce industry-ready automation professionals through 100% hands-on, project-based training that bridges the gap between classroom theory and factory floor reality.' },
  { icon: Eye, title: 'Our Vision', desc: 'To become Bangladesh\'s most trusted technical training institute — the first choice for anyone serious about a career in industrial automation, locally and abroad.' },
  { icon: Heart, title: 'Our Values', desc: 'Safety first, honesty in teaching, respect for every student, and an obsession with practical skill over certificates. We teach what the industry actually uses.' },
];

export default function About() {
  useSeo({
    title: 'About Us — Institute & Leadership',
    description:
      'Learn about Chattogram Trust PLC & Automation Technology: our mission, vision, journey since 2018, and founder Nezam Uddin — Founder, Owner, CEO & Head Trainer.',
    path: '/about',
  });

  return (
    <>
      <PageHero
        eyebrow="আমাদের সম্পর্কে"
        title={<>About <span className="gradient-text">Chattogram Trust</span></>}
        subtitle="Chattogram Trust PLC & Automation Technology is a hands-on industrial automation training institute at GEC, Chattogram — built by engineers, for future engineers."
        breadcrumb={[{ label: 'About' }]}
      />

      {/* Brand identity showcase */}
      <section className="container-x py-6">
        <Reveal>
          <div className="panel grid items-center gap-6 p-6 sm:p-8 md:grid-cols-[240px_1fr]">
            <div className="mx-auto w-full max-w-[220px]">
              <Logo animated size={220} className="h-auto w-full" />
            </div>
            <div>
              <span className="eyebrow mb-2">Our Identity</span>
              <h2 className="brand-glow text-2xl font-extrabold leading-snug text-ink sm:text-3xl">
                Chattogram Trust PLC & Automation Technology
              </h2>
              <p className="font-bangla mt-3 text-sm font-semibold leading-relaxed text-glow">
                {SITE.slogan1}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                The circular seal stands for engineering precision — gears for industry, circuit traces
                for automation, and the Trust monogram at the core. The glowing sweep represents live
                systems and the energy we bring to every student's career.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Story */}
      <section className="container-x grid items-center gap-10 py-10 lg:grid-cols-2">
        <Reveal>
          <div>
            <span className="eyebrow mb-3">Our Story</span>
            <h2 className="text-3xl font-extrabold text-ink">
              From a Small Lab to a <span className="gradient-text">Trusted Institute</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Chattogram Trust PLC & Automation Technology was founded by <strong className="text-ink">{SITE.founder}</strong> with
              a simple belief: technical education must be learned by doing. What began as informal PLC
              sessions for local electricians has grown into a full-fledged institute with a dedicated
              automation lab, 20 practical skill modules and thousands of graduates.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Today our students come from across Bangladesh — diploma holders, engineering graduates,
              working technicians and career changers. They leave with real, demonstrable skills: they can
              wire a panel, program a PLC, commission a VFD, design an HMI screen and troubleshoot a live
              system.
            </p>
            <p className="font-bangla mt-4 rounded-xl border border-glow/25 bg-glow/5 p-4 text-sm font-semibold leading-relaxed text-glow">
              {SITE.slogan2}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {['100% Practical Training', 'Industry-Expert Trainer', 'Job Placement Guidance', 'Lifetime Alumni Support'].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm text-ink/90">
                  <CheckCircle2 size={16} className="shrink-0 text-glow" /> {t}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-4">
            <TechIllustration kind="plc" uid="about-1" className="w-full rounded-2xl border border-line" />
            <TechIllustration kind="scada" uid="about-2" className="mt-8 w-full rounded-2xl border border-line" />
            <TechIllustration kind="vfd" uid="about-3" className="w-full rounded-2xl border border-line" />
            <TechIllustration kind="solar" uid="about-4" className="mt-8 w-full rounded-2xl border border-line" />
          </div>
        </Reveal>
      </section>

      <StatsCounter />

      {/* Mission / Vision / Values */}
      <section className="border-y border-line bg-surface/40 py-10">
        <div className="container-x">
          <SectionHeading eyebrow="মিশন ও ভিশন" title={<>What <span className="gradient-text">Drives Us</span></>} />
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="card card-hover h-full p-7">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-sm border border-line bg-surface2 text-glow">
                    <v.icon size={24} />
                  </div>
                  <h3 className="text-lg font-extrabold text-ink">{v.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <LeadershipCard />
      <ImranInstructorCard />

      {/* Timeline */}
      <section className="border-y border-line bg-surface/40 py-10">
        <div className="container-x">
          <SectionHeading eyebrow="আমাদের যাত্রা" title={<>Our <span className="gradient-text">Journey</span></>} />
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-4 top-0 h-full w-px bg-line sm:left-1/2" />
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.08}>
                <div className={`relative mb-8 flex gap-6 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-10' : 'sm:ml-auto sm:pl-10'}`}>
                  <div className={`absolute left-4 top-1 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-glow bg-base shadow-glow sm:left-auto ${i % 2 === 0 ? 'sm:-right-1.5 sm:translate-x-1/2' : 'sm:-left-1.5 sm:-translate-x-1/2'}`} />
                  <div className="card ml-10 flex-1 p-5 sm:ml-0">
                    <span className="text-xs font-black uppercase tracking-widest text-safety">{t.year}</span>
                    <h3 className="mt-1 text-base font-extrabold text-ink">{t.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="container-x py-10">
        <SectionHeading eyebrow="কেন আমরা" title={<>The Chattogram Trust <span className="gradient-text">Difference</span></>} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Users, title: 'Small Batches', desc: 'Max 20 students per batch so everyone gets individual attention and lab time.' },
            { icon: Award, title: 'Real Projects', desc: 'Every student completes a working automation project — not just theory exams.' },
            { icon: CheckCircle2, title: 'Industry Curriculum', desc: 'Updated regularly based on what factories in Bangladesh actually use.' },
            { icon: Heart, title: 'Student First', desc: 'Flexible batches, installment fees, and lifetime support after graduation.' },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="card card-hover h-full p-6">
                <f.icon size={26} className="mb-3 text-glow" />
                <h3 className="text-base font-extrabold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
