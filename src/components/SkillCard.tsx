import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { Skill } from '@/types';
import { Icon } from './Icon';

export function SkillCard({ skill, detailed = false }: { skill: Skill; detailed?: boolean }) {
  return (
    <article className="card card-hover group relative h-full overflow-hidden p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-line bg-surface2 text-glow">
          <Icon name={skill.icon} size={18} />
        </div>
        <span className="text-xs font-extrabold text-glow">{String(skill.id).padStart(2, '0')}</span>
      </div>
      <h3 className="text-sm font-extrabold leading-snug text-ink">{skill.title}</h3>
      <p className="font-bangla mt-0.5 text-xs font-semibold text-muted">{skill.titleBn}</p>
      {detailed && (
        <>
          <p className="mt-2 text-xs leading-relaxed text-muted">{skill.description}</p>
          <ul className="mt-3 space-y-1.5">
            {skill.topics.map((t) => (
              <li key={t} className="flex items-start gap-1.5 text-xs text-muted">
                <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-glow" />
                {t}
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
        <span className="chip !py-0.5 text-[10px]">{skill.category}</span>
        {skill.courseSlug && (
          <Link
            to={`/courses/${skill.courseSlug}`}
            className="inline-flex items-center gap-0.5 text-[11px] font-bold text-glow transition-colors hover:text-glow-300"
          >
            Course <ArrowUpRight size={12} />
          </Link>
        )}
      </div>
    </article>
  );
}
