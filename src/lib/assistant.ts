import { BRAND, whatsappUrl } from "../data/brand";
import { COURSES, formatTaka } from "../data/courses";

export interface AssistantReply {
  text: string;
  link?: { label: string; url: string; external?: boolean };
}
export function answerQuestion(question: string): AssistantReply {
  const q = question.toLowerCase().trim();
  const contact: AssistantReply = {
    text: `আমাদের ঠিকানা: ${BRAND.address}।\nCall: ${BRAND.phoneDisplay}\nEmail: ${BRAND.email}`,
    link: { label: "View contact & map", url: "/contact" },
  };
  const courseMatch = COURSES.find((course) => {
    if (/cctv|camera|সিসিটিভি/.test(q) && course.id === "cctv") return true;
    if (/solar|সোলার|সৌর/.test(q) && course.id === "solar") return true;
    if (/autocad|অটোক্যাড|\bcad\b/.test(q) && course.id === "electrical-cad")
      return true;
    if (
      /sub.?station|সাব.?স্টেশন|high voltage/.test(q) &&
      course.id === "substation"
    )
      return true;
    if (
      /advance|advanced|vfd|hmi|scada|অ্যাডভান্স/.test(q) &&
      course.id === "advanced-automation"
    )
      return true;
    if (
      /\bplc\b|পিএলসি|automation|অটোমেশন/.test(q) &&
      course.id === "plc-foundation"
    )
      return true;
    return false;
  });
  if (/price|fees?|cost|taka|dam|দাম|ফি|খরচ|কত টাকা|fee structure/.test(q)) {
    if (courseMatch)
      return {
        text: `${courseMatch.title}\nFee: ${formatTaka(courseMatch.fee)}\nDuration: ${courseMatch.duration}\n\nThis is the listed course fee. Contact us for the current schedule and any available offer.`,
        link: {
          label: "View course & enroll",
          url: `/courses/${courseMatch.slug}`,
        },
      };
    return {
      text: `Our course fees:\n\n${COURSES.map((course) => `• ${course.shortTitle}: ${formatTaka(course.fee)} · ${course.duration}`).join("\n")}\n\nকোন কোর্সটি আপনার জন্য উপযুক্ত, জানতে আমাদের সঙ্গে কথা বলুন।`,
      link: { label: "Compare all courses", url: "/courses" },
    };
  }
  if (
    /location|address|where|kothay|kothai|othay|gec|map|ঠিকানা|কোথায়|কোথায়|লোকেশন|অবস্থান/.test(
      q,
    )
  )
    return contact;
  if (
    /admission|enroll|bkash|payment|admit|vorti|ভর্তি|ভর্তি|পেমেন্ট|বিকাশ|কিভাবে শিখব/.test(
      q,
    )
  )
    return {
      text: "ভর্তির জন্য প্রথমে কোর্স ও বর্তমান ব্যাচ সম্পর্কে জেনে নিন। এরপর checkout পেজে নাম, মোবাইল, কোর্স, bKash sender number ও TrxID দিন। Record সংরক্ষণের পর WhatsApp বার্তা তৈরি হবে।\n\nPayment is manually verified by the institute; saving a form does not confirm admission. আপনার PIN বা OTP কাউকে দেবেন না।",
      link: { label: "Open enrollment", url: "/checkout" },
    };
  if (
    /trainer|teacher|founder|owner|ceo|nezam|anas|প্রশিক্ষক|স্যার|মালিক/.test(q)
  )
    return {
      text: `Our founder, owner, CEO and head trainer is ${BRAND.founder}, also shown as ${BRAND.profileName} on the leadership profile.\n\n“${BRAND.quote}”\n\nContact: ${BRAND.phoneDisplay}`,
      link: { label: "Meet the leadership", url: "/about" },
    };
  if (
    /schedule|time|class|batch|duration|kobe|কখন|সময়|ব্যাচ|ক্লাস|মেয়াদ/.test(
      q,
    )
  )
    return {
      text: courseMatch
        ? `${courseMatch.shortTitle} runs for ${courseMatch.duration}. The current batch days and times are arranged directly with the institute. Please call or WhatsApp ${BRAND.phoneDisplay} to confirm the latest schedule before making a payment.`
        : `Course durations range from 1 to 3 months. For current class days, batch times and seat availability, please contact ${BRAND.phoneDisplay}. We do not publish unconfirmed batch times.`,
      link: {
        label: "Ask about the next batch",
        url: whatsappUrl(
          "আসসালামু আলাইকুম, বর্তমান ব্যাচের সময়সূচি ও আসল সংখ্যা জানতে চাই।",
        ),
        external: true,
      },
    };
  if (/service|consult|repair|industrial project|সেবা|কনসালট/.test(q))
    return {
      text: "We offer industrial automation consultation, PLC/HMI programming, control-panel integration, electrical design, energy studies and maintenance support. Scope, timeline and pricing are assessed for each project.",
      link: { label: "Explore services", url: "/services" },
    };
  if (/product|kit|equipment|কিট|যন্ত্র/.test(q))
    return {
      text: "Explore PLC learning stations, VFD motor kits, HMI integration kits, electrical drafting workstations and solar training kits. Product availability and quotations are confirmed directly—please contact us before payment.",
      link: { label: "Explore training kits", url: "/products" },
    };
  if (/skill|course|learn|shik|শিখ|কোর্স|দক্ষতা/.test(q))
    return {
      text: courseMatch
        ? `${courseMatch.title}\n\n${courseMatch.description}\n\nFee: ${formatTaka(courseMatch.fee)} · ${courseMatch.duration}`
        : "Explore 20 practical skills: house wiring, motor control, PLC, VFD, HMI, SCADA, AutoCAD, sub-stations, switchgear, CCTV, solar PV, safety, energy audits, projects, site management and automobile electrical systems.\n\nStart with your current experience and the work you want to do.",
      link: courseMatch
        ? { label: "View this course", url: `/courses/${courseMatch.slug}` }
        : { label: "Explore the curriculum", url: "/skills" },
    };
  if (/hello|hi\b|hey|salam|assalam|হ্যালো|সালাম|আসসালাম/.test(q))
    return {
      text: "ওয়ালাইকুম আসসালাম! Welcome to Chattogram Trust. 👋\nAsk me about course fees, practical skills, admission or our GEC location. বাংলা, English বা Banglish—যেভাবে সুবিধা লিখুন।",
      link: { label: "Browse courses", url: "/courses" },
    };
  if (/thank|dhonnobad|ধন্যবাদ/.test(q))
    return {
      text: "You’re welcome! ধন্যবাদ। আপনার technical learning journey-এর জন্য শুভকামনা। Need personal guidance? Our team is one message away.",
      link: { label: "Chat on WhatsApp", url: whatsappUrl(), external: true },
    };
  return {
    text: `I can help with course fees, the 20 practical skills, admission, batch information, trainer details and our GEC, Chattogram location. Try “PLC course fee koto?” or “ভর্তি কীভাবে করব?”\n\nFor a question I cannot answer, contact ${BRAND.phoneDisplay}.`,
    link: {
      label: "Ask our team directly",
      url: whatsappUrl(question),
      external: true,
    },
  };
}
