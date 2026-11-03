import type { Skill } from '@/types';

export const skills: Skill[] = [
  {
    id: 1,
    title: 'House Wiring (Single & Three-phase)',
    titleBn: 'হাউজ ওয়্যারিং (সিঙ্গেল ও থ্রি-ফেজ)',
    category: 'Electrical Foundation',
    description:
      'Complete residential & commercial wiring: distribution boards, circuits, earthing and safe three-phase connections.',
    topics: ['DB dressing & circuit design', 'Single & three-phase wiring', 'Earthing & safety testing'],
    icon: 'PlugZap',
  },
  {
    id: 2,
    title: 'Industrial Motor Controlling',
    titleBn: 'ইন্ডাস্ট্রিয়াল মোটর কন্ট্রোলিং',
    category: 'Electrical Foundation',
    description:
      'DOL, Star-Delta and Reverse-Forward starters with contactors, overloads and interlocking on real motors.',
    topics: ['DOL starter wiring', 'Star-Delta timer control', 'Reverse-Forward interlock'],
    icon: 'Cog',
    courseSlug: 'industrial-automation-plc',
  },
  {
    id: 3,
    title: 'Industrial Automation Principles',
    titleBn: 'ইন্ডাস্ট্রিয়াল অটোমেশন প্রিন্সিপালস',
    category: 'Automation Core',
    description:
      'Sensors, actuators, control loops and the automation pyramid — the theory that makes every factory tick.',
    topics: ['Automation pyramid', 'Open & closed loop control', 'Sensors & actuators overview'],
    icon: 'Workflow',
    courseSlug: 'industrial-automation-plc',
  },
  {
    id: 4,
    title: 'PLC Programming (Siemens, Delta, Mitsubishi)',
    titleBn: 'PLC প্রোগ্রামিং (সিমেন্স, ডেল্টা, মিতসুবিশি)',
    category: 'Automation Core',
    description:
      'Ladder logic, timers, counters and sequential control on the three most in-demand PLC platforms.',
    topics: ['Ladder logic & addressing', 'Timers, counters, comparators', 'Online monitoring & debugging'],
    icon: 'Cpu',
    courseSlug: 'industrial-automation-plc',
  },
  {
    id: 5,
    title: 'VFD Programming & Wiring',
    titleBn: 'VFD প্রোগ্রামিং ও ওয়্যারিং',
    category: 'Automation Core',
    description:
      'Variable Frequency Drive parameterization, control wiring, multi-speed, PID and Modbus communication.',
    topics: ['Parameter groups & ramps', '2-wire / 3-wire control', 'Modbus RTU speed control'],
    icon: 'Gauge',
    courseSlug: 'advance-automation-plc-vfd-hmi',
  },
  {
    id: 6,
    title: 'HMI Screen Design & Communication',
    titleBn: 'HMI স্ক্রিন ডিজাইন ও কমিউনিকেশন',
    category: 'Automation Core',
    description:
      'Professional operator screens with navigation, alarms, trends and recipes, linked live to PLCs.',
    topics: ['Screen layout & navigation', 'Alarms, trends & recipes', 'Ethernet / RS-485 linking'],
    icon: 'MonitorSmartphone',
    courseSlug: 'advance-automation-plc-vfd-hmi',
  },
  {
    id: 7,
    title: 'Advance Automation (Modbus, Sensors, Relays)',
    titleBn: 'অ্যাডভান্স অটোমেশন (মডবাস, সেন্সর, রিলে)',
    category: 'Automation Core',
    description:
      'Industrial networking with Modbus RTU/TCP, analog sensor scaling and relay-based safety circuits.',
    topics: ['Modbus RTU/TCP networks', '4–20 mA analog scaling', 'Safety relay circuits'],
    icon: 'Network',
    courseSlug: 'advance-automation-plc-vfd-hmi',
  },
  {
    id: 8,
    title: 'SCADA System',
    titleBn: 'স্কাডা সিস্টেম',
    category: 'Automation Core',
    description:
      'Supervisory Control & Data Acquisition: tags, historical logging, alarming and remote plant monitoring.',
    topics: ['Tag database & logging', 'Alarm management', 'Remote monitoring dashboards'],
    icon: 'RadioTower',
    courseSlug: 'advance-automation-plc-vfd-hmi',
  },
  {
    id: 9,
    title: 'Electrical AutoCAD (SLD, Floorplan, MDB/SDB)',
    titleBn: 'ইলেকট্রিক্যাল অটোক্যাড',
    category: 'Design & Drafting',
    description:
      'Single line diagrams, building electrification plans and MDB/SDB load design to professional standards.',
    topics: ['SLD & floor electrification', 'MDB/SDB load schedule', 'Panel GA drawings'],
    icon: 'PenTool',
    courseSlug: 'electrical-autocad',
  },
  {
    id: 10,
    title: 'Civil AutoCAD (Architectural & Structural)',
    titleBn: 'সিভিল অটোক্যাড',
    category: 'Design & Drafting',
    description:
      'Architectural floor plans, sections, elevations and structural drafting basics for complete building sets.',
    topics: ['Architectural plans & elevations', 'Structural detailing basics', 'Sections & dimensions'],
    icon: 'Ruler',
    courseSlug: 'electrical-autocad',
  },
  {
    id: 11,
    title: 'Electrical Sub-Station Design',
    titleBn: 'ইলেকট্রিক্যাল সাব-স্টেশন ডিজাইন',
    category: 'Power Systems',
    description:
      '11/0.4 kV substation design: transformer sizing, layout, equipment selection and approval drawings.',
    topics: ['Transformer sizing', 'Substation layout & clearances', 'Equipment BOQ & SLD'],
    icon: 'Factory',
    courseSlug: 'electrical-substation-design',
  },
  {
    id: 12,
    title: 'HT Switchgear Operation & Testing',
    titleBn: 'এইচটি সুইচগিয়ার অপারেশন ও টেস্টিং',
    category: 'Power Systems',
    description:
      'RMU, VCB and LBS operation, HT cable termination, megger and high-voltage testing procedures.',
    topics: ['RMU / VCB / LBS operation', 'HT cable termination', 'Insulation & HV testing'],
    icon: 'Zap',
    courseSlug: 'electrical-substation-design',
  },
  {
    id: 13,
    title: 'LT Switchgear & PFI Panel Control',
    titleBn: 'এলটি সুইচগিয়ার ও PFI প্যানেল',
    category: 'Power Systems',
    description:
      'ACB/MCCB selection, LT panel design and automatic power factor improvement with capacitor banks.',
    topics: ['ACB / MCCB selection', 'APFC relay & capacitor banks', 'LT panel design'],
    icon: 'CircuitBoard',
    courseSlug: 'electrical-substation-design',
  },
  {
    id: 14,
    title: 'Advance CCTV & Network Maintenance',
    titleBn: 'অ্যাডভান্স সিসিটিভি ও নেটওয়ার্ক',
    category: 'Security & Networking',
    description:
      'IP camera systems, NVR configuration, PoE networking, remote viewing and maintenance contracts.',
    topics: ['IP camera & NVR setup', 'PoE & IP networking', 'Remote view & troubleshooting'],
    icon: 'Cctv',
    courseSlug: 'advanced-cctv',
  },
  {
    id: 15,
    title: 'Solar PV Design & On/Off-Grid Wiring',
    titleBn: 'সোলার পিভি ডিজাইন ও ওয়্যারিং',
    category: 'Renewable Energy',
    description:
      'On-grid, off-grid and hybrid PV design, inverter/battery sizing and safe rooftop installation.',
    topics: ['Array & inverter sizing', 'Battery bank design', 'Rooftop installation & net metering'],
    icon: 'Sun',
    courseSlug: 'solar-pv-system',
  },
  {
    id: 16,
    title: 'Electrical Inspection, Safety & Testing',
    titleBn: 'ইলেকট্রিক্যাল ইন্সপেকশন ও সেফটি',
    category: 'Safety & Quality',
    description:
      'Insulation resistance, earth resistance, continuity testing and electrical safety audit procedures.',
    topics: ['Megger & earth testing', 'Safety audit checklists', 'Lockout / tagout (LOTO)'],
    icon: 'ShieldCheck',
  },
  {
    id: 17,
    title: 'Load Schedule & Energy Audit Calculation',
    titleBn: 'লোড সিডিউল ও এনার্জি অডিট',
    category: 'Safety & Quality',
    description:
      'Professional load schedules, demand factor calculation and energy audits that cut factory bills.',
    topics: ['Load schedule preparation', 'Demand & diversity factors', 'Energy audit reporting'],
    icon: 'Calculator',
  },
  {
    id: 18,
    title: 'Industrial Project Making (Prototype)',
    titleBn: 'ইন্ডাস্ট্রিয়াল প্রজেক্ট মেকিং',
    category: 'Project & Career',
    description:
      'Build a working automation prototype end-to-end: design, panel build, programming and commissioning.',
    topics: ['Concept to panel design', 'Programming & integration', 'Commissioning & demo'],
    icon: 'Wrench',
    courseSlug: 'industrial-automation-plc',
  },
  {
    id: 19,
    title: 'Project Supervision & Site Management',
    titleBn: 'প্রজেক্ট সুপারভিশন ও সাইট ম্যানেজমেন্ট',
    category: 'Project & Career',
    description:
      'Site supervision, manpower planning, progress reporting and client handover for electrical projects.',
    topics: ['Site planning & safety', 'Progress & quality reports', 'Client handover process'],
    icon: 'HardHat',
  },
  {
    id: 20,
    title: 'Automobile Electrical System & Troubleshooting',
    titleBn: 'অটোমোবাইল ইলেকট্রিক্যাল সিস্টেম',
    category: 'Project & Career',
    description:
      'Vehicle wiring, alternators, starters, sensors and ECU basics with systematic fault diagnosis.',
    topics: ['Vehicle wiring diagrams', 'Starting & charging systems', 'Sensor & ECU diagnostics'],
    icon: 'Car',
  },
];

export const skillCategories = [
  'All',
  'Electrical Foundation',
  'Automation Core',
  'Design & Drafting',
  'Power Systems',
  'Security & Networking',
  'Renewable Energy',
  'Safety & Quality',
  'Project & Career',
] as const;
