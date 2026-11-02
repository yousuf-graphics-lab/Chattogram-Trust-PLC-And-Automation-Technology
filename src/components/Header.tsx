import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Menu,
  Moon,
  Phone,
  Sun,
  Zap,
  Pause,
  Play,
} from "lucide-react";
import { BRAND, NAV_LINKS } from "../data/brand";
import { useDatabase } from "../context/DatabaseContext";
import { readTheme, writeTheme } from "../lib/storage";
import { ActionLink, Modal } from "./ui";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" aria-label={`${BRAND.name} — Home`} className="brand-logo">
      <img src="/favicon.svg" width="44" height="44" alt="" />
      <span>
        <strong>
          CHATTOGRAM <em>TRUST</em>
        </strong>
        <span>
          {compact
            ? "PLC & AUTOMATION TECHNOLOGY"
            : "PLC AUTOMATION TECHNOLOGY"}
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const { content } = useDatabase();
  const location = useLocation();
  const [announcementPaused, setAnnouncementPaused] = useState(false);
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === location.pathname;
  const setMenuOpen = (open: boolean) =>
    setMenuPath(open ? location.pathname : null);
  const [theme, setTheme] = useState<"dark" | "light">(readTheme);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#020617" : "#f5f8fc");
    try {
      writeTheme(theme);
    } catch {
      /* Theme still works without persistence. */
    }
  }, [theme]);
  return (
    <header className="site-header">
      <div className="announcement-bar">
        <div className="announcement-inner">
          <Zap size={12} className="shrink-0" />
          <div
            className={`announcement-track ${announcementPaused ? "announcement-paused" : ""}`}
          >
            <span lang="bn">{content.announcement}</span>
            <span lang="bn" aria-hidden="true">
              {content.announcement}
            </span>
          </div>
          <button
            type="button"
            className="announcement-pause"
            onClick={() => setAnnouncementPaused((value) => !value)}
            aria-label={
              announcementPaused ? "Play announcement" : "Pause announcement"
            }
            title={
              announcementPaused ? "Play announcement" : "Pause announcement"
            }
          >
            {announcementPaused ? <Play size={11} /> : <Pause size={11} />}
          </button>
          <a href={BRAND.phoneHref} className="announcement-call">
            LET’S TALK
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
      <div className="navbar">
        <div className="container-site navbar-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              type="button"
              className="icon-btn theme-toggle"
              onClick={() =>
                setTheme((value) => (value === "dark" ? "light" : "dark"))
              }
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href={BRAND.phoneHref} className="nav-phone">
              <Phone size={15} />
              <span>{BRAND.phoneDisplay}</span>
            </a>
            <ActionLink
              to="/checkout"
              variant="orange"
              className="nav-enroll !min-h-10 !px-4 !text-xs"
            >
              Enroll Now
              <ArrowUpRight size={15} />
            </ActionLink>
            <button
              className="icon-btn mobile-menu-button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <Menu size={23} />
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="Explore Chattogram Trust"
        className="mobile-nav-modal"
      >
        <nav aria-label="Mobile navigation" className="mobile-nav">
          {NAV_LINKS.map((link, index) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="font-mono text-xs text-muted">0{index + 1}</span>
              {link.label}
              <ArrowUpRight size={17} />
            </NavLink>
          ))}
        </nav>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <ActionLink
            to="/blog"
            variant="secondary"
            onClick={() => setMenuOpen(false)}
          >
            Read the blog
          </ActionLink>
          <ActionLink
            to="/notices"
            variant="secondary"
            onClick={() => setMenuOpen(false)}
          >
            Notice board
          </ActionLink>
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <ActionLink href={BRAND.phoneHref}>
            <Phone size={16} />
            {BRAND.phoneDisplay}
          </ActionLink>
          <ActionLink
            to="/checkout"
            variant="orange"
            onClick={() => setMenuOpen(false)}
          >
            Enroll Now
            <ArrowUpRight size={16} />
          </ActionLink>
        </div>
      </Modal>
    </header>
  );
}

export function RouteScroll() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const heading = document.querySelector<HTMLElement>("main h1");
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  }, [pathname]);
  return null;
}

export function NotFound() {
  return (
    <section className="container-site not-found">
      <span className="eyebrow">
        <span />
        SIGNAL NOT FOUND
      </span>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="not-found-code">
          404<span>.</span>
        </p>
        <h1>Let’s get you back on track.</h1>
        <p>This page doesn’t exist, but your next technical skill does.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ActionLink to="/">
            Back to home
            <ArrowUpRight size={16} />
          </ActionLink>
          <ActionLink to="/courses" variant="secondary">
            Explore courses
          </ActionLink>
        </div>
      </motion.div>
    </section>
  );
}
