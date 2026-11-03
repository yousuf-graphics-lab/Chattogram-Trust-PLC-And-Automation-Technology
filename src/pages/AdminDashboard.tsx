import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BarChart3, Bell, BookOpen, CheckCircle2, ChevronDown, Download, FileText,
  Image as ImageIcon, LayoutDashboard, LogOut, Mail, Megaphone, Pencil,
  Plus, Search, Settings, Trash2, Users, X,
} from 'lucide-react';
import type {
  BlogPost, ContactMessage, Enrollment, EnrollmentStatus, GalleryItem,
  IllustrationKind, Notice, NoticeCategory, SiteContent,
} from '@/types';
import { useAdmin } from '@/context/AdminContext';
import { useData } from '@/context/DataContext';
import {
  DEFAULT_CONTENT, deleteEnrollment, deleteMessage, enrollmentsToCsv,
  getEnrollments, getMessages, uid, updateEnrollment, updateMessage,
} from '@/lib/storage';
import { SITE, formatDate, formatTaka } from '@/lib/site';
import { useSeo } from '@/lib/seo';
import { Logo } from '@/components/illustrations/Logo';
import { TechIllustration } from '@/components/illustrations/TechIllustration';

type Tab = 'overview' | 'enrollments' | 'notices' | 'blog' | 'gallery' | 'content' | 'messages';

const TABS: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'enrollments', label: 'Enrollments', icon: Users },
  { id: 'notices', label: 'Notices', icon: Bell },
  { id: 'blog', label: 'Blog Posts', icon: BookOpen },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  { id: 'content', label: 'Site Content', icon: Settings },
  { id: 'messages', label: 'Messages', icon: Mail },
];

const ILLUSTRATION_KINDS: IllustrationKind[] = [
  'plc', 'vfd', 'autocad', 'substation', 'cctv', 'solar', 'scada',
  'motor', 'wiring', 'sensor', 'hmi', 'tools', 'panel', 'network',
];

