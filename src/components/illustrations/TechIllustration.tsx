import type { IllustrationKind } from '@/types';

interface Props {
  kind: IllustrationKind;
  className?: string;
  /** Unique id suffix so multiple instances don't share gradient ids. */
  uid?: string;
}

/**
 * Code-generated technical illustrations (SVG).
 * Every course card, blog poster, product image and gallery placeholder
 * uses these — zero external image dependencies.
 */
export function TechIllustration({ kind, className = '', uid = 'a' }: Props) {
  const g = `ti-${kind}-${uid}`;
  return (
    <svg viewBox="0 0 400 260" className={className} role="img" aria-label={`${kind} illustration`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${g}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0B1226" />
          <stop offset="1" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id={`${g}-ac`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#06B6D4" />
          <stop offset="1" stopColor="#0066FF" />
        </linearGradient>
        <linearGradient id={`${g}-or`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F97316" />
          <stop offset="1" stopColor="#FB923C" />
        </linearGradient>
        <pattern id={`${g}-grid`} width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M22 0H0v22" fill="none" stroke="#06B6D4" strokeWidth="0.5" opacity="0.14" />
        </pattern>
      </defs>

      <rect width="400" height="260" fill={`url(#${g}-bg)`} />
      <rect width="400" height="260" fill={`url(#${g}-grid)`} />
      <circle cx="340" cy="40" r="70" fill="#0066FF" opacity="0.12" />
      <circle cx="50" cy="230" r="80" fill="#06B6D4" opacity="0.10" />

      {kind === 'plc' && <PlcScene g={g} />}
      {kind === 'vfd' && <VfdScene g={g} />}
      {kind === 'autocad' && <AutocadScene g={g} />}
      {kind === 'substation' && <SubstationScene g={g} />}
      {kind === 'cctv' && <CctvScene g={g} />}
      {kind === 'solar' && <SolarScene g={g} />}
      {kind === 'scada' && <ScadaScene g={g} />}
      {kind === 'motor' && <MotorScene g={g} />}
      {kind === 'wiring' && <WiringScene g={g} />}
      {kind === 'sensor' && <SensorScene g={g} />}
      {kind === 'hmi' && <HmiScene g={g} />}
      {kind === 'tools' && <ToolsScene g={g} />}
      {kind === 'panel' && <PanelScene g={g} />}
      {kind === 'network' && <NetworkScene g={g} />}

      {/* corner label */}
      <g fontFamily="Inter, sans-serif">
        <rect x="14" y="226" width="118" height="22" rx="6" fill="#020617" opacity="0.85" />
        <circle cx="27" cy="237" r="3.5" fill="#22D3EE">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <text x="37" y="241" fontSize="10" fill="#67E8F9" fontWeight="700" letterSpacing="1.5">
          TRUST LAB
        </text>
      </g>
    </svg>
  );
}

/* ---------------- Scenes ---------------- */

function PlcScene({ g }: { g: string }) {
  return (
    <g>
      {/* DIN rail */}
      <rect x="40" y="150" width="320" height="10" rx="2" fill="#334155" />
      {/* PLC body */}
      <rect x="70" y="60" width="150" height="92" rx="8" fill="#1E293B" stroke="#06B6D4" strokeWidth="1.5" />
      <rect x="78" y="68" width="134" height="26" rx="4" fill="#0F172A" />
      <text x="86" y="85" fontSize="11" fill="#67E8F9" fontFamily="Inter" fontWeight="700">SIEMENS S7-1200</text>
      {/* LEDs */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={i} cx={90 + i * 16} cy={106} r="4" fill={i % 3 === 0 ? '#22C55E' : i % 3 === 1 ? '#F97316' : '#06B6D4'}>
          <animate attributeName="opacity" values="1;0.25;1" dur={`${1 + i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* terminals */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={84 + i * 16} y={122} width="10" height="18" rx="2" fill="#475569" />
      ))}
      {/* IO module */}
      <rect x="232" y="70" width="90" height="82" rx="8" fill="#1E293B" stroke="#0066FF" strokeWidth="1.5" />
      <rect x="240" y="78" width="74" height="20" rx="3" fill="#0F172A" />
      <text x="246" y="92" fontSize="9" fill="#93C5FD" fontFamily="Inter" fontWeight="600">DIGITAL I/O</text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={244 + i * 17} y={106} width="11" height="34" rx="2" fill="#334155" stroke="#06B6D4" strokeWidth="0.6" />
      ))}
      {/* wires */}
      <path d="M110 152v30h180v-28" fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="6 6" className="animate-dash" />
      <path d="M150 152v44h120v-42" fill="none" stroke="#06B6D4" strokeWidth="2" strokeDasharray="6 6" className="animate-dash" />
      {/* ladder snippet */}
      <g stroke="#22D3EE" strokeWidth="2" fill="none" opacity="0.9">
        <path d="M330 60v60M370 60v60" />
        <path d="M330 75h12m16 0h12" />
        <path d="M342 70v10m16-10v10" />
        <circle cx="350" cy="100" r="6" />
        <path d="M330 100h14m12 0h14" />
      </g>
      <text x="330" y="140" fontSize="9" fill="#94A3B8" fontFamily="Inter">LADDER LOGIC</text>
    </g>
  );
}

function VfdScene({ g }: { g: string }) {
  return (
    <g>
      {/* VFD unit */}
      <rect x="60" y="50" width="120" height="150" rx="10" fill="#1E293B" stroke="#06B6D4" strokeWidth="1.5" />
      <rect x="74" y="64" width="92" height="40" rx="5" fill="#020617" stroke="#0066FF" strokeWidth="1" />
      <text x="84" y="82" fontSize="13" fill="#22D3EE" fontFamily="Inter" fontWeight="800">50.0 Hz</text>
      <text x="84" y="97" fontSize="9" fill="#94A3B8" fontFamily="Inter">RUN • FWD • 3.2A</text>
      {/* keypad */}
      <circle cx="95" cy="130" r="12" fill="#0F172A" stroke="#475569" strokeWidth="2" />
      <path d="M95 122v8l6 4" stroke="#22D3EE" strokeWidth="2" fill="none" strokeLinecap="round" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <rect key={`${r}${c}`} x={118 + c * 16} y={118 + r * 16} width="12" height="12" rx="3" fill="#334155" />
        ))
      )}
      <rect x="74" y="172" width="92" height="16" rx="4" fill="#0F172A" />
      <text x="82" y="184" fontSize="9" fill="#F97316" fontFamily="Inter" fontWeight="700">VFD • MS300</text>
      {/* motor */}
      <g>
        <rect x="230" y="110" width="110" height="70" rx="12" fill="#334155" stroke="#0066FF" strokeWidth="1.5" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={238 + i * 16} y={116} width="8" height="58" rx="2" fill="#475569" />
        ))}
        <circle cx="340" cy="145" r="26" fill="#1E293B" stroke="#06B6D4" strokeWidth="2" />
        <circle cx="340" cy="145" r="8" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
        <rect x="250" y="180" width="70" height="12" rx="3" fill="#1E293B" />
        <text x="256" y="105" fontSize="10" fill="#94A3B8" fontFamily="Inter" fontWeight="600">3-PHASE MOTOR</text>
      </g>
      {/* power cables */}
      <path d="M180 160 C 205 160 205 145 230 145" fill="none" stroke="#F97316" strokeWidth="3" strokeDasharray="8 6" className="animate-dash" />
      <path d="M180 172 C 205 172 205 158 230 158" fill="none" stroke="#06B6D4" strokeWidth="2.5" strokeDasharray="8 6" className="animate-dash" />
      {/* speed curve */}
      <path d="M60 225 q30 -30 60 -18 t60 -22 t60 -8 t60 -18" fill="none" stroke={`url(#${g}-ac)`} strokeWidth="2.5" />
      <text x="60" y="245" fontSize="9" fill="#94A3B8" fontFamily="Inter">SPEED REF 0–50 Hz • PID CONTROL</text>
    </g>
  );
}

function AutocadScene({ g }: { g: string }) {
  return (
    <g>
      {/* drawing sheet */}
      <rect x="50" y="40" width="300" height="180" rx="6" fill="#0B1226" stroke="#0066FF" strokeWidth="1.5" />
      <rect x="58" y="48" width="284" height="164" fill="none" stroke="#334155" strokeWidth="1" />
      {/* floor plan */}
      <g stroke="#22D3EE" strokeWidth="1.6" fill="none">
        <rect x="80" y="70" width="150" height="110" />
        <path d="M80 120h60M140 70v50M140 150h90M190 120v60" />
        <path d="M110 120a14 14 0 0 1 14 14" stroke="#F97316" />
        <path d="M190 150a14 14 0 0 0 -14 -14" stroke="#F97316" />
      </g>
      {/* electrical symbols */}
      <g stroke="#F97316" strokeWidth="1.5" fill="none">
        <circle cx="105" cy="95" r="6" />
        <path d="M101 91l8 8M109 91l-8 8" />
        <circle cx="170" cy="95" r="6" />
        <path d="M166 91l8 8M174 91l-8 8" />
        <circle cx="210" cy="160" r="6" />
        <path d="M206 156l8 8M214 156l-8 8" />
      </g>
      {/* SLD side */}
      <g stroke="#93C5FD" strokeWidth="1.5" fill="none">
        <path d="M270 70v100" />
        <path d="M258 85h24M258 110h24M258 135h24" />
        <circle cx="270" cy="70" r="5" />
        <rect x="262" y="150" width="16" height="12" />
      </g>
      <text x="252" y="185" fontSize="8" fill="#94A3B8" fontFamily="Inter">SLD</text>
      {/* dimension */}
      <g stroke="#64748B" strokeWidth="1">
        <path d="M80 195h150M80 191v8M230 191v8" />
      </g>
      <text x="135" y="207" fontSize="8" fill="#94A3B8" fontFamily="Inter">12,000 mm</text>
      {/* cursor */}
      <path d="M300 190l14 5-6 2-2 6z" fill="#22D3EE" />
      <text x="60" y="240" fontSize="9" fill="#67E8F9" fontFamily="Inter" fontWeight="700">AUTOCAD 2D / 3D • SLD • FLOOR PLAN</text>
    </g>
  );
}

function SubstationScene({ g }: { g: string }) {
  return (
    <g>
      {/* transformer */}
      <rect x="70" y="90" width="100" height="90" rx="8" fill="#1E293B" stroke="#0066FF" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={78 + i * 18} y={98} width="10" height="74" rx="3" fill="#334155" />
      ))}
      {/* bushings */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={88 + i * 30} y={66} width="8" height="26" rx="3" fill="#475569" />
          <circle cx={92 + i * 30} cy={64} r="5" fill="#F97316" />
        </g>
      ))}
      <text x="78" y="200" fontSize="9" fill="#94A3B8" fontFamily="Inter" fontWeight="600">11/0.4 kV • 1000 kVA</text>
      {/* RMU panel */}
      <rect x="220" y="80" width="110" height="100" rx="8" fill="#1E293B" stroke="#06B6D4" strokeWidth="1.5" />
      <rect x="230" y="90" width="42" height="36" rx="4" fill="#0F172A" />
      <rect x="278" y="90" width="42" height="36" rx="4" fill="#0F172A" />
      <circle cx="251" cy="108" r="8" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <circle cx="299" cy="108" r="8" fill="none" stroke="#F97316" strokeWidth="2" />
      <rect x="230" y="134" width="90" height="34" rx="4" fill="#0F172A" />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={244 + i * 20} cy={151} r="4" fill={i === 0 ? '#22C55E' : '#475569'}>
          {i === 0 && <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />}
        </circle>
      ))}
      <text x="228" y="200" fontSize="9" fill="#94A3B8" fontFamily="Inter" fontWeight="600">RMU / VCB PANEL</text>
      {/* bus lines */}
      <path d="M92 64V40h206v40" fill="none" stroke="#F97316" strokeWidth="2.5" />
      <path d="M122 64V48h176v32" fill="none" stroke="#06B6D4" strokeWidth="2" />
      {/* lightning */}
      <path d="M350 60l-12 24h10l-8 22 22-28h-11l9-18z" fill="#F97316" opacity="0.9" />
      <text x="60" y="240" fontSize="9" fill="#67E8F9" fontFamily="Inter" fontWeight="700">SUB-STATION • HT/LT SWITCHGEAR</text>
    </g>
  );
}

