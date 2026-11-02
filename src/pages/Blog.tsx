import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock3,
  Search,
  UserRound,
} from "lucide-react";
import { useDatabase } from "../context/DatabaseContext";
import { BRAND, whatsappUrl } from "../data/brand";
import { useSeo } from "../hooks/useSeo";
import { formatDate, searchMatches } from "../lib/utils";
import {
  ActionLink,
  Button,
  EmptyState,
  PageHero,
  Reveal,
} from "../components/ui";
import { TechArt } from "../components/TechArt";
import { NotFound } from "../components/Header";

const bn = (text: string) => (/[\u0980-\u09ff]/.test(text) ? "bn" : "en");
export function Blog() {
  const { articles } = useDatabase();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All articles");
  const published = articles
    .filter((article) => article.published)
    .sort((a, b) => b.date.localeCompare(a.date));
  const categories = [
    "All articles",
    ...new Set(published.map((article) => article.category)),
  ];
  const filtered = published.filter(
    (article) =>
      (category === "All articles" || article.category === category) &&
      searchMatches(query, article.title, article.excerpt, article.category),
  );
  useSeo({
    title: "Technical Blog, News & Practical Guides",
    description:
      "Practical Bangla guides to PLC learning, VFD control, solar design and industrial automation from Chattogram Trust. Read, understand and build.",
  });
  return (
    <>
      <PageHero
        eyebrow="The technical journal"
        title="Useful knowledge."
        highlight="Clearly connected."
        description="Bangla technical guides, practical explanations and institute updates. Build your understanding one useful idea at a time."
      />
      <section className="section">
        <div className="container-site">
          <div className="filter-toolbar">
            <div className="filter-chips" aria-label="Article categories">
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
              <label htmlFor="blog-search" className="sr-only">
                Search articles
              </label>
              <input
                id="blog-search"
                className="field"
                type="search"
                placeholder="Search the journal…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>
          {filtered.length ? (
            <div className="blog-grid">
              {filtered.map((article) => (
                <Reveal key={article.id}>
                  <article className="panel blog-card interactive-panel h-full">
                    <Link
                      to={`/blog/${article.slug}`}
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <TechArt variant={article.art} />
                    </Link>
                    <div className="blog-card-body">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-cyan-500">
                        {article.category}
                      </span>
                      <h2 lang={bn(article.title)}>
                        <Link
                          to={`/blog/${article.slug}`}
                          className="hover:text-cyan-400"
                        >
                          {article.title}
                        </Link>
                      </h2>
                      <p lang={bn(article.excerpt)}>{article.excerpt}</p>
                      <div className="mt-5 flex flex-wrap items-center gap-3 text-[10px] text-muted">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays size={12} />
                          {formatDate(article.date)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock3 size={12} />
                          {article.readMinutes} min read
                        </span>
                      </div>
                      <Link to={`/blog/${article.slug}`} className="text-link">
                        Read article
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No articles found"
              description="Try another search, or explore all published technical guides."
              action={
                <Button
                  variant="secondary"
                  onClick={() => {
                    setCategory("All articles");
                    setQuery("");
                  }}
                >
                  Show all articles
                </Button>
              }
            />
          )}
        </div>
      </section>
    </>
  );
}

export function BlogArticle() {
  const { slug } = useParams();
  const { articles } = useDatabase();
  const article = articles.find((item) => item.slug === slug && item.published);
  const base = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");
  useSeo({
    title: article?.title || "Article not found",
    description: article?.excerpt || "Explore our technical guides.",
    noIndex: !article,
    schema: article
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.excerpt,
          datePublished: article.date,
          dateModified: article.date,
          inLanguage: bn(article.title),
          author: { "@type": "Person", name: BRAND.founder },
          publisher: { "@type": "Organization", name: BRAND.name },
          ...(base ? { url: `${base}/blog/${article.slug}` } : {}),
        }
      : undefined,
  });
  if (!article) return <NotFound />;
  const related = articles
    .filter((item) => item.published && item.id !== article.id)
    .slice(0, 3);
  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
      >
        <div className="mt-7 flex flex-wrap items-center gap-5 text-xs text-muted">
          <span className="inline-flex items-center gap-2">
            <UserRound size={14} />
            {BRAND.founder}
          </span>
          <span className="inline-flex items-center gap-2">
            <CalendarDays size={14} />
            {formatDate(article.date)}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock3 size={14} />
            {article.readMinutes} min read
          </span>
        </div>
      </PageHero>
      <section className="section">
        <div className="container-site article-layout">
          <article>
            <div className="mb-9 overflow-hidden rounded-xl border border-line">
              <TechArt variant={article.art} />
            </div>
            <div className="article-content" lang={bn(article.title)}>
              {article.sections.map((section, index) => (
                <section
                  key={`${article.id}-${index}`}
                  id={`article-section-${index}`}
                >
                  <h2 lang={bn(section.heading)}>{section.heading}</h2>
                  <p className="whitespace-pre-line" lang={bn(section.body)}>
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
            <div className="form-notice mt-9">
              <strong className="text-ink">A note on technical safety:</strong>{" "}
              This article is educational, not a substitute for equipment
              manuals, site procedures or qualified supervision. Isolate and
              verify electrical equipment before working on it.
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <Link to="/blog" className="text-link">
                <ArrowLeft size={15} />
                Back to the journal
              </Link>
              <ActionLink
                href={whatsappUrl(
                  `আসসালামু আলাইকুম, আমি “${article.title}” আর্টিকেলটি পড়েছি। এ বিষয়ে আরও জানতে চাই।`,
                )}
                variant="secondary"
              >
                <BookOpen size={15} />
                Discuss this topic
              </ActionLink>
            </div>
          </article>
          <aside className="article-sidebar">
            <div className="panel sticky top-[135px] p-6">
              <p className="eyebrow">
                <span />
                IN THIS ARTICLE
              </p>
              <nav
                aria-label="Article contents"
                className="flex flex-col gap-4"
              >
                {article.sections.map((section, index) => (
                  <a
                    key={index}
                    href={`#article-section-${index}`}
                    className="text-xs leading-6 text-muted hover:text-cyan-400"
                  >
                    <span className="mr-2 font-mono text-[9px] text-cyan-500">
                      0{index + 1}
                    </span>
                    {section.heading}
                  </a>
                ))}
              </nav>
              <div className="mt-7 border-t border-line pt-6">
                <h2 className="text-sm font-semibold">
                  Put the idea into practice.
                </h2>
                <p className="mt-3 text-xs leading-6 text-muted">
                  Explore structured training and hands-on projects.
                </p>
                <Link to="/courses" className="text-link mt-4">
                  Explore courses
                  <ArrowUpRight size={14} />
                </Link>
              </div>
              {related.length > 0 && (
                <div className="mt-7 border-t border-line pt-6">
                  <h2 className="mb-4 text-sm font-semibold">Keep reading</h2>
                  {related.map((item) => (
                    <Link
                      to={`/blog/${item.slug}`}
                      key={item.id}
                      className="mb-4 block text-xs leading-6 text-muted hover:text-cyan-400"
                      lang={bn(item.title)}
                    >
                      {item.title}
                      <ArrowUpRight size={12} className="ml-1 inline" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
