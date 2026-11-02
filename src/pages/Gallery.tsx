import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Expand,
  Film,
  Image,
  Play,
  Youtube,
} from "lucide-react";
import { BRAND } from "../data/brand";
import { useDatabase } from "../context/DatabaseContext";
import { youTubeId } from "../lib/validation";
import { useSeo } from "../hooks/useSeo";
import {
  ActionLink,
  EmptyState,
  Modal,
  PageHero,
  Reveal,
} from "../components/ui";
import { TechArt } from "../components/TechArt";

export function Gallery() {
  const { gallery } = useDatabase();
  const [filter, setFilter] = useState("All media");
  const [category, setCategory] = useState("All categories");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  useSeo({
    title: "Technical Gallery — Artwork, Photos & Videos",
    description:
      "Explore industrial automation illustrations, technical systems and institute media. View training photos and videos added by Chattogram Trust.",
  });
  const categories = [
    "All categories",
    ...new Set(gallery.map((item) => item.category)),
  ];
  const filtered = gallery.filter(
    (item) =>
      (filter === "All media" ||
        (filter === "Photos & artwork"
          ? item.type === "image"
          : item.type === "video")) &&
      (category === "All categories" || item.category === category),
  );
  const selectedIndex = filtered.findIndex((item) => item.id === selectedId);
  const selected = filtered[selectedIndex];
  const videoId =
    selected?.type === "video" && selected.src ? youTubeId(selected.src) : null;
  function step(direction: number) {
    const next =
      filtered[(selectedIndex + direction + filtered.length) % filtered.length];
    if (next) setSelectedId(next.id);
  }
  return (
    <>
      <PageHero
        eyebrow="Gallery & technical media"
        title="A closer look at"
        highlight="the technical world."
        description="Explore original technical illustrations, practical systems and institute media. For a first-hand look at the training setup, arrange a visit to our GEC lab."
      >
        <div className="mt-7 flex flex-wrap gap-2">
          <span className="tag">
            <Camera size={13} />
            Practical inspiration
          </span>
          <span className="tag">
            <Film size={13} />
            Photos & video
          </span>
        </div>
      </PageHero>
      <section className="section">
        <div className="container-site">
          <div className="filter-toolbar">
            <div className="filter-chips" aria-label="Filter gallery media">
              {[
                { name: "All media", icon: Image },
                { name: "Photos & artwork", icon: Camera },
                { name: "Videos", icon: Film },
              ].map((item) => (
                <button
                  key={item.name}
                  className={`chip ${filter === item.name ? "active" : ""}`}
                  aria-pressed={filter === item.name}
                  onClick={() => setFilter(item.name)}
                >
                  <item.icon size={14} />
                  {item.name}
                </button>
              ))}
            </div>
            <div>
              <label className="sr-only" htmlFor="gallery-category">
                Gallery category
              </label>
              <select
                id="gallery-category"
                className="field !min-h-10 !py-2 !text-xs"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
          <p className="mb-6 text-[11px] text-muted" aria-live="polite">
            {filtered.length} media items · Built-in artwork is labeled as an
            illustration.
          </p>
          {filtered.length ? (
            <div className="gallery-grid">
              {filtered.map((item) => (
                <Reveal key={item.id}>
                  <button
                    className="panel gallery-card interactive-panel w-full"
                    onClick={() => setSelectedId(item.id)}
                    aria-label={`View ${item.title}`}
                  >
                    <div className="gallery-media">
                      {item.src && item.type === "image" ? (
                        <img
                          src={item.src}
                          alt={item.title}
                          loading="lazy"
                          width="640"
                          height="380"
                        />
                      ) : (
                        <TechArt variant={item.art} />
                      )}
                      <span className="art-category">
                        {item.type === "video"
                          ? "VIDEO"
                          : item.src
                            ? "INSTITUTE MEDIA"
                            : "TECHNICAL ILLUSTRATION"}
                      </span>
                      <span className="gallery-zoom">
                        <span>
                          {item.type === "video" ? (
                            <Play size={19} />
                          ) : (
                            <Expand size={19} />
                          )}
                        </span>
                      </span>
                    </div>
                    <div className="gallery-caption">
                      <span className="text-[9px] uppercase tracking-widest text-cyan-500">
                        {item.category}
                      </span>
                      <h2>{item.title}</h2>
                      <p>
                        {item.type === "video"
                          ? "Watch the technical media"
                          : item.src
                            ? "View institute media"
                            : "Original code-generated artwork"}
                      </p>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState
              title={
                filter === "Videos"
                  ? "The video library is getting ready"
                  : "No media in this selection"
              }
              description={
                filter === "Videos"
                  ? "Institute videos will appear here when added. In the meantime, visit our YouTube channel for available content."
                  : "Try another category, or contact us to learn about the training setup."
              }
              action={
                <ActionLink href={BRAND.youtube} variant="secondary">
                  <Youtube size={16} />
                  Visit our YouTube channel
                  <ArrowUpRight size={14} />
                </ActionLink>
              }
            />
          )}
        </div>
      </section>
      <Modal
        open={!!selected}
        onClose={() => setSelectedId(null)}
        title={selected?.title || "Gallery media"}
        className="media-modal"
      >
        {selected && (
          <>
            {videoId ? (
              <iframe
                className="video-frame"
                src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
                title={selected.title}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : selected.type === "image" && selected.src ? (
              <img
                className="max-h-[65vh] w-full rounded-lg object-contain"
                src={selected.src}
                alt={selected.title}
              />
            ) : (
              <TechArt variant={selected.art} />
            )}
            <p className="media-description">{selected.description}</p>
            {selected.type === "video" && (
              <a
                href={selected.src}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link mt-3"
              >
                Open video on YouTube
                <ArrowUpRight size={13} />
              </a>
            )}
            <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
              <button
                className="text-link"
                onClick={() => step(-1)}
                disabled={filtered.length < 2}
              >
                <ArrowLeft size={14} />
                Previous
              </button>
              <span className="text-[10px] text-muted">
                {selectedIndex + 1} / {filtered.length}
              </span>
              <button
                className="text-link"
                onClick={() => step(1)}
                disabled={filtered.length < 2}
              >
                Next
                <ArrowRight size={14} />
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
