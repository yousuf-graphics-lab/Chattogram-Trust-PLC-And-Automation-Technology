import { useState, type FormEvent } from 'react';
import { Clock, Facebook, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { SITE, WA_INQUIRY_BN, waLink } from '@/lib/site';
import { useSeo } from '@/lib/seo';
import { addMessage } from '@/lib/storage';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { CtaBanner } from '@/components/CtaBanner';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: 'Course Inquiry', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useSeo({
    title: 'Contact & Location — GEC, Chattogram',
    description:
      `Contact Chattogram Trust PLC & Automation Technology: ${SITE.phoneDisplay}, ${SITE.email}. Visit us at O.R Nizam Road, Nurbag Abasik, Nahar Villa 1st floor, GEC, Chattogram.`,
    path: '/contact',
    keywords: 'contact Chattogram Trust PLC, GEC Chattogram training institute, PLC course admission phone',
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError('Please fill in your name, phone number and message.');
      return;
    }
    if (!/^(\+?880|0)?1[3-9]\d{8}$/.test(form.phone.replace(/[\s-]/g, ''))) {
      setError('Please enter a valid Bangladeshi mobile number (e.g. 01712345678).');
      return;
    }
    addMessage({ ...form, email: form.email || undefined });
    setSent(true);
    setForm({ name: '', phone: '', email: '', subject: 'Course Inquiry', message: '' });
  };

  const contactCards = [
    { icon: Phone, title: 'Phone / Hotline', value: SITE.phoneDisplay, href: SITE.phoneTel, color: 'text-glow' },
    { icon: MessageCircle, title: 'WhatsApp', value: SITE.phoneDisplay, href: waLink(WA_INQUIRY_BN), color: 'text-whatsapp' },
    { icon: Mail, title: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, color: 'text-electric-400' },
    { icon: MapPin, title: 'Address', value: SITE.address, href: SITE.mapsLink, color: 'text-safety' },
  ];

  return (
    <>
      <PageHero
        eyebrow="যোগাযোগ ও লোকেশন"
        title={<>Get in <span className="gradient-text">Touch</span></>}
        subtitle="Questions about courses, fees or admission? Call, WhatsApp or visit our lab at GEC, Chattogram — we're happy to help."
        breadcrumb={[{ label: 'Contact' }]}
      />

      <section className="container-x py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.07}>
              <a
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="card card-hover block h-full p-6"
              >
                <c.icon size={26} className={`mb-3 ${c.color}`} />
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-muted">{c.title}</h3>
                <p className="mt-1.5 text-sm font-semibold leading-relaxed text-ink">{c.value}</p>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Form */}
          <Reveal>
            <div className="card p-6 sm:p-8">
              <h2 className="text-2xl font-extrabold text-ink">Send a Message</h2>
              <p className="mt-1 text-sm text-muted">
                Fill the form and we'll get back to you. For instant response, use WhatsApp.
              </p>
              {sent ? (
                <div className="mt-6 rounded-xl border border-green-500/30 bg-green-500/10 p-6 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                    <Send size={22} />
                  </div>
                  <h3 className="text-lg font-extrabold text-ink">Message Saved!</h3>
                  <p className="font-bangla mt-2 text-sm text-muted">
                    আপনার মেসেজ সেভ হয়েছে। দ্রুত উত্তরের জন্য WhatsApp-এ পাঠান।
                  </p>
                  <a
                    href={waLink(`আসসালামু আলাইকুম, আমি ওয়েবসাইট থেকে মেসেজ করেছি। বিষয়: ${form.subject || 'Inquiry'}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp mt-4"
                  >
                    <MessageCircle size={16} /> Send via WhatsApp too
                  </a>
                  <button type="button" onClick={() => setSent(false)} className="btn-ghost mt-2 text-xs">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label" htmlFor="c-name">Your Name *</label>
                      <input id="c-name" className="input" placeholder="e.g. Rahim Ahmed" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="label" htmlFor="c-phone">Mobile Number *</label>
                      <input id="c-phone" className="input" placeholder="01712345678" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label" htmlFor="c-email">Email (optional)</label>
                      <input id="c-email" type="email" className="input" placeholder="you@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="label" htmlFor="c-subject">Subject</label>
                      <select id="c-subject" className="input" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                        {['Course Inquiry', 'Admission', 'Industrial Service', 'Product Order', 'Corporate Training', 'Other'].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="label" htmlFor="c-message">Message *</label>
                    <textarea id="c-message" rows={5} className="input resize-none" placeholder="আপনার প্রশ্ন বা বার্তা লিখুন..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>
                  {error && <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">{error}</p>}
                  <button type="submit" className="btn-primary w-full">
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Map + info */}
          <Reveal delay={0.1}>
            <div className="space-y-6">
              <div className="card overflow-hidden">
                <iframe
                  title="Chattogram Trust location map — GEC, Chattogram"
                  src={SITE.mapsEmbed}
                  className="h-72 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="flex items-center justify-between gap-3 p-4">
                  <div className="flex items-start gap-2 text-sm text-muted">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-glow" />
                    {SITE.address}
                  </div>
                  <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer" className="btn-outline shrink-0 !px-3 !py-2 text-xs">
                    Directions
                  </a>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="flex items-center gap-2 text-lg font-extrabold text-ink">
                  <Clock size={20} className="text-glow" /> Office & Lab Hours
                </h3>
                <div className="mt-4 space-y-2.5 text-sm">
                  {[
                    { d: 'Saturday – Thursday', h: '09:00 AM – 08:00 PM' },
                    { d: 'Friday', h: 'Closed (optional practice 10 AM – 1 PM)' },
                    { d: 'Admission Desk', h: 'Open all working days' },
                  ].map((r) => (
                    <div key={r.d} className="flex items-center justify-between border-b border-line/60 pb-2.5 last:border-0">
                      <span className="text-muted">{r.d}</span>
                      <span className="font-semibold text-ink">{r.h}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  <a href={SITE.facebookPage} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 !py-2.5 text-xs">
                    <Facebook size={15} className="text-electric-400" /> Facebook Page
                  </a>
                  <a href={SITE.facebookProfile} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 !py-2.5 text-xs">
                    <Facebook size={15} className="text-electric-400" /> Profile
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
