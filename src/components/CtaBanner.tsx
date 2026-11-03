import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Zap } from 'lucide-react';
import { SITE, WA_INQUIRY_BN, waLink } from '@/lib/site';
import { Reveal } from './Reveal';

export function CtaBanner() {
  return (
    <section className="container-x py-12">
      <Reveal>
        <div className="panel flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow mb-2">Admission Open • Limited Seats</span>
            <h2 className="font-bangla text-2xl font-extrabold text-ink">
              আপনার স্মার্ট ক্যারিয়ার শুরু হোক আজই!
            </h2>
            <p className="font-bangla mt-2 text-sm leading-relaxed text-muted">{SITE.slogan2}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
            <Link to="/checkout" className="btn-orange">
              <Zap size={16} /> Enroll via bKash
            </Link>
            <a href={waLink(WA_INQUIRY_BN)} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <MessageCircle size={16} className="text-whatsapp" /> WhatsApp
            </a>
            <a href={SITE.phoneTel} className="btn-ghost">
              <Phone size={16} className="text-glow" /> Call
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
