/**
 * Animated SCADA/HMI dashboard visual for the hero section.
 * Pure SVG + CSS animations — no external assets.
 */
export function HeroVisual() {
  return (
    <div className="relative">
      <div className="glass-strong relative overflow-hidden rounded-2xl p-4 shadow-glow sm:p-5">
        {/* header */}
        <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-muted">
              SCADA • TRUST LAB
            </span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 text-[10px] font-bold text-green-400">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-green-400" />
            LIVE
          </span>
        </div>

        {/* status row */}
        <div className="mb-4 grid grid-cols-4 gap-2">
          {[
            { label: 'PLC', value: 'RUN', color: 'text-green-400' },
            { label: 'VFD', value: '50Hz', color: 'text-glow' },
            { label: 'HMI', value: 'ON', color: 'text-electric-400' },
            { label: 'NET', value: 'OK', color: 'text-safety' },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-line bg-base/60 px-2 py-2 text-center">
              <div className="text-[9px] font-bold uppercase tracking-wider text-muted">{s.label}</div>
              <div className={`text-xs font-extrabold ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* main svg process */}
        <svg viewBox="0 0 420 190" className="w-full">
          <defs>
            <linearGradient id="hv-wave" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#06B6D4" />
              <stop offset="1" stopColor="#0066FF" />
            </linearGradient>
          </defs>
          {/* tank */}
          <rect x="20" y="30" width="70" height="110" rx="8" fill="none" stroke="#22D3EE" strokeWidth="2" />
          <rect x="26" y="70" width="58" height="64" rx="4" fill="#06B6D4" opacity="0.35">
            <animate attributeName="height" values="64;40;64" dur="6s" repeatCount="indefinite" />
            <animate attributeName="y" values="70;94;70" dur="6s" repeatCount="indefinite" />
          </rect>
          <text x="30" y="24" fontSize="10" fill="#94A3B8" fontFamily="Inter" fontWeight="600">TANK LEVEL</text>
          <text x="38" y="155" fontSize="11" fill="#67E8F9" fontFamily="Inter" fontWeight="700">75%</text>
          {/* pipes */}
          <path d="M90 100h50" stroke="#06B6D4" strokeWidth="3" strokeDasharray="8 6" className="animate-dash" />
          <path d="M200 100h60" stroke="#06B6D4" strokeWidth="3" strokeDasharray="8 6" className="animate-dash" />
          {/* pump */}
          <circle cx="170" cy="100" r="28" fill="#0F172A" stroke="#22C55E" strokeWidth="2.5" />
          <g className="origin-center" style={{ transformOrigin: '170px 100px', animation: 'spin 3s linear infinite' }}>
            <path d="M170 78v44M148 100h44M155 85l30 30M185 85l-30 30" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          <text x="148" y="145" fontSize="10" fill="#94A3B8" fontFamily="Inter" fontWeight="600">PUMP P-101</text>
          {/* valve */}
          <path d="M260 88l24 24-24 24z" fill="#0F172A" stroke="#F97316" strokeWidth="2" />
          <path d="M284 88l-24 24 24 24z" fill="#0F172A" stroke="#F97316" strokeWidth="2" />
          <text x="252" y="155" fontSize="10" fill="#94A3B8" fontFamily="Inter" fontWeight="600">VALVE V1</text>
          {/* trend chart */}
          <rect x="310" y="30" width="95" height="110" rx="8" fill="#020617" stroke="#1E293B" strokeWidth="1.5" />
          <polyline
            points="318,120 330,95 342,105 354,70 366,85 378,55 392,65"
            fill="none"
            stroke="url(#hv-wave)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <text x="318" y="48" fontSize="9" fill="#94A3B8" fontFamily="Inter" fontWeight="600">FLOW TREND</text>
          <text x="318" y="155" fontSize="10" fill="#67E8F9" fontFamily="Inter" fontWeight="700">12.6 m³/h</text>
          {/* alarms */}
          <rect x="20" y="165" width="385" height="18" rx="5" fill="#0B1226" />
          <circle cx="32" cy="174" r="4" fill="#22C55E">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <text x="44" y="178" fontSize="9" fill="#94A3B8" fontFamily="Inter">
            SYSTEM NORMAL • NO ACTIVE ALARMS • AUTO MODE
          </text>
        </svg>

        {/* footer metrics */}
        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-line pt-3">
          {[
            { k: 'TEMP', v: '68°C' },
            { k: 'PRESSURE', v: '2.8 bar' },
            { k: 'ENERGY', v: '4.2 kW' },
          ].map((m) => (
            <div key={m.k} className="text-center">
              <div className="text-[9px] font-bold uppercase tracking-wider text-muted">{m.k}</div>
              <div className="text-sm font-extrabold text-ink">{m.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* floating badges */}
      <div className="absolute -left-3 top-8 hidden animate-float rounded-xl border border-glow/40 bg-surface/90 px-3 py-2 shadow-glow backdrop-blur md:block">
        <div className="text-[9px] font-bold uppercase tracking-wider text-muted">Siemens</div>
        <div className="text-xs font-extrabold text-glow">S7-1200 PLC</div>
      </div>
      <div className="absolute -right-3 bottom-10 hidden animate-float rounded-xl border border-safety/40 bg-surface/90 px-3 py-2 shadow-glow-orange backdrop-blur md:block" style={{ animationDelay: '1.5s' }}>
        <div className="text-[9px] font-bold uppercase tracking-wider text-muted">Hands-on</div>
        <div className="text-xs font-extrabold text-safety">100% Practical</div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