function CctvScene({ g }: { g: string }) {
  return (
    <g>
      {/* camera */}
      <g>
        <rect x="70" y="70" width="110" height="46" rx="20" fill="#1E293B" stroke="#06B6D4" strokeWidth="1.5" />
        <circle cx="164" cy="93" r="17" fill="#0F172A" stroke="#0066FF" strokeWidth="2" />
        <circle cx="164" cy="93" r="8" fill="#0066FF" opacity="0.8" />
        <circle cx="161" cy="90" r="3" fill="#67E8F9" />
        <rect x="96" y="116" width="14" height="26" rx="3" fill="#334155" />
        <rect x="80" y="140" width="46" height="8" rx="3" fill="#475569" />
        {/* IR LEDs */}
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={86 + i * 14} cy={93} r="3" fill="#F97316">
            <animate attributeName="opacity" values="0.9;0.2;0.9" dur={`${1.2 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>
      {/* view cone */}
      <path d="M181 93 L330 40 L330 150 Z" fill="#06B6D4" opacity="0.08" />
      <path d="M181 93 L330 40M181 93 L330 150" stroke="#06B6D4" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
      {/* NVR */}
      <rect x="230" y="170" width="120" height="40" rx="6" fill="#1E293B" stroke="#0066FF" strokeWidth="1.5" />
      <circle cx="248" cy="190" r="5" fill="#22C55E">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
      </circle>
      <rect x="262" y="182" width="76" height="16" rx="3" fill="#0F172A" />
      <text x="268" y="194" fontSize="9" fill="#67E8F9" fontFamily="Inter" fontWeight="700">NVR • REC</text>
      {/* monitor grid */}
      <g>
        <rect x="250" y="52" width="90" height="64" rx="5" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
        {[0, 1].map((r) =>
          [0, 1].map((c) => (
            <rect key={`${r}${c}`} x={256 + c * 40} y={58 + r * 28} width="36" height="24" rx="2" fill="#1E293B" stroke="#06B6D4" strokeWidth="0.6" />
          ))
        )}
        <rect x="284" y="116" width="22" height="8" fill="#334155" />
      </g>
      <path d="M180 100 C 220 130 220 170 230 185" fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="6 5" className="animate-dash" />
      <text x="60" y="240" fontSize="9" fill="#67E8F9" fontFamily="Inter" fontWeight="700">IP CCTV • NVR • REMOTE VIEW</text>
    </g>
  );
}

function SolarScene({ g }: { g: string }) {
  return (
    <g>
      {/* sun */}
      <circle cx="330" cy="55" r="22" fill="#F97316" opacity="0.9" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <line
          key={a}
          x1={330 + 28 * Math.cos((a * Math.PI) / 180)}
          y1={55 + 28 * Math.sin((a * Math.PI) / 180)}
          x2={330 + 38 * Math.cos((a * Math.PI) / 180)}
          y2={55 + 38 * Math.sin((a * Math.PI) / 180)}
          stroke="#FB923C"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}
      {/* panel array */}
      <g transform="translate(60 90) skewX(-12)">
        <rect width="180" height="90" rx="4" fill="#0F172A" stroke="#0066FF" strokeWidth="2" />
        {[0, 1, 2, 3].map((c) =>
          [0, 1, 2].map((r) => (
            <rect key={`${c}${r}`} x={8 + c * 43} y={8 + r * 26} width="38" height="21" rx="2" fill="#1D4ED8" opacity="0.55" stroke="#60A5FA" strokeWidth="0.7" />
          ))
        )}
      </g>
      {/* stand */}
      <path d="M100 180l-14 34M210 180l14 34M86 214h152" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
      {/* inverter + battery */}
      <rect x="270" y="130" width="60" height="50" rx="6" fill="#1E293B" stroke="#06B6D4" strokeWidth="1.5" />
      <rect x="278" y="138" width="44" height="16" rx="3" fill="#020617" />
      <text x="283" y="150" fontSize="9" fill="#22D3EE" fontFamily="Inter" fontWeight="700">5.2 kW</text>
      <circle cx="284" cy="166" r="4" fill="#22C55E">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <rect x="270" y="190" width="60" height="30" rx="5" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
      <text x="280" y="209" fontSize="9" fill="#94A3B8" fontFamily="Inter" fontWeight="600">BATTERY</text>
      {/* energy flow */}
      <path d="M240 140 C 255 140 255 150 270 152" fill="none" stroke="#F97316" strokeWidth="2.5" strokeDasharray="7 5" className="animate-dash" />
      <path d="M300 130 C 300 110 315 95 322 80" fill="none" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.7" />
      <text x="60" y="245" fontSize="9" fill="#67E8F9" fontFamily="Inter" fontWeight="700">SOLAR PV • ON/OFF-GRID • NET METERING</text>
    </g>
  );
}

function ScadaScene({ g }: { g: string }) {
  return (
    <g>
      {/* monitor */}
      <rect x="55" y="45" width="290" height="160" rx="10" fill="#0F172A" stroke="#0066FF" strokeWidth="1.5" />
      <rect x="65" y="55" width="270" height="140" rx="5" fill="#020617" />
      {/* header */}
      <rect x="65" y="55" width="270" height="20" fill="#0B1226" />
      <circle cx="76" cy="65" r="3.5" fill="#22C55E" />
      <text x="86" y="69" fontSize="9" fill="#67E8F9" fontFamily="Inter" fontWeight="700">SCADA • PLANT OVERVIEW</text>
      {/* tank */}
      <rect x="80" y="90" width="50" height="80" rx="5" fill="none" stroke="#22D3EE" strokeWidth="1.5" />
      <rect x="83" y="120" width="44" height="47" rx="3" fill="#06B6D4" opacity="0.4">
        <animate attributeName="height" values="47;30;47" dur="5s" repeatCount="indefinite" />
        <animate attributeName="y" values="120;137;120" dur="5s" repeatCount="indefinite" />
      </rect>
      <text x="84" y="185" fontSize="8" fill="#94A3B8" fontFamily="Inter">TANK 75%</text>
      {/* pump */}
      <circle cx="170" cy="140" r="16" fill="none" stroke="#22C55E" strokeWidth="2" />
      <path d="M170 128v24M158 140h24" stroke="#22C55E" strokeWidth="2" />
      <path d="M130 140h24M186 140h30" stroke="#06B6D4" strokeWidth="2" strokeDasharray="5 4" className="animate-dash" />
      {/* trend */}
      <polyline points="230,160 245,140 258,150 272,120 288,132 305,105 320,112" fill="none" stroke="#F97316" strokeWidth="2" />
      <text x="230" y="185" fontSize="8" fill="#94A3B8" fontFamily="Inter">TREND • FLOW</text>
      {/* alarms */}
      <rect x="230" y="88" width="90" height="14" rx="3" fill="#1E293B" />
      <circle cx="238" cy="95" r="3" fill="#22C55E" />
      <text x="246" y="99" fontSize="8" fill="#94A3B8" fontFamily="Inter">SYSTEM NORMAL</text>
      {/* stand */}
      <rect x="180" y="205" width="40" height="12" fill="#334155" />
      <rect x="160" y="217" width="80" height="6" rx="3" fill="#475569" />
      <text x="60" y="245" fontSize="9" fill="#67E8F9" fontFamily="Inter" fontWeight="700">SCADA • HMI • DATA LOGGING</text>
    </g>
  );
}

function MotorScene({ g }: { g: string }) {
  return (
    <g>
      {/* panel board */}
      <rect x="50" y="45" width="180" height="160" rx="8" fill="#1E293B" stroke="#0066FF" strokeWidth="1.5" />
      {/* contactors */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={66 + i * 52} y={60} width="40" height="50" rx="5" fill="#0F172A" stroke="#06B6D4" strokeWidth="1.2" />
          <rect x={72 + i * 52} y={68} width="28" height="12" rx="2" fill="#334155" />
          <circle cx={86 + i * 52} cy={94} r="6" fill={i === 1 ? '#22C55E' : '#475569'}>
            {i === 1 && <animate attributeName="opacity" values="1;0.3;1" dur="1.3s" repeatCount="indefinite" />}
          </circle>
        </g>
      ))}
      {/* overload + timer */}
      <rect x="66" y="122" width="92" height="34" rx="5" fill="#0F172A" stroke="#F97316" strokeWidth="1.2" />
      <text x="74" y="143" fontSize="9" fill="#FB923C" fontFamily="Inter" fontWeight="700">STAR-DELTA TIMER</text>
      <rect x="166" y="122" width="48" height="34" rx="5" fill="#0F172A" stroke="#475569" strokeWidth="1.2" />
      {/* buttons */}
      <circle cx="80" cy="180" r="9" fill="#22C55E" />
      <circle cx="106" cy="180" r="9" fill="#EF4444" />
      <circle cx="132" cy="180" r="9" fill="#F97316" />
      {/* motor */}
      <rect x="260" y="100" width="90" height="64" rx="12" fill="#334155" stroke="#06B6D4" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={268 + i * 15} y={106} width="7" height="52" rx="2" fill="#475569" />
      ))}
      <circle cx="352" cy="132" r="20" fill="#1E293B" stroke="#22D3EE" strokeWidth="2" />
      <circle cx="352" cy="132" r="6" fill="#0F172A" stroke="#06B6D4" strokeWidth="2" />
      <path d="M230 130h30" stroke="#F97316" strokeWidth="3" strokeDasharray="7 5" className="animate-dash" />
      <text x="262" y="92" fontSize="9" fill="#94A3B8" fontFamily="Inter" fontWeight="600">DOL • Y-Δ • FWD/REV</text>
      <text x="60" y="240" fontSize="9" fill="#67E8F9" fontFamily="Inter" fontWeight="700">MOTOR CONTROL • CONTACTORS</text>
    </g>
  );
}

function WiringScene({ g }: { g: string }) {
  return (
    <g>
      {/* DB board */}
      <rect x="70" y="50" width="130" height="150" rx="8" fill="#1E293B" stroke="#0066FF" strokeWidth="1.5" />
      <rect x="82" y="62" width="106" height="24" rx="4" fill="#0F172A" />
      <text x="90" y="78" fontSize="9" fill="#67E8F9" fontFamily="Inter" fontWeight="700">MAIN DB • 3-PH</text>
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          {[0, 1, 2, 3, 4].map((c) => (
            <rect key={c} x={86 + c * 20} y={96 + r * 24} width="14" height="16" rx="2" fill="#334155" stroke="#06B6D4" strokeWidth="0.6" />
          ))}
        </g>
      ))}
      {/* house */}
      <path d="M250 120l55-42 55 42v80h-110z" fill="#0F172A" stroke="#06B6D4" strokeWidth="1.5" />
      <rect x="288" y="150" width="34" height="50" fill="#1E293B" stroke="#475569" />
      <rect x="262" y="132" width="22" height="20" fill="#F97316" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.4s" repeatCount="indefinite" />
      </rect>
      <rect x="326" y="132" width="22" height="20" fill="#F97316" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
      </rect>
      {/* wires */}
      <path d="M200 100 C 230 100 230 130 250 135" fill="none" stroke="#EF4444" strokeWidth="2" />
      <path d="M200 120 C 230 120 230 150 250 155" fill="none" stroke="#FBBF24" strokeWidth="2" />
      <path d="M200 140 C 230 140 230 170 250 175" fill="none" stroke="#0066FF" strokeWidth="2" />
      <text x="60" y="240" fontSize="9" fill="#67E8F9" fontFamily="Inter" fontWeight="700">HOUSE WIRING • SINGLE & 3-PHASE</text>
    </g>
  );
}

function SensorScene({ g }: { g: string }) {
  return (
    <g>
      {/* proximity sensor */}
      <rect x="70" y="80" width="70" height="34" rx="16" fill="#1E293B" stroke="#06B6D4" strokeWidth="1.5" />
      <circle cx="134" cy="97" r="12" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
      <path d="M70 97H40" stroke="#475569" strokeWidth="4" />
      {/* sensing waves */}
      {[18, 30, 42].map((r, i) => (
        <path key={r} d={`M ${146 + r} 85 a ${r} ${r} 0 0 1 0 24`} fill="none" stroke="#22D3EE" strokeWidth="1.5" opacity={0.8 - i * 0.25}>
          <animate attributeName="opacity" values="0.8;0.1;0.8" dur={`${1.4 + i * 0.3}s`} repeatCount="indefinite" />
        </path>
      ))}
      {/* target */}
      <rect x="210" y="80" width="16" height="34" rx="3" fill="#F97316" />
      {/* photoelectric */}
      <rect x="70" y="150" width="60" height="40" rx="6" fill="#1E293B" stroke="#0066FF" strokeWidth="1.5" />
      <circle cx="120" cy="170" r="8" fill="#EF4444" opacity="0.8">
        <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <path d="M130 170h110" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="5 5" className="animate-dash" />
      <rect x="240" y="155" width="26" height="30" rx="4" fill="#334155" stroke="#475569" />
      {/* encoder */}
      <circle cx="320" cy="110" r="26" fill="#1E293B" stroke="#06B6D4" strokeWidth="1.5" />
      <circle cx="320" cy="110" r="10" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <line key={a} x1={320 + 12 * Math.cos((a * Math.PI) / 180)} y1={110 + 12 * Math.sin((a * Math.PI) / 180)} x2={320 + 22 * Math.cos((a * Math.PI) / 180)} y2={110 + 22 * Math.sin((a * Math.PI) / 180)} stroke="#475569" strokeWidth="2" />
      ))}
      <text x="60" y="240" fontSize="9" fill="#67E8F9" fontFamily="Inter" fontWeight="700">SENSORS • NPN/PNP • ENCODER • ANALOG</text>
    </g>
  );
}

function HmiScene({ g }: { g: string }) {
  return (
    <g>
      {/* HMI frame */}
      <rect x="70" y="45" width="260" height="165" rx="12" fill="#334155" stroke="#06B6D4" strokeWidth="2" />
      <rect x="82" y="57" width="236" height="141" rx="6" fill="#020617" />
      {/* header */}
      <rect x="82" y="57" width="236" height="22" fill="#0B1226" />
      <text x="92" y="72" fontSize="10" fill="#67E8F9" fontFamily="Inter" fontWeight="700">PROCESS MONITOR • LINE 1</text>
      <circle cx="304" cy="68" r="4" fill="#22C55E">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      {/* buttons */}
      <rect x="92" y="90" width="60" height="26" rx="6" fill="#16A34A" opacity="0.85" />
      <text x="106" y="107" fontSize="9" fill="#fff" fontFamily="Inter" fontWeight="700">START</text>
      <rect x="160" y="90" width="60" height="26" rx="6" fill="#DC2626" opacity="0.85" />
      <text x="176" y="107" fontSize="9" fill="#fff" fontFamily="Inter" fontWeight="700">STOP</text>
      {/* gauge */}
      <circle cx="270" cy="103" r="18" fill="none" stroke="#1E293B" strokeWidth="6" />
      <path d="M270 85a18 18 0 0 1 15 27" fill="none" stroke="#F97316" strokeWidth="6" strokeLinecap="round" />
      <text x="258" y="108" fontSize="9" fill="#E2E8F0" fontFamily="Inter" fontWeight="700">75%</text>
      {/* bar + trend */}
      <rect x="92" y="130" width="120" height="12" rx="4" fill="#1E293B" />
      <rect x="92" y="130" width="84" height="12" rx="4" fill={`url(#${g}-ac)`}>
        <animate attributeName="width" values="84;100;84" dur="4s" repeatCount="indefinite" />
      </rect>
      <polyline points="92,180 112,165 130,172 150,152 170,160 190,145 210,150" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <rect x="230" y="135" width="76" height="50" rx="5" fill="#0B1226" stroke="#1E293B" />
      <text x="238" y="152" fontSize="8" fill="#94A3B8" fontFamily="Inter">TEMP 68°C</text>
      <text x="238" y="166" fontSize="8" fill="#94A3B8" fontFamily="Inter">FLOW 12 m³/h</text>
      <text x="238" y="180" fontSize="8" fill="#22C55E" fontFamily="Inter">ALARM: NONE</text>
      <text x="70" y="240" fontSize="9" fill="#67E8F9" fontFamily="Inter" fontWeight="700">HMI • SCREEN DESIGN • PLC LINK</text>
    </g>
  );
}

function ToolsScene({ g }: { g: string }) {
  return (
    <g>
      {/* multimeter */}
      <rect x="80" y="60" width="90" height="140" rx="12" fill="#F97316" />
      <rect x="92" y="74" width="66" height="36" rx="5" fill="#0F172A" />
      <text x="100" y="98" fontSize="14" fill="#22D3EE" fontFamily="Inter" fontWeight="800">230.5</text>
      <circle cx="125" cy="145" r="22" fill="#1E293B" />
      <path d="M125 145l12-14" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
      <circle cx="103" cy="184" r="6" fill="#0F172A" />
      <circle cx="147" cy="184" r="6" fill="#0F172A" />
      {/* probes */}
      <path d="M103 190 C 90 220 140 225 180 215" fill="none" stroke="#EF4444" strokeWidth="2.5" />
      <path d="M147 190 C 160 225 210 228 240 210" fill="none" stroke="#0F172A" strokeWidth="2.5" />
      {/* screwdriver */}
      <g transform="rotate(24 260 120)">
        <rect x="250" y="60" width="16" height="60" rx="7" fill="#DC2626" />
        <rect x="255" y="120" width="6" height="70" fill="#94A3B8" />
      </g>
      {/* pliers */}
      <g transform="rotate(-18 320 150)">
        <path d="M310 90l14 40-8 4-12-40z" fill="#0066FF" />
        <path d="M330 90l-10 40 8 4 10-40z" fill="#0066FF" />
        <path d="M316 134l-8 50M326 134l8 50" stroke="#475569" strokeWidth="7" strokeLinecap="round" />
      </g>
      <text x="60" y="245" fontSize="9" fill="#67E8F9" fontFamily="Inter" fontWeight="700">PRO TOOLS • MULTIMETER • CRIMPING</text>
    </g>
  );
}

function PanelScene({ g }: { g: string }) {
  return (
    <g>
      {/* cabinet */}
      <rect x="90" y="40" width="220" height="180" rx="8" fill="#1E293B" stroke="#0066FF" strokeWidth="1.5" />
      {/* rows of breakers */}
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <rect x="104" y={54 + r * 52} width="192" height="40" rx="4" fill="#0F172A" />
          {[0, 1, 2, 3, 4, 5, 6].map((c) => (
            <g key={c}>
              <rect x={112 + c * 26} y={60 + r * 52} width="18" height="28" rx="3" fill="#334155" stroke="#06B6D4" strokeWidth="0.6" />
              <rect x={117 + c * 26} y={66 + r * 52} width="8" height="6" rx="1" fill={c % 3 === 0 ? '#22C55E' : '#F97316'} />
            </g>
          ))}
        </g>
      ))}
      {/* wiring ducts */}
      <rect x="100" y="46" width="6" height="168" fill="#475569" opacity="0.6" />
      <rect x="294" y="46" width="6" height="168" fill="#475569" opacity="0.6" />
      {/* safety sign */}
      <path d="M340 70l20 34h-40z" fill="#F97316" />
      <path d="M350 82l-6 12h5l-4 10 10-13h-5l4-9z" fill="#020617" />
      <text x="90" y="245" fontSize="9" fill="#67E8F9" fontFamily="Inter" fontWeight="700">CONTROL PANEL • SAFETY • TESTING</text>
    </g>
  );
}

