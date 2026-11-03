import { ArrowRight, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { services, serviceProcess } from '@/data/services';
import { SITE, waLink } from '@/lib/site';
import { useSeo } from '@/lib/seo';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { Icon } from '@/components/Icon';
import { CtaBanner } from '@/components/CtaBanner';

export default function Services() {
  useSeo({
    title: 'Industrial Automation Services & Consultancy',
    description:
      'PLC programming, control panel design, SCADA/HMI integration, VFD solutions, sub-station works, solar EPC, CCTV systems and corporate training in Chattogram, Bangladesh.',
    path: '/services',
    keywords: 'PLC programming service Bangladesh, control panel design Chattogram, SCADA integration, automation consultancy',
  });

  return (
    <>
      <PageHero
        eyebrow="ইন্ডাস্ট্রিয়াল সার্ভিস ও কনসালটেন্সি"
        title={<>Industrial <span className="gradient-text">Services</span> & Consultancy</>}
        subtitle="From a single VFD retrofit to a complete plant automation project — our engineering team delivers design, programming, commissioning and support."
        breadcrumb={[{ label: 'Services' }]}
      >
        <div className="flex flex-wrap gap-3">
          <a href={waLink('আসসালামু আলাইকুম, আমি ইন্ডাস্ট্রিয়াল সার্ভিস সম্পর্কে জানতে চাই।')} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <MessageCircle size={16} /> Request a Quote
          </a>
          <a href={SITE.phoneTel} className="btn-outline">
            <Phone size={16} /> {SITE.phoneDisplay}
          </a>
        </div>
      </PageHero>

      <section className="container-x py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) * 0.07}>
              <article className="card card-hover group h-full p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-sm border border-line bg-surface2 text-glow">
                  <Icon name={s.icon} size={24} />
                </div>
                <h3 className="text-base font-extrabold text-ink">{s.title}</h3>
                <p className="font-bangla text-xs font-semibold text-glow/80">{s.titleBn}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-xs text-muted">
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-glow" /> {f}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-line bg-surface/40 py-10">
        <div className="container-x">
          <SectionHeading
            eyebrow="কীভাবে কাজ করি"
            title={<>Our <span className="gradient-text">Process</span></>}
            subtitle="A transparent, four-step engineering workflow from survey to support."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceProcess.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.1}>
                <div className="relative h-full rounded-2xl border border-line bg-surface p-6">
                  <div className="mb-4 text-5xl font-black text-glow/15">{p.step}</div>
                  <h3 className="text-lg font-extrabold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                  {i < serviceProcess.length - 1 && (
                    <ArrowRight size={20} className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-glow/40 lg:block" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
