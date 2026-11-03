import { useState } from 'react';
import { Facebook, Mail, MessageCircle, Phone, UserRoundCog } from 'lucide-react';
import { SITE, waLink } from '@/lib/site';
import { Reveal } from './Reveal';

const INSTRUCTOR_PHOTO = '/images/instructors/nezam-uddin.webp';

export function LeadershipCard() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section className="container-x py-6">
      <Reveal>
        <div className="panel grid gap-6 p-6 sm:p-8 lg:grid-cols-[170px_1fr]">
          {/* Instructor portrait */}
          <div className="mx-auto w-full max-w-[140px] sm:max-w-[160px] lg:max-w-none">
            <div className="overflow-hidden rounded-md border border-line bg-surface2/40">
              <div className="aspect-square w-full bg-surface2/30">
                {photoFailed ? (
                  <div className="flex h-full w-full items-center justify-center bg-surface2">
                    <UserRoundCog size={48} className="text-muted" strokeWidth={1.25} />
                  </div>
                ) : (
                  <img
                    src={INSTRUCTOR_PHOTO}
                    alt={`${SITE.founder} — ${SITE.founderRole}`}
                    loading="lazy"
                    onError={() => setPhotoFailed(true)}
                    className="h-full w-full object-cover object-top"
                  />
                )}
              </div>
              <div className="border-t border-line bg-base/60 py-1.5 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                Chief Instructor
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-sm bg-glow/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-glow">
                Leadership Statement
              </span>
              <span className="rounded-sm border border-line bg-surface2 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">
                Experience: 10+ Years
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{SITE.founder}</h2>
            <p className="mt-1 text-sm font-bold text-glow">{SITE.founderRole}</p>
            <p className="font-bangla mt-4 text-sm italic leading-relaxed text-ink/90">
              {SITE.founderQuote} শুধু মুখস্থ করার চাইতে প্রতিটি রিলে, প্রতিটি পিএলসি আই/ও পোর্ট এবং মোটরের বাস্তব সমস্যা হাতে সমাধান করে শেখানো হয়।
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={SITE.phoneTel} className="btn-outline !py-2 text-xs">
                <Phone size={14} className="text-safety" /> {SITE.phoneDisplay}
              </a>
              <a href={`mailto:${SITE.email}`} className="btn-outline !py-2 text-xs">
                <Mail size={14} className="text-glow" /> {SITE.email}
              </a>
              <a href={SITE.facebookProfile} target="_blank" rel="noopener noreferrer" className="btn-outline !py-2 text-xs">
                <Facebook size={14} className="text-electric-400" /> Personal Facebook
              </a>
              <a href={SITE.facebookPage} target="_blank" rel="noopener noreferrer" className="btn-outline !py-2 text-xs">
                <Facebook size={14} className="text-safety" /> Official FB Page
              </a>
              <a
                href={waLink('আসসালামু আলাইকুম স্যার, আমি কোর্স সম্পর্কে কথা বলতে চাই।')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline !py-2 text-xs"
              >
                <MessageCircle size={14} className="text-whatsapp" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