export default function AdminDashboard() {
  const { session, logout } = useAdmin();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useSeo({ title: 'Admin Dashboard', description: 'Chattogram Trust admin panel.', path: '/admin/dashboard' });

  const { notices, posts, gallery, content, setNotices, setPosts, setGallery, setContent } = useData();
  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => getEnrollments());
  const [messages, setMessages] = useState<ContactMessage[]>(() => getMessages());

  const refreshEnrollments = () => setEnrollments(getEnrollments());
  const refreshMessages = () => setMessages(getMessages());

  const pendingCount = enrollments.filter((e) => e.status === 'pending').length;
  const unreadCount = messages.filter((m) => !m.read).length;

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-base">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-line bg-surface transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center gap-2.5 border-b border-line px-5">
          <Logo size={36} />
          <div className="leading-tight">
            <div className="text-sm font-extrabold text-ink">Trust Admin</div>
            <div className="text-[9px] uppercase tracking-widest text-muted">Control Panel</div>
          </div>
        </div>
        <nav className="space-y-1 p-3">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => { setTab(t.id); setSidebarOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                tab === t.id ? 'bg-electric text-white shadow-glow-blue' : 'text-muted hover:bg-surface2 hover:text-ink'
              }`}
            >
              <t.icon size={17} />
              {t.label}
              {t.id === 'enrollments' && pendingCount > 0 && (
                <span className="ml-auto rounded-full bg-safety px-2 py-0.5 text-[10px] font-bold text-white">{pendingCount}</span>
              )}
              {t.id === 'messages' && unreadCount > 0 && (
                <span className="ml-auto rounded-full bg-electric px-2 py-0.5 text-[10px] font-bold text-white">{unreadCount}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-line p-3">
          <Link to="/" className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-muted hover:bg-surface2 hover:text-ink">
            <FileText size={15} /> View Website
          </Link>
          <button type="button" onClick={handleLogout} className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/10">
            <LogOut size={15} /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-base/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-line bg-surface/80 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <button type="button" className="rounded-lg border border-line p-2 text-ink lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
              <ChevronDown size={18} className="-rotate-90" />
            </button>
            <div>
              <h1 className="text-base font-extrabold text-ink">{TABS.find((t) => t.id === tab)?.label}</h1>
              <p className="text-[11px] text-muted">Welcome back, {session?.username ?? 'Admin'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-[11px] font-bold text-green-400 sm:inline-flex">
              ● Session Active
            </span>
            <button type="button" onClick={handleLogout} className="btn-outline !px-3 !py-2 text-xs">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          {tab === 'overview' && (
            <Overview
              enrollments={enrollments}
              notices={notices}
              posts={posts}
              gallery={gallery}
              messages={messages}
              onGo={setTab}
            />
          )}
          {tab === 'enrollments' && (
            <EnrollmentsTab enrollments={enrollments} onChange={refreshEnrollments} />
          )}
          {tab === 'notices' && <NoticesTab notices={notices} setNotices={setNotices} />}
          {tab === 'blog' && <BlogTab posts={posts} setPosts={setPosts} />}
          {tab === 'gallery' && <GalleryTab gallery={gallery} setGallery={setGallery} />}
          {tab === 'content' && <ContentTab content={content} setContent={setContent} />}
          {tab === 'messages' && <MessagesTab messages={messages} onChange={refreshMessages} />}
        </main>
      </div>
    </div>
  );
}

/* ================= Shared UI ================= */

function Panel({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
        <h2 className="text-base font-extrabold text-ink">{title}</h2>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="py-10 text-center text-sm text-muted">{text}</p>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

/* ================= Overview ================= */

function Overview({
  enrollments, notices, posts, gallery, messages, onGo,
}: {
  enrollments: Enrollment[]; notices: Notice[]; posts: BlogPost[];
  gallery: GalleryItem[]; messages: ContactMessage[]; onGo: (t: Tab) => void;
}) {
  const revenue = enrollments.filter((e) => e.status === 'confirmed').reduce((s, e) => s + e.fee, 0);
  const cards = [
    { label: 'Total Enrollments', value: enrollments.length, icon: Users, color: 'text-electric-400', tab: 'enrollments' as Tab },
    { label: 'Pending Verification', value: enrollments.filter((e) => e.status === 'pending').length, icon: BarChart3, color: 'text-safety', tab: 'enrollments' as Tab },
    { label: 'Confirmed Revenue', value: formatTaka(revenue), icon: CheckCircle2, color: 'text-green-400', tab: 'enrollments' as Tab },
    { label: 'Notices', value: notices.length, icon: Bell, color: 'text-glow', tab: 'notices' as Tab },
    { label: 'Blog Posts', value: posts.length, icon: BookOpen, color: 'text-electric-400', tab: 'blog' as Tab },
    { label: 'Gallery Items', value: gallery.length, icon: ImageIcon, color: 'text-glow', tab: 'gallery' as Tab },
    { label: 'Messages', value: messages.length, icon: Mail, color: 'text-safety', tab: 'messages' as Tab },
    { label: 'Unread Messages', value: messages.filter((m) => !m.read).length, icon: Megaphone, color: 'text-red-400', tab: 'messages' as Tab },
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <button key={c.label} type="button" onClick={() => onGo(c.tab)} className="card card-hover p-5 text-left">
            <div className="flex items-center justify-between">
              <c.icon size={22} className={c.color} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted">View</span>
            </div>
            <div className="mt-3 text-2xl font-extrabold text-ink">{c.value}</div>
            <div className="text-xs font-semibold text-muted">{c.label}</div>
          </button>
        ))}
      </div>

      <Panel title="Recent Enrollments" action={<button type="button" onClick={() => onGo('enrollments')} className="btn-outline !px-3 !py-1.5 text-xs">View All</button>}>
        {enrollments.length === 0 ? (
          <Empty text="No enrollments yet. They will appear here when students submit the checkout form." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
                  <th className="pb-3 pr-4 font-bold">Student</th>
                  <th className="pb-3 pr-4 font-bold">Course</th>
                  <th className="pb-3 pr-4 font-bold">TrxID</th>
                  <th className="pb-3 pr-4 font-bold">Fee</th>
                  <th className="pb-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.slice(0, 5).map((e) => (
                  <tr key={e.id} className="border-b border-line/60 last:border-0">
                    <td className="py-3 pr-4 font-semibold text-ink">{e.studentName}</td>
                    <td className="py-3 pr-4 text-muted">{e.courseName}</td>
                    <td className="py-3 pr-4 font-mono text-xs text-glow">{e.trxId}</td>
                    <td className="py-3 pr-4 text-muted">{formatTaka(e.fee)}</td>
                    <td className="py-3"><StatusBadge status={e.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}

function StatusBadge({ status }: { status: EnrollmentStatus }) {
  const map: Record<EnrollmentStatus, string> = {
    pending: 'bg-safety/15 text-safety border-safety/30',
    confirmed: 'bg-green-500/15 text-green-400 border-green-500/30',
    cancelled: 'bg-red-500/15 text-red-400 border-red-500/30',
  };
  return <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${map[status]}`}>{status}</span>;
}

