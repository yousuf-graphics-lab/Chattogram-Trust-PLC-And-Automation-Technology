import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  Download,
  Image,
  LayoutDashboard,
  LogOut,
  Settings2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useDatabase } from "../context/DatabaseContext";
import { isAdminAuthenticated, logoutAdmin } from "../lib/auth";
import { downloadJson } from "../lib/storage";
import { useSeo } from "../hooks/useSeo";
import { formatTaka } from "../data/courses";
import { Button, StatusBadge } from "../components/ui";
import { AdminEnrollments } from "./admin/Enrollments";
import {
  AdminArticles,
  AdminContent,
  AdminGallery,
  AdminNotices,
} from "./admin/Editors";
import { ConfirmDialog } from "./admin/shared";
import type { ConfirmRequest } from "./admin/shared";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "enrollments", label: "Enrollments", icon: Users },
  { id: "notices", label: "Notices", icon: Bell },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "articles", label: "Blog articles", icon: BookOpen },
  { id: "content", label: "Site content", icon: Settings2 },
] as const;
export function AdminDashboard() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(isAdminAuthenticated);
  const [params, setParams] = useSearchParams();
  const tab = tabs.some((item) => item.id === params.get("tab"))
    ? params.get("tab")!
    : "overview";
  const database = useDatabase();
  const { enrollments, notices, articles, gallery, content, storageError } =
    database;
  const [toast, setToast] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmRequest | null>(null);
  useSeo({
    title: "Admin Dashboard",
    description: "Local institute content and enrollment management.",
    noIndex: true,
  });
  useEffect(() => {
    const interval = setInterval(
      () => setAuthenticated(isAdminAuthenticated()),
      30_000,
    );
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 4500);
    return () => clearTimeout(timer);
  }, [toast]);
  if (!authenticated) return <Navigate to="/admin/login" replace />;
  const pending = enrollments.filter(
    (entry) => entry.status === "pending",
  ).length;
  const confirmed = enrollments.filter((entry) => entry.status === "confirmed");
  return (
    <div className="admin-shell">
      <section className="border-b border-line bg-surface/40 py-7">
        <div className="container-site flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow !mb-2">
              <span />
              INSTITUTE WORKSPACE
            </p>
            <p className="text-sm font-medium">
              Chattogram Trust administration
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="!min-h-10 !py-2 !text-xs"
              onClick={() => {
                downloadJson(
                  `trust-backup-${new Date().toISOString().slice(0, 10)}.json`,
                  {
                    version: 1,
                    exportedAt: new Date().toISOString(),
                    data: { enrollments, notices, articles, gallery, content },
                  },
                );
                setToast("Private backup export prepared.");
              }}
            >
              <Download size={14} />
              Export backup
            </Button>
            <Button
              variant="ghost"
              className="!min-h-10 !py-2 !text-xs"
              onClick={() => {
                logoutAdmin();
                setAuthenticated(false);
                navigate("/admin/login", { replace: true });
              }}
            >
              <LogOut size={14} />
              Sign out
            </Button>
          </div>
        </div>
      </section>
      <section className="section !pt-8">
        <div className="container-site">
          <div className="form-notice mb-7">
            <ShieldCheck size={16} className="mr-2 inline text-cyan-500" />
            <strong className="text-ink">Browser-local workspace.</strong>{" "}
            Changes affect only this browser. The client-side login is not
            secure authentication. Do not store sensitive information on shared
            devices. Export private backups before clearing browser data.
          </div>
          {storageError && (
            <p className="form-error mb-5" role="alert">
              {storageError}
            </p>
          )}
          <div className="admin-layout">
            <aside
              className="admin-sidebar"
              aria-label="Administration sections"
            >
              <nav>
                {tabs.map((item) => (
                  <button
                    key={item.id}
                    className={`admin-tab ${tab === item.id ? "active" : ""}`}
                    onClick={() =>
                      setParams(item.id === "overview" ? {} : { tab: item.id })
                    }
                    aria-current={tab === item.id ? "page" : undefined}
                  >
                    <item.icon size={16} />
                    {item.label}
                    {item.id === "enrollments" && pending > 0 && (
                      <span>{pending}</span>
                    )}
                  </button>
                ))}
              </nav>
              <Link to="/" className="admin-tab mt-7">
                <ArrowUpRight size={16} />
                View website
              </Link>
            </aside>
            <div className="admin-content">
              {tab === "overview" && (
                <>
                  <div className="admin-toolbar">
                    <div>
                      <h1>Your institute, at a glance.</h1>
                      <p>
                        A local snapshot of enrollments and published content.
                      </p>
                    </div>
                  </div>
                  <div className="admin-stats">
                    <div className="panel admin-stat">
                      <span>Total enrollments</span>
                      <strong>{enrollments.length}</strong>
                      <small>Saved in this browser</small>
                    </div>
                    <div className="panel admin-stat">
                      <span>Awaiting verification</span>
                      <strong className="text-amber-500">{pending}</strong>
                      <small>Review original receipts</small>
                    </div>
                    <div className="panel admin-stat">
                      <span>Confirmed fees</span>
                      <strong className="!text-xl">
                        {formatTaka(
                          confirmed.reduce((sum, entry) => sum + entry.fee, 0),
                        )}
                      </strong>
                      <small>Admin-confirmed records only</small>
                    </div>
                    <div className="panel admin-stat">
                      <span>Published content</span>
                      <strong>
                        {notices.length +
                          articles.filter((article) => article.published)
                            .length +
                          gallery.length}
                      </strong>
                      <small>
                        {notices.length} notices ·{" "}
                        {articles.filter((article) => article.published).length}{" "}
                        articles · {gallery.length} media
                      </small>
                    </div>
                  </div>
                  <div className="panel p-6">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <h2 className="text-base font-semibold">
                        Recent enrollments
                      </h2>
                      <button
                        className="text-link"
                        onClick={() => setParams({ tab: "enrollments" })}
                      >
                        Review all
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                    {enrollments.length ? (
                      <div className="space-y-4">
                        {[...enrollments]
                          .sort((a, b) =>
                            b.createdAt.localeCompare(a.createdAt),
                          )
                          .slice(0, 5)
                          .map((entry) => (
                            <div
                              className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 last:border-0"
                              key={entry.id}
                            >
                              <div>
                                <p className="text-sm font-medium">
                                  {entry.studentName}
                                </p>
                                <p className="mt-1 font-mono text-[10px] text-muted">
                                  {entry.transactionId}
                                </p>
                              </div>
                              <StatusBadge status={entry.status} />
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="rounded-lg border border-dashed border-line p-7 text-center">
                        <Users
                          size={26}
                          className="mx-auto mb-3 text-cyan-500"
                        />
                        <p className="text-sm">
                          No local enrollment records yet.
                        </p>
                        <p className="mt-2 text-xs leading-6 text-muted">
                          Entries from the checkout page will appear here
                          automatically.
                        </p>
                        <Link to="/checkout" className="text-link mt-4">
                          Open checkout
                          <ArrowUpRight size={13} />
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <button
                      className="panel interactive-panel p-6 text-left"
                      onClick={() => setParams({ tab: "notices" })}
                    >
                      <Bell size={21} className="mb-3 text-cyan-500" />
                      <h2 className="text-sm font-semibold">
                        Post an institute notice
                      </h2>
                      <p className="mt-2 text-xs leading-6 text-muted">
                        Keep admission and schedule information up to date.
                      </p>
                    </button>
                    <button
                      className="panel interactive-panel p-6 text-left"
                      onClick={() => setParams({ tab: "articles" })}
                    >
                      <BookOpen size={21} className="mb-3 text-cyan-500" />
                      <h2 className="text-sm font-semibold">
                        Share technical knowledge
                      </h2>
                      <p className="mt-2 text-xs leading-6 text-muted">
                        Draft, edit and publish Bangla or English articles.
                      </p>
                    </button>
                  </div>
                </>
              )}
              {tab === "enrollments" && (
                <AdminEnrollments notify={setToast} confirm={setConfirmation} />
              )}{" "}
              {tab === "notices" && (
                <AdminNotices notify={setToast} confirm={setConfirmation} />
              )}{" "}
              {tab === "gallery" && (
                <AdminGallery notify={setToast} confirm={setConfirmation} />
              )}{" "}
              {tab === "articles" && (
                <AdminArticles notify={setToast} confirm={setConfirmation} />
              )}{" "}
              {tab === "content" && <AdminContent notify={setToast} />}
            </div>
          </div>
        </div>
      </section>
      {toast && (
        <div className="toast-message" role="status">
          {toast}
        </div>
      )}
      <ConfirmDialog
        request={confirmation}
        onClose={() => setConfirmation(null)}
      />
    </div>
  );
}
