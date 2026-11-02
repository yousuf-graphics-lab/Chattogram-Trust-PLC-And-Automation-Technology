import {
  ArrowUpRight,
  Cable,
  Check,
  CircuitBoard,
  DraftingCompass,
  Gauge,
  MessageCircle,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { BRAND, whatsappUrl } from "../data/brand";
import { useSeo } from "../hooks/useSeo";
import { ActionLink, PageHero, Reveal, SectionHeading } from "../components/ui";

const services = [
  {
    icon: CircuitBoard,
    number: "01",
    title: "PLC & HMI Programming",
    description:
      "Control logic and operator interfaces designed around your machine and process requirements.",
    items: [
      "Ladder logic and sequence development",
      "HMI screen design and tag integration",
      "Program backup and documentation",
    ],
  },
  {
    icon: Cable,
    number: "02",
    title: "Control Panel Integration",
    description:
      "Bring controllers, drives, sensors and protection together into a coordinated control system.",
    items: [
      "Panel layout and I/O planning",
      "PLC, VFD and sensor integration",
      "Factory acceptance and commissioning support",
    ],
  },
  {
    icon: Gauge,
    number: "03",
    title: "SCADA & Industrial Networks",
    description:
      "Make plant operation visible with connected process graphics, alarms and historical information.",
    items: [
      "SCADA graphics and data logging",
      "Modbus device integration",
      "Communication diagnostics",
    ],
  },
  {
    icon: DraftingCompass,
    number: "04",
    title: "Electrical Design & AutoCAD",
    description:
      "Translate your requirements into coordinated electrical drawings and maintainable design records.",
    items: [
      "Single-line diagrams and panel schedules",
      "Lighting, power and cable-route layouts",
      "As-built drawing updates",
    ],
  },
  {
    icon: ShieldCheck,
    number: "05",
    title: "Energy & Power Systems",
    description:
      "Understand your electrical loads and identify opportunities for more reliable, efficient operation.",
    items: [
      "Load schedules and energy studies",
      "Power-factor improvement assessment",
      "Solar PV design consultation",
    ],
  },
  {
    icon: Wrench,
    number: "06",
    title: "Troubleshooting & Maintenance",
    description:
      "Structured technical support to investigate faults and plan practical corrective work.",
    items: [
      "Control-circuit fault investigation",
      "Preventive maintenance planning",
      "Technical team guidance and training",
    ],
  },
];
export function Services() {
  useSeo({
    title: "Industrial Automation Services & Consultancy",
    description:
      "PLC and HMI programming, control-panel integration, SCADA, electrical AutoCAD, energy studies and industrial maintenance support in Chattogram.",
  });
  return (
    <>
      <PageHero
        eyebrow="Industrial services"
        title="Your plant’s next challenge."
        highlight="Our next engineering conversation."
        description="From a single control panel to a connected process, get practical automation and electrical support shaped around your actual requirements."
      >
        <ActionLink
          href={whatsappUrl(
            "আসসালামু আলাইকুম, আমি ইন্ডাস্ট্রিয়াল অটোমেশন ও কনসালটেন্সি সেবা সম্পর্কে জানতে চাই।",
          )}
          variant="orange"
          className="mt-7"
        >
          Discuss your project
          <ArrowUpRight size={16} />
        </ActionLink>
      </PageHero>
      <section className="section">
        <div className="container-site">
          <SectionHeading
            eyebrow="FROM DESIGN TO COMMISSIONING"
            title="Technical support that connects the dots."
            description="Every engagement starts with a scope review. Deliverables, timeline and pricing are agreed before work begins."
          />
          <div className="service-grid">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.04}>
                <article className="panel service-card interactive-panel h-full">
                  <div className="flex items-center justify-between">
                    <span className="skill-icon !h-12 !w-12">
                      <service.icon size={24} />
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {service.number} / SERVICE
                    </span>
                  </div>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                  <ul>
                    {service.items.map((item) => (
                      <li key={item}>
                        <Check size={12} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <ActionLink
                    href={whatsappUrl(
                      `আসসালামু আলাইকুম, আমি ${service.title} সেবা সম্পর্কে বিস্তারিত জানতে চাই।`,
                    )}
                    variant="secondary"
                    className="w-full"
                  >
                    Request a consultation
                    <MessageCircle size={15} />
                  </ActionLink>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section border-y border-line bg-surface/40">
        <div className="container-site">
          <SectionHeading
            eyebrow="A CLEAR WORKING PROCESS"
            title="Good engineering starts with listening."
          />
          <div className="process-grid">
            {[
              {
                title: "Understand the requirement",
                text: "We discuss your process, existing equipment, constraints and expected outcome.",
              },
              {
                title: "Agree the scope",
                text: "Receive a clear proposal covering deliverables, responsibilities, timeline and cost.",
              },
              {
                title: "Build & validate",
                text: "Work progresses through design reviews, integration and agreed testing checkpoints.",
              },
              {
                title: "Hand over with clarity",
                text: "Receive the agreed documentation, operating guidance and support plan.",
              },
            ].map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <div className="process-step">
                  <span>0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-site">
          <div className="cta-band">
            <div>
              <h2>Let’s make your system work better.</h2>
              <p>
                Tell us what you are building, improving or troubleshooting.
              </p>
            </div>
            <ActionLink href={BRAND.phoneHref} variant="orange">
              Call {BRAND.phoneDisplay}
              <ArrowUpRight size={16} />
            </ActionLink>
          </div>
          <p className="mt-5 text-xs leading-6 text-muted">
            High-voltage and site work is subject to competent-person
            requirements, agreed safety procedures and applicable approvals.
            Service availability is confirmed during consultation.
          </p>
        </div>
      </section>
    </>
  );
}
