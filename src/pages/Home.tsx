import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, BadgeCheck, GraduationCap, MapPin,
  MessageCircle, Play, Users,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { courses } from '@/data/courses';
import { skills } from '@/data/skills';
import { testimonials } from '@/data/testimonials';
import { SITE, WA_INQUIRY_BN, waLink } from '@/lib/site';
import { useSeo } from '@/lib/seo';
import { Logo } from '@/components/illustrations/Logo';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { StatsCounter } from '@/components/StatsCounter';
import { CourseCard } from '@/components/CourseCard';
import { LeadershipCard } from '@/components/LeadershipCard';
import { NoticeBoard } from '@/components/NoticeBoard';
import { BlogCard } from '@/components/BlogCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { CtaBanner } from '@/components/CtaBanner';

export default function Home() {
  const { content, notices, posts, gallery } = useData();
  useSeo({
    title: 'PLC, SCADA & Industrial Automation Training in Chattogram',
    description:
      'Master PLC, SCADA, VFD, HMI, AutoCAD, Sub-Station, CCTV & Solar PV with 100% hands-on training at GEC, Chattogram. Enroll via bKash or WhatsApp.',
    path: '/',
    keywords: 'PLC training Chattogram, SCADA course Bangladesh, industrial automation, VFD HMI, AutoCAD electrical, GEC Chattogram',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: SITE.name,
      telephone: '+8801646241953',
      address: { '@type': 'PostalAddress', streetAddress: 'O.R Nizam Road, GEC', addressLocality: 'Chattogram', addressCountry: 'BD' },
    },
  });

  const featured = courses.filter((c) => c.featured);
  const galleryPhotos = gallery.filter((g) => g.type === 'photo' && g.src).slice(0, 4);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="container-x pt-6">
        <div className="panel relative overflow-hidden">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-sm bg-electric/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-glow">
                  Industrial Automation Hub • Chattogram
                </span>
                <span className="rounded-sm border border-line bg-surface2 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">
                  GEC • Hands-on Learning
                </span>
              </div>
              <p className="font-bangla text-base font-bold text-safety sm:text-lg">{SITE.slogan1}</p>
              <h1 className="brand-glow mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[42px]">
                Chattogram Trust PLC &<br className="hidden sm:block" /> Automation Technology
              </h1>
              <p className="mt-2 text-sm font-semibold text-glow">
                {content.heroHeadline} {content.heroHighlight}
              </p>
              <p className="font-bangla mt-4 max-w-xl text-sm leading-relaxed text-muted">
                {content.heroSubheadlineBn}
              </p>
              <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted">{content.heroSubheadline}</p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: BadgeCheck, top: '100%', bottom: 'হাতে-কলমে ল্যাব' },
                  { icon: GraduationCap, top: `${content.statModules}+`, bottom: 'মডিউল প্রশিক্ষণ' },
                  { icon: Users, top: 'লাইফটাইম', bottom: 'প্রাক্তন ছাত্র সাপোর্ট' },
                ].map((f) => (
                  <div key={f.bottom} className="rounded-md border border-line bg-surface2/50 p-3">
                    <f.icon size={16} className="mb-1.5 text-glow" />
                    <div className="text-sm font-extrabold text-ink">{f.top}</div>
                    <div className="font-bangla text-[10px] text-muted">{f.bottom}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Link to="/courses" className="btn-primary !py-2.5 text-xs">
                  <GraduationCap size={15} /> Explore All Courses
                </Link>
                <Link to="/checkout" className="btn-orange !py-2.5 text-xs">
                  Enroll in Course
                </Link>
                <a href={waLink(WA_INQUIRY_BN)} target="_blank" rel="noopener noreferrer" className="btn-outline !py-2.5 text-xs">
                  <MessageCircle size={15} className="text-whatsapp" /> WhatsApp Counseling
                </a>
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-[11px] text-muted">
                <MapPin size={12} className="text-glow" /> {SITE.address}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <div className="overflow-hidden rounded-md border border-line bg-base">
                <div className="relative">
                  <img src="/images/lab/lab-3.webp" alt="Hands-on automation lab at GEC, Chattogram" className="aspect-[16/10] w-full object-cover" />
                  <div className="absolute inset-0 caption-scrim" />
                  <span className="absolute left-3 top-3 rounded-sm bg-base/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-glow">
                    Live Lab • GEC Campus
                  </span>
                  <Logo size={34} className="absolute right-3 top-3 opacity-90" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-sm font-extrabold text-white">{SITE.founder}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-glow">Founder, CEO & Head Trainer</div>
                  </div>
                </div>
                <div className="border-t border-line p-4">
                  <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-muted">Simulator Status</span>
                    <span className="text-glow">12 Workstations Active</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface2">
                    <div className="h-full w-[85%] rounded-full bg-glow" />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-[11px] text-muted">
                    <span>Siemens S7-1200 + VFD + HMI</span>
                    <span className="text-right">Delta DVP-14SS2 Ready</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <StatsCounter />

      {/* ============ FEATURED COURSES ============ */}
      <section className="container-x py-10">
        <SectionHeading
          eyebrow="Professional Curriculum"
          title="Popular Flagship Courses"
          action={
            <Link to="/courses" className="inline-flex items-center gap-1 text-xs font-bold text-glow hover:text-glow-300">
              View All Courses & Syllabus <ArrowRight size={14} />
            </Link>
          }
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <CourseCard course={c} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 20 SKILLS GRID ============ */}
      <section className="container-x py-6">
        <div className="panel p-6 sm:p-8">
          <SectionHeading
            eyebrow="Total Engineering Coverage"
            title="20 Essential Technical Skills"
            action={
              <Link to="/skills" className="rounded-sm border border-line bg-surface2 px-3 py-1.5 text-[11px] font-bold text-muted hover:text-glow">
                <span className="font-bangla">সকল ২০টি স্কিলের বিস্তারিত ল্যাব মডিউল</span>
              </Link>
            }
          />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {skills.map((s) => (
              <Link
                key={s.id}
                to="/skills"
                className="flex items-start gap-2 rounded-sm border border-line bg-surface2/40 px-3 py-2.5 transition-colors hover:border-glow/40 hover:bg-surface2"
              >
                <span className="mt-0.5 text-[10px] font-extrabold text-glow">{String(s.id).padStart(2, '0')}.</span>
                <span className="font-bangla text-xs font-semibold leading-snug text-ink/90">{s.titleBn}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LeadershipCard />

      {/* ============ GALLERY ============ */}
      <section className="container-x py-10">
        <SectionHeading
          eyebrow="Lab & Hands-on Space"
          title="Our Automation Lab"
          action={<Link to="/gallery" className="text-xs font-bold text-glow hover:text-glow-300">Full Gallery →</Link>}
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {galleryPhotos.map((g, i) => (
            <Reveal key={g.id} delay={i * 0.06}>
              <Link to="/gallery" className="group relative block overflow-hidden rounded-md border border-line">
                <img src={g.src} alt={g.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 caption-scrim" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-bangla line-clamp-2 text-xs font-semibold text-white">{g.title}</p>
                </div>
                <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-sm bg-glow/20 text-glow opacity-0 transition-opacity group-hover:opacity-100">
                  <Play size={13} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="container-x py-10">
        <SectionHeading eyebrow="শিক্ষার্থীদের অভিজ্ঞতা" title="Success Stories" />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ NOTICES + BLOG ============ */}
      <section className="container-x grid gap-8 py-10 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="নোটিশ বোর্ড" title="Latest Notices" />
          <NoticeBoard notices={notices} limit={3} />
        </div>
        <div>
          <SectionHeading
            eyebrow="টেকনিক্যাল ব্লগ"
            title="Tech Articles"
            action={<Link to="/blog" className="text-xs font-bold text-glow hover:text-glow-300">All Posts →</Link>}
          />
          <div className="space-y-4">
            {posts.slice(0, 2).map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY US ============ */}
      <WhyChooseUs />

      <CtaBanner />
    </>
  );
}
