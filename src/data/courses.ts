import type { Course } from '@/types';

export const courses: Course[] = [
  {
    id: 'c1',
    slug: 'industrial-automation-plc',
    title: 'Industrial Automation & PLC Controlling',
    titleBn: 'ইন্ডাস্ট্রিয়াল অটোমেশন ও PLC কন্ট্রোলিং',
    shortTitle: 'Industrial Automation & PLC',
    category: 'Automation',
    fee: 8000,
    duration: '3 Months',
    durationBn: '৩ মাস',
    level: 'Beginner',
    seats: 20,
    schedule: 'Sat–Thu • Morning / Evening batches',
    tagline: 'From relay logic to real PLC programs on live panels.',
    description:
      'Our flagship job-oriented program. Start from industrial electrical fundamentals and relay logic, then move to ladder programming on Siemens, Delta and Mitsubishi PLCs wired to real motors, sensors and pilot lamps. Every student programs, wires and commissions their own automation panel before graduation.',
    highlights: [
      '100% hands-on lab with individual PLC workstations',
      'Siemens S7-1200, Delta DVP & Mitsubishi FX series coverage',
      'Real motor, sensor & pneumatic actuator interfacing',
      'Industry-standard wiring, ferruling & panel discipline',
      'Job placement guidance for local & overseas factories',
    ],
    syllabus: [
      {
        title: 'Module 1 — Industrial Electrical Basics',
        topics: [
          'Safety, PPE & workshop discipline',
          'Contactors, relays, overloads & push buttons',
          'DOL, Star-Delta & Reverse-Forward motor starters',
          'Control circuit drawing & troubleshooting',
        ],
      },
      {
        title: 'Module 2 — PLC Hardware & Wiring',
        topics: [
          'PLC architecture: CPU, I/O modules, power supply',
          'Sinking / sourcing, NPN & PNP sensor wiring',
          'Digital & analog I/O addressing',
          'Panel layout, DIN rail, ducting & ferrule numbering',
        ],
      },
      {
        title: 'Module 3 — Ladder Logic Programming',
        topics: [
          'NO/NC logic, latching, interlocking',
          'Timers (TON/TOF), counters (CTU/CTD)',
          'Comparators, move & math instructions',
          'Sequential control & state machines',
        ],
      },
      {
        title: 'Module 4 — Real Project Commissioning',
        topics: [
          'Conveyor & bottle-filling line simulation',
          'Traffic light & tank level control projects',
          'Fault finding with online monitoring',
          'Final project demo & viva',
        ],
      },
    ],
    tools: ['Siemens TIA Portal', 'Delta WPLSoft / ISPSoft', 'Mitsubishi GX Works', 'Multimeter & clamp meter'],
    careers: ['PLC Programmer (Junior)', 'Automation Technician', 'Maintenance Engineer', 'Panel Builder'],
    featured: true,
    illustration: 'plc',
  },
  {
    id: 'c2',
    slug: 'advance-automation-plc-vfd-hmi',
    title: 'Advance Automation & PLC, VFD, HMI, Sensor Controlling',
    titleBn: 'অ্যাডভান্স অটোমেশন: PLC, VFD, HMI ও সেন্সর কন্ট্রোলিং',
    shortTitle: 'Advance Automation (PLC + VFD + HMI)',
    category: 'Automation',
    fee: 9600,
    duration: '3 Months',
    durationBn: '৩ মাস',
    level: 'Advanced',
    seats: 16,
    schedule: 'Sat–Thu • Evening batch',
    tagline: 'Complete automation stack: PLC + VFD + HMI + SCADA + sensors.',
    description:
      'The complete advanced automation package. Integrate PLCs with VFDs over Modbus RTU, design professional HMI screens, build SCADA dashboards with alarming & trends, and network everything with industrial sensors. Graduates can independently design and commission small-to-medium automation systems.',
    highlights: [
      'VFD parameterization, control modes & Modbus networking',
      'HMI screen design with recipes, alarms & trends',
      'SCADA introduction: tags, logging & remote monitoring',
      'Analog scaling: temperature, pressure, level & flow',
      'Capstone: fully automated process line with HMI + VFD',
    ],
    syllabus: [
      {
        title: 'Module 1 — VFD Mastery',
        topics: [
          'VFD power & control wiring (2-wire / 3-wire)',
          'Parameter groups: ramps, limits, protection',
          'Keypad, terminal & communication control modes',
          'Multi-speed, PID & braking resistor setup',
        ],
      },
      {
        title: 'Module 2 — HMI Design',
        topics: [
          'HMI–PLC communication (Ethernet / RS-485)',
          'Screen layout, navigation & security levels',
          'Buttons, indicators, numeric & bar displays',
          'Alarm lists, trend curves & recipe management',
        ],
      },
      {
        title: 'Module 3 — Sensors & Analog Control',
        topics: [
          'Proximity, photoelectric, encoder & load cell',
          '4–20 mA / 0–10 V analog scaling in PLC',
          'Temperature controllers & RTD/thermocouple',
          'Closed-loop PID level & pressure control',
        ],
      },
      {
        title: 'Module 4 — SCADA & Networking',
        topics: [
          'Modbus RTU/TCP architecture & addressing',
          'SCADA tags, historical logging & reports',
          'Remote monitoring & alarm annunciation',
          'Capstone project: automated mixing & filling line',
        ],
      },
    ],
    tools: ['Siemens S7-1200 + KTP HMI', 'Delta VFD-EL / MS300', 'WinCC / DOPSoft', 'Modbus Poll & analyzers'],
    careers: ['Automation Engineer', 'SCADA Technician', 'Commissioning Engineer', 'Control Panel Designer'],
    featured: true,
    illustration: 'vfd',
  },
  {
    id: 'c3',
    slug: 'electrical-autocad',
    title: 'Electrical AutoCAD (2D & 3D)',
    titleBn: 'ইলেকট্রিক্যাল অটোক্যাড (২ডি ও ৩ডি)',
    shortTitle: 'Electrical AutoCAD 2D & 3D',
    category: 'Design',
    fee: 5000,
    duration: '2 Months',
    durationBn: '২ মাস',
    level: 'Beginner',
    seats: 24,
    schedule: 'Sat–Thu • Flexible slots',
    tagline: 'Professional SLD, floor plans & panel drawings that clients approve.',
    description:
      'Learn AutoCAD the way electrical designers actually use it: single line diagrams, building electrification floor plans, MDB/SDB load schedules, cable routing and panel GA drawings — plus 3D modeling basics for cable trays and equipment layouts. Includes civil drafting fundamentals for complete building drawings.',
    highlights: [
      'SLD from load calculation to final plotted sheet',
      'Residential & industrial floor electrification',
      'MDB / SDB schedule & cable sizing charts',
      '3D cable tray, trunking & equipment layout',
      'Print-ready title blocks, layers & standards',
    ],
    syllabus: [
      {
        title: 'Module 1 — AutoCAD Foundation',
        topics: [
          'Interface, units, limits & precision tools',
          'Draw & modify commands mastery',
          'Layers, blocks, attributes & libraries',
          'Dimensions, text styles & annotations',
        ],
      },
      {
        title: 'Module 2 — Electrical 2D Design',
        topics: [
          'Single Line Diagram (SLD) standards',
          'Lighting & power floor plans',
          'MDB/SDB load schedule & balancing',
          'Cable routing, earthing & lightning protection',
        ],
      },
      {
        title: 'Module 3 — Panel & Civil Drafting',
        topics: [
          'Panel GA & wiring drawings',
          'Architectural floor plan basics',
          'Structural drafting fundamentals',
          'Section & elevation views',
        ],
      },
      {
        title: 'Module 4 — 3D & Documentation',
        topics: [
          '3D modeling: trays, ducts, equipment',
          'Isometric views & rendering basics',
          'Layouts, viewports & plotting to PDF',
          'Final portfolio: complete building electrical set',
        ],
      },
    ],
    tools: ['AutoCAD 2D/3D', 'Electrical symbol libraries', 'Load calculation sheets'],
    careers: ['Electrical CAD Designer', 'Draftsman', 'Design Assistant Engineer'],
    featured: true,
    illustration: 'autocad',
  },
  {
    id: 'c4',
    slug: 'electrical-substation-design',
    title: 'Electrical Sub-Station Design & High Voltage',
    titleBn: 'ইলেকট্রিক্যাল সাব-স্টেশন ডিজাইন ও হাই ভোল্টেজ',
    shortTitle: 'Sub-Station Design & HV',
    category: 'Power',
    fee: 5500,
    duration: '2 Months',
    durationBn: '২ মাস',
    level: 'Intermediate',
    seats: 18,
    schedule: 'Fri–Sat • Weekend batch',
    tagline: '11/0.4 kV substation design, switchgear & protection — the power sector skill.',
    description:
      'Design complete 11/0.4 kV distribution substations: transformer sizing, HT/LT switchgear selection, protection coordination, PFI plants and earthing systems. Covers HT switchgear operation & testing, LT panels, and the documentation needed for utility approval in Bangladesh.',
    highlights: [
      'Transformer sizing & substation layout design',
      'HT switchgear: RMU, VCB, LBS operation & testing',
      'Protection relays, coordination & CT/PT sizing',
      'PFI panel design & power factor improvement',
      'Earthing, lightning protection & safety clearances',
    ],
    syllabus: [
      {
        title: 'Module 1 — Substation Fundamentals',
        topics: [
          'Power system overview: generation to consumer',
          'Transformer types, ratings & vector groups',
          'Load estimation & transformer sizing',
          'Substation layout & clearance standards',
        ],
      },
      {
        title: 'Module 2 — HT & LT Switchgear',
        topics: [
          'RMU, VCB, LBS & isolator operation',
          'HT cable termination & testing (megger, HV test)',
          'LT switchgear: ACB, MCCB, contactors',
          'PFI panel: capacitor banks & APFC relays',
        ],
      },
      {
        title: 'Module 3 — Protection & Earthing',
        topics: [
          'Overcurrent, earth fault & differential protection',
          'CT/PT selection & relay coordination',
          'Earthing systems: TN-S, TT, IT',
          'Lightning protection & surge devices',
        ],
      },
      {
        title: 'Module 4 — Design Project',
        topics: [
          'Complete 11/0.4 kV substation SLD',
          'Equipment schedule & BOQ preparation',
          'Utility approval drawing set',
          'Site visit report & viva',
        ],
      },
    ],
    tools: ['AutoCAD', 'ETAP basics', 'Megger & earth tester', 'Protection relay manuals'],
    careers: ['Substation Design Assistant', 'HT/LT Panel Technician', 'Power Plant Maintenance'],
    illustration: 'substation',
  },
  {
    id: 'c5',
    slug: 'advanced-cctv',
    title: 'Advanced CCTV Installation & Maintenance',
    titleBn: 'অ্যাডভান্সড সিসিটিভি ইনস্টলেশন ও মেইনটেন্যান্স',
    shortTitle: 'CCTV Installation & Maintenance',
    category: 'Security',
    fee: 3000,
    duration: '1 Month',
    durationBn: '১ মাস',
    level: 'Beginner',
    seats: 25,
    schedule: 'Sat–Thu • Fast-track batch',
    tagline: 'IP cameras, NVR, remote viewing — start a security business in 30 days.',
    description:
      'A fast, practical course covering analog HD and IP CCTV systems end to end: camera selection, cable pulling, NVR/DVR configuration, network setup, mobile remote viewing and troubleshooting. Ideal for electricians and entrepreneurs who want to add CCTV services to their business.',
    highlights: [
      'IP + analog HD camera installation practice',
      'NVR/DVR setup, recording schedules & playback',
      'PoE switches, IP addressing & router config',
      'Mobile & PC remote viewing setup',
      'Business guidance: quotation & AMC pricing',
    ],
    syllabus: [
      {
        title: 'Week 1 — CCTV Fundamentals',
        topics: [
          'Camera types: dome, bullet, PTZ, IP vs HD',
          'Lens, resolution, night vision & WDR',
          'Coaxial, Cat6 & power cable selection',
          'Installation tools & safety',
        ],
      },
      {
        title: 'Week 2 — Recording & Networking',
        topics: [
          'DVR/NVR configuration & HDD setup',
          'IP addressing, subnet & PoE switches',
          'Router port forwarding & P2P cloud',
          'Recording modes & storage calculation',
        ],
      },
      {
        title: 'Week 3 — Remote View & Troubleshooting',
        topics: [
          'Mobile app & CMS software setup',
          'Common faults: no video, IR failure, HDD errors',
          'Maintenance schedule & AMC contracts',
          'Live installation project',
        ],
      },
      {
        title: 'Week 4 — Business Launch',
        topics: [
          'Site survey & camera placement design',
          'Quotation & BOQ preparation',
          'Client handover & documentation',
          'Final practical assessment',
        ],
      },
    ],
    tools: ['Hikvision / Dahua kits', 'NVR & PoE switch', 'Crimping & testing tools'],
    careers: ['CCTV Technician', 'Security System Installer', 'Freelance CCTV Entrepreneur'],
    illustration: 'cctv',
    featured: true,
  },
  {
    id: 'c6',
    slug: 'solar-pv-system',
    title: 'Solar PV System Design & Installation',
    titleBn: 'সোলার পিভি সিস্টেম ডিজাইন ও ইনস্টলেশন',
    shortTitle: 'Solar PV Design & Installation',
    category: 'Renewable',
    fee: 5000,
    duration: '1.5 Months',
    durationBn: '১.৫ মাস',
    level: 'Beginner',
    seats: 20,
    schedule: 'Sat–Thu • Morning batch',
    tagline: 'On-grid, off-grid & hybrid solar — design, install, maintain.',
    description:
      'Bangladesh’s solar market is booming. Learn to size and design on-grid, off-grid and hybrid PV systems, select panels, inverters and batteries, install rooftop structures with proper protection, and commission systems safely. Includes net metering documentation and maintenance business models.',
    highlights: [
      'Load analysis & PV array sizing calculations',
      'On-grid / off-grid / hybrid architecture',
      'Inverter & battery bank selection',
      'Rooftop mounting, earthing & lightning safety',
      'Net metering application documentation',
    ],
    syllabus: [
      {
        title: 'Module 1 — Solar Fundamentals',
        topics: [
          'PV cell physics & panel specifications',
          'Irradiance, peak sun hours & derating',
          'Load analysis & energy audit',
          'System types: on-grid, off-grid, hybrid',
        ],
      },
      {
        title: 'Module 2 — Design & Sizing',
        topics: [
          'Array sizing: series/parallel strings',
          'Inverter sizing & MPPT windows',
          'Battery bank sizing (Li-ion / tubular)',
          'Cable sizing, protection & combiner boxes',
        ],
      },
      {
        title: 'Module 3 — Installation Practice',
        topics: [
          'Rooftop structure & mounting angles',
          'DC wiring, MC4 connectors & polarity',
          'Earthing, SPD & lightning protection',
          'Commissioning tests & monitoring apps',
        ],
      },
      {
        title: 'Module 4 — Business & O&M',
        topics: [
          'Net metering application process',
          'Quotation, ROI & payback calculation',
          'Cleaning, inspection & fault finding',
          'Final design project presentation',
        ],
      },
    ],
    tools: ['PV panels & micro-inverters', 'Solar irradiance meter', 'MC4 tools & clamp meter'],
    careers: ['Solar Design Technician', 'PV Installer', 'Solar O&M Engineer'],
    illustration: 'solar',
  },
];

export const courseCategories = ['All', 'Automation', 'Design', 'Power', 'Security', 'Renewable'] as const;

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
