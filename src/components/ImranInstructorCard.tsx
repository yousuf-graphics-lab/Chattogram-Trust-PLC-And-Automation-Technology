import { useState } from 'react';
import { BadgeCheck, Briefcase, GraduationCap, MessageCircle, Phone, UserRoundCog } from 'lucide-react';
import { Reveal } from './Reveal';

const PHOTO = '/images/instructors/imran-khan-evan.webp';
const PHONE_DISPLAY = '+880 1834-678878';
const PHONE_TEL = 'tel:+8801834678878';
const WA =
  'https://wa.me/8801834678878?text=' +
  encodeURIComponent('আসসালামু আলাইকুম স্যার, আমি কোর্স সম্পর্কে কথা বলতে চাই।');

export function ImranInstructorCard() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section className="container-x pb-6">
      <Reveal>
        <div className="panel grid gap-6 p-6 sm:p-8 lg:grid-cols-[170px_1fr]">
          {/* Portrait */}
          <div className="mx-auto w-full max-w-[140px] sm:max-w-[160px] lg:max-w-none">
            <div className="overflow-hidden rounded-md border border-line bg-surface2/40">
              <div className="aspect-square w-full bg-surface2/30">
                {photoFailed ? (
                  <div className="flex h-full w-full items-center justify-center bg-surface2">
                    <UserRoundCog size={48} className="text-muted" strokeWidth={1.25} />
                  </div>
                ) : (
                  <img
                    src={PHOTO}
                    alt="Md. Imran Khan Evan — Chief Instructor & Trainer (Electrical)"
                    loading="lazy"
                    onError={() => setPhotoFailed(true)}
                    className="h-full w-full object-cover object-top"
                  />
                )}
              </div>
              <div className="border-t border-line bg-base/60 py-1.5 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                Instructor & Trainer
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-sm bg-glow/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-glow">
                Instructor & Trainer
              </span>
              <span className="rounded-sm border border-line bg-surface2 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">
                Automation Engineer
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Md. Imran Khan Evan</h2>
            <p className="mt-1 text-sm font-bold text-glow">Chief Instructor & Trainer (Electrical)</p>
            <p className="mt-0.5 text-xs text-muted">Chattogram Trust PLC Automation Technology</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-line bg-surface2/40 p-3.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                  <GraduationCap size={13} className="text-glow" /> Qualifications
                </div>
                <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-ink">
                  <li>BSc in EEE (IEB)</li>
                  <li>Diploma in Electrical Engineering (CPI)</li>
                </ul>
              </div>
              <div className="rounded-md border border-line bg-surface2/40 p-3.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                  <Briefcase size={13} className="text-glow" /> Roles & Licenses
                </div>
                <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-ink">
                  <li>Owner & CEO, Trust Tech BD</li>
                  <li>Consultant of CPAS</li>
                  <li className="flex items-start gap-1.5">
                    <BadgeCheck size={13} className="mt-0.5 shrink-0 text-safety" />
                    <span>ABC License Holder — Bangladesh Electricity License Board, Dhaka</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <a href={PHONE_TEL} className="btn-outline !py-2 text-xs">
                <Phone size={14} className="text-safety" /> {PHONE_DISPLAY}
              </a>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-outline !py-2 text-xs">
                <MessageCircle size={14} className="text-whatsapp" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
