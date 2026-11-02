import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Layers3,
  Search,
} from "lucide-react";
import { SKILLS, SKILL_CATEGORIES } from "../data/skills";
import { useSeo } from "../hooks/useSeo";
import { searchMatches } from "../lib/utils";
import { Button, EmptyState, PageHero, Reveal } from "../components/ui";
import { SkillIcon } from "../components/SkillIcon";

export function Skills() {
  const [params, setParams] = useSearchParams();
  const target = Number(params.get("skill"));
  const [category, setCategory] = useState("All skills");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<number[]>(
    Number.isInteger(target) && target >= 1 && target <= 20 ? [target] : [],
  );
  useSeo({
    title: "20 Practical Industrial & Technical Skills",
    description:
      "Explore all 20 hands-on skills: house wiring, motor control, PLC, VFD, HMI, SCADA, AutoCAD, sub-stations, CCTV, solar, safety and industrial projects.",
  });
  useEffect(() => {
    if (target >= 1 && target <= 20) {
      const timer = setTimeout(
        () =>
          document
            .getElementById(`skill-${target}`)
            ?.scrollIntoView({ behavior: "smooth", block: "center" }),
        180,
      );
      return () => clearTimeout(timer);
    }
  }, [target]);
  const filtered = SKILLS.filter(
    (skill) =>
      (category === "All skills" || skill.category === category) &&
      searchMatches(query, skill.title, skill.description, ...skill.tools),
  );
  const allOpen =
    filtered.length > 0 &&
    filtered.every((skill) => expanded.includes(skill.id));
  return (
    <>
      <PageHero
        eyebrow="20 essential skills"
        title="Not just topics."
        highlight="Tools for your technical future."
        description="A complete practical skill map—from your first wiring circuit to connected industrial systems. Open any skill to see what you’ll practice and where to learn it."
      >
        <div className="mt-7 flex flex-wrap gap-2">
          <span className="tag">
            <Layers3 size={13} />
            20 curriculum topics
          </span>
          <span className="tag">
            <Check size={13} />
            Practical, guided learning
          </span>
        </div>
      </PageHero>
      <section className="section">
        <div className="container-site">
          <div className="filter-toolbar">
            <div className="filter-chips" aria-label="Filter skills">
              {SKILL_CATEGORIES.map((item) => (
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
              <label htmlFor="skill-search" className="sr-only">
                Search skills and tools
              </label>
              <input
                id="skill-search"
                className="field"
                type="search"
                placeholder="Search skills or tools…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-[11px] text-muted" aria-live="polite">
              {filtered.length} practical skills to explore
            </p>
            <button
              className="text-link"
              onClick={() =>
                setExpanded(
                  allOpen
                    ? expanded.filter(
                        (id) => !filtered.some((skill) => skill.id === id),
                      )
                    : [
                        ...new Set([
                          ...expanded,
                          ...filtered.map((skill) => skill.id),
                        ]),
                      ],
                )
              }
            >
              {allOpen ? "Collapse all" : "Expand all"}
              <ChevronDown size={14} className={allOpen ? "rotate-180" : ""} />
            </button>
          </div>
          {filtered.length ? (
            <div className="skill-detail-grid">
              {filtered.map((skill) => {
                const open = expanded.includes(skill.id);
                return (
                  <Reveal key={skill.id}>
                    <article
                      className={`panel skill-detail ${open ? "border-cyan-500/40" : ""}`}
                      id={`skill-${skill.id}`}
                    >
                      <button
                        className="skill-detail-head"
                        aria-expanded={open}
                        aria-controls={`skill-content-${skill.id}`}
                        onClick={() =>
                          setExpanded((current) =>
                            open
                              ? current.filter((id) => id !== skill.id)
                              : [...current, skill.id],
                          )
                        }
                      >
                        <span className="skill-icon">
                          <SkillIcon name={skill.icon} />
                        </span>
                        <div>
                          <h2>{skill.title}</h2>
                          <p>{skill.description}</p>
                        </div>
                        <span className="skill-detail-number">
                          {String(skill.id).padStart(2, "0")}
                        </span>
                        <ChevronDown
                          size={15}
                          className={`mt-1 text-muted transition-transform ${open ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            id={`skill-content-${skill.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="skill-detail-body">
                              <p className="mb-2 text-[9px] font-semibold uppercase tracking-widest text-cyan-500">
                                What you’ll practice
                              </p>
                              <ul>
                                {skill.practice.map((item) => (
                                  <li key={item}>
                                    <Check size={13} />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                              <div className="my-4 flex flex-wrap gap-1.5">
                                {skill.tools.map((tool) => (
                                  <span className="tag" key={tool}>
                                    {tool}
                                  </span>
                                ))}
                              </div>
                              <Link
                                className="text-link !text-[11px]"
                                to={`/courses/${skill.courseSlug}`}
                                onClick={() => setParams({}, { replace: true })}
                              >
                                Explore the related course
                                <ArrowUpRight size={13} />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <EmptyState
              action={
                <Button
                  variant="secondary"
                  onClick={() => {
                    setCategory("All skills");
                    setQuery("");
                  }}
                >
                  Show all skills
                </Button>
              }
            />
          )}
          <p className="form-notice mt-8">
            Module availability depends on your selected course. Some topics are
            covered as guided orientation within a broader program. Contact the
            trainer for a course-specific skill map. All live electrical work
            requires appropriate supervision.
          </p>
        </div>
      </section>
    </>
  );
}
