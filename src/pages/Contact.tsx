import { useState } from "react";
import {
  ArrowUpRight,
  Clock3,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { BRAND, whatsappUrl } from "../data/brand";
import { COURSES } from "../data/courses";
import { useDatabase } from "../context/DatabaseContext";
import { organizationSchema, useSeo } from "../hooks/useSeo";
import { validBangladeshPhone } from "../lib/validation";
import {
  ActionLink,
  Button,
  FieldError,
  PageHero,
  Reveal,
  SectionHeading,
} from "../components/ui";

export function Contact() {
  const { content } = useDatabase();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    interest: "Course guidance",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prepared, setPrepared] = useState("");
  useSeo({
    title: "Contact, Admission Guidance & GEC Location",
    description:
      "Contact Chattogram Trust PLC & Automation Technology at O.R Nizam Road, GEC, Chattogram. Call +880 1646-241953 or send a direct WhatsApp inquiry.",
    schema: organizationSchema,
  });
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!validBangladeshPhone(form.mobile))
      next.mobile = "Please enter a valid Bangladesh mobile number.";
    if (form.message.trim().length < 10)
      next.message = "Tell us a little more (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`contact-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    const url = whatsappUrl(
      `আসসালামু আলাইকুম, আমি ${form.name.trim()}। বিষয়: ${form.interest}। ${form.message.trim()} Phone: ${form.mobile.trim()}`,
    );
    setPrepared(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return (
    <>
      <PageHero
        eyebrow="Contact & location"
        title="A conversation today."
        highlight="A new skill tomorrow."
        description={content.contactNote}
      />
      <section className="section">
        <div className="container-site contact-grid">
          <Reveal>
            <p className="eyebrow">
              <span />
              FIND US AT GEC
            </p>
            <h2 className="text-3xl font-bold tracking-tight">
              Your local technical learning hub.
            </h2>
            <div className="contact-detail">
              <MapPin size={20} />
              <div>
                <h2>Our address</h2>
                <p>{BRAND.address}</p>
                <a
                  href={BRAND.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 !text-cyan-600 dark:!text-cyan-400"
                >
                  Open in Google Maps
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
            <div className="contact-detail">
              <Phone size={19} />
              <div>
                <h2>Call us</h2>
                <a href={BRAND.phoneHref}>{BRAND.phoneDisplay}</a>
                <p className="!text-xs">
                  Course guidance, admissions and project inquiries
                </p>
              </div>
            </div>
            <div className="contact-detail">
              <MessageCircle size={19} />
              <div>
                <h2>WhatsApp</h2>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {BRAND.phoneDisplay}
                </a>
                <p className="!text-xs">
                  Send your question directly to our team
                </p>
              </div>
            </div>
            <div className="contact-detail">
              <Mail size={19} />
              <div>
                <h2>Email</h2>
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </div>
            </div>
            <div className="contact-detail !border-0">
              <Clock3 size={19} />
              <div>
                <h2>Class & visit schedule</h2>
                <p>
                  Please call ahead to confirm current class times and arrange a
                  lab visit. Walk-in availability may vary.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <form className="panel contact-form" onSubmit={submit} noValidate>
              <h2 className="text-xl font-semibold">
                What would you like to learn?
              </h2>
              <p className="mb-6 mt-2 text-xs leading-6 text-muted">
                Prepare a message for our team. This form opens WhatsApp;
                nothing is sent until you send it there.
              </p>
              <div className="space-y-5">
                <div>
                  <label className="field-label" htmlFor="contact-name">
                    Your name *
                  </label>
                  <input
                    className="field"
                    id="contact-name"
                    autoComplete="name"
                    maxLength={80}
                    value={form.name}
                    onChange={(event) =>
                      setForm({ ...form, name: event.target.value })
                    }
                    aria-invalid={!!errors.name}
                    aria-describedby={
                      errors.name ? "contact-name-error" : undefined
                    }
                    placeholder="Your full name"
                  />
                  <FieldError id="contact-name-error" error={errors.name} />
                </div>
                <div>
                  <label className="field-label" htmlFor="contact-mobile">
                    Mobile number *
                  </label>
                  <input
                    className="field"
                    id="contact-mobile"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={20}
                    value={form.mobile}
                    onChange={(event) =>
                      setForm({ ...form, mobile: event.target.value })
                    }
                    aria-invalid={!!errors.mobile}
                    aria-describedby={
                      errors.mobile ? "contact-mobile-error" : undefined
                    }
                    placeholder="01XXXXXXXXX"
                  />
                  <FieldError id="contact-mobile-error" error={errors.mobile} />
                </div>
                <div>
                  <label className="field-label" htmlFor="contact-interest">
                    I’m interested in
                  </label>
                  <select
                    className="field"
                    id="contact-interest"
                    value={form.interest}
                    onChange={(event) =>
                      setForm({ ...form, interest: event.target.value })
                    }
                  >
                    <option>Course guidance</option>
                    <option>Arranging a lab visit</option>
                    <option>Industrial services</option>
                    <option>Training kits & equipment</option>
                    {COURSES.map((course) => (
                      <option key={course.id}>{course.shortTitle}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="field-label" htmlFor="contact-message">
                    Your question *
                  </label>
                  <textarea
                    className="field"
                    id="contact-message"
                    rows={4}
                    maxLength={1500}
                    value={form.message}
                    onChange={(event) =>
                      setForm({ ...form, message: event.target.value })
                    }
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                    placeholder="Tell us about your experience and what you’d like to learn…"
                  />
                  <FieldError
                    id="contact-message-error"
                    error={errors.message}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send size={16} />
                  Prepare WhatsApp message
                </Button>
                {prepared && (
                  <div className="form-notice" role="status">
                    <p>
                      Your message is ready. If WhatsApp didn’t open, use the
                      link below.
                    </p>
                    <ActionLink
                      href={prepared}
                      variant="whatsapp"
                      className="mt-3 w-full"
                    >
                      Open WhatsApp
                      <ArrowUpRight size={15} />
                    </ActionLink>
                  </div>
                )}
                <p className="text-center text-[10px] leading-5 text-muted">
                  Your form details are not saved by this contact page.
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
      <section className="section !pt-0">
        <div className="container-site">
          <SectionHeading
            eyebrow="ON THE MAP"
            title="O.R Nizam Road. GEC. Chattogram."
            description="Use the map for area orientation. Call us if you need help finding Nahar Villa."
          />
          <iframe
            className="map-frame"
            src={BRAND.mapEmbed}
            title="Map showing the GEC / O.R Nizam Road area in Chattogram"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <p className="mt-3 text-[10px] text-muted">
            Map provided by Google. The institute’s exact entrance may require
            confirmation by phone.
          </p>
        </div>
      </section>
    </>
  );
}
