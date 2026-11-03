import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Clock3, Facebook, Share2, Tag, User } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { formatDate, SITE, waLink } from '@/lib/site';
import { useSeo } from '@/lib/seo';
import { TechIllustration } from '@/components/illustrations/TechIllustration';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { BlogCard } from '@/components/BlogCard';
import { SectionHeading } from '@/components/SectionHeading';
import { CtaBanner } from '@/components/CtaBanner';
import NotFound from './NotFound';

export default function BlogPost() {
  const { slug } = useParams();
  const { posts } = useData();
  const post = posts.find((p) => p.slug === slug);

  useSeo({
    title: post?.title ?? 'Article',
    description: post?.excerpt ?? 'Technical article',
    path: `/blog/${slug ?? ''}`,
    jsonLd: post
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          datePublished: post.date,
          author: { '@type': 'Person', name: post.author },
          publisher: { '@type': 'Organization', name: SITE.name },
        }
      : undefined,
  });

  if (!post) return <NotFound />;

  const related = posts.filter((p) => p.id !== post.id).slice(0, 3);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const paragraphs = post.content.split('\n\n');

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={<span className="font-bangla">{post.title}</span>}
        breadcrumb={[{ label: 'Blog', to: '/blog' }, { label: post.category }]}
      >
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted">
          <span className="inline-flex items-center gap-1.5"><User size={13} className="text-glow" /> {post.author}</span>
          <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} className="text-glow" /> {formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1.5"><Clock3 size={13} className="text-glow" /> {post.readMinutes} min read</span>
        </div>
      </PageHero>

      <article className="container-x grid gap-10 py-10 lg:grid-cols-[1fr_300px]">
        <div>
          <Reveal>
            <TechIllustration kind={post.poster} uid={`post-${post.id}`} className="mb-8 w-full rounded-2xl border border-line" />
          </Reveal>
          <Reveal>
            <div className="font-bangla space-y-5 text-[15px] leading-[1.9] text-ink/90">
              {paragraphs.map((p, i) => {
                // Short standalone lines act as sub-headings
                if (p.length < 60 && !p.includes('।') && i > 0) {
                  return <h2 key={i} className="pt-2 text-xl font-extrabold text-glow">{p}</h2>;
                }
                return <p key={i}>{p}</p>;
              })}
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-line pt-6">
              <Tag size={15} className="text-glow" />
              {post.tags.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-ink"><Share2 size={16} className="text-glow" /> Share:</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="btn-outline !px-4 !py-2 text-xs"
              >
                <Facebook size={14} className="text-electric-400" /> Facebook
              </a>
              <a
                href={waLink(`"${post.title}" — পড়ুন: ${shareUrl}`)}
                target="_blank" rel="noopener noreferrer"
                className="btn-whatsapp !px-4 !py-2 text-xs"
              >
                WhatsApp
              </a>
              <Link to="/blog" className="btn-ghost !px-4 !py-2 text-xs">
                <ArrowLeft size={14} /> All Articles
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <div className="card p-6">
              <div className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">Written by</div>
              <div className="text-lg font-extrabold text-ink">{post.author}</div>
              <div className="font-bangla text-sm font-semibold text-glow">{SITE.founderBn}</div>
              <div className="mt-1 text-xs text-muted">{SITE.founderRole}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Hands-on automation trainer specializing in PLC, SCADA, VFD & HMI systems.
              </p>
              <a href={waLink('আসসালামু আলাইকুম স্যার, আপনার আর্টিকেল পড়ে প্রশ্ন আছে।')} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-4 w-full !py-2.5 text-xs">
                Ask the Trainer
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card overflow-hidden">
              <div className="bg-bkash p-5 text-white">
                <div className="text-sm font-extrabold">ভর্তি চলছে!</div>
                <div className="font-bangla mt-1 text-xs text-white/85">হাতে-কলমে শিখুন, ক্যারিয়ার গড়ুন।</div>
              </div>
              <div className="p-5">
                <Link to="/courses" className="btn-primary w-full !py-2.5 text-xs">View Courses & Fees</Link>
                <Link to="/checkout" className="btn-bkash mt-2 w-full !py-2.5 text-xs">Enroll via bKash</Link>
              </div>
            </div>
          </Reveal>
        </aside>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line bg-surface/40 py-10">
          <div className="container-x">
            <SectionHeading eyebrow="আরও পড়ুন" title={<>Related <span className="gradient-text">Articles</span></>} />
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.08}>
                  <BlogCard post={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
