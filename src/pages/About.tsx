import {
  ArrowUpRight,
  CircuitBoard,
  Compass,
  HandHeart,
  MapPin,
  Target,
  Wrench,
} from "lucide-react";
import { BRAND } from "../data/brand";
import { useDatabase } from "../context/DatabaseContext";
import { organizationSchema, useSeo } from "../hooks/useSeo";
import { ActionLink, PageHero, Reveal, SectionHeading } from "../components/ui";
import { LeadershipCard } from "../components/LeadershipCard";

export function About() {
  const { content } = useDatabase();
  useSeo({
    title: "About the Institute & Our Leadership",
    description:
      "Meet Nezam uddin (Md. Anas Nezam), founder and head trainer at Chattogram Trust PLC & Automation Technology. Practical technical education at GEC, Chattogram.",
    schema: organizationSchema,
  });
  return (
    <>
      <PageHero
        eyebrow="About Chattogram Trust"
        title="Technical education,"
        highlight="with real-world purpose."
        description="We are a practical training institute in GEC, Chattogram, focused on helping learners understand, build and troubleshoot the systems that power modern industry."
      />
      <section className="section">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="WHY WE TEACH"
                title={
                  <>
                    The best way to understand it
                    <br />
                    <span className="text-gradient">is to make it work.</span>
                  </>
                }
              />
              <p className="text-sm leading-8 text-muted">
                {content.aboutMission}
              </p>
              <p className="mt-5 text-sm leading-8 text-muted">
                Our curriculum connects electrical fundamentals with PLC
                programming, connected automation and applied technical design.
                Learners are encouraged to ask why, follow a method and explain
                what they have built.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="panel h-full bg-surface/60 p-8">
                <Compass className="mb-6 text-cyan-500" size={32} />
                <p className="eyebrow">
                  <span />
                  OUR DIRECTION
                </p>
                <h2 className="text-2xl font-semibold leading-10">
                  Build capable people.
                  <br />
                  Not just completed lessons.
                </h2>
                <p className="mt-5 text-sm leading-8 text-muted">
                  A meaningful learning outcome is being able to approach a new
                  circuit, read a diagram, test a hypothesis and work safely
                  toward a solution.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Practical first",
                    "Safety aware",
                    "Industry connected",
                    "Locally rooted",
                  ].map((value) => (
                    <span className="tag" key={value}>
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-12 rounded-xl border border-cyan-500/25 bg-cyan-500/5 px-7 py-8">
            <p
              lang="bn"
              className="font-bangla text-xl leading-relaxed md:text-2xl"
            >
              {BRAND.slogan}
            </p>
            <p
              lang="bn"
              className="mt-4 font-bangla text-base leading-relaxed text-muted"
            >
              {BRAND.practicalSlogan}
            </p>
            <p className="mt-3 text-[10px] leading-5 text-muted">
              Our institute slogan reflects our ambition. Admission does not
              constitute an individual employment guarantee.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section border-y border-line bg-surface/30">
        <div className="container-site">
          <SectionHeading
            eyebrow="MEET THE FOUNDER & HEAD TRAINER"
            title="Leadership that stays close to the work."
          />
          <Reveal>
            <LeadershipCard />
          </Reveal>
          <p className="mt-5 text-xs leading-7 text-muted">
            {BRAND.founder} is the founder, owner, CEO and head trainer. The
            leadership profile is also presented as {BRAND.profileName}. The
            monogram is an original design placeholder, not a photograph.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container-site">
          <SectionHeading
            eyebrow="THE PRINCIPLES BEHIND THE PRACTICE"
            title="What you can expect from your learning."
          />
          <div className="process-grid">
            {[
              {
                icon: Wrench,
                title: "Practice with intent",
                text: "Each exercise connects a concept with an observable, testable result.",
              },
              {
                icon: Target,
                title: "Follow a clear path",
                text: "Start at the right level and progress through a structured sequence of skills.",
              },
              {
                icon: HandHeart,
                title: "Ask. Try. Improve.",
                text: "Guidance, questions and careful troubleshooting are part of the learning process.",
              },
              {
                icon: CircuitBoard,
                title: "Think like a technician",
                text: "Read the drawing, understand the system and work with safety and documentation in mind.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="process-step">
                  <item.icon size={24} className="mb-5 text-cyan-500" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section !pt-0">
        <div className="container-site">
          <div className="cta-band">
            <div>
              <p className="eyebrow">
                <span />
                ROOTED IN CHATTOGRAM
              </p>
              <h2>Come see the practical side.</h2>
              <p className="flex max-w-xl items-start gap-2">
                <MapPin size={15} className="mt-1" />
                {BRAND.address}
              </p>
            </div>
            <ActionLink to="/contact" variant="orange">
              Plan a lab visit
              <ArrowUpRight size={16} />
            </ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}
