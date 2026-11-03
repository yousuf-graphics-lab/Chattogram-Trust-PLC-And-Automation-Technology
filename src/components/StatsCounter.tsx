import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useData } from '@/context/DataContext';
import { Reveal } from './Reveal';

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

export function StatsCounter() {
  const { content } = useData();
  const stats = [
    { value: content.statPractical, suffix: '%', label: 'Core Lab Workstations', desc: 'প্রত্যেক শিক্ষার্থীর নিজস্ব পিএলসি, মোটর এবং স্টেশনে স্টোরেজ ও প্র্যাকটিক্যাল সুবিধা।' },
    { value: content.statStudents, suffix: '+', label: 'Graduated Engineers', desc: 'দেশের শীর্ষস্থানীয় টেক্সটাইল, সিমেন্ট, পাওয়ার ও ম্যানুফ্যাকচারিং প্ল্যান্টে কর্মরত।' },
    { value: content.statDistricts, suffix: '+', label: 'District Coverage', desc: 'সমগ্র বাংলাদেশ থেকে শিক্ষার্থীরা এসে অটোমেশন ল্যাবে হাতে-কলমে প্রশিক্ষণ নিয়েছেন।' },
    { value: content.statModules, suffix: '+', label: 'Curriculum Topics', desc: 'হাউজ ওয়্যারিং থেকে শুরু করে অ্যাডভান্সড স্কাডা ও সোলার সিস্টেমের স্বয়ংসম্পূর্ণ সিলেবাস।' },
  ];

  return (
    <section className="container-x py-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div className="card h-full p-5">
              <div className="stat-label mb-2">{s.label}</div>
              <div className="text-3xl font-extrabold tracking-tight text-ink">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <p className="font-bangla mt-2 text-xs leading-relaxed text-muted">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
