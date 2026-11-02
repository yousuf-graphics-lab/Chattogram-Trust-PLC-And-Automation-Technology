import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  Cpu,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Signal,
  UserRound,
} from "lucide-react";
import { COURSES, formatTaka, getCourse } from "../data/courses";
import { SKILLS } from "../data/skills";
import { BRAND, whatsappUrl } from "../data/brand";
import { useSeo } from "../hooks/useSeo";
import { searchMatches } from "../lib/utils";
import {
  ActionLink,
  Button,
  EmptyState,
  PageHero,
  Reveal,
  SectionHeading,
} from "../components/ui";
import { CourseCard } from "../components/CourseCard";
import { TechArt } from "../components/TechArt";
import { NotFound } from "../components/Header";

const categories = [
  "All courses",
  "Automation",
  "Design & CAD",
  "Power systems",
  "Security",
  "Solar energy",
];
export function Courses() {
  const [category, setCategory] = useState("All courses");
  const [query, setQuery] = useState("");
  useSeo({
    title: "Practical Courses & Course Fees",
    description:
      "Compare six practical technical courses in Chattogram: PLC, advanced automation, AutoCAD, sub-station design, CCTV and solar PV. Fees from 3,000 Taka.",
  });
  const filtered = useMemo(
    () =>
      COURSES.filter(
        (course) =>
          (category === "All courses" || course.category === category) &&
          searchMatches(
            query,
            course.title,
            course.description,
            course.category,
          ),
      ),
    [category, query],
  );
  return (
    <>
      <PageHero
        eyebrow="Courses & fees"
        title="Your ambition."
        highlight="A practical path to match."
        description="Industry-relevant training, clear course fees and a syllabus built around doing. Choose your next skill and start building your technical future."
      >
        <div className="mt-7 flex flex-wrap gap-2">
          <span className="tag">
            <BookOpen size={12} />6 focused courses
          </span>
          <span className="tag">
            <MapPin size={12} />
            GEC, Chattogram
          </span>
          <span className="tag">
            <Clock3 size={12} />
            1–3 month programs
          </span>
        </div>
      </PageHero>
      <section className="section">
        <div className="container-site">
          <div className="filter-toolbar">
            <div
              className="filter-chips"
              aria-label="Filter courses by category"
            >
              {categories.map((item) => (
                <button
                  key={item}
                  className={`chip ${category === item ? "active" : ""}`}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="search-field">
              <Search size={16} />
              <label className="sr-only" htmlFor="course-search">
                Search courses
              </label>
              <input
                id="course-search"
                type="search"
                className="field"
                placeholder="Find your next skill…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>
          <p className="mb-5 text-[11px] text-muted" aria-live="polite">
            Showing {filtered.length} of {COURSES.length} courses
          </p>
          {filtered.length ? (
            <div className="course-grid">
              {filtered.map((course) => (
                <Reveal key={course.id}>
                  <CourseCard course={course} />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState
              action={
                <Button
                  variant="secondary"
                  onClick={() => {
                    setCategory("All courses");
                    setQuery("");
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          )}
        </div>
      </section>
      <section className="section !pt-0">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="CLEAR FEES. CONFIDENT DECISIONS."
              title="The complete fee structure."
              description="All prices are listed in English numbers. Contact us for current offers and the latest batch schedule before enrolling."
            />
          </Reveal>
          <div
            className="table-wrap"
            tabIndex={0}
            role="region"
            aria-label="Course fee comparison table"
          >
            <table className="fee-table">
              <thead>
                <tr>
                  <th scope="col">Course</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Course fee</th>
                  <th scope="col">Your next step</th>
                </tr>
              </thead>
              <tbody>
                {COURSES.map((course) => (
                  <tr key={course.id}>
                    <td>
                      <Link
                        to={`/courses/${course.slug}`}
                        className="hover:text-cyan-400"
                      >
                        {course.title}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap text-muted">
                      {course.duration}
                    </td>
                    <td className="whitespace-nowrap font-semibold">
                      {formatTaka(course.fee)}
                    </td>
                    <td>
                      <Link
                        to={`/checkout?course=${course.slug}`}
                        className="text-link whitespace-nowrap"
                      >
                        Enroll via bKash
                        <ArrowUpRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 flex items-start gap-2 text-[11px] leading-6 text-muted">
            <ShieldCheck size={14} className="mt-1 text-cyan-500" />
            The checkout records a manual bKash payment for verification. It
            does not debit your account or automatically confirm admission.
          </p>
        </div>
      </section>
    </>
  );
}

export function CourseDetails() {
  const { slug = "" } = useParams();
  const course = getCourse(slug);
  useSeo({
    title: course?.title || "Course not found",
    description:
      course?.description ||
      "Explore our available technical training courses.",
    noIndex: !course,
    schema: course
      ? {
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.title,
          description: course.description,
          inLanguage: ["en", "bn"],
          provider: { "@type": "EducationalOrganization", name: BRAND.name },
          offers: {
            "@type": "Offer",
            price: course.fee,
            priceCurrency: "BDT",
            category: "Paid",
          },
          timeRequired: `P${course.months}M`,
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Onsite",
            location: {
              "@type": "Place",
              name: BRAND.name,
              address: BRAND.address,
            },
          },
        }
      : undefined,
  });
  if (!course) return <NotFound />;
  const related = COURSES.filter((item) => item.id !== course.id).slice(0, 3);
  return (
    <>
      <PageHero
        eyebrow={course.category}
        title={course.title}
        description={course.description}
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <span className="tag">
            <Clock3 size={13} />
            {course.duration}
          </span>
          <span className="tag">
            <Signal size={13} />
            {course.level}
          </span>
          <span className="tag">
            <MapPin size={13} />
            In-person practical training
          </span>
        </div>
      </PageHero>
      <section className="section">
        <div className="container-site course-detail-layout">
          <div>
            <div className="course-detail-art">
              <TechArt variant={course.art} />
            </div>
            <SectionHeading
              eyebrow="WHAT YOU WILL BE ABLE TO DO"
              title="Skills you can put to work."
            />
            <ul className="check-list">
              {course.outcomes.map((outcome) => (
                <li key={outcome}>
                  <Check size={16} />
                  {outcome}
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <SectionHeading
                eyebrow="THE LEARNING ROADMAP"
                title="Your syllabus, step by step."
                description={`${course.syllabus.length} guided modules. Select a module to explore its topics.`}
              />
              {course.syllabus.map((module, index) => (
                <details
                  key={module.title}
                  className="syllabus-item"
                  open={index === 0}
                >
                  <summary>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {module.title.trim()}
                    <ChevronDown size={16} />
                  </summary>
                  <ul>
                    {module.topics.map((topic) => (
                      <li key={topic}>{topic.trim()}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
            <div className="panel mt-8 p-6">
              <p className="eyebrow">
                <span />
                YOUR HANDS-ON CAPSTONE
              </p>
              <h2 className="text-xl font-semibold leading-8">
                Build it. Test it. Explain it.
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                {course.project}
              </p>
            </div>
            <div className="mt-10">
              <h2 className="mb-4 text-xl font-semibold">Before you begin</h2>
              <ul className="check-list">
                {course.requirements.map((requirement) => (
                  <li key={requirement}>
                    <Check size={15} />
                    {requirement}
                  </li>
                ))}
              </ul>
              <p className="form-notice mt-5">
                <ShieldCheck size={15} className="mr-2 inline text-cyan-500" />
                Practical electrical work is carried out under qualified
                supervision. Training does not replace site-specific
                authorization or professional licensing.
              </p>
            </div>
          </div>
          <aside>
            <div className="panel enrollment-sidebar">
              <p className="text-[10px] uppercase tracking-widest text-muted">
                Invest in your next skill
              </p>
              <p className="mt-3 text-[34px] font-bold tracking-[-.05em]">
                {formatTaka(course.fee)}
              </p>
              <p className="mt-1 text-xs text-muted">
                Full course fee · {course.duration}
              </p>
              <div className="my-6 border-y border-line py-3">
                <div className="summary-row">
                  <span>Learning format</span>
                  <strong>Hands-on, in person</strong>
                </div>
                <div className="summary-row">
                  <span>Location</span>
                  <strong>GEC, Chattogram</strong>
                </div>
                <div className="summary-row">
                  <span>Head trainer</span>
                  <strong>{BRAND.founder}</strong>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <ActionLink
                  to={`/checkout?course=${course.slug}`}
                  variant="orange"
                >
                  Enroll via bKash
                  <ArrowUpRight size={16} />
                </ActionLink>
                <ActionLink
                  href={whatsappUrl(
                    `আসসালামু আলাইকুম, আমি ${course.title} কোর্স সম্পর্কে জানতে চাই।`,
                  )}
                  variant="secondary"
                >
                  <MessageCircle size={16} />
                  WhatsApp Inquiry
                </ActionLink>
              </div>
              <p className="mt-4 text-center text-[10px] leading-5 text-muted">
                Confirm the current batch and seat availability before payment.
              </p>
            </div>
            <div className="panel mt-5 p-6">
              <h2 className="mb-2 text-sm font-semibold">
                Skills in this course
              </h2>
              {SKILLS.filter((skill) => course.skillIds.includes(skill.id)).map(
                (skill) => (
                  <Link
                    to={`/skills?skill=${skill.id}`}
                    key={skill.id}
                    className="related-skill-link"
                  >
                    <Cpu size={14} className="text-cyan-500" />
                    {skill.shortTitle}
                    <ArrowUpRight size={12} className="ml-auto" />
                  </Link>
                ),
              )}
            </div>
            <div className="mt-6 flex items-start gap-3 px-1">
              <UserRound size={19} className="mt-1 text-cyan-500" />
              <p className="text-xs leading-6 text-muted">
                Not sure where to start?
                <br />
                <a href={BRAND.phoneHref} className="font-medium text-ink">
                  {BRAND.phoneDisplay}
                </a>
              </p>
            </div>
          </aside>
        </div>
      </section>
      <section className="section border-t border-line bg-surface/30">
        <div className="container-site">
          <SectionHeading
            eyebrow="KEEP BUILDING YOUR EXPERTISE"
            title="Your next learning opportunity."
            action={{ label: "All courses", to: "/courses" }}
          />
          <div className="course-grid">
            {related.map((item) => (
              <CourseCard key={item.id} course={item} />
            ))}
          </div>
          <Link to="/skills" className="text-link mt-8">
            Explore the complete 20-skill curriculum
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