function NetworkScene({ g }: { g: string }) {
  const nodes = [
    { x: 200, y: 70 },
    { x: 100, y: 140 },
    { x: 300, y: 140 },
    { x: 140, y: 205 },
    { x: 260, y: 205 },
  ];
  return (
    <g>
      {/* links */}
      {nodes.slice(1).map((n, i) => (
        <path key={i} d={`M200 70 L${n.x} ${n.y}`} stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="6 5" className="animate-dash" opacity="0.7" />
      ))}
      <path d="M100 140L140 205M300 140L260 205M140 205h120" stroke="#0066FF" strokeWidth="1.2" strokeDasharray="4 5" opacity="0.5" />
      {/* hub */}
      <circle cx="200" cy="70" r="24" fill="#0F172A" stroke="#06B6D4" strokeWidth="2" />
      <rect x="188" y="62" width="24" height="16" rx="3" fill="#1E293B" stroke="#22D3EE" strokeWidth="1" />
      <circle cx="200" cy="70" r="30" fill="none" stroke="#06B6D4" strokeWidth="1" opacity="0.4">
        <animate attributeName="r" values="26;36;26" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* nodes */}
      {nodes.slice(1).map((n, i) => (
        <g key={i}>
          <rect x={n.x - 20} y={n.y - 14} width="40" height="28" rx="6" fill="#1E293B" stroke={i % 2 ? '#0066FF' : '#F97316'} strokeWidth="1.5" />
          <circle cx={n.x} cy={n.y} r="4" fill={i % 2 ? '#3D8BFF' : '#FB923C'}>
            <animate attributeName="opacity" values="1;0.3;1" dur={`${1.2 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      <text x="176" y="115" fontSize="8" fill="#94A3B8" fontFamily="Inter">MODBUS TCP</text>
      <text x="60" y="245" fontSize="9" fill="#67E8F9" fontFamily="Inter" fontWeight="700">INDUSTRIAL NETWORK • MODBUS • IIoT</text>
    </g>
  );
}
