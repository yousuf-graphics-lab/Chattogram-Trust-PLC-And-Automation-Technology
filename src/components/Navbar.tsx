import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Phone, Sun, UserRound, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { SITE } from '@/lib/site';
import { Logo } from './illustrations/Logo';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/skills', label: 'Skills' },
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Products' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/admin', label: 'Admin' },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-base/95 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between gap-3">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="Chattogram Trust PLC — Home">
          <Logo size={38} className="shrink-0" />
          <div className="brand-glow min-w-0 leading-tight">
            <div className="truncate text-[15px] font-extrabold tracking-tight text-ink">
              Chattogram Trust PLC
            </div>
            <div className="truncate text-[8px] font-bold uppercase tracking-[0.2em] text-glow">
              & Automation Technology
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main navigation">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  isActive ? 'bg-electric text-white' : 'text-muted hover:bg-surface2 hover:text-ink'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.phoneTel}
            className="hidden items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-[11px] font-bold text-ink transition-colors hover:border-glow/50 hover:text-glow lg:inline-flex"
          >
            <Phone size={13} className="text-glow" />
            {SITE.phoneDisplay}
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-glow/50 hover:text-glow"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link to="/checkout" className="btn-orange hidden !px-4 !py-2 text-xs sm:inline-flex">
            Enroll Now
          </Link>
          <Link
            to="/admin"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-glow/50 hover:text-glow xl:flex"
            aria-label="Admin portal"
          >
            <UserRound size={16} />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface text-ink xl:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-line bg-surface xl:hidden"
          >
            <nav className="container-x grid gap-1 py-3" aria-label="Mobile navigation">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2.5 text-sm font-semibold ${
                      isActive ? 'bg-electric text-white' : 'text-muted hover:bg-surface2 hover:text-ink'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line pt-3">
                <a href={SITE.phoneTel} className="btn-outline !py-2 text-xs">
                  <Phone size={14} /> Call Now
                </a>
                <Link to="/checkout" className="btn-orange !py-2 text-xs">
                  Enroll Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
