import { Link } from 'react-router-dom';
import { Bell, CalendarDays, Pin } from 'lucide-react';
import type { Notice } from '@/types';
import { formatDate } from '@/lib/site';

const categoryColor: Record<Notice['category'], string> = {
  Admission: 'bg-safety/15 text-safety border-safety/30',
  Exam: 'bg-electric/15 text-electric-400 border-electric/30',
  Holiday: 'bg-muted/15 text-muted border-line',
  Event: 'bg-glow/15 text-glow border-glow/30',
  General: 'bg-surface2 text-muted border-line',
};

export function NoticeRow({ notice }: { notice: Notice }) {
  return (
    <div className="group flex gap-4 rounded-xl border border-line bg-surface/60 p-4 transition-all hover:border-glow/40 hover:bg-surface">
      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-sm border border-line bg-surface2 text-center">
        <span className="text-base font-extrabold leading-none text-glow">
          {new Date(notice.date).getDate()}
        </span>
        <span className="text-[9px] font-bold uppercase text-muted">
          {new Date(notice.date).toLocaleDateString('en-US', { month: 'short' })}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${categoryColor[notice.category]}`}>
            {notice.category}
          </span>
          {notice.pinned && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-safety">
              <Pin size={11} /> Pinned
            </span>
          )}
        </div>
        <h4 className="font-bangla mt-1.5 text-sm font-bold leading-snug text-ink group-hover:text-glow">
          {notice.title}
        </h4>
        <p className="font-bangla mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{notice.body}</p>
      </div>
    </div>
  );
}

export function NoticeBoard({ notices, limit = 3 }: { notices: Notice[]; limit?: number }) {
  const sorted = [...notices]
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.date.localeCompare(a.date))
    .slice(0, limit);
  return (
    <div className="space-y-3">
      {sorted.map((n) => (
        <NoticeRow key={n.id} notice={n} />
      ))}
      <Link to="/notices" className="btn-outline w-full !py-2.5 text-xs">
        <Bell size={14} /> View All Notices
      </Link>
    </div>
  );
}

export function NoticeMeta({ notice }: { notice: Notice }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-muted">
      <CalendarDays size={12} /> {formatDate(notice.date)}
    </span>
  );
}
