import { Phone } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { SITE } from '@/lib/site';

export function AnnouncementBar() {
  const { content } = useData();
  const text = content.announcement;
  const strip = (
    <>
      <span className="font-bangla mx-8 whitespace-nowrap text-muted">{text}</span>
      <span className="mx-8 whitespace-nowrap text-glow">
        PLC • SCADA • Industrial Automation • HMI Programming & VFD Commissioning
      </span>
      <a href={SITE.phoneTel} className="mx-8 inline-flex items-center gap-1.5 whitespace-nowrap font-bold text-ink hover:text-glow">
        <Phone size={12} className="text-glow" /> {SITE.phoneDisplay}
      </a>
    </>
  );
  return (
    <div className="relative z-30 flex items-stretch overflow-hidden border-b border-line bg-surface">
      <div className="z-10 flex shrink-0 items-center bg-safety px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
        <span className="font-bangla">ভর্তি চলছে</span>
        <span className="mx-1.5 opacity-70">•</span> LIVE
      </div>
      <div className="relative flex-1 overflow-hidden py-1.5 text-xs">
        <div className="marquee-track items-center">
          <div className="flex shrink-0 items-center">{strip}</div>
          <div className="flex shrink-0 items-center" aria-hidden="true">{strip}</div>
        </div>
      </div>
    </div>
  );
}
