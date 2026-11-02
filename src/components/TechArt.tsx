import { useId } from "react";
import type { ArtVariant } from "../types";

const labels: Record<ArtVariant, string> = {
  plc: "PLC controller with connected industrial inputs and outputs",
  automation: "Integrated PLC, variable frequency drive and HMI control system",
  cad: "Electrical AutoCAD floor plan on a technical drafting workstation",
  substation: "Electrical sub-station transformer and distribution equipment",
  cctv: "Network security camera connected to a monitoring station",
  solar: "Rooftop solar photovoltaic panels and inverter system",
  motor: "Industrial motor control panel and three-phase motor",
  scada: "Supervisory control and data acquisition dashboard",
};

export function TechArt({
  variant = "plc",
  className = "",
  animated = false,
}: {
  variant?: ArtVariant;
  className?: string;
  animated?: boolean;
}) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const bg = `${id}-bg`,
    grid = `${id}-grid`,
    metal = `${id}-metal`,
    screen = `${id}-screen`,
    blue = `${id}-blue`;
  return (
    <svg
      className={`tech-art ${className}`}
      viewBox="0 0 640 380"
      role="img"
      aria-label={labels[variant]}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={bg}
          x1="0"
          y1="0"
          x2="640"
          y2="380"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#101e35" />
          <stop offset="1" stopColor="#040b17" />
        </linearGradient>
        <linearGradient id={metal} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#33475e" />
          <stop offset="0.48" stopColor="#192a3e" />
          <stop offset="1" stopColor="#0b1525" />
        </linearGradient>
        <linearGradient id={screen} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#07394c" />
          <stop offset="1" stopColor="#081828" />
        </linearGradient>
        <linearGradient id={blue} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#168bff" />
          <stop offset="1" stopColor="#0643b5" />
        </linearGradient>
        <pattern id={grid} width="28" height="28" patternUnits="userSpaceOnUse">
          <path
            d="M28 0H0V28"
            stroke="#4e83b2"
            strokeOpacity=".12"
            strokeWidth=".7"
          />
        </pattern>
      </defs>
      <rect width="640" height="380" fill={`url(#${bg})`} />
      <rect width="640" height="380" fill={`url(#${grid})`} />
      <circle cx="326" cy="190" r="140" fill="#0066ff" opacity=".045" />
      <circle
        cx="326"
        cy="190"
        r="110"
        stroke="#06b6d4"
        strokeOpacity=".1"
        strokeDasharray="3 8"
      />
      <path
        d="M28 58V28h30M582 28h30v30M28 322v30h30M582 352h30v-30"
        stroke="#22d3ee"
        strokeOpacity=".5"
      />
      <path
        d="M54 290h75l35-35h56M420 113h74l28 28h62M53 101h51l25 25"
        stroke="#06b6d4"
        strokeOpacity=".35"
        strokeWidth="1.5"
      />
      <circle cx="54" cy="290" r="4" fill="#06b6d4" />
      <circle cx="584" cy="141" r="4" fill="#0066ff" />
      {(variant === "plc" || variant === "motor") && (
        <g>
          <path
            d="M140 101l30-18h305l20 19v192l-23 15H140z"
            fill="#0b1320"
            stroke="#33465d"
          />
          <rect
            x="135"
            y="102"
            width="344"
            height="199"
            rx="8"
            fill={`url(#${metal})`}
            stroke="#42556d"
          />
          <path d="M152 131h309M152 271h309" stroke="#64748b" strokeWidth="7" />
          <path d="M152 129h309M152 269h309" stroke="#24354c" strokeWidth="3" />
          <rect x="156" y="144" width="46" height="109" rx="3" fill="#ced8e0" />
          <rect x="163" y="159" width="32" height="39" rx="2" fill="#edf4f8" />
          <path d="M172 174h14v15h-14z" fill="#243448" />
          <path d="M179 164v19" stroke="#0066ff" strokeWidth="5" />
          {[213, 243].map((x) => (
            <g key={x}>
              <rect
                x={x}
                y="145"
                width="24"
                height="108"
                rx="2"
                fill="#b8c6d1"
              />
              <rect x={x + 5} y="161" width="14" height="31" fill="#e2e8f0" />
              <path d={`M${x + 12} 166v19`} stroke="#1e3a5f" strokeWidth="5" />
              <circle cx={x + 12} cy="221" r="4" fill="#475569" />
            </g>
          ))}
          <rect
            x="280"
            y="134"
            width="130"
            height="128"
            rx="5"
            fill="#1c293a"
            stroke="#63758a"
          />
          <rect x="289" y="144" width="112" height="26" fill="#27374b" />
          <text
            x="297"
            y="161"
            fill="#d4e5f5"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="700"
          >
            TRUST · PLC
          </text>
          <rect
            x="291"
            y="181"
            width="64"
            height="42"
            rx="2"
            fill="#06151e"
            stroke="#35566a"
          />
          <path
            d="M300 192h20v9h22M300 211h13v-10h29"
            stroke="#22d3ee"
            strokeWidth="1.5"
          />
          <circle cx="300" cy="192" r="2" fill="#22d3ee" />
          <circle cx="342" cy="211" r="2" fill="#22d3ee" />
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={372 + i * 10}
              cy="185"
              r="2.5"
              fill={i === 2 ? "#f97316" : "#22d3ee"}
              className={animated ? "signal-led" : ""}
              style={{ animationDelay: `${i * 0.45}s` }}
            />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i}>
              <rect
                x={291 + i * 12}
                y="119"
                width="8"
                height="13"
                rx="1"
                fill="#142b35"
                stroke="#4e7b7b"
              />
              <rect
                x={291 + i * 12}
                y="263"
                width="8"
                height="13"
                rx="1"
                fill="#142b35"
                stroke="#4e7b7b"
              />
              <circle cx={295 + i * 12} cy="125" r="1.6" fill="#83b9b3" />
            </g>
          ))}
          <rect
            x="420"
            y="145"
            width="41"
            height="107"
            rx="3"
            fill="#243449"
            stroke="#536378"
          />
          {Array.from({ length: 6 }, (_, i) => (
            <path
              key={i}
              d={`M428 ${158 + i * 12}h24`}
              stroke="#0b1625"
              strokeWidth="4"
            />
          ))}
          <path
            d="M306 118V78c0-13 12-19 25-19h113c18 0 25 9 25 25v59M325 278v34c0 12 12 18 26 18h102c21 0 31-13 31-27v-49"
            stroke="#0066ff"
            strokeWidth="3"
          />
          <path
            d="M344 118V95c0-10 12-16 24-16h96c18 0 30 10 30 27v37"
            stroke="#f97316"
            strokeWidth="2"
          />
          <rect
            x="75"
            y="171"
            width="51"
            height="63"
            rx="5"
            fill="#172b41"
            stroke="#3a5772"
          />
          <circle cx="100" cy="191" r="10" fill="#063d36" stroke="#34d399" />
          <circle cx="100" cy="217" r="7" fill="#532324" stroke="#f87171" />
          <path d="M126 190h28M126 217h28" stroke="#06b6d4" strokeWidth="2" />
          <rect
            x="229"
            y="322"
            width="190"
            height="24"
            rx="12"
            fill="#0b2634"
            stroke="#17516a"
          />
          <circle cx="246" cy="334" r="3" fill="#22d3ee" />
          <text
            x="258"
            y="338"
            fill="#9dd9e8"
            fontSize="9"
            fontFamily="monospace"
            letterSpacing="1"
          >
            CONTROL. LOGIC. MOTION.
          </text>
        </g>
      )}
      {variant === "automation" && (
        <g>
          <path
            d="M210 274v38h247v-40M325 270v41"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeDasharray={animated ? "7 5" : undefined}
            className={animated ? "signal-path" : ""}
          />
          <rect
            x="89"
            y="109"
            width="168"
            height="169"
            rx="8"
            fill={`url(#${metal})`}
            stroke="#50637b"
          />
          <rect x="104" y="124" width="138" height="34" rx="3" fill="#1b2c42" />
          <text
            x="115"
            y="145"
            fill="#dbeafe"
            fontSize="12"
            fontFamily="monospace"
          >
            PLC CONTROLLER
          </text>
          <rect x="105" y="173" width="78" height="53" rx="3" fill="#071c2a" />
          <path
            d="M115 184h20v14h32M115 213h18v-15h34"
            stroke="#22d3ee"
            strokeWidth="2"
          />
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={204}
              cy={181 + i * 15}
              r="4"
              fill={i === 0 ? "#22d3ee" : "#24495b"}
              className={animated ? "signal-led" : ""}
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <rect
              key={i}
              x={105 + i * 13}
              y="243"
              width="9"
              height="15"
              fill="#294955"
              stroke="#679093"
              strokeWidth=".7"
            />
          ))}
          <rect
            x="294"
            y="76"
            width="133"
            height="199"
            rx="10"
            fill={`url(#${metal})`}
            stroke="#52647b"
          />
          <rect x="308" y="92" width="105" height="55" rx="4" fill="#08131e" />
          <text
            x="324"
            y="125"
            fill="#22d3ee"
            fontSize="25"
            fontFamily="monospace"
          >
            50.0
          </text>
          <text
            x="335"
            y="161"
            fill="#94a3b8"
            fontSize="10"
            fontFamily="monospace"
          >
            VFD DRIVE
          </text>
          <circle
            cx="360"
            cy="198"
            r="25"
            fill="#0c1827"
            stroke="#52687f"
            strokeWidth="4"
          />
          <circle cx="360" cy="198" r="11" fill={`url(#${blue})`} />
          <path d="M360 179v9" stroke="#22d3ee" strokeWidth="2" />
          <circle cx="325" cy="245" r="8" fill="#166534" stroke="#4ade80" />
          <circle cx="395" cy="245" r="8" fill="#7f1d1d" stroke="#f87171" />
          <rect
            x="456"
            y="134"
            width="123"
            height="112"
            rx="7"
            fill="#334155"
            stroke="#718096"
          />
          <rect
            x="466"
            y="145"
            width="103"
            height="85"
            rx="2"
            fill={`url(#${screen})`}
          />
          <path d="M476 163h83" stroke="#2b6176" />
          <text
            x="478"
            y="158"
            fill="#b3e6f3"
            fontSize="7"
            fontFamily="monospace"
          >
            PROCESS OVERVIEW
          </text>
          <rect
            x="479"
            y="178"
            width="28"
            height="24"
            rx="2"
            stroke="#22d3ee"
          />
          <path
            d="M507 190h15l8-10h16M488 203v10h52v-10"
            stroke="#0066ff"
            strokeWidth="2"
          />
          <path
            d="M478 220l12-4 10 4 13-9 12 4 13-8 18 4"
            stroke="#22d3ee"
            strokeWidth="1.5"
          />
          <text
            x="251"
            y="345"
            fill="#6ea6bd"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="2"
          >
            ONE CONNECTED SYSTEM
          </text>
        </g>
      )}
      {variant === "cad" && (
        <g>
          <path d="M121 79h386l24 216H96z" fill="#1c2d42" stroke="#63768a" />
          <rect
            x="134"
            y="92"
            width="360"
            height="185"
            rx="3"
            fill="#071827"
            stroke="#36556f"
          />
          <path d="M134 112h360" stroke="#274059" />
          <text
            x="146"
            y="105"
            fill="#8cb5cf"
            fontSize="8"
            fontFamily="monospace"
          >
            ELECTRICAL LAYOUT · FLOOR 01
          </text>
          <g stroke="#22d3ee" strokeWidth="1.4">
            <path d="M191 134h224v117H191zM276 134v55h139M276 213v38M191 201h54M333 190v61M191 232h60" />
            <path
              d="M265 189h22M245 195v17M322 215h23"
              stroke="#071827"
              strokeWidth="5"
            />
            <path
              d="M265 189a22 22 0 0 1 22 22M245 212a17 17 0 0 1 17-17M322 215a23 23 0 0 1 23-23"
              strokeWidth=".8"
            />
          </g>
          <g stroke="#f97316" strokeWidth="1" strokeDasharray="3 3">
            <path d="M216 156h35v28h55v-30h74v63h-75v-15h-61v29h-28z" />
          </g>
          {[
            ["216", "156"],
            ["306", "154"],
            ["380", "154"],
            ["244", "231"],
            ["380", "217"],
          ].map(([x, y]) => (
            <g key={x + y}>
              <circle cx={x} cy={y} r="5" stroke="#0066ff" />
              <path d={`M${+x - 3} ${+y - 3}l6 6m-6 0l6-6`} stroke="#22d3ee" />
            </g>
          ))}
          <g stroke="#56748b" strokeWidth=".7">
            <path d="M191 123h224m-224-4v8m224-8v8M177 134v117m-4-117h8m-8 117h8" />
          </g>
          <text
            x="285"
            y="121"
            fill="#8daac0"
            fontSize="7"
            fontFamily="monospace"
          >
            12 000
          </text>
          <rect x="442" y="126" width="40" height="133" fill="#11263b" />
          {Array.from({ length: 7 }, (_, i) => (
            <rect
              key={i}
              x="451"
              y={137 + i * 16}
              width="20"
              height="8"
              rx="1"
              fill={i === 2 ? "#075d79" : "#1d3b52"}
            />
          ))}
          <path
            d="M96 295h435l34 28c4 5 0 10-7 10H78c-8 0-12-6-6-11z"
            fill={`url(#${metal})`}
            stroke="#53657b"
          />
          <path d="M135 304h340l16 17H119z" fill="#0b1829" />
          {Array.from({ length: 13 }, (_, i) => (
            <path key={i} d={`M${140 + i * 25} 305l-5 15`} stroke="#365069" />
          ))}
          <path d="M270 325h83l5 5h-93z" fill="#344960" />
          <rect
            x="462"
            y="61"
            width="94"
            height="38"
            rx="5"
            fill="#093245"
            stroke="#17617c"
          />
          <text
            x="476"
            y="84"
            fill="#67e8f9"
            fontSize="10"
            fontFamily="monospace"
          >
            2D + 3D
          </text>
        </g>
      )}
      {variant === "substation" && (
        <g>
          <path d="M87 298h470M104 307h441" stroke="#3a526b" strokeWidth="2" />
          <path
            d="M138 283V89m-28 30h56m-65 35h74m-54-61l35 59m-1-59l-35 59M477 283V89m-28 30h56m-65 35h74m-54-61l35 59m-1-59l-35 59"
            stroke="#668098"
            strokeWidth="4"
          />
          <path
            d="M121 119c125 47 247 47 374 0M121 154c125 47 247 47 374 0"
            stroke="#0066ff"
            strokeWidth="2"
          />
          <rect
            x="221"
            y="176"
            width="169"
            height="113"
            rx="6"
            fill={`url(#${metal})`}
            stroke="#647b91"
          />
          {Array.from({ length: 10 }, (_, i) => (
            <rect
              key={i}
              x={210 + i * 19}
              y="192"
              width="10"
              height="86"
              rx="3"
              fill="#263e55"
              stroke="#4a657e"
            />
          ))}
          <rect x="247" y="164" width="117" height="21" rx="3" fill="#35526a" />
          {[254, 302, 350].map((x) => (
            <g key={x}>
              <path d={`M${x} 164v-44`} stroke="#839bb0" strokeWidth="8" />
              {[0, 1, 2, 3].map((i) => (
                <rect
                  key={i}
                  x={x - 9}
                  y={126 + i * 8}
                  width="18"
                  height="4"
                  rx="2"
                  fill="#5c829b"
                />
              ))}
            </g>
          ))}
          <rect
            x="422"
            y="209"
            width="91"
            height="81"
            rx="4"
            fill="#263a50"
            stroke="#658099"
          />
          <rect x="434" y="222" width="66" height="25" fill="#071e2e" />
          <path d="M443 236h12l5-6 7 10 7-7h15" stroke="#22d3ee" />
          <circle cx="445" cy="267" r="5" fill="#22d3ee" />
          <circle cx="465" cy="267" r="5" fill="#f97316" />
          <path
            d="M304 290v19h-30m15-10v18m-8-2h16"
            stroke="#22d3ee"
            strokeWidth="2"
          />
          <rect
            x="205"
            y="325"
            width="225"
            height="23"
            rx="11"
            fill="#0b2634"
            stroke="#17516a"
          />
          <text
            x="225"
            y="340"
            fill="#9dd9e8"
            fontSize="9"
            fontFamily="monospace"
            letterSpacing="1"
          >
            POWER · PROTECTION · RELIABILITY
          </text>
        </g>
      )}
      {variant === "solar" && (
        <g>
          <circle cx="487" cy="79" r="26" fill="#f97316" opacity=".13" />
          <circle cx="487" cy="79" r="16" fill="#f97316" />
          {Array.from({ length: 8 }, (_, i) => (
            <path
              key={i}
              d="M487 48v-9"
              stroke="#fb923c"
              strokeWidth="2"
              transform={`rotate(${i * 45} 487 79)`}
            />
          ))}
          <path
            d="M111 231l177-94 228 77-170 113z"
            fill="#22384d"
            stroke="#577087"
          />
          <path
            d="M111 231v20l235 96 170-112v-21L346 327z"
            fill="#122337"
            stroke="#334b63"
          />
          <path
            d="M142 224l146-73 188 65-137 85z"
            fill="#063775"
            stroke="#398cde"
            strokeWidth="2"
          />
          <g stroke="#3d8cce" strokeWidth=".8">
            {[1, 2, 3, 4, 5].map((i) => (
              <path key={i} d={`M${142 + i * 31.3} ${224 + i * 10.2}l146-73`} />
            ))}
            {[1, 2, 3].map((i) => (
              <path
                key={i}
                d={`M${142 + i * 36.5} ${224 - i * 18.25}l188 65`}
              />
            ))}
          </g>
          <path
            d="M146 228l192 72 137-84"
            stroke="#22d3ee"
            strokeOpacity=".45"
          />
          <rect
            x="86"
            y="264"
            width="71"
            height="67"
            rx="6"
            fill={`url(#${metal})`}
            stroke="#62788f"
          />
          <rect x="99" y="276" width="45" height="22" rx="2" fill="#072235" />
          <text
            x="105"
            y="291"
            fill="#22d3ee"
            fontSize="10"
            fontFamily="monospace"
          >
            5.0kW
          </text>
          <path d="M103 313h37" stroke="#0b1727" strokeWidth="5" />
          <path
            d="M157 298h31l24 26h63"
            stroke="#f97316"
            strokeWidth="2"
            strokeDasharray="5 4"
            className={animated ? "signal-path" : ""}
          />
          <rect
            x="421"
            y="285"
            width="97"
            height="39"
            rx="5"
            fill="#0c2b38"
            stroke="#226376"
          />
          <text
            x="435"
            y="309"
            fill="#67e8f9"
            fontSize="10"
            fontFamily="monospace"
          >
            CLEAN ENERGY
          </text>
        </g>
      )}
      {variant === "cctv" && (
        <g>
          <path d="M135 107v100l78 26" stroke="#536a82" strokeWidth="12" />
          <path d="M135 107v100l78 26" stroke="#263b51" strokeWidth="6" />
          <path
            d="M168 92l136 14 66 42-25 59-153-35-35-32z"
            fill={`url(#${metal})`}
            stroke="#72869c"
          />
          <path d="M168 92l136 14 66 42-159-18z" fill="#4a6178" />
          <path
            d="M211 130l159 18-25 59-153-35z"
            fill="#1c3148"
            stroke="#526c85"
          />
          <ellipse
            cx="345"
            cy="175"
            rx="23"
            ry="29"
            transform="rotate(20 345 175)"
            fill="#071421"
            stroke="#7c92a7"
            strokeWidth="5"
          />
          <ellipse
            cx="345"
            cy="175"
            rx="12"
            ry="17"
            transform="rotate(20 345 175)"
            fill="#064b6a"
            stroke="#22d3ee"
          />
          <circle cx="342" cy="169" r="4" fill="#67e8f9" />
          <path d="M376 166l125-35v141l-125-52" fill="#06b6d4" opacity=".06" />
          <path
            d="M395 149a43 43 0 0 1 10 49M410 135a63 63 0 0 1 15 76"
            stroke="#22d3ee"
            strokeOpacity=".55"
            strokeWidth="2"
          />
          <rect
            x="228"
            y="268"
            width="205"
            height="49"
            rx="6"
            fill={`url(#${metal})`}
            stroke="#4f6982"
          />
          <rect x="244" y="282" width="104" height="15" rx="2" fill="#081727" />
          <text
            x="253"
            y="293"
            fill="#22d3ee"
            fontSize="9"
            fontFamily="monospace"
          >
            REC 00:24:08
          </text>
          <circle
            cx="407"
            cy="291"
            r="5"
            fill="#22d3ee"
            className={animated ? "signal-led" : ""}
          />
          <path
            d="M331 210v30h-42v27"
            stroke="#0066ff"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
          <rect
            x="88"
            y="276"
            width="99"
            height="37"
            rx="5"
            fill="#0b2634"
            stroke="#17516a"
          />
          <text
            x="102"
            y="299"
            fill="#9dd9e8"
            fontSize="10"
            fontFamily="monospace"
          >
            IP · PoE · NVR
          </text>
        </g>
      )}
      {variant === "scada" && (
        <g>
          <rect
            x="99"
            y="72"
            width="443"
            height="238"
            rx="10"
            fill={`url(#${metal})`}
            stroke="#667e94"
          />
          <rect x="112" y="86" width="416" height="206" rx="3" fill="#071724" />
          <path d="M112 115h416" stroke="#26465d" />
          <text
            x="127"
            y="105"
            fill="#b6d9ea"
            fontSize="10"
            fontFamily="monospace"
          >
            TRUST / PROCESS SUPERVISOR
          </text>
          <circle cx="511" cy="101" r="4" fill="#22d3ee" />
          <rect x="126" y="130" width="94" height="147" rx="3" fill="#10283b" />
          {["SYSTEM ONLINE", "PLC CONNECTED", "DRIVE READY", "ALARMS: 00"].map(
            (text, i) => (
              <g key={text}>
                <rect
                  x="137"
                  y={144 + i * 31}
                  width="72"
                  height="20"
                  rx="3"
                  fill="#10383e"
                />
                <text
                  x="142"
                  y={157 + i * 31}
                  fill="#7dd3c7"
                  fontSize="6"
                  fontFamily="monospace"
                >
                  {text}
                </text>
              </g>
            ),
          )}
          <path
            d="M260 160h58v64h-58zM375 160h58v64h-58zM319 192h55M433 192h47v62h-83"
            stroke="#0066ff"
            strokeWidth="3"
          />
          <path
            d="M268 197q20-13 42 0M383 197q20-13 42 0"
            stroke="#22d3ee"
            strokeWidth="2"
          />
          <circle cx="347" cy="192" r="11" fill="#123c51" stroke="#22d3ee" />
          <path d="M342 186l11 6-11 6z" fill="#22d3ee" />
          <path
            d="M245 265l20-5 20 5 23-18 20 5 21-11 25 7 24-19 27 6 20-8 34 5"
            stroke="#22d3ee"
            strokeWidth="2"
          />
          <path
            d="M278 310v21h86v-21M260 336h124"
            stroke="#536b82"
            strokeWidth="6"
          />
        </g>
      )}
      <text
        x="40"
        y="48"
        fill="#56839f"
        fontFamily="monospace"
        fontSize="8"
        letterSpacing="1.5"
      >
        CT / TECHNICAL SERIES
      </text>
      <text x="536" y="338" fill="#40627e" fontFamily="monospace" fontSize="8">
        {String(Object.keys(labels).indexOf(variant) + 1).padStart(2, "0")} / 08
      </text>
    </svg>
  );
}

export function HeroArt() {
  return (
    <div className="hero-art-wrap">
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />
      <div className="hero-art-label">
        <span className="live-dot" />
        INDUSTRIAL TRAINING, REIMAGINED
      </div>
      <TechArt variant="plc" animated className="hero-art" />
      <div className="hero-art-card hero-art-card-top">
        <span className="live-dot" />
        <div>
          <strong>System online</strong>
          <small>REAL SKILLS. REAL CONTROL.</small>
        </div>
      </div>
      <div className="hero-art-card hero-art-card-bottom">
        <span className="hero-mini-code">&lt;/&gt;</span>
        <div>
          <strong>Ladder → Logic → Motion</strong>
          <small>Learn it. Wire it. Make it work.</small>
        </div>
      </div>
      <span className="hero-art-caption">01 — PLC & INDUSTRIAL CONTROL</span>
    </div>
  );
}
