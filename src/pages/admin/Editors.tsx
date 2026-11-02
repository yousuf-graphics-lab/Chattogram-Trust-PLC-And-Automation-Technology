import { useState } from "react";
import {
  ArrowUpRight,
  Download,
  Eye,
  EyeOff,
  FileText,
  Pencil,
  Pin,
  Plus,
  RotateCcw,
  Trash2,
  Upload,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDatabase } from "../../context/DatabaseContext";
import type {
  ArtVariant,
  Article,
  GalleryItem,
  Notice,
  SiteContent,
} from "../../types";
import {
  isArticle,
  isGalleryItem,
  isNotice,
  isSiteContent,
  makeId,
  slugify,
  youTubeId,
} from "../../lib/validation";
import { DEFAULT_CONTENT } from "../../data/seed";
import { compressImage, formatDate } from "../../lib/utils";
import { downloadJson } from "../../lib/storage";
import { Button, EmptyState, Modal } from "../../components/ui";
import { TechArt } from "../../components/TechArt";
import type { AdminSectionProps, ConfirmRequest } from "./shared";
import { EditorFooter, getErrorMessage, SaveError } from "./shared";

type EditorProps = {
  confirm: (request: ConfirmRequest) => void;
} & AdminSectionProps;
const artOptions: ArtVariant[] = [
  "plc",
  "automation",
  "cad",
  "substation",
  "cctv",
  "solar",
  "motor",
  "scada",
];
const today = () => new Date().toISOString().slice(0, 10);
const newNotice = (): Notice => ({
  id: makeId(),
  title: "",
  body: "",
  category: "Admission",
  date: today(),
  pinned: false,
});

