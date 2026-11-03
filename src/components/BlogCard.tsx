import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react';
import type { BlogPost } from '@/types';
import { formatDate } from '@/lib/site';
import { TechIllustration } from './illustrations/TechIllustration';

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Link to={`/blog/${post.slug}`} className="relative block overflow-hidden border-b border-line">
        <TechIllustration kind={post.poster} uid={`blog-${post.id}`} className="aspect-[16/9] w-full transition-transform duration-500 group-hover:scale-[1.03]" />
        <span className="absolute left-3 top-3 rounded-sm bg-electric px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
          {post.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-3 text-[11px] font-semibold text-muted">
          <span className="inline-flex items-center gap-1"><CalendarDays size={12} className="text-glow" /> {formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1"><Clock3 size={12} className="text-glow" /> {post.readMinutes} min</span>
        </div>
        <Link to={`/blog/${post.slug}`}>
          <h3 className="font-bangla text-sm font-bold leading-snug text-ink transition-colors group-hover:text-glow">
            {post.title}
          </h3>
        </Link>
        <p className="font-bangla mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-muted">{post.excerpt}</p>
        <Link
          to={`/blog/${post.slug}`}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-glow transition-colors hover:text-glow-300"
        >
          পড়ুন / Read Article <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}