/* ================= Enrollments ================= */

function EnrollmentsTab({ enrollments, onChange }: { enrollments: Enrollment[]; onChange: () => void }) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | EnrollmentStatus>('all');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return enrollments
      .filter((e) => statusFilter === 'all' || e.status === statusFilter)
      .filter((e) => !q || e.studentName.toLowerCase().includes(q) || e.mobile.includes(q) || e.trxId.toLowerCase().includes(q) || e.courseName.toLowerCase().includes(q));
  }, [enrollments, query, statusFilter]);

  const exportCsv = () => {
    const csv = enrollmentsToCsv(filtered);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ctpat-enrollments-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Panel
      title={`Enrollments (${filtered.length})`}
      action={
        <button type="button" onClick={exportCsv} className="btn-primary !px-3 !py-2 text-xs">
          <Download size={14} /> Export CSV
        </button>
      }
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input className="input !pl-10" placeholder="Search name, mobile, TrxID, course..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <select className="input sm:w-44" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <Empty text="No enrollments found." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
                <th className="pb-3 pr-4 font-bold">Student</th>
                <th className="pb-3 pr-4 font-bold">Mobile</th>
                <th className="pb-3 pr-4 font-bold">Course</th>
                <th className="pb-3 pr-4 font-bold">bKash Sender</th>
                <th className="pb-3 pr-4 font-bold">TrxID</th>
                <th className="pb-3 pr-4 font-bold">Fee</th>
                <th className="pb-3 pr-4 font-bold">Date</th>
                <th className="pb-3 pr-4 font-bold">Status</th>
                <th className="pb-3 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} className="border-b border-line/60 last:border-0 hover:bg-surface2/30">
                  <td className="py-3 pr-4 font-semibold text-ink">{e.studentName}</td>
                  <td className="py-3 pr-4 text-muted">{e.mobile}</td>
                  <td className="py-3 pr-4 text-muted">{e.courseName}</td>
                  <td className="py-3 pr-4 text-muted">{e.bkashSender}</td>
                  <td className="py-3 pr-4 font-mono text-xs text-glow">{e.trxId}</td>
                  <td className="py-3 pr-4 text-muted">{formatTaka(e.fee)}</td>
                  <td className="py-3 pr-4 text-xs text-muted">{formatDate(e.createdAt)}</td>
                  <td className="py-3 pr-4">
                    <select
                      className="rounded-lg border border-line bg-surface2 px-2 py-1.5 text-xs font-semibold text-ink"
                      value={e.status}
                      onChange={(ev) => { updateEnrollment(e.id, { status: ev.target.value as EnrollmentStatus }); onChange(); }}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3">
                    <button
                      type="button"
                      onClick={() => { if (window.confirm(`Delete enrollment for ${e.studentName}?`)) { deleteEnrollment(e.id); onChange(); } }}
                      className="rounded-lg p-2 text-red-400 transition-colors hover:bg-red-500/10"
                      aria-label="Delete enrollment"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  );
}

/* ================= Notices ================= */

