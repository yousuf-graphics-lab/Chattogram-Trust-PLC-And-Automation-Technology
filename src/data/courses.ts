import type { Course } from "../types";

export const COURSES: readonly Course[] = [
  {
    id: "plc-foundation",
    slug: "industrial-automation-plc",
    title: "Industrial Automation & PLC Controlling",
    shortTitle: "Industrial Automation & PLC",
    category: "Automation",
    fee: 8000,
    duration: "3 Months",
    months: 3,
    level: "Beginner to job-ready",
    description:
      "Go from electrical fundamentals to working PLC programs. Build, wire and troubleshoot real control circuits in a hands-on learning environment.",
    art: "plc",
    featured: true,
    outcomes: [
      "Read electrical drawings and connect industrial inputs and outputs.",
      "Write, download and debug ladder logic programs.",
      "Build motor interlocks, timers, counters and sequence controls.",
      "Diagnose control faults using a structured, safety-first approach.",
    ],
    syllabus: [
      {
        title: "Electrical control foundations",
        topics: [
          " Workplace electrical safety and PPE",
          "Relays, contactors, overloads and push buttons",
          "Single-phase and three-phase supply fundamentals",
        ],
      },
      {
        title: "Industrial motor control",
        topics: [
          "DOL starter wiring",
          "Star-delta and forward-reverse control",
          "Interlocking, protection and fault finding",
        ],
      },
      {
        title: "PLC hardware & configuration",
        topics: [
          "PLC architecture, scan cycle and I/O modules",
          "Siemens, Delta and Mitsubishi platform orientation",
          "Sinking/sourcing, sensor wiring and software setup",
        ],
      },
      {
        title: "Ladder logic programming",
        topics: [
          "Contacts, coils, set/reset and edge detection",
          "Timers, counters and comparison instructions",
          "Program upload, download, monitoring and debugging",
        ],
      },
      {
        title: "Applied automation",
        topics: [
          "Conveyor and tank-level control sequences",
          "Alarm handling, permissives and emergency-stop principles",
          "Introduction to VFD, HMI and industrial communication",
        ],
      },
      {
        title: "Capstone & troubleshooting",
        topics: [
          "Build an integrated PLC control panel",
          "Prepare an I/O list and functional description",
          "Commission, document and present your project",
        ],
      },
    ],
    project:
      "A working PLC-based conveyor control station with sensor inputs, motor interlocks and a documented troubleshooting guide.",
    requirements: [
      "Basic computer literacy.",
      "No previous PLC programming experience required. Basic electrical knowledge is helpful.",
    ],
    skillIds: [1, 2, 3, 4, 7, 18, 19],
  },
  {
    id: "advanced-automation",
    slug: "advance-automation-plc-vfd-hmi-sensor",
    title: "Advance Automation & PLC, VFD, HMI, Sensor Controlling",
    shortTitle: "Advanced Automation",
    category: "Automation",
    fee: 9600,
    duration: "3 Months",
    months: 3,
    level: "Intermediate to advanced",
    description:
      "Connect the complete automation stack: PLC, VFD, HMI, sensors and SCADA. Learn the communication and commissioning skills modern industry needs.",
    art: "automation",
    featured: true,
    outcomes: [
      "Program advanced PLC sequences and reusable logic.",
      "Configure VFD parameters and integrate industrial sensors.",
      "Design HMI screens with alarms, trends and recipes.",
      "Connect devices over Modbus and visualize a process in SCADA.",
    ],
    syllabus: [
      {
        title: "Advanced PLC architecture",
        topics: [
          "Data types, memory areas and structured programming",
          "Analog signal scaling and filtering",
          "Reusable function blocks and state machines",
        ],
      },
      {
        title: "VFD & motion fundamentals",
        topics: [
          "Drive wiring, control modes and motor nameplate data",
          "Acceleration, deceleration and multi-speed setup",
          "Analog references, digital commands and fault diagnosis",
        ],
      },
      {
        title: "HMI design & integration",
        topics: [
          "Screen navigation and operator usability",
          "Tags, alarms, trends and access levels",
          "HMI-to-PLC communication and simulation",
        ],
      },
      {
        title: "Sensors & industrial networks",
        topics: [
          "Inductive, capacitive, photoelectric and analog sensors",
          "Modbus RTU/TCP addressing and diagnostics",
          "Network termination, shielding and reliable panel layout",
        ],
      },
      {
        title: "SCADA & process supervision",
        topics: [
          "SCADA architecture, tags and historical logging",
          "Process graphics, alarm management and trends",
          "Dashboard design and communication troubleshooting",
        ],
      },
      {
        title: "Integrated commissioning project",
        topics: [
          "Build a PLC–VFD–HMI process station",
          "Implement interlocks and controlled startup/shutdown",
          "Prepare commissioning records and a maintenance handover",
        ],
      },
    ],
    project:
      "A networked process-control prototype with PLC sequencing, VFD speed control, an operator HMI and a SCADA overview.",
    requirements: [
      "Basic PLC and electrical control knowledge, or equivalent experience assessed by the trainer.",
    ],
    skillIds: [3, 4, 5, 6, 7, 8, 18, 19],
  },
  {
    id: "electrical-cad",
    slug: "electrical-autocad-2d-3d",
    title: "Electrical AutoCAD (2D & 3D)",
    shortTitle: "Electrical AutoCAD",
    category: "Design & CAD",
    fee: 5000,
    duration: "2 Months",
    months: 2,
    level: "Beginner friendly",
    description:
      "Turn electrical ideas into clear, professional drawings. Learn 2D drafting, 3D fundamentals and practical building power-distribution documentation.",
    art: "cad",
    featured: true,
    outcomes: [
      "Produce organized 2D electrical drawings in AutoCAD.",
      "Create single-line diagrams and distribution board schedules.",
      "Develop lighting, socket and cable-route layouts.",
      "Use 3D fundamentals, plotting standards and reusable blocks.",
    ],
    syllabus: [
      {
        title: "AutoCAD essentials",
        topics: [
          "Interface, coordinate systems and precision tools",
          "Draw, modify, layers, object snaps and annotations",
          "Blocks, attributes and reusable electrical symbols",
        ],
      },
      {
        title: "Building electrical layouts",
        topics: [
          "Lighting and socket layouts",
          "Circuit numbering and cable routing",
          "MDB/SDB schematics and load schedules",
        ],
      },
      {
        title: "Single-line diagrams",
        topics: [
          "Distribution architecture and protection symbols",
          "Panel schedules and drawing conventions",
          "Title blocks, revisions and issue-ready drawing sets",
        ],
      },
      {
        title: "3D drafting fundamentals",
        topics: [
          "3D navigation, solids and modeling tools",
          "Cable trays and equipment placement",
          "Views, visual styles and presentation basics",
        ],
      },
      {
        title: "Documentation & final drawing set",
        topics: [
          "Civil AutoCAD floor-plan orientation",
          "Printing, scale, PDF output and drawing checks",
          "Complete a building electrical design portfolio",
        ],
      },
    ],
    project:
      "A coordinated electrical drawing package for a small building, including an SLD, floor layouts, panel schedules and 3D equipment views.",
    requirements: [
      "Access to a computer for practice and a licensed copy or valid educational license for AutoCAD.",
    ],
    skillIds: [9, 10, 17, 19],
  },
  {
    id: "substation",
    slug: "electrical-sub-station-design-high-voltage",
    title: "Electrical Sub-Station Design & High Voltage",
    shortTitle: "Sub-Station Design & HV",
    category: "Power systems",
    fee: 5500,
    duration: "2 Months",
    months: 2,
    level: "Technical foundation",
    description:
      "Understand sub-station equipment, power distribution and protection. Practice drawing interpretation, equipment selection and safe inspection workflows.",
    art: "substation",
    outcomes: [
      "Identify major sub-station components and their functions.",
      "Interpret single-line diagrams and protection schemes.",
      "Prepare basic equipment sizing and load calculations.",
      "Apply inspection, testing and high-voltage safety procedures.",
    ],
    syllabus: [
      {
        title: "Sub-station fundamentals",
        topics: [
          "Transmission and distribution overview",
          "Transformer ratings, vector groups and accessories",
          "Bus arrangements and sub-station layouts",
        ],
      },
      {
        title: "HT & LT switchgear",
        topics: [
          "Circuit breakers, isolators and instrument transformers",
          "HT switchgear operation principles",
          "LT panels, ACB/MCCB selection and PFI control",
        ],
      },
      {
        title: "Protection & grounding",
        topics: [
          "Overcurrent and earth-fault protection concepts",
          "Relay coordination fundamentals",
          "Grounding systems and lightning protection basics",
        ],
      },
      {
        title: "Design calculations",
        topics: [
          "Load schedules, demand and diversity",
          "Transformer and cable selection fundamentals",
          "Short-circuit concepts and equipment ratings",
        ],
      },
      {
        title: "Inspection & design project",
        topics: [
          "Testing documents and maintenance checklists",
          "Electrical safety, permits and authorized operation",
          "Prepare a conceptual sub-station design package",
        ],
      },
    ],
    project:
      "A conceptual sub-station layout with an SLD, equipment schedule, protection overview and inspection checklist.",
    requirements: [
      "Basic electrical knowledge. High-voltage activities require qualified supervision and authorized site procedures.",
    ],
    skillIds: [11, 12, 13, 16, 17, 19],
  },
  {
    id: "cctv",
    slug: "advanced-cctv-installation-maintenance",
    title: "Advanced CCTV Installation & Maintenance",
    shortTitle: "CCTV & Network Security",
    category: "Security",
    fee: 3000,
    duration: "1 Month",
    months: 1,
    level: "Beginner friendly",
    description:
      "Plan, install and maintain reliable IP and analog surveillance systems, from camera placement and cabling to recording and remote access.",
    art: "cctv",
    outcomes: [
      "Select suitable cameras, lenses and recording equipment.",
      "Terminate cables and configure IP cameras, NVRs and DVRs.",
      "Troubleshoot network, power and recording faults.",
      "Apply privacy-aware installation and maintenance practices.",
    ],
    syllabus: [
      {
        title: "CCTV system fundamentals",
        topics: [
          "IP vs analog systems and camera types",
          "Resolution, lenses, low light and coverage planning",
          "NVR, DVR, PoE and storage fundamentals",
        ],
      },
      {
        title: "Installation practice",
        topics: [
          "Cat6/RJ45 and coaxial terminations",
          "Camera mounting, power and cable management",
          "System layout and safe working at height",
        ],
      },
      {
        title: "Network & recorder setup",
        topics: [
          "IP addressing, switching and NVR configuration",
          "Recording schedules, motion events and retention",
          "Secure remote access and user permissions",
        ],
      },
      {
        title: "Maintenance & final installation",
        topics: [
          "Fault diagnosis and image quality optimization",
          "Backup, health checks and client handover",
          "Complete a small surveillance system installation",
        ],
      },
    ],
    project:
      "A configured multi-camera surveillance setup with a recorder, documented network plan and maintenance checklist.",
    requirements: [
      "Basic smartphone and computer use. No previous networking experience required.",
    ],
    skillIds: [14, 16, 19],
  },
  {
    id: "solar",
    slug: "solar-pv-system-design-installation",
    title: "Solar PV System Design & Installation",
    shortTitle: "Solar PV Systems",
    category: "Solar energy",
    fee: 5000,
    duration: "1.5 Months",
    months: 1.5,
    level: "Beginner to practical",
    description:
      "Learn the complete small-scale solar workflow: site assessment, load calculation, component sizing, installation and safe system commissioning.",
    art: "solar",
    outcomes: [
      "Assess a site and calculate daily energy requirements.",
      "Size panels, batteries, charge controllers and inverters.",
      "Install and wire on-grid and off-grid system components.",
      "Test, maintain and document a solar PV installation.",
    ],
    syllabus: [
      {
        title: "Solar energy & site assessment",
        topics: [
          "PV fundamentals, irradiance and shading",
          "Site survey and roof orientation",
          "Load assessment and energy calculations",
        ],
      },
      {
        title: "System design & sizing",
        topics: [
          "On-grid, off-grid and hybrid architectures",
          "Panel strings, battery capacity and inverter selection",
          "Charge controllers, MPPT and protection devices",
        ],
      },
      {
        title: "Installation & electrical safety",
        topics: [
          "Mounting structures, DC cabling and connectors",
          "Grounding, surge protection and isolation",
          "Battery handling and safe commissioning procedures",
        ],
      },
      {
        title: "Testing, maintenance & project",
        topics: [
          "Voltage, polarity and performance checks",
          "Fault finding and preventive maintenance",
          "Design and present a complete solar PV proposal",
        ],
      },
    ],
    project:
      "A site-specific solar PV proposal with a load schedule, equipment list, wiring diagram and commissioning checklist.",
    requirements: [
      "Basic electrical arithmetic. Practical high-energy work is performed only under qualified supervision.",
    ],
    skillIds: [1, 15, 16, 17, 19],
  },
];

export const getCourse = (slug: string) =>
  COURSES.find((course) => course.slug === slug);
export const formatTaka = (amount: number) =>
  `${amount.toLocaleString("en-US")} Taka`;
