import { useMemo, useState } from 'react';
import { Newspaper, Search } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useSeo } from '@/lib/seo';
import { PageHero } from '@/components/PageHero';
import { BlogCard } from '@/components/BlogCard';
import { Reveal } from '@/components/Reveal';
import { CtaBanner } from '@/components/CtaBanner';

export default function Blog() {
  const { posts } = useData();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  useSeo({
    title: 'Tech Blog — PLC, SCADA, VFD, Solar & Career Articles',
    description:
      'Bangla technical articles on PLC programming, VFD vs soft starter, SCADA & HMI, solar net metering, electrical safety and automation careers in Bangladesh.',
    path: '/blog',
    keywords: 'PLC blog Bangla, automation articles Bangladesh, SCADA tutorial, solar net metering, electrical safety',
  });

  const categories = useMemo(() => ['All', ...Array.from(new Set(posts.map((p) => p.category)))], [posts]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts
      .filter((p) => category === 'All' || p.category === category)
      .filter((p) => !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [posts, query, category]);

  return (
    <>
      <PageHero
        eyebrow="টেকনিক্যাল ব্লগ ও আর্টিকেল"
        title={<>Tech <span className="gradient-text">Blog</span></>}
        subtitle="Practical Bangla articles on automation, electrical design, safety and careers — written by our head trainer."
        breadcrumb={[{ label: 'Blog' }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              className="input !pl-10"
              placeholder="Search articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search articles"
            />
          </div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`shrink-0 rounded-md px-4 py-1.5 text-xs font-bold transition-all ${
                  category === c ? 'bg-electric text-white' : 'border border-line bg-surface text-muted hover:text-glow'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </PageHero>

      <section className="container-x py-10">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted">
          <Newspaper size={16} className="text-glow" />
          <span className="font-bold text-ink">{filtered.length}</span> article{filtered.length !== 1 ? 's' : ''}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.07}>
              <BlogCard post={p} />
            </Reveal>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-10 text-center text-muted">No articles match your search.</p>
        )}
      </section>

      <CtaBanner />
    </>
  );
}
