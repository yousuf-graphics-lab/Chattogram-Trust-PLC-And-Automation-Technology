import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, ExternalLink, Film, Image as ImageIcon, Play, X } from 'lucide-react';
import type { GalleryItem } from '@/types';
import { galleryCategories } from '@/data/gallery';
import { useData } from '@/context/DataContext';
import { formatDate } from '@/lib/site';
import { useSeo } from '@/lib/seo';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { TechIllustration } from '@/components/illustrations/TechIllustration';
import { CtaBanner } from '@/components/CtaBanner';

export default function Gallery() {
  const { gallery } = useData();
  const [category, setCategory] = useState('All');
  const [type, setType] = useState<'all' | 'photo' | 'video'>('all');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useSeo({
    title: 'Lab Gallery — Photos & Video Tutorials',
    description:
      'Explore our automation lab: PLC panels, VFD stations, HMI workstations, training sessions and video tutorials from Chattogram Trust PLC & Automation Technology.',
    path: '/gallery',
  });

  const filtered = useMemo(
    () =>
      gallery.filter(
        (g) =>
          (category === 'All' || g.category === category) &&
          (type === 'all' || g.type === type)
      ),
    [gallery, category, type]
  );

  return (
    <>
      <PageHero
        eyebrow="ল্যাব গ্যালারি"
        title={<>Photo & Video <span className="gradient-text">Gallery</span></>}
        subtitle="A look inside our hands-on lab — real equipment, real training, real results."
        breadcrumb={[{ label: 'Gallery' }]}
      >
        <div className="flex flex-wrap items-center gap-2">
          {(['all', 'photo', 'video'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`inline-flex items-center gap-1.5 rounded-md px-4 py-1.5 text-xs font-bold capitalize transition-all ${
                type === t ? 'bg-electric text-white' : 'border border-line bg-surface text-muted hover:text-glow'
              }`}
            >
              {t === 'photo' ? <ImageIcon size={13} /> : t === 'video' ? <Film size={13} /> : null}
              {t === 'all' ? 'All Media' : `${t}s`}
            </button>
          ))}
          <span className="mx-1 h-5 w-px bg-line" />
          {galleryCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition-all ${
                category === c ? 'bg-glow/15 text-glow border border-glow/40' : 'border border-line bg-surface text-muted hover:text-glow'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="container-x py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((g, i) => (
            <Reveal key={g.id} delay={(i % 3) * 0.06}>
              <button
                type="button"
                onClick={() => setLightbox(g)}
                className="card card-hover group block w-full overflow-hidden text-left"
              >
                <div className="relative overflow-hidden">
                  {g.src ? (
                    <img src={g.src} alt={g.title} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <TechIllustration kind={g.scene ?? 'plc'} uid={`gal-${g.id}`} className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-105" />
                  )}
                  {g.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-base/30">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-safety text-white shadow-glow-orange transition-transform group-hover:scale-110">
                        <Play size={24} className="ml-0.5" />
                      </span>
                    </div>
                  )}
                  <span className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white ${g.type === 'video' ? 'bg-safety' : 'bg-electric'}`}>
                    {g.type}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bangla line-clamp-2 text-sm font-bold text-ink group-hover:text-glow">{g.title}</h3>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-muted">
                    <span className="chip !py-0.5 text-[10px]">{g.category}</span>
                    <span className="inline-flex items-center gap-1"><CalendarDays size={11} /> {formatDate(g.date)}</span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-10 text-center text-muted">No media found for this filter.</p>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-base/90 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="glass-strong relative w-full max-w-3xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-base/70 text-ink backdrop-blur transition-colors hover:bg-safety hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              {lightbox.src ? (
                <img src={lightbox.src} alt={lightbox.title} className="max-h-[70vh] w-full object-contain" />
              ) : lightbox.link ? (
                <div className="relative">
                  <TechIllustration kind={lightbox.scene ?? 'plc'} uid="lightbox" className="w-full" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950/75 p-6 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-safety text-white shadow-glow-orange">
                      <Play size={28} className="ml-1" />
                    </span>
                    <p className="font-bangla max-w-md text-sm text-white">
                      এই ভিডিওটি আমাদের ফেসবুক পেজে দেখুন। নিচের বাটনে ক্লিক করুন।
                    </p>
                    <a href={lightbox.link} target="_blank" rel="noopener noreferrer" className="btn-orange">
                      <ExternalLink size={16} /> Watch on Facebook
                    </a>
                  </div>
                </div>
              ) : (
                <TechIllustration kind={lightbox.scene ?? 'plc'} uid="lightbox" className="w-full" />
              )}
              <div className="p-5">
                <h3 className="font-bangla text-lg font-bold text-ink">{lightbox.title}</h3>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted">
                  <span className="chip">{lightbox.category}</span>
                  <span className="inline-flex items-center gap-1"><CalendarDays size={12} /> {formatDate(lightbox.date)}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CtaBanner />
    </>
  );
}
