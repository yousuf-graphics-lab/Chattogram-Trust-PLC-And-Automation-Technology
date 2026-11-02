import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Facebook,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import { BRAND, NAV_LINKS } from "../data/brand";
import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-site">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo compact />
            <p>
              Practical skills. Industrial confidence.
              <br />
              Your future in automation starts at GEC, Chattogram.
            </p>
            <p lang="bn" className="font-bangla !text-sm !leading-7">
              {BRAND.slogan}
            </p>
            <div className="social-links">
              <a
                href={BRAND.facebookProfile}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook profile — md.anas.nezam"
              >
                <Facebook size={17} />
              </a>
              <a
                href={BRAND.facebookPage}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Institute Facebook page"
              >
                <span className="text-[10px] font-bold">PAGE</span>
              </a>
              <a
                href={BRAND.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube — TrustTechBD-n7h"
              >
                <Youtube size={19} />
              </a>
            </div>
          </div>
          <div>
            <h2>Explore</h2>
            <ul>
              {NAV_LINKS.slice(0, 4).map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/products">Automation kits</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Stay informed</h2>
            <ul>
              <li>
                <Link to="/notices">Notice board</Link>
              </li>
              <li>
                <Link to="/blog">Technical blog</Link>
              </li>
              <li>
                <Link to="/gallery">Training gallery</Link>
              </li>
              <li>
                <Link to="/checkout">Online enrollment</Link>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-1.5"
                >
                  <LockKeyhole size={12} />
                  Admin login
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-contact">
            <h2>Let’s connect</h2>
            <a href={BRAND.mapUrl} target="_blank" rel="noopener noreferrer">
              <MapPin size={17} />
              <span>{BRAND.addressShort}</span>
            </a>
            <a href={BRAND.phoneHref}>
              <Phone size={15} />
              {BRAND.phoneDisplay}
            </a>
            <a href={`mailto:${BRAND.email}`}>
              <Mail size={15} />
              {BRAND.email}
            </a>
            <a
              href={BRAND.facebookProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="!text-cyan-600 dark:!text-cyan-400"
            >
              Facebook · md.anas.nezam
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © 2026 Chattogram Trust PLC & Automation Technology. All Rights
            Reserved.
          </p>
          <span>
            <span className="live-dot" />
            LEARN. BUILD. AUTOMATE.
          </span>
        </div>
      </div>
    </footer>
  );
}