export function AdminNotices({ notify, confirm }: EditorProps) {
  const { notices, update } = useDatabase();
  const [draft, setDraft] = useState<Notice | null>(null);
  const [error, setError] = useState("");
  function save(event: React.FormEvent) {
    event.preventDefault();
    if (!draft) return;
    const value = {
      ...draft,
      title: draft.title.trim(),
      body: draft.body.trim(),
    };
    if (!value.title || !value.body || !value.date) {
      setError("Add a title, notice text and date.");
      return;
    }
    if (!isNotice(value)) {
      setError(
        "Check the notice fields. Keep the title under 180 characters and text under 1,800 characters.",
      );
      return;
    }
    try {
      update("notices", (current) =>
        current.some((item) => item.id === value.id)
          ? current.map((item) => (item.id === value.id ? value : item))
          : [value, ...current],
      );
      setDraft(null);
      notify("Notice saved and visible on the notice board.");
    } catch (error) {
      setError(getErrorMessage(error));
    }
  }
  const sorted = [...notices].sort(
    (a, b) =>
      Number(b.pinned) - Number(a.pinned) || b.date.localeCompare(a.date),
  );
  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1>Institute notices</h1>
          <p>Publish admission updates, schedules and general announcements.</p>
        </div>
        <Button
          onClick={() => {
            setDraft(newNotice());
            setError("");
          }}
        >
          <Plus size={16} />
          New notice
        </Button>
      </div>
      {sorted.length ? (
        <div className="panel">
          {sorted.map((notice) => (
            <div className="admin-list-item" key={notice.id}>
              <span className="skill-icon">
                {notice.pinned ? <Pin size={18} /> : <FileText size={18} />}
              </span>
              <div className="min-w-0 flex-1">
                <h3>{notice.title}</h3>
                <p>
                  {notice.category} · {formatDate(notice.date)}{" "}
                  {notice.pinned ? "· Pinned" : ""}
                </p>
              </div>
              <div className="admin-list-actions">
                <button
                  className="icon-btn"
                  aria-label={`Edit ${notice.title}`}
                  onClick={() => {
                    setDraft({ ...notice });
                    setError("");
                  }}
                >
                  <Pencil size={15} />
                </button>
                <button
                  className="icon-btn hover:!text-red-400"
                  aria-label={`Delete ${notice.title}`}
                  onClick={() =>
                    confirm({
                      title: "Delete this notice?",
                      description: `Remove “${notice.title}” from this browser’s notice board. This cannot be undone.`,
                      action: () => {
                        try {
                          update("notices", (current) =>
                            current.filter((item) => item.id !== notice.id),
                          );
                          notify("Notice deleted.");
                        } catch (error) {
                          notify(getErrorMessage(error));
                        }
                      },
                    })
                  }
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No notices published"
          description="Create a notice to keep learners informed."
        />
      )}
      <Modal
        open={!!draft}
        onClose={() => setDraft(null)}
        title={
          notices.some((item) => item.id === draft?.id)
            ? "Edit notice"
            : "Create a notice"
        }
      >
        {draft && (
          <form onSubmit={save} noValidate>
            <div className="space-y-5">
              <div>
                <label className="field-label" htmlFor="notice-title">
                  Notice title *
                </label>
                <input
                  id="notice-title"
                  className="field"
                  value={draft.title}
                  maxLength={180}
                  onChange={(event) =>
                    setDraft({ ...draft, title: event.target.value })
                  }
                  required
                  placeholder="বাংলা অথবা English শিরোনাম"
                />
              </div>
              <div>
                <label className="field-label" htmlFor="notice-body">
                  Notice text *
                </label>
                <textarea
                  id="notice-body"
                  className="field"
                  rows={6}
                  value={draft.body}
                  maxLength={1800}
                  onChange={(event) =>
                    setDraft({ ...draft, body: event.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="field-label" htmlFor="notice-category">
                    Category
                  </label>
                  <select
                    id="notice-category"
                    className="field"
                    value={draft.category}
                    onChange={(event) =>
                      setDraft({
                        ...draft,
                        category: event.target.value as Notice["category"],
                      })
                    }
                  >
                    <option>Admission</option>
                    <option>Schedule</option>
                    <option>General</option>
                  </select>
                </div>
                <div>
                  <label className="field-label" htmlFor="notice-date">
                    Notice date
                  </label>
                  <input
                    id="notice-date"
                    className="field"
                    type="date"
                    value={draft.date}
                    onChange={(event) =>
                      setDraft({ ...draft, date: event.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 text-xs text-muted">
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={draft.pinned}
                  onChange={(event) =>
                    setDraft({ ...draft, pinned: event.target.checked })
                  }
                />
                Pin this notice to the top
              </label>
            </div>
            <SaveError message={error} />
            <EditorFooter
              onClose={() => setDraft(null)}
              label="Publish notice"
            />
          </form>
        )}
      </Modal>
    </>
  );
}

const newGallery = (): GalleryItem => ({
  id: makeId(),
  title: "",
  category: "Training lab",
  type: "image",
  art: "plc",
  description: "",
});
export function AdminGallery({ notify, confirm }: EditorProps) {
  const { gallery, update } = useDatabase();
  const [draft, setDraft] = useState<GalleryItem | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function upload(file?: File) {
    if (!file || !draft) return;
    setBusy(true);
    setError("");
    try {
      const src = await compressImage(file);
      setDraft((current) =>
        current ? { ...current, src, type: "image" } : current,
      );
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setBusy(false);
    }
  }
  function save(event: React.FormEvent) {
    event.preventDefault();
    if (!draft || busy) return;
    const value = {
      ...draft,
      title: draft.title.trim(),
      description: draft.description.trim(),
      src: draft.src || undefined,
    };
    if (!value.title || !value.description) {
      setError("Add a title and a short description.");
      return;
    }
    if (value.type === "video" && (!value.src || !youTubeId(value.src))) {
      setError("Enter a valid HTTPS YouTube video URL.");
      return;
    }
    if (!isGalleryItem(value)) {
      setError(
        "Check the media details. Use a smaller image or a valid YouTube URL.",
      );
      return;
    }
    try {
      update("gallery", (current) =>
        current.some((item) => item.id === value.id)
          ? current.map((item) => (item.id === value.id ? value : item))
          : [value, ...current],
      );
      setDraft(null);
      notify("Gallery media saved.");
    } catch (error) {
      setError(getErrorMessage(error));
    }
  }
  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1>Gallery media</h1>
          <p>Add institute photos, original artwork or YouTube videos.</p>
        </div>
        <Button
          onClick={() => {
            setDraft(newGallery());
            setError("");
          }}
        >
          <Plus size={16} />
          Add media
        </Button>
      </div>
      <p className="form-notice mb-5">
        Images are resized and stored in this browser, not uploaded to a server.
        JPG, PNG and WebP are supported. Label illustrations accurately; do not
        present artwork as a facility photograph.
      </p>
      {gallery.length ? (
        <div className="panel">
          {gallery.map((item) => (
            <div className="admin-list-item" key={item.id}>
              {item.type === "image" && item.src ? (
                <img
                  src={item.src}
                  alt=""
                  className="h-12 w-20 rounded object-cover"
                />
              ) : (
                <TechArt variant={item.art} className="!w-20" />
              )}
              <div>
                <h3>{item.title}</h3>
                <p>
                  {item.category} ·{" "}
                  {item.type === "video"
                    ? "YouTube video"
                    : item.src
                      ? "Uploaded image"
                      : "Built-in illustration"}
                </p>
              </div>
              <div className="admin-list-actions">
                <button
                  className="icon-btn"
                  aria-label={`Edit ${item.title}`}
                  onClick={() => {
                    setDraft({ ...item });
                    setError("");
                  }}
                >
                  <Pencil size={15} />
                </button>
                <button
                  className="icon-btn hover:!text-red-400"
                  aria-label={`Delete ${item.title}`}
                  onClick={() =>
                    confirm({
                      title: "Remove gallery media?",
                      description: `Remove “${item.title}” from this browser’s gallery. Your original source file is not affected.`,
                      action: () => {
                        try {
                          update("gallery", (current) =>
                            current.filter((entry) => entry.id !== item.id),
                          );
                          notify("Gallery item removed.");
                        } catch (error) {
                          notify(getErrorMessage(error));
                        }
                      },
                    })
                  }
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Your gallery is empty"
          description="Add an image, video or built-in technical illustration."
        />
      )}
      <Modal
        open={!!draft}
        onClose={() => {
          if (!busy) setDraft(null);
        }}
        title={
          gallery.some((item) => item.id === draft?.id)
            ? "Edit gallery media"
            : "Add gallery media"
        }
      >
        {draft && (
          <form onSubmit={save} noValidate>
            <div className="space-y-5">
              <div>
                <label className="field-label" htmlFor="gallery-title">
                  Media title *
                </label>
                <input
                  id="gallery-title"
                  className="field"
                  maxLength={150}
                  value={draft.title}
                  onChange={(event) =>
                    setDraft({ ...draft, title: event.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="field-label" htmlFor="gallery-type">
                    Media type
                  </label>
                  <select
                    id="gallery-type"
                    className="field"
                    value={draft.type}
                    onChange={(event) =>
                      setDraft({
                        ...draft,
                        type: event.target.value as GalleryItem["type"],
                        src: undefined,
                      })
                    }
                  >
                    <option value="image">Photo / illustration</option>
                    <option value="video">YouTube video</option>
                  </select>
                </div>
                <div>
                  <label
                    className="field-label"
                    htmlFor="gallery-edit-category"
                  >
                    Category
                  </label>
                  <select
                    id="gallery-edit-category"
                    className="field"
                    value={draft.category}
                    onChange={(event) =>
                      setDraft({
                        ...draft,
                        category: event.target.value as GalleryItem["category"],
                      })
                    }
                  >
                    <option>Training lab</option>
                    <option>Automation</option>
                    <option>Design & power</option>
                    <option>Field applications</option>
                  </select>
                </div>
              </div>
              {draft.type === "image" ? (
                <div>
                  <label className="field-label" htmlFor="gallery-upload">
                    Upload a photo (optional)
                  </label>
                  <label
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-cyan-500/40 bg-cyan-500/5 px-4 py-5 text-xs text-cyan-500"
                    htmlFor="gallery-upload"
                  >
                    <Upload size={16} />
                    {busy ? "Processing image…" : "Choose JPG, PNG or WebP"}
                  </label>
                  <input
                    id="gallery-upload"
                    type="file"
                    className="sr-only"
                    accept="image/jpeg,image/png,image/webp"
                    disabled={busy}
                    onChange={(event) => {
                      void upload(event.target.files?.[0]);
                      event.target.value = "";
                    }}
                  />
                  <p className="field-hint">
                    Up to 10 MB. Automatically resized to 1,200 px for local
                    storage.
                  </p>
                  {draft.src && (
                    <button
                      type="button"
                      className="text-link mt-2"
                      onClick={() => setDraft({ ...draft, src: undefined })}
                    >
                      Use built-in artwork instead
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <label className="field-label" htmlFor="gallery-video">
                    YouTube video URL *
                  </label>
                  <input
                    id="gallery-video"
                    className="field"
                    type="url"
                    value={draft.src || ""}
                    onChange={(event) =>
                      setDraft({ ...draft, src: event.target.value })
                    }
                    placeholder="https://www.youtube.com/watch?v=…"
                  />
                  <p className="field-hint">
                    Only YouTube links are embedded. Do not paste a channel URL.
                  </p>
                </div>
              )}
              <div>
                <label className="field-label" htmlFor="gallery-art">
                  Built-in artwork / video poster
                </label>
                <select
                  id="gallery-art"
                  className="field capitalize"
                  value={draft.art}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      art: event.target.value as ArtVariant,
                    })
                  }
                >
                  {artOptions.map((art) => (
                    <option key={art} value={art}>
                      {art.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="overflow-hidden rounded-lg border border-line">
                {draft.type === "image" && draft.src ? (
                  <img
                    src={draft.src}
                    alt="Selected media preview"
                    className="max-h-52 w-full object-contain"
                  />
                ) : (
                  <TechArt variant={draft.art} />
                )}
              </div>
              <div>
                <label className="field-label" htmlFor="gallery-description">
                  Description & media credit *
                </label>
                <textarea
                  id="gallery-description"
                  className="field"
                  rows={3}
                  maxLength={1000}
                  value={draft.description}
                  onChange={(event) =>
                    setDraft({ ...draft, description: event.target.value })
                  }
                  placeholder="Describe what is shown and whether it is a photo or illustration."
                />
              </div>
            </div>
            <SaveError message={error} />
            <EditorFooter
              onClose={() => setDraft(null)}
              busy={busy}
              label="Save media"
            />
          </form>
        )}
      </Modal>
    </>
  );
}

const newArticle = (): Article => ({
  id: makeId(),
  slug: "",
  title: "",
  excerpt: "",
  category: "Technical guide",
  date: today(),
  readMinutes: 3,
  art: "plc",
  sections: [{ heading: "", body: "" }],
  published: false,
});
export function AdminArticles({ notify, confirm }: EditorProps) {
  const { articles, update } = useDatabase();
  const [draft, setDraft] = useState<Article | null>(null);
  const [error, setError] = useState("");
  function save(event: React.FormEvent) {
    event.preventDefault();
    if (!draft) return;
    const text = draft.sections
      .map((section) => `${section.heading} ${section.body}`)
      .join(" ");
    const value: Article = {
      ...draft,
      title: draft.title.trim(),
      slug: slugify(draft.slug),
      excerpt: draft.excerpt.trim(),
      category: draft.category.trim(),
      readMinutes: Math.max(1, Math.ceil(text.split(/\s+/).length / 180)),
      sections: draft.sections.map((section) => ({
        heading: section.heading.trim(),
        body: section.body.trim(),
      })),
    };
    if (
      !value.title ||
      !value.slug ||
      !value.excerpt ||
      !value.category ||
      !value.date ||
      value.sections.some((section) => !section.heading || !section.body)
    ) {
      setError(
        "Complete the title, URL slug, excerpt, category, date and every article section. Use English letters and numbers for the slug.",
      );
      return;
    }
    if (
      articles.some(
        (article) => article.slug === value.slug && article.id !== value.id,
      )
    ) {
      setError(
        "This URL slug is already used by another article. Choose a unique slug.",
      );
      return;
    }
    if (!isArticle(value)) {
      setError(
        "Check the article length: title 180, excerpt 500, section heading 180 and section text 1,800 characters maximum.",
      );
      return;
    }
    try {
      update("articles", (current) =>
        current.some((article) => article.id === value.id)
          ? current.map((article) =>
              article.id === value.id ? value : article,
            )
          : [value, ...current],
      );
      setDraft(null);
      notify(
        value.published
          ? "Article published."
          : "Draft saved. It is not visible on the public blog.",
      );
    } catch (error) {
      setError(getErrorMessage(error));
    }
  }
  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1>Technical articles</h1>
          <p>Write in Bangla or English. Save a draft or publish when ready.</p>
        </div>
        <Button
          onClick={() => {
            setDraft(newArticle());
            setError("");
          }}
        >
          <Plus size={16} />
          New article
        </Button>
      </div>
      {articles.length ? (
        <div className="panel">
          {[...articles]
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((article) => (
              <div className="admin-list-item" key={article.id}>
                <TechArt variant={article.art} />
                <div className="min-w-0 flex-1">
                  <h3>{article.title}</h3>
                  <p>
                    {formatDate(article.date)} ·{" "}
                    {article.published ? "Published" : "Draft"} ·{" "}
                    {article.category}
                  </p>
                </div>
                <div className="admin-list-actions">
                  {article.published && (
                    <Link
                      to={`/blog/${article.slug}`}
                      className="icon-btn"
                      aria-label={`View ${article.title}`}
                    >
                      <ArrowUpRight size={15} />
                    </Link>
                  )}
                  <button
                    className="icon-btn"
                    aria-label={`Edit ${article.title}`}
                    onClick={() => {
                      setDraft({
                        ...article,
                        sections: article.sections.map((section) => ({
                          ...section,
                        })),
                      });
                      setError("");
                    }}
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    className="icon-btn hover:!text-red-400"
                    aria-label={`Delete ${article.title}`}
                    onClick={() =>
                      confirm({
                        title: "Delete this article?",
                        description: `Remove “${article.title}” and its public route from this browser. This cannot be undone.`,
                        action: () => {
                          try {
                            update("articles", (current) =>
                              current.filter((item) => item.id !== article.id),
                            );
                            notify("Article deleted.");
                          } catch (error) {
                            notify(getErrorMessage(error));
                          }
                        },
                      })
                    }
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <EmptyState
          title="Start your technical journal"
          description="Create a useful guide for your learners."
        />
      )}
      <Modal
        open={!!draft}
        onClose={() => setDraft(null)}
        title={
          articles.some((article) => article.id === draft?.id)
            ? "Edit article"
            : "Create an article"
        }
        className="media-modal"
      >
        {draft && (
          <form onSubmit={save} noValidate>
            <div className="space-y-5">
              <div>
                <label className="field-label" htmlFor="article-title">
                  Article title *
                </label>
                <input
                  id="article-title"
                  className="field"
                  maxLength={180}
                  value={draft.title}
                  onChange={(event) =>
                    setDraft({ ...draft, title: event.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="article-slug">
                    URL slug *
                  </label>
                  <input
                    id="article-slug"
                    className="field"
                    maxLength={100}
                    value={draft.slug}
                    onChange={(event) =>
                      setDraft({ ...draft, slug: event.target.value })
                    }
                    placeholder="plc-learning-guide"
                  />
                  <p className="field-hint">
                    English letters, numbers and hyphens.
                  </p>
                </div>
                <div>
                  <label className="field-label" htmlFor="article-category">
                    Category *
                  </label>
                  <input
                    id="article-category"
                    className="field"
                    maxLength={50}
                    value={draft.category}
                    onChange={(event) =>
                      setDraft({ ...draft, category: event.target.value })
                    }
                    list="article-categories"
                  />
                  <datalist id="article-categories">
                    <option value="Technical guide" />
                    <option value="Getting started" />
                    <option value="Solar & energy" />
                    <option value="Institute news" />
                  </datalist>
                </div>
              </div>
              <div>
                <label className="field-label" htmlFor="article-excerpt">
                  Short excerpt *
                </label>
                <textarea
                  id="article-excerpt"
                  className="field !min-h-20"
                  rows={2}
                  maxLength={500}
                  value={draft.excerpt}
                  onChange={(event) =>
                    setDraft({ ...draft, excerpt: event.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="field-label" htmlFor="article-date">
                    Publication date
                  </label>
                  <input
                    id="article-date"
                    type="date"
                    className="field"
                    value={draft.date}
                    onChange={(event) =>
                      setDraft({ ...draft, date: event.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="article-art">
                    Poster artwork
                  </label>
                  <select
                    id="article-art"
                    className="field uppercase"
                    value={draft.art}
                    onChange={(event) =>
                      setDraft({
                        ...draft,
                        art: event.target.value as ArtVariant,
                      })
                    }
                  >
                    {artOptions.map((art) => (
                      <option key={art}>{art}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="border-t border-line pt-5">
                <h3 className="mb-4 text-sm font-semibold">Article sections</h3>
                {draft.sections.map((section, index) => (
                  <div className="admin-editor-section" key={index}>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-cyan-500">
                        Section {index + 1}
                      </span>
                      <button
                        type="button"
                        className="icon-btn !h-7 !w-7"
                        aria-label={`Remove section ${index + 1}`}
                        disabled={draft.sections.length === 1}
                        onClick={() =>
                          setDraft({
                            ...draft,
                            sections: draft.sections.filter(
                              (_, item) => item !== index,
                            ),
                          })
                        }
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <label
                      className="field-label"
                      htmlFor={`section-heading-${index}`}
                    >
                      Heading *
                    </label>
                    <input
                      id={`section-heading-${index}`}
                      className="field mb-4"
                      maxLength={180}
                      value={section.heading}
                      onChange={(event) =>
                        setDraft({
                          ...draft,
                          sections: draft.sections.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, heading: event.target.value }
                              : item,
                          ),
                        })
                      }
                    />
                    <label
                      className="field-label"
                      htmlFor={`section-body-${index}`}
                    >
                      Paragraph text *
                    </label>
                    <textarea
                      id={`section-body-${index}`}
                      className="field"
                      rows={5}
                      maxLength={1800}
                      value={section.body}
                      onChange={(event) =>
                        setDraft({
                          ...draft,
                          sections: draft.sections.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, body: event.target.value }
                              : item,
                          ),
                        })
                      }
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  disabled={draft.sections.length >= 20}
                  onClick={() =>
                    setDraft({
                      ...draft,
                      sections: [...draft.sections, { heading: "", body: "" }],
                    })
                  }
                >
                  <Plus size={14} />
                  Add section
                </Button>
                <p className="field-hint">
                  Plain text is rendered safely. Reading time is calculated
                  automatically.
                </p>
              </div>
              <label className="flex items-center gap-3 rounded-lg border border-cyan-500/25 bg-cyan-500/5 p-4 text-xs">
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={draft.published}
                  onChange={(event) =>
                    setDraft({ ...draft, published: event.target.checked })
                  }
                />
                {draft.published ? (
                  <Eye size={16} className="text-cyan-500" />
                ) : (
                  <EyeOff size={16} className="text-muted" />
                )}
                Publish this article on the public blog
              </label>
            </div>
            <SaveError message={error} />
            <EditorFooter
              onClose={() => setDraft(null)}
              label={draft.published ? "Save & publish" : "Save draft"}
            />
          </form>
        )}
      </Modal>
    </>
  );
}

export function AdminContent({ notify }: AdminSectionProps) {
  const { content, update } = useDatabase();
  const [draft, setDraft] = useState<SiteContent>({ ...content });
  const [error, setError] = useState("");
  function save(event: React.FormEvent) {
    event.preventDefault();
    const value = {
      announcement: draft.announcement.trim(),
      homeIntro: draft.homeIntro.trim(),
      aboutMission: draft.aboutMission.trim(),
      contactNote: draft.contactNote.trim(),
    };
    if (!isSiteContent(value)) {
      setError(
        "Complete all four fields. Each must contain 1–1,500 characters.",
      );
      return;
    }
    try {
      update("content", value);
      setDraft(value);
      setError("");
      notify("Website content updated in this browser.");
    } catch (error) {
      setError(getErrorMessage(error));
    }
  }
  const fields: { key: keyof SiteContent; label: string; hint: string }[] = [
    {
      key: "announcement",
      label: "Sliding announcement bar",
      hint: "Displayed at the top of every page. Bangla and English supported.",
    },
    {
      key: "homeIntro",
      label: "Homepage skills introduction",
      hint: "Appears below the “20 practical skills” heading.",
    },
    {
      key: "aboutMission",
      label: "About / mission statement",
      hint: "The main mission paragraph on the About page.",
    },
    {
      key: "contactNote",
      label: "Contact page introduction",
      hint: "The opening message on the Contact page.",
    },
  ];
  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1>Website content</h1>
          <p>Edit the public messages that keep your website current.</p>
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            downloadJson("trust-site-content.json", draft);
            notify("Site content export prepared.");
          }}
        >
          <Download size={14} />
          Export content
        </Button>
      </div>
      <form className="panel p-6" onSubmit={save} noValidate>
        <div className="space-y-6">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="field-label" htmlFor={`content-${field.key}`}>
                {field.label}
              </label>
              <textarea
                id={`content-${field.key}`}
                className="field"
                rows={field.key === "announcement" ? 2 : 4}
                maxLength={1500}
                value={draft[field.key]}
                onChange={(event) =>
                  setDraft({ ...draft, [field.key]: event.target.value })
                }
                aria-describedby={`content-${field.key}-hint`}
              />
              <p className="field-hint" id={`content-${field.key}-hint`}>
                {field.hint} {draft[field.key].length}/1,500
              </p>
            </div>
          ))}
        </div>
        <SaveError message={error} />
        <div className="mt-7 flex flex-wrap justify-between gap-3 border-t border-line pt-5">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setDraft({ ...DEFAULT_CONTENT });
              setError("");
              notify("Original text loaded in the editor. Save to apply it.");
            }}
          >
            <RotateCcw size={14} />
            Load original text
          </Button>
          <Button type="submit">Save website content</Button>
        </div>
      </form>
      <p className="form-notice mt-5">
        Institute identity, exact course fees, contact links and curriculum
        structure are defined in the source data to keep essential information
        consistent. This editor manages the announcement and editorial content
        shown across the site.
      </p>
    </>
  );
}
