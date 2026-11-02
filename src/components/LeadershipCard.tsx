import { BadgeCheck, Facebook, Phone } from "lucide-react";
import { BRAND } from "../data/brand";

export function LeadershipCard() {
  return (
    <div className="leadership-panel">
      <div className="leadership-visual grid-bg">
        <div
          className="leader-avatar"
          role="img"
          aria-label="Monogram portrait placeholder for Md. Anas Nezam"
        >
          <strong>MN</strong>
          <BadgeCheck aria-hidden="true" />
        </div>
        <h3>{BRAND.profileName}</h3>
        <p>{BRAND.founder} · Founder, Owner & CEO</p>
        <span className="tag mt-4">HEAD TRAINER</span>
      </div>
      <div className="leadership-content">
        <p className="eyebrow">
          <span />
          LEARN FROM SOMEONE WHO BUILDS
        </p>
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          Real experience.
          <br />
          <span className="text-gradient">Personal guidance.</span>
        </h2>
        <blockquote lang="bn">“{BRAND.quote}”</blockquote>
        <p className="leader-quote-en">
          “I believe hands-on learning is the true strength of technical
          education.”
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {[
            "PLC & Automation",
            "Industrial Control",
            "Electrical Systems",
            "Practical Mentoring",
          ].map((item) => (
            <span className="tag" key={item}>
              {item}
            </span>
          ))}
        </div>
        <div className="leader-contact">
          <a href={BRAND.phoneHref}>
            <Phone size={14} />
            {BRAND.phoneDisplay}
          </a>
          <a
            href={BRAND.facebookProfile}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook size={14} />
            Connect on Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
