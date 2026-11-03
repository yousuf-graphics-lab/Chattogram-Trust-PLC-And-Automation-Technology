import { Link } from 'react-router-dom';
import { ArrowRight, Facebook, Mail, MapPin, MessageCircle, Phone, Share2, Sparkles } from 'lucide-react';
import { DEVELOPER, SITE, devWaLink } from '@/lib/site';
import { Logo } from './illustrations/Logo';

const curriculum = [
  { to: '/courses/industrial-automation-plc', label: 'PLC & HMI Programming' },
  { to: '/courses/advance-automation-plc-vfd-hmi', label: 'SCADA & Industrial IoT' },
  { to: '/courses/advance-automation-plc-vfd-hmi', label: 'VFD & Servo Drive Systems' },
  { to: '/courses/electrical-autocad', label: 'Industrial Circuit Design' },
  { to: '/skills', label: 'Microcontroller & Embedded' },
];

const company = [
  { to: '/about', label: 'About Organization' },
  { to: '/services', label: 'Engineering Services' },
  { to: '/products', label: 'Industrial Products' },
  { to: '/gallery', label: 'Laboratory Gallery' },
  { to: '/admin', label: 'Portal: /admin' },
];

export function Footer() {
  return (
    <footer className="mt-6 border-t border-line bg-surface">
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo size={40} />
            <div className="brand-glow leading-tight">
              <div className="text-base font-extrabold text-ink">Chattogram Trust</div>
              <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-glow">
                PLC & Automation Technology
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Industrial Automation, PLC Programming, SCADA Systems, Electrical Technology and Heavy
            Machinery Engineering Solutions Center.
          </p>
          <div className="mt-4 flex gap-2">
            <a href={SITE.facebookProfile} target="_blank" rel="noopener noreferrer" aria-label="Share / Facebook profile" className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-surface2 text-muted hover:text-glow">
              <Share2 size={14} />
            </a>
            <a href={SITE.facebookPage} target="_blank" rel="noopener noreferrer" aria-label="Facebook page" className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-surface2 text-muted hover:text-glow">
              <Facebook size={14} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-ink">Core Curriculum</h3>
          <ul className="space-y-2.5">
            {curriculum.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-xs text-muted transition-colors hover:text-glow">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-ink">Company Links</h3>
          <ul className="space-y-2.5">
            {company.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className={`text-xs transition-colors hover:text-glow ${l.to === '/admin' ? 'text-glow' : 'text-muted'}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-ink">Contact HQ</h3>
          <ul className="space-y-3 text-xs text-muted">
            <li className="flex gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0 text-glow" />
              <span>{SITE.address}</span>
            </li>
            <li>
              <a href={SITE.phoneTel} className="flex items-center gap-2 hover:text-glow">
                <Phone size={14} className="shrink-0 text-glow" /> {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 break-all hover:text-glow">
                <Mail size={14} className="shrink-0 text-glow" /> {SITE.email}
              </a>
            </li>
          </ul>
          <a href={SITE.phoneTel} className="mt-4 block rounded-sm border border-line bg-base/60 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted hover:text-glow">
            Direct Tel: <span className="text-ink">+8801646241953</span>
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-4 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] text-muted">{SITE.copyright}</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Systems Active • SCADA Online
          </p>
        </div>
      </div>

      {/* Developer credit + hire CTA */}
      <div className="border-t border-line bg-base/40">
        <div className="container-x flex flex-col items-center gap-2.5 py-4 text-center">
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-[12px] leading-relaxed text-muted">
            <Sparkles size={13} className="shrink-0 text-safety" />
            <span className="font-bangla font-semibold text-ink">এই ধরনের প্রফেশনাল ওয়েবসাইট বানাতে চান?</span>
            <span>Want a website like this? Let&rsquo;s build it together &mdash;</span>
            <a
              href={devWaLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Yousuf Hossain on WhatsApp"
              title="Contact on WhatsApp"
              className="inline-flex items-center gap-1 rounded-full border border-whatsapp/40 bg-whatsapp/10 px-3 py-1 text-[11px] font-bold text-whatsapp transition-colors hover:bg-whatsapp/20"
            >
              <MessageCircle size={12} /> Contact me <ArrowRight size={12} />
            </a>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
          <span className="text-[11px] text-muted">Created by</span>
          <a
            href={DEVELOPER.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-extrabold text-glow underline-offset-4 transition-colors hover:text-glow-300 hover:underline"
          >
            Yousuf Hossain
          </a>
          {/* Facebook sign beside the name */}
          <a
            href={DEVELOPER.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Yousuf Hossain on Facebook"
            title="Follow on Facebook"
            className="fb-sign ml-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#1877F2] text-white transition-transform duration-200 hover:scale-110"
          >
            <Facebook size={11} />
          </a>
          <span className="love-glow text-sm" role="img" aria-label="love">
            ❤️
          </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
