import type { Skill } from "../types";

const foundational = "industrial-automation-plc";
const advanced = "advance-automation-plc-vfd-hmi-sensor";
const cad = "electrical-autocad-2d-3d";
const power = "electrical-sub-station-design-high-voltage";

export const SKILLS: readonly Skill[] = [
  {
    id: 1,
    title: "House Wiring (Single & Three-phase)",
    shortTitle: "House Wiring",
    category: "Electrical foundations",
    icon: "PlugZap",
    description:
      "Build a safe foundation in residential electrical distribution, circuit planning and wiring.",
    practice: [
      "Wire lighting, socket and distribution circuits.",
      "Read a wiring plan and select cable sizes.",
      "Practice isolation, continuity and polarity checks.",
    ],
    tools: ["Distribution board", "Multimeter", "MCB & RCD"],
    courseSlug: foundational,
  },
  {
    id: 2,
    title: "Industrial Motor Controlling",
    shortTitle: "Motor Controlling",
    category: "Electrical foundations",
    icon: "Cog",
    description:
      "Understand the control circuits that start, stop, protect and reverse industrial motors.",
    practice: [
      "Wire DOL and star-delta starters.",
      "Build forward-reverse control with interlocks.",
      "Diagnose overload, contactor and control-circuit faults.",
    ],
    tools: ["Contactors", "Overload relay", "Three-phase motor"],
    courseSlug: foundational,
  },
  {
    id: 3,
    title: "Industrial Automation Principles",
    shortTitle: "Automation Principles",
    category: "Automation",
    icon: "Workflow",
    description:
      "Connect sensors, controllers and actuators into reliable, repeatable industrial processes.",
    practice: [
      "Map a process into inputs and outputs.",
      "Develop sequence and interlock logic.",
      "Compare manual, relay and PLC-based control.",
    ],
    tools: ["I/O mapping", "Sequence diagrams", "Control panels"],
    courseSlug: foundational,
  },
  {
    id: 4,
    title: "PLC — Programmable Logic Controller",
    shortTitle: "PLC Programming",
    category: "Automation",
    icon: "Cpu",
    description:
      "Program and commission industrial controllers using practical ladder-logic workflows.",
    practice: [
      "Configure Siemens, Delta and Mitsubishi PLC hardware.",
      "Build timer, counter and sequence programs.",
      "Monitor live logic and troubleshoot I/O.",
    ],
    tools: ["Siemens", "Delta", "Mitsubishi"],
    courseSlug: foundational,
  },
  {
    id: 5,
    title: "VFD — Variable Frequency Drive",
    shortTitle: "VFD Programming",
    category: "Automation",
    icon: "Gauge",
    description:
      "Control motor speed and torque with correctly wired, parameterized variable frequency drives.",
    practice: [
      "Enter motor nameplate parameters.",
      "Configure ramp times and multi-speed operation.",
      "Connect analog references and diagnose drive faults.",
    ],
    tools: ["VFD", "0–10 V signal", "Motor parameters"],
    courseSlug: advanced,
  },
  {
    id: 6,
    title: "HMI — Human Machine Interface",
    shortTitle: "HMI Screen Design",
    category: "Automation",
    icon: "PanelsTopLeft",
    description:
      "Create clear operator interfaces that connect people to machines and process information.",
    practice: [
      "Design navigation, controls and status screens.",
      "Connect HMI tags to PLC memory.",
      "Configure alarms, trends and operator access.",
    ],
    tools: ["HMI editor", "PLC tags", "Modbus"],
    courseSlug: advanced,
  },
  {
    id: 7,
    title: "Advance Automation & PLC Controlling",
    shortTitle: "Advanced PLC Control",
    category: "Automation",
    icon: "Network",
    description:
      "Integrate advanced logic, industrial sensors and communication for more capable machines.",
    practice: [
      "Scale analog sensor signals.",
      "Build state-based machine sequences.",
      "Connect devices and troubleshoot Modbus communication.",
    ],
    tools: ["Modbus RTU/TCP", "Analog sensors", "Relays"],
    courseSlug: advanced,
  },
  {
    id: 8,
    title: "SCADA System",
    shortTitle: "SCADA Systems",
    category: "Automation",
    icon: "MonitorDot",
    description:
      "Supervise industrial processes through live graphics, historical data and actionable alarms.",
    practice: [
      "Create a process overview and tag database.",
      "Configure alarms and historical trends.",
      "Test controller connectivity and data quality.",
    ],
    tools: ["SCADA", "Data logging", "Alarm management"],
    courseSlug: advanced,
  },
  {
    id: 9,
    title: "Electrical AutoCAD",
    shortTitle: "Electrical AutoCAD",
    category: "Design & power",
    icon: "DraftingCompass",
    description:
      "Produce clear electrical construction drawings, from single-line diagrams to panel schedules.",
    practice: [
      "Draft lighting and power floor plans.",
      "Create SLDs and MDB/SDB schedules.",
      "Organize layers, blocks and plotted drawing sets.",
    ],
    tools: ["AutoCAD 2D/3D", "SLD", "Load schedules"],
    courseSlug: cad,
  },
  {
    id: 10,
    title: "Civil AutoCAD",
    shortTitle: "Civil AutoCAD",
    category: "Design & power",
    icon: "Ruler",
    description:
      "Learn architectural and structural drafting basics to coordinate technical building designs.",
    practice: [
      "Draft dimensioned architectural floor plans.",
      "Create structural drafting views.",
      "Coordinate electrical equipment with building layouts.",
    ],
    tools: ["AutoCAD", "Floor plans", "Structural drawings"],
    courseSlug: cad,
  },
  {
    id: 11,
    title: "Electrical Sub-Station Design",
    shortTitle: "Sub-Station Design",
    category: "Design & power",
    icon: "UtilityPole",
    description:
      "Understand the layout, equipment and design decisions behind electrical sub-stations.",
    practice: [
      "Identify transformers, busbars and feeders.",
      "Prepare a conceptual station layout.",
      "Develop equipment schedules and an SLD.",
    ],
    tools: ["Transformers", "Bus arrangements", "Protection"],
    courseSlug: power,
  },
  {
    id: 12,
    title: "HT Switchgear Operation & Testing",
    shortTitle: "HT Switchgear",
    category: "Design & power",
    icon: "ToggleRight",
    description:
      "Learn high-voltage switchgear principles, inspection procedures and authorized operating workflows.",
    practice: [
      "Identify breakers, isolators and instrument transformers.",
      "Read operating and protection diagrams.",
      "Prepare inspection and test checklists under supervision.",
    ],
    tools: ["HT breaker", "Protection relay", "Test checklist"],
    courseSlug: power,
  },
  {
    id: 13,
    title: "LT Switchgear & PFI Panel Control",
    shortTitle: "LT Switchgear & PFI",
    category: "Design & power",
    icon: "SlidersHorizontal",
    description:
      "Understand low-voltage distribution, protection coordination and power-factor improvement.",
    practice: [
      "Identify ACB, MCCB and distribution components.",
      "Read PFI controller and capacitor-bank circuits.",
      "Calculate reactive power compensation basics.",
    ],
    tools: ["LT panel", "PFI relay", "Capacitor bank"],
    courseSlug: power,
  },
  {
    id: 14,
    title: "Advance CCTV & Network Maintenance",
    shortTitle: "CCTV & Networking",
    category: "Applied technology",
    icon: "Cctv",
    description:
      "Install and support surveillance systems with dependable networking, power and recording.",
    practice: [
      "Terminate and test network cables.",
      "Configure IP cameras and NVR recording.",
      "Troubleshoot connectivity, storage and remote access.",
    ],
    tools: ["IP camera", "NVR", "PoE switch"],
    courseSlug: "advanced-cctv-installation-maintenance",
  },
  {
    id: 15,
    title: "Solar PV Design & On/Off-Grid Wiring",
    shortTitle: "Solar PV Systems",
    category: "Applied technology",
    icon: "Sun",
    description:
      "Design and install solar systems around real energy needs and site conditions.",
    practice: [
      "Size panels, batteries and inverters.",
      "Wire charge controllers and protection devices.",
      "Compare on-grid, off-grid and hybrid architectures.",
    ],
    tools: ["PV modules", "MPPT", "Inverter"],
    courseSlug: "solar-pv-system-design-installation",
  },
  {
    id: 16,
    title: "Electrical Inspection, Safety & Testing",
    shortTitle: "Inspection & Safety",
    category: "Electrical foundations",
    icon: "ShieldCheck",
    description:
      "Use structured inspections and test records to make electrical work safer and more reliable.",
    practice: [
      "Prepare pre-work and isolation checklists.",
      "Perform supervised continuity and insulation tests.",
      "Document defects and corrective actions.",
    ],
    tools: ["Multimeter", "Insulation tester", "PPE"],
    courseSlug: power,
  },
  {
    id: 17,
    title: "Load Schedule & Energy Audit Calculation",
    shortTitle: "Load & Energy Audits",
    category: "Design & power",
    icon: "ChartNoAxesCombined",
    description:
      "Translate equipment lists and consumption data into useful engineering calculations.",
    practice: [
      "Build connected and demand-load schedules.",
      "Estimate daily energy consumption.",
      "Identify power-factor and efficiency opportunities.",
    ],
    tools: ["Load schedule", "Energy meter", "Spreadsheet"],
    courseSlug: cad,
  },
  {
    id: 18,
    title: "Industrial Project Making",
    shortTitle: "Hands-on Projects",
    category: "Applied technology",
    icon: "Bot",
    description:
      "Bring your learning together in a working prototype that solves a defined industrial task.",
    practice: [
      "Define a problem and I/O requirements.",
      "Assemble and program a control prototype.",
      "Test, refine and demonstrate the final system.",
    ],
    tools: ["PLC station", "Sensors", "Actuators"],
    courseSlug: advanced,
  },
  {
    id: 19,
    title: "Project Supervision & Site Management",
    shortTitle: "Site Management",
    category: "Applied technology",
    icon: "HardHat",
    description:
      "Organize technical work with clear planning, quality checks and professional handovers.",
    practice: [
      "Plan tasks, materials and site checklists.",
      "Coordinate installation and inspection records.",
      "Prepare commissioning and maintenance handovers.",
    ],
    tools: ["Work plan", "QA checklist", "Handover report"],
    courseSlug: foundational,
  },
  {
    id: 20,
    title: "Automobile Electrical System & Troubleshooting",
    shortTitle: "Automobile Electrical",
    category: "Applied technology",
    icon: "CarFront",
    description:
      "Explore vehicle power, starting, charging and wiring circuits through guided practical orientation.",
    practice: [
      "Read basic vehicle wiring diagrams.",
      "Identify battery, alternator and starter circuits.",
      "Trace voltage drops and common electrical faults.",
    ],
    tools: ["Vehicle circuits", "Multimeter", "Wiring diagram"],
    courseSlug: foundational,
  },
];

export const SKILL_CATEGORIES = [
  "All skills",
  "Electrical foundations",
  "Automation",
  "Design & power",
  "Applied technology",
] as const;
