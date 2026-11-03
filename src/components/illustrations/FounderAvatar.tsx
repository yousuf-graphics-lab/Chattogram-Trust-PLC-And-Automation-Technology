/** Code-generated engineer avatar for the leadership section. */
export function FounderAvatar({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Nezam Uddin — Founder & Head Trainer">
      <defs>
        <linearGradient id="fa-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0B1226" />
          <stop offset="1" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="fa-ac" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#06B6D4" />
          <stop offset="1" stopColor="#0066FF" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="24" fill="url(#fa-bg)" />
      <circle cx="160" cy="40" r="50" fill="#0066FF" opacity="0.15" />
      <circle cx="30" cy="170" r="60" fill="#06B6D4" opacity="0.12" />
      {/* grid */}
      <g stroke="#06B6D4" strokeWidth="0.5" opacity="0.15">
        {[40, 80, 120, 160].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="200" />)}
        {[40, 80, 120, 160].map((y) => <line key={y} x1="0" y1={y} x2="200" y2={y} />)}
      </g>
      {/* body / shirt */}
      <path d="M40 200c0-38 27-60 60-60s60 22 60 60z" fill="#1E293B" />
      <path d="M40 200c0-38 27-60 60-60s60 22 60 60z" fill="none" stroke="url(#fa-ac)" strokeWidth="2" />
      {/* collar */}
      <path d="M85 145l15 20 15-20" fill="none" stroke="#06B6D4" strokeWidth="2.5" />
      {/* neck */}
      <rect x="88" y="118" width="24" height="30" rx="10" fill="#C89B7B" />
      {/* head */}
      <ellipse cx="100" cy="92" rx="34" ry="38" fill="#D9A987" />
      {/* hair */}
      <path d="M66 84c0-26 15-42 34-42s34 16 34 42c-4-14-10-20-14-22-8 6-32 8-40 2-6 4-11 10-14 20z" fill="#1F2937" />
      {/* beard */}
      <path d="M70 96c2 22 14 34 30 34s28-12 30-34c-2 14-8 20-12 22-6-4-30-4-36 0-4-2-10-8-12-22z" fill="#374151" opacity="0.85" />
      {/* glasses */}
      <g stroke="#0F172A" strokeWidth="2.5" fill="none">
        <rect x="74" y="84" width="22" height="16" rx="6" />
        <rect x="104" y="84" width="22" height="16" rx="6" />
        <path d="M96 90h8" />
      </g>
      {/* eyes */}
      <circle cx="85" cy="92" r="2.5" fill="#0F172A" />
      <circle cx="115" cy="92" r="2.5" fill="#0F172A" />
      {/* smile */}
      <path d="M90 112q10 7 20 0" fill="none" stroke="#7C4A2D" strokeWidth="2" strokeLinecap="round" />
      {/* helmet accent */}
      <path d="M64 70c4-24 18-36 36-36s32 12 36 36" fill="none" stroke="#F97316" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      {/* badge */}
      <rect x="118" y="160" width="30" height="20" rx="4" fill="#0F172A" stroke="#06B6D4" strokeWidth="1.5" />
      <circle cx="126" cy="170" r="3" fill="#22C55E" />
      <rect x="132" y="166" width="12" height="3" rx="1.5" fill="#475569" />
      <rect x="132" y="172" width="9" height="3" rx="1.5" fill="#475569" />
    </svg>
  );
}
