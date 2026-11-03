import {
  Award, BadgeCheck, Boxes, Building2, CheckCircle2, Cog, Droplets, Factory,
  Flame, GraduationCap, MessageCircle, Pill, Shirt, Sun, Users, UtensilsCrossed,
  Warehouse, Wrench, Zap,
} from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const DIFFERENTIATORS = [
  {
    icon: Wrench,
    title: '100% Hands-On Hardware Lab',
    desc: 'Individual PLC workstations, VFD–motor rigs, HMI panels and process simulators — you learn on real industrial hardware, not just software.',
  },
  {
    icon: Award,
    title: 'Industry-Expert Trainer',
    desc: 'Learn directly from Nezam Uddin, an active automation professional with 10+ years of real field and commissioning experience.',
  },
  {
    icon: CheckCircle2,
    title: 'Project-Based Learning',
    desc: 'Every student builds, wires and commissions a working automation project before completing the course — a portfolio you can show employers.',
  },
  {
    icon: GraduationCap,
    title: 'Job-Ready Curriculum',
    desc: 'Skills mapped to what factories actually hire for: PLC, SCADA, VFD, HMI, AutoCAD, sub-station, CCTV and solar PV.',
  },
  {
    icon: Users,
    title: 'Small Batches, Personal Care',
    desc: 'Limited seats per batch mean guaranteed lab time and one-to-one guidance for every student, in বাংলা + English.',
  },
  {
    icon: MessageCircle,
    title: 'Lifetime Support & Referrals',
    desc: 'Post-course WhatsApp support, job referrals and access to our alumni network — we stay with you after graduation.',
  },
];

const INDUSTRIES = [
  { icon: Shirt, label: 'Garments & Textile' },
  { icon: UtensilsCrossed, label: 'Food & Beverage' },
  { icon: Pill, label: 'Pharmaceutical' },
  { icon: Zap, label: 'Power & Energy' },
  { icon: Flame, label: 'Oil & Gas' },
  { icon: Factory, label: 'Cement' },
  { icon: Cog, label: 'Steel & Re-rolling' },
  { icon: Droplets, label: 'Water & Wastewater' },
  { icon: Boxes, label: 'General Manufacturing' },
  { icon: Building2, label: 'Building Automation' },
  { icon: Sun, label: 'Solar & Renewable' },
  { icon: Warehouse, label: 'Logistics & Packaging' },
];

/**
 * Industry-focused "Why Choose Us" section. Reused on Home, Courses and
 * Course Details so visitors immediately see the value and the breadth of
 * industries the training applies to.
 */
export function WhyChooseUs() {
  return (
    <section className="container-x py-10">
      <SectionHeading
        eyebrow="কেন আমরা আলাদা"
        title={<>Why Choose <span className="gradient-text">Chattogram Trust</span></>}
        subtitle="Practical, industry-aligned automation training that turns beginners into job-ready technicians — and gives working engineers an edge."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DIFFERENTIATORS.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 0.06}>
            <div className="card card-hover h-full p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-glow/10 text-glow">
                <f.icon size={20} />
              </div>
              <h3 className="text-sm font-extrabold text-ink">{f.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Industries served */}
      <Reveal delay={0.1}>
        <div className="panel mt-6 p-6 sm:p-7">
          <div className="mb-1 flex items-center gap-2">
            <BadgeCheck size={16} className="text-safety" />
            <span className="eyebrow">One Skillset, Many Industries</span>
          </div>
          <h3 className="text-lg font-extrabold text-ink sm:text-xl">
            Our graduates work across Bangladesh's leading sectors
          </h3>
          <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted">
            Automation is everywhere. The PLC, VFD, HMI and SCADA skills you master here are the same
            skills demanded across dozens of industries — locally and abroad.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.label}
                className="flex items-center gap-2 rounded-md border border-line bg-surface2/50 px-3 py-2.5 transition-colors hover:border-glow/40"
              >
                <ind.icon size={16} className="shrink-0 text-glow" />
                <span className="text-[11px] font-semibold leading-tight text-ink">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
