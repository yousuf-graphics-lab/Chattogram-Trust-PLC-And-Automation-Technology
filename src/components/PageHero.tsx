import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Reveal } from './Reveal';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumb?: { label: string; to?: string }[];
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, subtitle, breadcrumb, children }: Props) {
  return (
    <section className="container-x pt-6">
      <Reveal>
        <div className="panel relative overflow-hidden p-6 sm:p-8">
          {breadcrumb && (
            <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-[11px] text-muted" aria-label="Breadcrumb">
              <Link to="/" className="transition-colors hover:text-glow">Home</Link>
              {breadcrumb.map((b, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <ChevronRight size={12} />
                  {b.to ? (
                    <Link to={b.to} className="transition-colors hover:text-glow">{b.label}</Link>
                  ) : (
                    <span className="font-semibold text-glow">{b.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          {eyebrow && <span className="eyebrow mb-2">{eyebrow}</span>}
          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{subtitle}</p>
          )}
          {children && <div className="mt-5">{children}</div>}
        </div>
      </Reveal>
    </section>
  );
}