const NOTICE_CATEGORIES: NoticeCategory[] = ['Admission', 'Exam', 'Holiday', 'Event', 'General'];

function NoticesTab({ notices, setNotices }: { notices: Notice[]; setNotices: (n: Notice[]) => void }) {
  const [editing, setEditing] = useState<Notice | null>(null);
  const [showForm, setShowForm] = useState(false);
  const empty: Notice = { id: '', title: '', body: '', category: 'Admission', date: new Date().toISOString().slice(0, 10), pinned: false };
  const [form, setForm] = useState<Notice>(empty);

  const openNew = () => { setEditing(null); setForm(empty); setShowForm(true); };
  const openEdit = (n: Notice) => { setEditing(n); setForm(n); setShowForm(true); };

  const save = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;
    if (editing) {
      setNotices(notices.map((n) => (n.id === editing.id ? { ...form, id: editing.id } : n)));
    } else {
      setNotices([{ ...form, id: uid('n') }, ...notices]);
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <Panel title={`Notices (${notices.length})`} action={<button type="button" onClick={openNew} className="btn-primary !px-3 !py-2 text-xs"><Plus size={14} /> Add Notice</button>}>
        {notices.length === 0 ? <Empty text="No notices yet." /> : (
          <div className="space-y-3">
            {notices.map((n) => (
              <div key={n.id} className="flex items-start justify-between gap-4 rounded-xl border border-line bg-surface2/40 p-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="chip !py-0.5">{n.category}</span>
                    <span className="text-muted">{formatDate(n.date)}</span>
                    {n.pinned && <span className="font-bold text-safety">📌 Pinned</span>}
                  </div>
                  <h3 className="font-bangla mt-1.5 text-sm font-bold text-ink">{n.title}</h3>
                  <p className="font-bangla mt-1 line-clamp-2 text-xs text-muted">{n.body}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button type="button" onClick={() => openEdit(n)} className="rounded-lg p-2 text-glow hover:bg-glow/10" aria-label="Edit"><Pencil size={15} /></button>
                  <button type="button" onClick={() => { if (window.confirm('Delete this notice?')) setNotices(notices.filter((x) => x.id !== n.id)); }} className="rounded-lg p-2 text-red-400 hover:bg-red-500/10" aria-label="Delete"><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>

      {showForm && (
        <Panel title={editing ? 'Edit Notice' : 'New Notice'} action={<button type="button" onClick={() => setShowForm(false)} className="btn-ghost !px-2 !py-1"><X size={16} /></button>}>
          <form onSubmit={save} className="space-y-4">
            <Field label="Title (Bangla)">
              <input className="input font-bangla" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </Field>
            <Field label="Body (Bangla)">
              <textarea rows={4} className="input font-bangla resize-none" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} required />
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Category">
                <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as NoticeCategory })}>
                  {NOTICE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Date">
                <input type="date" className="input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </Field>
              <Field label="Pinned">
                <label className="flex h-[46px] items-center gap-2 rounded-xl border border-line bg-surface2/60 px-4">
                  <input type="checkbox" checked={form.pinned} onChange={(e) => setForm({ ...form, pinned: e.target.checked })} className="h-4 w-4 accent-[#0066FF]" />
                  <span className="text-sm text-ink">Pin to top</span>
                </label>
              </Field>
            </div>
            <button type="submit" className="btn-primary"><CheckCircle2 size={16} /> {editing ? 'Update Notice' : 'Publish Notice'}</button>
          </form>
        </Panel>
      )}
    </div>
  );
}

/* ================= Blog ================= */

function BlogTab({ posts, setPosts }: { posts: BlogPost[]; setPosts: (p: BlogPost[]) => void }) {
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const empty: BlogPost = {
    id: '', slug: '', title: '', excerpt: '', content: '', category: 'PLC',
    author: SITE.founder, date: new Date().toISOString().slice(0, 10),
    readMinutes: 5, tags: [], poster: 'plc',
  };
  const [form, setForm] = useState<BlogPost>(empty);
  const [tagsInput, setTagsInput] = useState('');

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9\u0980-\u09FF]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);

  const openNew = () => { setEditing(null); setForm(empty); setTagsInput(''); setShowForm(true); };
  const openEdit = (p: BlogPost) => { setEditing(p); setForm(p); setTagsInput(p.tags.join(', ')); setShowForm(true); };

  const save = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
    const slug = form.slug.trim() || slugify(form.title) || uid('post');
    const post: BlogPost = { ...form, slug, tags, id: editing?.id ?? uid('b') };
    if (editing) setPosts(posts.map((p) => (p.id === editing.id ? post : p)));
    else setPosts([post, ...posts]);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <Panel title={`Blog Posts (${posts.length})`} action={<button type="button" onClick={openNew} className="btn-primary !px-3 !py-2 text-xs"><Plus size={14} /> New Post</button>}>
        {posts.length === 0 ? <Empty text="No blog posts yet." /> : (
          <div className="space-y-3">
            {posts.map((p) => (
              <div key={p.id} className="flex items-start justify-between gap-4 rounded-xl border border-line bg-surface2/40 p-4">
                <div className="flex min-w-0 gap-3">
                  <TechIllustration kind={p.poster} uid={`adm-${p.id}`} className="hidden h-16 w-24 shrink-0 rounded-lg sm:block" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="chip !py-0.5">{p.category}</span>
                      <span className="text-muted">{formatDate(p.date)}</span>
                      <span className="text-muted">/{p.slug}</span>
                    </div>
                    <h3 className="font-bangla mt-1.5 text-sm font-bold text-ink">{p.title}</h3>
                    <p className="font-bangla mt-1 line-clamp-1 text-xs text-muted">{p.excerpt}</p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button type="button" onClick={() => openEdit(p)} className="rounded-lg p-2 text-glow hover:bg-glow/10" aria-label="Edit"><Pencil size={15} /></button>
                  <button type="button" onClick={() => { if (window.confirm('Delete this post?')) setPosts(posts.filter((x) => x.id !== p.id)); }} className="rounded-lg p-2 text-red-400 hover:bg-red-500/10" aria-label="Delete"><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>

      {showForm && (
        <Panel title={editing ? 'Edit Post' : 'New Blog Post'} action={<button type="button" onClick={() => setShowForm(false)} className="btn-ghost !px-2 !py-1"><X size={16} /></button>}>
          <form onSubmit={save} className="space-y-4">
            <Field label="Title (Bangla)">
              <input className="input font-bangla" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Slug (URL)">
                <input className="input" placeholder="auto-generated-if-empty" value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} />
              </Field>
              <Field label="Category">
                <input className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              </Field>
            </div>
            <Field label="Excerpt (Bangla)">
              <textarea rows={2} className="input font-bangla resize-none" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            </Field>
            <Field label="Content (Bangla — separate paragraphs with blank lines)">
              <textarea rows={10} className="input font-bangla resize-y" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
            </Field>
            <div className="grid gap-4 sm:grid-cols-4">
              <Field label="Author">
                <input className="input" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
              </Field>
              <Field label="Date">
                <input type="date" className="input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </Field>
              <Field label="Read (min)">
                <input type="number" min={1} className="input" value={form.readMinutes} onChange={(e) => setForm({ ...form, readMinutes: Number(e.target.value) || 1 })} />
              </Field>
              <Field label="Poster SVG">
                <select className="input" value={form.poster} onChange={(e) => setForm({ ...form, poster: e.target.value as IllustrationKind })}>
                  {ILLUSTRATION_KINDS.map((k) => <option key={k}>{k}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Tags (comma separated)">
              <input className="input" placeholder="PLC, Career, Siemens" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} />
            </Field>
            <button type="submit" className="btn-primary"><CheckCircle2 size={16} /> {editing ? 'Update Post' : 'Publish Post'}</button>
          </form>
        </Panel>
      )}
    </div>
  );
}

/* ================= Gallery ================= */

function GalleryTab({ gallery, setGallery }: { gallery: GalleryItem[]; setGallery: (g: GalleryItem[]) => void }) {
  const [showForm, setShowForm] = useState(false);
  const empty: GalleryItem = {
    id: '', type: 'photo', title: '', category: 'Lab & Equipment',
    scene: 'plc', date: new Date().toISOString().slice(0, 10),
  };
  const [form, setForm] = useState<GalleryItem>(empty);
  const [uploadError, setUploadError] = useState('');

  const onFile = (file: File | undefined) => {
    setUploadError('');
    if (!file) return;
    if (file.size > 1_500_000) {
      setUploadError('Image too large (max 1.5 MB). Please compress it first.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, src: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const save = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    try {
      setGallery([{ ...form, id: uid('g') }, ...gallery]);
      setShowForm(false);
      setForm(empty);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Could not save item.');
    }
  };

  return (
    <div className="space-y-6">
      <Panel title={`Gallery (${gallery.length})`} action={<button type="button" onClick={() => { setForm(empty); setShowForm(true); }} className="btn-primary !px-3 !py-2 text-xs"><Plus size={14} /> Add Media</button>}>
        {gallery.length === 0 ? <Empty text="No gallery items." /> : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((g) => (
              <div key={g.id} className="overflow-hidden rounded-xl border border-line bg-surface2/40">
                {g.src ? (
                  <img src={g.src} alt={g.title} className="aspect-video w-full object-cover" />
                ) : (
                  <TechIllustration kind={g.scene ?? 'plc'} uid={`adm-g-${g.id}`} className="aspect-video w-full" />
                )}
                <div className="p-3">
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className={`rounded-md px-2 py-0.5 font-bold uppercase text-white ${g.type === 'video' ? 'bg-safety' : 'bg-electric'}`}>{g.type}</span>
                    <span className="text-muted">{g.category}</span>
                  </div>
                  <p className="font-bangla mt-1.5 line-clamp-1 text-xs font-bold text-ink">{g.title}</p>
                  <button
                    type="button"
                    onClick={() => { if (window.confirm('Delete this media item?')) setGallery(gallery.filter((x) => x.id !== g.id)); }}
                    className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-red-400 hover:underline"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>

      {showForm && (
        <Panel title="Add Gallery Media" action={<button type="button" onClick={() => setShowForm(false)} className="btn-ghost !px-2 !py-1"><X size={16} /></button>}>
          <form onSubmit={save} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Type">
                <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as GalleryItem['type'] })}>
                  <option value="photo">Photo</option>
                  <option value="video">Video</option>
                </select>
              </Field>
              <Field label="Category">
                <input className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              </Field>
              <Field label="Date">
                <input type="date" className="input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </Field>
            </div>
            <Field label="Title (Bangla)">
              <input className="input font-bangla" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </Field>
            {form.type === 'photo' ? (
              <>
                <Field label="Upload Image (max 1.5 MB, stored as data-URI)">
                  <input type="file" accept="image/*" className="input !py-2.5" onChange={(e) => onFile(e.target.files?.[0])} />
                </Field>
                <Field label="Or Image URL (optional)">
                  <input className="input" placeholder="https://... or /images/..." value={form.src?.startsWith('data:') ? '' : form.src ?? ''} onChange={(e) => setForm({ ...form, src: e.target.value })} />
                </Field>
                {form.src && <img src={form.src} alt="preview" className="h-32 rounded-lg border border-line object-cover" />}
              </>
            ) : (
              <>
                <Field label="External Video Link (Facebook / YouTube)">
                  <input className="input" placeholder="https://facebook.com/..." value={form.link ?? ''} onChange={(e) => setForm({ ...form, link: e.target.value })} />
                </Field>
                <Field label="Thumbnail SVG Scene">
                  <select className="input" value={form.scene} onChange={(e) => setForm({ ...form, scene: e.target.value as IllustrationKind })}>
                    {ILLUSTRATION_KINDS.map((k) => <option key={k}>{k}</option>)}
                  </select>
                </Field>
              </>
            )}
            {uploadError && <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">{uploadError}</p>}
            <button type="submit" className="btn-primary"><CheckCircle2 size={16} /> Add to Gallery</button>
          </form>
        </Panel>
      )}
    </div>
  );
}

/* ================= Site Content ================= */

function ContentTab({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
  const [form, setForm] = useState<SiteContent>(content);
  const [saved, setSaved] = useState(false);

  const save = (e: FormEvent) => {
    e.preventDefault();
    setContent(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Panel title="Homepage & Announcement Content">
      <form onSubmit={save} className="space-y-5">
        <Field label="Announcement Bar Text (Bangla)">
          <textarea rows={2} className="input font-bangla resize-none" value={form.announcement} onChange={(e) => setForm({ ...form, announcement: e.target.value })} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Hero Headline">
            <input className="input" value={form.heroHeadline} onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })} />
          </Field>
          <Field label="Hero Highlight (gradient text)">
            <input className="input" value={form.heroHighlight} onChange={(e) => setForm({ ...form, heroHighlight: e.target.value })} />
          </Field>
        </div>
        <Field label="Hero Sub-headline (English)">
          <textarea rows={2} className="input resize-none" value={form.heroSubheadline} onChange={(e) => setForm({ ...form, heroSubheadline: e.target.value })} />
        </Field>
        <Field label="Hero Sub-headline (Bangla)">
          <textarea rows={2} className="input font-bangla resize-none" value={form.heroSubheadlineBn} onChange={(e) => setForm({ ...form, heroSubheadlineBn: e.target.value })} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-4">
          <Field label="Modules (25+)">
            <input type="number" className="input" value={form.statModules} onChange={(e) => setForm({ ...form, statModules: Number(e.target.value) || 0 })} />
          </Field>
          <Field label="Practical % (100)">
            <input type="number" className="input" value={form.statPractical} onChange={(e) => setForm({ ...form, statPractical: Number(e.target.value) || 0 })} />
          </Field>
          <Field label="Students (2500+)">
            <input type="number" className="input" value={form.statStudents} onChange={(e) => setForm({ ...form, statStudents: Number(e.target.value) || 0 })} />
          </Field>
          <Field label="Districts (60+)">
            <input type="number" className="input" value={form.statDistricts} onChange={(e) => setForm({ ...form, statDistricts: Number(e.target.value) || 0 })} />
          </Field>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="btn-primary"><CheckCircle2 size={16} /> Save Content</button>
          <button type="button" onClick={() => setForm(DEFAULT_CONTENT)} className="btn-outline">Reset to Defaults</button>
          {saved && <span className="inline-flex items-center gap-1.5 text-sm font-bold text-green-400"><CheckCircle2 size={16} /> Saved!</span>}
        </div>
      </form>
    </Panel>
  );
}

/* ================= Messages ================= */

function MessagesTab({ messages, onChange }: { messages: ContactMessage[]; onChange: () => void }) {
  return (
    <Panel title={`Contact Messages (${messages.length})`}>
      {messages.length === 0 ? (
        <Empty text="No messages yet. Contact form submissions appear here." />
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`rounded-xl border p-4 ${m.read ? 'border-line bg-surface2/30' : 'border-glow/40 bg-glow/5'}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-extrabold text-ink">{m.name}</span>
                    {!m.read && <span className="rounded-full bg-electric px-2 py-0.5 text-[9px] font-bold uppercase text-white">New</span>}
                    <span className="chip !py-0.5 text-[10px]">{m.subject}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted">
                    <a href={`tel:${m.phone}`} className="hover:text-glow">{m.phone}</a>
                    {m.email && <a href={`mailto:${m.email}`} className="hover:text-glow">{m.email}</a>}
                    <span>{formatDate(m.createdAt)}</span>
                  </div>
                  <p className="font-bangla mt-2 text-sm leading-relaxed text-ink/90">{m.message}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => { updateMessage(m.id, { read: !m.read }); onChange(); }}
                    className="rounded-lg border border-line px-3 py-1.5 text-[11px] font-bold text-muted hover:text-glow"
                  >
                    {m.read ? 'Mark unread' : 'Mark read'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { if (window.confirm('Delete this message?')) { deleteMessage(m.id); onChange(); } }}
                    className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"
                    aria-label="Delete message"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}
