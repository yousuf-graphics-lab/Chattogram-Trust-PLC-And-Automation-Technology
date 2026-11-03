import { useMemo, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  AlertCircle, BadgeCheck, CheckCircle2, Copy, CreditCard, MessageCircle,
  Phone, ShieldCheck, Smartphone, Zap,
} from 'lucide-react';
import type { Enrollment } from '@/types';
import { courses } from '@/data/courses';
import { SITE, formatTaka, waLink } from '@/lib/site';
import { useSeo } from '@/lib/seo';
import { addEnrollment } from '@/lib/storage';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';

export default function Checkout() {
  const [params] = useSearchParams();
  const preselected = params.get('course');
  const [courseSlug, setCourseSlug] = useState(
    preselected && courses.some((c) => c.slug === preselected) ? preselected : courses[0].slug
  );
  const [form, setForm] = useState({ studentName: '', mobile: '', bkashSender: '', trxId: '' });
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [done, setDone] = useState<Enrollment | null>(null);

  useSeo({
    title: 'Checkout — bKash Payment & Instant WhatsApp Booking',
    description:
      'Enroll in Chattogram Trust PLC courses via bKash. Select your course, send money to +880 1646-241953, enter TrxID and confirm — instant WhatsApp confirmation.',
    path: '/checkout',
  });

  const course = useMemo(() => courses.find((c) => c.slug === courseSlug) ?? courses[0], [courseSlug]);

  const copyMerchant = async () => {
    try {
      await navigator.clipboard.writeText(SITE.bkashMerchant.replace(/[\s-]/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const validate = (): string | null => {
    if (!form.studentName.trim()) return 'Please enter the student name.';
    const mobile = form.mobile.replace(/[\s-]/g, '');
    if (!/^(\+?880|0)?1[3-9]\d{8}$/.test(mobile)) return 'Please enter a valid mobile number (e.g. 01712345678).';
    const sender = form.bkashSender.replace(/[\s-]/g, '');
    if (!/^(\+?880|0)?1[3-9]\d{8}$/.test(sender)) return 'Please enter a valid bKash sender number.';
    if (!/^[A-Za-z0-9]{6,20}$/.test(form.trxId.trim())) return 'Please enter a valid bKash Transaction ID (6–20 letters/digits).';
    return null;
  };

  const confirm = (e: FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError('');
    const enrollment = addEnrollment({
      studentName: form.studentName.trim(),
      mobile: form.mobile.trim(),
      courseId: course.id,
      courseName: course.title,
      fee: course.fee,
      bkashSender: form.bkashSender.trim(),
      trxId: form.trxId.trim().toUpperCase(),
    });
    setDone(enrollment);

    // Automatic WhatsApp routing with the exact required message format
    const message = `আসসালামু আলাইকুম, আমি ${enrollment.studentName}, ${enrollment.courseName} কোর্সে ভর্তি হতে bKash করেছি। TrxID: ${enrollment.trxId}, Phone: ${enrollment.mobile}। অনুগ্রহ করে কনফার্ম করুন।`;
    window.open(waLink(message), '_blank', 'noopener,noreferrer');
  };

  const instantBooking = () => {
    const message = `আসসালামু আলাইকুম, আমি ${form.studentName.trim() || '[নাম]'}, ${course.title} কোর্সে ভর্তি হতে চাই। অনুগ্রহ করে ভর্তি প্রক্রিয়া জানাবেন। Phone: ${form.mobile.trim() || '[মোবাইল]'}।`;
    window.open(waLink(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <PageHero
        eyebrow="অনলাইন ভর্তি ও পেমেন্ট"
        title={<>Enroll via <span className="text-bkash">bKash</span> Checkout</>}
        subtitle="Select your course, send the fee via bKash Send Money, then confirm with your TrxID. Your enrollment is saved and a WhatsApp confirmation opens automatically."
        breadcrumb={[{ label: 'Checkout' }]}
      />

      <section className="container-x grid gap-10 py-10 lg:grid-cols-[400px_1fr]">
        {/* bKash payment panel */}
        <Reveal>
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="card overflow-hidden">
              <div className="relative bg-bkash p-6 text-white">
                <div className="hero-grid absolute inset-0 opacity-20" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                        <Smartphone size={22} />
                      </div>
                      <div>
                        <div className="text-lg font-black tracking-tight">bKash</div>
                        <div className="text-[10px] uppercase tracking-widest text-white/75">Send Money</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">Merchant</span>
                  </div>

                  <div className="mt-6 rounded-xl bg-white/10 p-4 backdrop-blur">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/70">Merchant Number</div>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <span className="text-xl font-black tracking-wide">{SITE.bkashMerchant}</span>
                      <button
                        type="button"
                        onClick={copyMerchant}
                        className="flex items-center gap-1 rounded-lg bg-white/15 px-2.5 py-1.5 text-[11px] font-bold transition-colors hover:bg-white/25"
                      >
                        {copied ? <BadgeCheck size={13} /> : <Copy size={13} />}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/70">Total Fee</div>
                      <div className="text-3xl font-black">{formatTaka(course.fee)}</div>
                    </div>
                    <div className="text-right text-[11px] text-white/80">
                      <div>{course.shortTitle}</div>
                      <div>{course.duration}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-ink">How to Pay</h3>
                <ol className="space-y-3">
                  {[
                    'Open your bKash app and choose "Send Money".',
                    `Enter merchant number ${SITE.bkashMerchant}.`,
                    `Send exactly ${formatTaka(course.fee)} (course fee).`,
                    'Copy the Transaction ID (TrxID) from the confirmation SMS.',
                    'Fill the form and press "Confirm bKash Payment".',
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bkash/15 text-xs font-black text-bkash">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-4 flex items-start gap-2 rounded-xl border border-safety/30 bg-safety/10 p-3.5 text-xs leading-relaxed text-safety">
                  <AlertCircle size={15} className="mt-0.5 shrink-0" />
                  <span className="font-bangla">
                    শুধুমাত্র Send Money করুন। পেমেন্ট যাচাই করে আমরা ভর্তি নিশ্চিত করব। কোনো সমস্যায় কল করুন: {SITE.phoneDisplay}
                  </span>
                </div>
              </div>
            </div>

            <div className="card flex items-center gap-3 p-4">
              <ShieldCheck size={22} className="shrink-0 text-glow" />
              <p className="text-xs leading-relaxed text-muted">
                Your enrollment is stored securely in this browser and sent to our team via WhatsApp for verification.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Form / success */}
        <Reveal delay={0.1}>
          {done ? (
            <div className="card overflow-hidden">
              <div className="bg-green-600 p-8 text-center text-white">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <CheckCircle2 size={34} />
                </div>
                <h2 className="text-2xl font-extrabold">Enrollment Submitted!</h2>
                <p className="font-bangla mt-2 text-sm text-white/90">
                  আপনার এনরোলমেন্ট সেভ হয়েছে এবং WhatsApp-এ কনফার্মেশন মেসেজ পাঠানো হয়েছে।
                </p>
              </div>
              <div className="p-6 sm:p-8">
                <div className="space-y-3 rounded-xl border border-line bg-surface2/50 p-5 text-sm">
                  {[
                    { k: 'Reference ID', v: done.id },
                    { k: 'Student', v: done.studentName },
                    { k: 'Course', v: done.courseName },
                    { k: 'Fee', v: formatTaka(done.fee) },
                    { k: 'TrxID', v: done.trxId },
                    { k: 'Status', v: 'Pending verification' },
                  ].map((r) => (
                    <div key={r.k} className="flex items-start justify-between gap-4 border-b border-line/60 pb-2.5 last:border-0">
                      <span className="text-muted">{r.k}</span>
                      <span className="text-right font-bold text-ink">{r.v}</span>
                    </div>
                  ))}
                </div>
                <p className="font-bangla mt-5 text-sm leading-relaxed text-muted">
                  WhatsApp উইন্ডো না খুললে নিচের বাটনে ক্লিক করে মেসেজটি পাঠান। আমরা TrxID যাচাই করে দ্রুত ভর্তি নিশ্চিত করব।
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <a
                    href={waLink(`আসসালামু আলাইকুম, আমি ${done.studentName}, ${done.courseName} কোর্সে ভর্তি হতে bKash করেছি। TrxID: ${done.trxId}, Phone: ${done.mobile}। অনুগ্রহ করে কনফার্ম করুন।`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                  >
                    <MessageCircle size={16} /> Open WhatsApp Again
                  </a>
                  <a href={SITE.phoneTel} className="btn-outline">
                    <Phone size={16} /> Call to Confirm
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => { setDone(null); setForm({ studentName: '', mobile: '', bkashSender: '', trxId: '' }); }}
                  className="btn-ghost mt-3 w-full text-xs"
                >
                  Enroll another student
                </button>
              </div>
            </div>
          ) : (
            <div className="card p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-bkash/15 text-bkash">
                  <CreditCard size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-ink">Student & Payment Details</h2>
                  <p className="text-xs text-muted">All fields are required for verification.</p>
                </div>
              </div>

              <form onSubmit={confirm} className="space-y-5">
                <div>
                  <label className="label" htmlFor="co-course">Selected Course *</label>
                  <select
                    id="co-course"
                    className="input"
                    value={courseSlug}
                    onChange={(e) => setCourseSlug(e.target.value)}
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.title} — {formatTaka(c.fee)} ({c.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="co-name">Student Name *</label>
                    <input
                      id="co-name"
                      className="input"
                      placeholder="Full name"
                      value={form.studentName}
                      onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="co-mobile">Mobile Number *</label>
                    <input
                      id="co-mobile"
                      className="input"
                      placeholder="01712345678"
                      inputMode="tel"
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="co-sender">bKash Sender Number *</label>
                    <input
                      id="co-sender"
                      className="input"
                      placeholder="Number you sent from"
                      inputMode="tel"
                      value={form.bkashSender}
                      onChange={(e) => setForm({ ...form, bkashSender: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="co-trx">Transaction ID (TrxID) *</label>
                    <input
                      id="co-trx"
                      className="input uppercase"
                      placeholder="e.g. 9HK2A7B4C1"
                      value={form.trxId}
                      onChange={(e) => setForm({ ...form, trxId: e.target.value })}
                    />
                  </div>
                </div>

                {/* Fee summary */}
                <div className="rounded-xl border border-bkash/30 bg-bkash/5 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Course Fee</span>
                    <span className="font-bold text-ink">{formatTaka(course.fee)}</span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-sm">
                    <span className="text-muted">Admission / Lab Charge</span>
                    <span className="font-bold text-green-500">Included</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-bkash/20 pt-3">
                    <span className="font-extrabold text-ink">Total Payable</span>
                    <span className="text-2xl font-black text-bkash">{formatTaka(course.fee)}</span>
                  </div>
                </div>

                {error && (
                  <p className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}
                  </p>
                )}

                <button type="submit" className="btn-bkash w-full !py-4 text-base">
                  <Zap size={18} /> Confirm bKash Payment
                </button>

                <div className="relative py-1 text-center">
                  <span className="relative z-10 bg-surface px-3 text-[11px] font-bold uppercase tracking-widest text-muted">or</span>
                  <span className="absolute left-0 top-1/2 h-px w-full bg-line" />
                </div>

                <button type="button" onClick={instantBooking} className="btn-whatsapp w-full">
                  <MessageCircle size={16} /> Instant WhatsApp Booking (Pay Later)
                </button>

                <p className="text-center text-[11px] leading-relaxed text-muted">
                  By confirming, you agree to our training terms. Need help?{' '}
                  <a href={SITE.phoneTel} className="link">{SITE.phoneDisplay}</a>
                </p>
              </form>
            </div>
          )}
        </Reveal>
      </section>

      {/* trust strip */}
      <section className="border-t border-line bg-surface/40 py-10">
        <div className="container-x grid gap-4 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, t: 'Verified Merchant', d: 'Payment goes directly to the institute merchant number.' },
            { icon: MessageCircle, t: 'Instant Confirmation', d: 'WhatsApp message opens automatically with your details.' },
            { icon: CheckCircle2, t: 'Seat Reserved', d: 'We verify TrxID and confirm your batch seat quickly.' },
          ].map((f) => (
            <div key={f.t} className="flex items-start gap-3">
              <f.icon size={22} className="mt-0.5 shrink-0 text-glow" />
              <div>
                <div className="text-sm font-bold text-ink">{f.t}</div>
                <div className="text-xs text-muted">{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
