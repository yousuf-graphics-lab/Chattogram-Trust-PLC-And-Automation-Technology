import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  action?: ReactNode;
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'left', action }: Props) {
  return (
    <Reveal>
      <div
        className={`mb-6 flex flex-col gap-3 ${
          align === 'center' ? 'items-center text-center' : 'items-start text-left'
        } ${action ? 'sm:flex-row sm:items-end sm:justify-between' : ''}`}
      >
        <div className="max-w-2xl">
          {eyebrow && <span className="eyebrow mb-1.5">{eyebrow}</span>}
          <h2 className="section-title text-balance">{title}</h2>
          {subtitle && <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </Reveal>
  );
}
