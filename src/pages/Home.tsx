import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  CircuitBoard,
  GraduationCap,
  MapPin,
  MessageCircle,
  MonitorCheck,
  Phone,
  Users,
} from "lucide-react";
import { BRAND, whatsappUrl } from "../data/brand";
import { COURSES } from "../data/courses";
import { SKILLS } from "../data/skills";
import { useDatabase } from "../context/DatabaseContext";
import { organizationSchema, useSeo } from "../hooks/useSeo";
import { ActionLink, Reveal, SectionHeading } from "../components/ui";
import { HeroArt, TechArt } from "../components/TechArt";
import { SkillIcon } from "../components/SkillIcon";
import { CourseCard } from "../components/CourseCard";
import { LeadershipCard } from "../components/LeadershipCard";
import { formatDate } from "../lib/utils";

function Counter({
  value,
  suffix,
  label,
  icon: Icon,
}: {
  value: number;
  suffix?: string;
  label: string;
  icon: typeof Users;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(value);
  useEffect(() => {
    if (!visible || reduce) return;
    let frame = 0;
    const start = performance.now();
    const tick = (time: number) => {
      const progress = Math.min((time - start) / 1300, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, reduce, value]);
  return (
    <div className="stat-item" ref={ref}>
      <p className="stat-number">
        <span className="sr-only">
          {value}
          {suffix || ""}
        </span>
        <span aria-hidden="true" className="!text-ink !text-[inherit] !ml-0">
          {count.toLocaleString("en-US")}
        </span>
        {suffix && <span aria-hidden="true">{suffix}</span>}
      </p>
      <p className="stat-label">
        <Icon size={13} />
        {label}
      </p>
    </div>
  );
}

export function Home() {
  const { content, notices, articles } = useDatabase();
  useSeo({
    title: "Master PLC, SCADA & Industrial Automation",
    description:
      "Hands-on technical training at GEC, Chattogram. Explore PLC, SCADA, AutoCAD, CCTV and solar courses with transparent fees and practical projects.",
    schema: organizationSchema,
  });
  const latestNotices = [...notices]
    .sort(
      (a, b) =>
        Number(b.pinned) - Number(a.pinned) || b.date.localeCompare(a.date),
    )
    .slice(0, 3);
  const latestArticles = articles
    .filter((article) => article.published)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 2);
  return (
    <>
      <section className="home-hero grid-bg">
        <div className="container-site hero-layout">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-kicker">
              <span className="live-dot" />
              ADMISSIONS OPEN <span className="mx-1 opacity-35">/</span> GEC,
              CHATTOGRAM
            </div>
            <h1 className="hero-title">
              <span>Master PLC,</span>
              <span>SCADA & Industrial</span>
              <span className="text-gradient">Automation</span>
            </h1>
            <p className="hero-subtitle">
              Hands-on technical training at GEC, Chattogram.
              <br className="hidden sm:block" /> 100% job-oriented practical
              learning.
            </p>
            <div className="hero-ctas">
              <ActionLink to="/courses">
                Explore Courses
                <ArrowUpRight size={16} />
              </ActionLink>
              <ActionLink to="/checkout" variant="orange">
                Enroll with bKash
                <ArrowRight size={16} />
              </ActionLink>
            </div>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-whatsapp"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Inquiry</span>
              <span className="ml-1 text-[9px] opacity-60">
                Let’s talk about your future
              </span>
              <ArrowUpRight size={12} />
            </a>
            <div className="hero-trust">
              <span>
                <CheckCircle2 size={14} />
                Industry-focused curriculum
              </span>
              <span>
                <CircuitBoard size={14} />
                Hands-on lab training
              </span>
              <span>
                <BadgeCheck size={14} />
                Expert guidance
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <HeroArt />
          </motion.div>
        </div>
      </section>
      <section className="stats-band" aria-label="Institute at a glance">
        <div className="container-site stats-grid">
          <Counter
            value={25}
            suffix="+"
            label="Professional Modules"
            icon={CircuitBoard}
          />
          <Counter
            value={100}
            suffix="%"
            label="Practical Setup"
            icon={MonitorCheck}
          />
          <Counter
            value={2500}
            suffix="+"
            label="Successful Students"
            icon={GraduationCap}
          />
          <Counter
            value={60}
            suffix="+"
            label="Districts Served"
            icon={MapPin}
          />
        </div>
      </section>
      <section className="section">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="THE SKILLS THAT MOVE INDUSTRY"
              title={
                <>
                  One institute.{" "}
                  <span className="text-gradient">20 practical skills.</span>
                </>
              }
              description={content.homeIntro}
              action={{ label: "Explore all 20 skills", to: "/skills" }}
            />
          </Reveal>
          <div className="skills-preview-grid">
            {SKILLS.map((skill, index) => (
              <Reveal key={skill.id} delay={Math.min(index * 0.018, 0.18)}>
                <Link to={`/skills?skill=${skill.id}`} className="skill-mini">
                  <SkillIcon name={skill.icon} />
                  <span>{skill.shortTitle}</span>
                  <small>{String(skill.id).padStart(2, "0")}</small>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-7 flex items-center justify-center gap-2 text-[11px] text-muted">
            <CheckCircle2 size={14} className="text-cyan-500" />
            From the first wire to the final commissioning check.
          </Reveal>
        </div>
      </section>
      <section className="section border-y border-line bg-surface/40">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="CHOOSE YOUR NEXT CHAPTER"
              title={
                <>
                  Built for the work{" "}
                  <span className="text-gradient">ahead.</span>
                </>
              }
              description="Focused courses. Transparent fees. Practical outcomes. Find the learning path that fits your ambition."
              action={{ label: "Compare all courses", to: "/courses" }}
            />
          </Reveal>
          <div className="course-grid">
            {COURSES.filter((course) => course.featured).map(
              (course, index) => (
                <Reveal key={course.id} delay={index * 0.07}>
                  <CourseCard course={course} />
                </Reveal>
              ),
            )}
          </div>
          <Reveal className="mt-7 flex flex-wrap items-center justify-between gap-4 text-xs text-muted">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={14} className="text-cyan-500" />
              No hidden fees in the listed course structure.
            </span>
            <span>
              Need help choosing?{" "}
              <a
                className="text-cyan-500 dark:text-cyan-400"
                href={BRAND.phoneHref}
              >
                Call {BRAND.phoneDisplay}
              </a>
            </span>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="YOUR MENTOR. YOUR TECHNICAL PARTNER."
              title={
                <>
                  Learn with purpose.
                  <br />
                  Build with confidence.
                </>
              }
            />
          </Reveal>
          <Reveal>
            <LeadershipCard />
          </Reveal>
        </div>
      </section>
      <section className="section border-y border-line bg-surface/30">
        <div className="container-site bulletin-grid">
          <Reveal>
            <SectionHeading
              eyebrow="ON THE NOTICE BOARD"
              title="Stay in the loop."
              action={{ label: "All notices", to: "/notices" }}
            />
            <div>
              {latestNotices.map((notice) => (
                <Link
                  to={`/notices?notice=${notice.id}`}
                  className="bulletin-item"
                  key={notice.id}
                >
                  <div className="bulletin-date">
                    <strong>{new Date(notice.date).getDate()}</strong>
                    <span>
                      {new Intl.DateTimeFormat("en", { month: "short" }).format(
                        new Date(notice.date),
                      )}
                    </span>
                  </div>
                  <div>
                    <h3 lang="bn">{notice.title}</h3>
                    <p>
                      {notice.category}{" "}
                      <span className="mx-1 opacity-40">/</span>{" "}
                      {formatDate(notice.date)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading
              eyebrow="FROM THE TECH JOURNAL"
              title="Ideas worth wiring."
              action={{ label: "Read the blog", to: "/blog" }}
            />
            <div className="article-preview-list">
              {latestArticles.map((article) => (
                <Link
                  className="article-preview"
                  key={article.id}
                  to={`/blog/${article.slug}`}
                >
                  <TechArt variant={article.art} />
                  <div className="py-1">
                    <span className="text-[8px] uppercase tracking-wider text-cyan-500 dark:text-cyan-400">
                      {article.category}
                    </span>
                    <h3 lang="bn">{article.title}</h3>
                    <p>
                      {article.readMinutes} min read{" "}
                      <span className="mx-1">·</span>
                      {formatDate(article.date)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container-site">
          <Reveal>
            <div className="cta-band">
              <div>
                <p className="eyebrow !mb-3">
                  <span />
                  YOUR NEXT MOVE STARTS HERE
                </p>
                <h2>
                  Don’t just learn the theory.
                  <br />
                  Make something work.
                </h2>
                <p>
                  Visit our GEC training lab. Meet your trainer. Find your path.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ActionLink to="/contact" variant="orange">
                  Plan your visit
                  <ArrowUpRight size={16} />
                </ActionLink>
                <ActionLink
                  href={BRAND.phoneHref}
                  variant="secondary"
                  className="!border-slate-600 !bg-transparent !text-white"
                >
                  <Phone size={15} />
                  Let’s talk
                </ActionLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
