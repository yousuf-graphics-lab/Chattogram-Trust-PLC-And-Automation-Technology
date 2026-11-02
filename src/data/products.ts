import type { ArtVariant } from "../types";
export interface Product {
  id: string;
  title: string;
  category: string;
  art: ArtVariant;
  description: string;
  specs: string[];
  includes: string[];
  idealFor: string;
}
export const PRODUCTS: Product[] = [
  {
    id: "plc-station",
    title: "PLC Learning & Development Station",
    category: "PLC & control",
    art: "plc",
    description:
      "A configurable practice platform for learning input wiring, ladder logic and industrial sequence control.",
    specs: ["24 V DC control", "Digital I/O", "Custom configuration"],
    includes: [
      "Controller and I/O configuration to suit the agreed scope.",
      "Input switches, indicators and terminal connections.",
      "Basic wiring reference and setup guidance.",
    ],
    idealFor:
      "Training labs, technical students and control-logic prototyping.",
  },
  {
    id: "vfd-kit",
    title: "VFD & Motor Control Kit",
    category: "Drives & HMI",
    art: "automation",
    description:
      "Explore drive parameters, speed references and motor-control wiring on a practical demonstration platform.",
    specs: ["Motor nameplate setup", "Speed reference", "Protection devices"],
    includes: [
      "Drive and motor pairing subject to your power supply and load requirements.",
      "Control terminals and operator controls.",
      "Parameter checklist and commissioning guidance.",
    ],
    idealFor: "Drive programming practice and motor-control demonstrations.",
  },
  {
    id: "hmi-kit",
    title: "PLC–HMI Integration Kit",
    category: "Drives & HMI",
    art: "scada",
    description:
      "Bring operator screens and control logic together in a compact, connected learning system.",
    specs: ["HMI screen project", "PLC communication", "Alarm & trend demo"],
    includes: [
      "Compatible controller and HMI hardware based on quotation.",
      "A sample process screen and tag mapping.",
      "Communication setup and example logic.",
    ],
    idealFor: "HMI design practice and small process-control prototypes.",
  },
  {
    id: "motor-kit",
    title: "Industrial Motor Control Panel",
    category: "PLC & control",
    art: "motor",
    description:
      "A training-oriented control panel for understanding starting methods, interlocks and fault diagnosis.",
    specs: ["DOL / star-delta", "Forward & reverse", "Overload protection"],
    includes: [
      "Control components configured for the agreed training exercise.",
      "Labeled terminals and a circuit reference.",
      "Guided functional testing before handover where agreed.",
    ],
    idealFor:
      "Electrical training centers and practical control-circuit workshops.",
  },
  {
    id: "cad-workstation",
    title: "Electrical CAD Practice Package",
    category: "Design & energy",
    art: "cad",
    description:
      "A guided setup package for organizing an electrical drafting practice environment and project templates.",
    specs: ["Symbol library", "Drawing templates", "SLD & panel schedules"],
    includes: [
      "Electrical drawing template and symbol organization guidance.",
      "Sample load schedule and project folder structure.",
      "Software licensing is separate and must be obtained legally.",
    ],
    idealFor: "Electrical drafting learners and junior design teams.",
  },
  {
    id: "solar-kit",
    title: "Solar PV Training & Demonstration Kit",
    category: "Design & energy",
    art: "solar",
    description:
      "A low-voltage educational platform for exploring PV behavior, charge control and system measurements.",
    specs: ["Low-voltage demo", "MPPT concepts", "Measurement points"],
    includes: [
      "Small PV module and charge-controller demonstration components.",
      "Safe measurement points and a connection reference.",
      "System-sizing worksheet and guided setup notes.",
    ],
    idealFor: "Classroom demonstrations and introductory solar training.",
  },
];
