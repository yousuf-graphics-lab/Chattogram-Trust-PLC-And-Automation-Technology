import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Bell, Megaphone, Phone, Pin, Search } from "lucide-react";
import { useDatabase } from "../context/DatabaseContext";
import { BRAND } from "../data/brand";
import { useSeo } from "../hooks/useSeo";
import { formatDate, searchMatches } from "../lib/utils";
import {
  ActionLink,
  Button,
  EmptyState,
  PageHero,
  Reveal,
} from "../components/ui";

export function Notices() {
  const { notices } = useDatabase();
  const [params] = useSearchParams();
  const target = params.get("notice");
  const [filter, setFilter] = useState("All notices");
  const [query, setQuery] = useState("");
  useSeo({
    title: "Notice Board — Admissions & Institute Updates",
    description:
      "Read the latest admission notices, lab orientation information and enrollment guidance from Chattogram Trust PLC & Automation Technology.",
  });
  useEffect(() => {
    if (target) {
      const timer = setTimeout(
        () =>
          document
            .getElementById(`notice-${target}`)
            ?.scrollIntoView({ behavior: "smooth", block: "center" }),
        180,
      );
      return () => clearTimeout(timer);
    }
  }, [target]);
  const filtered = [...notices]
    .filter(
      (notice) =>
        (filter === "All notices" || notice.category === filter) &&
        searchMatches(query, notice.title, notice.body),
    )
    .sort(
      (a, b) =>
        Number(b.pinned) - Number(a.pinned) || b.date.localeCompare(a.date),
    );
  return (
    <>
      <PageHero
        eyebrow="Notice board"
        title="The latest,"
        highlight="all in one place."
        description="Admission updates, lab information and important institute announcements. Confirm time-sensitive information directly with our team."
      >
        <span className="tag mt-6">
          <Bell size={13} />
          {notices.length} institute notices
        </span>
      </PageHero>
      <section className="section">
        <div className="container-site">
          <div className="filter-toolbar">
            <div className="filter-chips" aria-label="Filter notices">
              {["All notices", "Admission", "Schedule", "General"].map(
                (item) => (
                  <button
                    key={item}
                    className={`chip ${filter === item ? "active" : ""}`}
                    aria-pressed={filter === item}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
            <div className="search-field">
              <Search size={16} />
              <label htmlFor="notice-search" className="sr-only">
                Search notices
              </label>
              <input
                id="notice-search"
                className="field"
                type="search"
                placeholder="Search announcements…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>
          {filtered.length ? (
            <div className="notice-list">
              {filtered.map((notice) => (
                <Reveal key={notice.id}>
                  <article
                    className={`panel notice-card ${notice.pinned ? "pinned" : ""} ${target === notice.id ? "border-cyan-500/60" : ""}`}
                    id={`notice-${notice.id}`}
                  >
                    <div className="bulletin-date !h-16 !w-16">
                      <strong className="!text-2xl">
                        {new Date(notice.date).getDate()}
                      </strong>
                      <span>
                        {new Intl.DateTimeFormat("en", {
                          month: "short",
                        }).format(new Date(notice.date))}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="tag">{notice.category}</span>
                        {notice.pinned && (
                          <span className="inline-flex items-center gap-1 text-[9px] text-cyan-500">
                            <Pin size={11} />
                            PINNED NOTICE
                          </span>
                        )}
                        <span className="text-[10px] text-muted">
                          {formatDate(notice.date)}
                        </span>
                      </div>
                      <h2 lang="bn">{notice.title}</h2>
                      <p lang="bn">{notice.body}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No matching notices"
              action={
                <Button
                  variant="secondary"
                  onClick={() => {
                    setFilter("All notices");
                    setQuery("");
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          )}
          <div className="form-notice mt-8 flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-start gap-3">
              <Megaphone size={19} className="mt-1 text-cyan-500" />
              <p>
                Need to confirm a notice or ask about a batch?
                <br />
                <span className="text-ink">
                  Our team can provide the latest information.
                </span>
              </p>
            </div>
            <ActionLink href={BRAND.phoneHref} variant="secondary">
              <Phone size={14} />
              {BRAND.phoneDisplay}
            </ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}
