import { useMemo, useState } from 'react';
import { Filter, MessageCircle, Package, ShieldCheck, Truck } from 'lucide-react';
import { productCategories, products } from '@/data/products';
import { formatTaka, waLink } from '@/lib/site';
import { useSeo } from '@/lib/seo';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { TechIllustration } from '@/components/illustrations/TechIllustration';
import { CtaBanner } from '@/components/CtaBanner';

export default function Products() {
  const [category, setCategory] = useState<string>('All');
  useSeo({
    title: 'Automation Training Kits & Equipment',
    description:
      'Buy PLC trainer kits, VFD motor kits, HMI combo panels, sensor kits, solar PV kits, CCTV kits and professional electrician tools in Bangladesh. Order via WhatsApp.',
    path: '/products',
    keywords: 'PLC trainer kit Bangladesh, VFD training kit, HMI panel, automation equipment Chattogram, solar kit',
  });

  const filtered = useMemo(
    () => (category === 'All' ? products : products.filter((p) => p.category === category)),
    [category]
  );

  return (
    <>
      <PageHero
        eyebrow="অটোমেশন কিট ও ইকুইপমেন্ট"
        title={<>Training Kits & <span className="gradient-text">Equipment</span></>}
        subtitle="Professional-grade training kits and industrial equipment — the same hardware we use in our lab, available for your practice or project."
        breadcrumb={[{ label: 'Products' }]}
      >
        <div className="flex flex-wrap gap-2">
          <span className="chip"><Filter size={12} /> Filter:</span>
          {productCategories.map((c) => (
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
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Package, title: 'Genuine Equipment', desc: 'Original Siemens, Delta & Mitsubishi hardware' },
            { icon: ShieldCheck, title: 'Tested & Warranty', desc: 'Every kit tested before dispatch with support' },
            { icon: Truck, title: 'Nationwide Delivery', desc: 'Courier delivery across all 64 districts' },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-3 rounded-xl border border-line bg-surface/60 p-4">
              <f.icon size={22} className="shrink-0 text-glow" />
              <div>
                <div className="text-sm font-bold text-ink">{f.title}</div>
                <div className="text-xs text-muted">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p, i) => {
            const waText = `আসসালামু আলাইকুম, আমি "${p.name}" (${formatTaka(p.price)}) অর্ডার করতে চাই। বিস্তারিত জানাবেন।`;
            return (
              <Reveal key={p.id} delay={(i % 4) * 0.06}>
                <article className="card card-hover group flex h-full flex-col overflow-hidden">
                  <div className="relative overflow-hidden">
                    <TechIllustration kind={p.illustration} uid={`prod-${p.id}`} className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.04]" />
                    {p.badge && (
                      <span className="absolute left-3 top-3 rounded-full bg-safety px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        {p.badge}
                      </span>
                    )}
                    <span className="absolute right-3 top-3 rounded-full bg-base/80 px-2.5 py-1 text-[10px] font-bold text-glow backdrop-blur">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-sm font-extrabold leading-snug text-ink">{p.name}</h3>
                    <p className="font-bangla text-xs font-semibold text-muted">{p.nameBn}</p>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">{p.description}</p>
                    <ul className="mt-3 space-y-1">
                      {p.specs.slice(0, 3).map((s) => (
                        <li key={s} className="flex items-start gap-1.5 text-[11px] text-muted">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-glow" /> {s}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-1 flex-col justify-end">
                      <div className="mb-3 text-xl font-extrabold text-glow">{formatTaka(p.price)}</div>
                      <a href={waLink(waText)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full !py-2.5 text-xs">
                        <MessageCircle size={14} /> Order via WhatsApp
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
