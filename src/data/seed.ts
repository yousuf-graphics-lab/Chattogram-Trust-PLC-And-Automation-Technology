import type { Article, GalleryItem, Notice, SiteContent } from "../types";
import { BRAND } from "./brand";

export const DEFAULT_CONTENT: SiteContent = {
  announcement: BRAND.defaultAnnouncement,
  homeIntro:
    "From your first control circuit to a fully connected automation project. Learn by building, testing and solving real technical challenges.",
  aboutMission:
    "We make industrial technology approachable through practical, guided learning. Our focus is simple: understand the system, build the circuit, program the logic and confidently diagnose the result.",
  contactNote:
    "Have a question about your learning path? Call or message us to discuss the current batch schedule, course suitability and admission process.",
};

export const SEED_NOTICES: Notice[] = [
  {
    id: "notice-admission",
    title: "ভর্তি চলছে — হাতে-কলমে অটোমেশন শেখার সুযোগ",
    body: "PLC, Advanced Automation, Electrical AutoCAD, Sub-Station, CCTV এবং Solar PV কোর্সে ভর্তি সম্পর্কে জানতে যোগাযোগ করুন। বর্তমান ব্যাচের সময়সূচি ও আসল সংখ্যা জানতে +880 1646-241953 নম্বরে কল বা WhatsApp করুন।",
    category: "Admission",
    date: "2026-11-01",
    pinned: true,
  },
  {
    id: "notice-lab",
    title: "Practical lab orientation for new learners",
    body: "New learners can speak with the head trainer about the practical lab, required preparation and the most suitable course. Orientation visits are arranged by contacting the institute; please do not rely on an unconfirmed walk-in schedule.",
    category: "Schedule",
    date: "2026-10-28",
    pinned: false,
  },
  {
    id: "notice-enrollment",
    title: "Online enrollment & bKash payment guidance",
    body: "Use the enrollment page to record your course and bKash transaction details, then send the prepared WhatsApp message. Our team checks the transaction manually before confirming admission. Never share your PIN or OTP.",
    category: "General",
    date: "2026-10-25",
    pinned: false,
  },
];

export const SEED_ARTICLES: Article[] = [
  {
    id: "article-plc-guide",
    slug: "plc-shikha-shuru-korar-age",
    title: "PLC শেখা শুরু করার আগে যে ৫টি বিষয় জানা জরুরি",
    excerpt:
      "PLC কী, কেন শিখবেন এবং কীভাবে প্রস্তুতি নেবেন — নতুনদের জন্য একটি বাস্তবভিত্তিক গাইড।",
    category: "Getting started",
    date: "2026-10-30",
    readMinutes: 4,
    art: "plc",
    published: true,
    sections: [
      {
        heading: "PLC আসলে কী কাজ করে?",
        body: "PLC বা Programmable Logic Controller হলো শিল্পযন্ত্র নিয়ন্ত্রণের জন্য তৈরি একটি কম্পিউটার। এটি সেন্সর ও সুইচ থেকে ইনপুট পড়ে, প্রোগ্রাম অনুযায়ী সিদ্ধান্ত নেয় এবং মোটর, ভালভ বা ইন্ডিকেটরের মতো আউটপুট নিয়ন্ত্রণ করে। একটি কনভেয়র কখন চলবে, একটি ট্যাংক কখন পূর্ণ হয়েছে বা কোন পরিস্থিতিতে মেশিন বন্ধ হবে—এসব কাজ PLC করতে পারে।",
      },
      {
        heading: "১. রিলে ও মোটর কন্ট্রোলের ধারণা নিন",
        body: "সরাসরি জটিল প্রোগ্রামে না গিয়ে সুইচ, রিলে, কনট্যাক্টর এবং ওভারলোডের কাজ বুঝুন। DOL, star-delta এবং forward-reverse সার্কিট হাতে-কলমে করলে PLC ladder logic অনেক সহজ মনে হবে। বৈদ্যুতিক কাজ সবসময় যোগ্য প্রশিক্ষকের তত্ত্বাবধানে এবং নিরাপদ প্রশিক্ষণ পরিবেশে করুন।",
      },
      {
        heading: "২. ইনপুট ও আউটপুট আলাদা করে চিনুন",
        body: "Push button, limit switch এবং proximity sensor সাধারণত ইনপুট হিসেবে কাজ করে। Lamp, solenoid এবং contactor coil আউটপুটের উদাহরণ। একটি সহজ মেশিনের I/O তালিকা তৈরি করুন। Sinking ও sourcing wiring এবং supply voltage বোঝা ভুল সংযোগ এড়াতে সাহায্য করে।",
      },
      {
        heading: "৩. Ladder logic দিয়ে ছোট সমস্যা সমাধান করুন",
        body: "Start-stop latch, timer এবং counter দিয়ে শুরু করুন। তারপর দুটি মোটরের sequence বা একটি ছোট ট্যাংক-লেভেল সমস্যা তৈরি করুন। প্রোগ্রাম লেখার পর সেটি monitor করে দেখুন কোন contact কাজ করছে এবং কেন একটি output চালু হচ্ছে না। Debug করার অভ্যাসই বাস্তব দক্ষতা তৈরি করে।",
      },
      {
        heading: "৪. একটি PLC-তে সীমাবদ্ধ না থেকে ধারণা শিখুন",
        body: "Siemens, Delta ও Mitsubishi-র software এবং addressing আলাদা হতে পারে, কিন্তু scan cycle, I/O, interlock ও sequence-এর মূল ধারণা একই। একটি প্ল্যাটফর্মে ভালো ভিত্তি তৈরি করলে অন্য প্ল্যাটফর্মে মানিয়ে নেওয়া সহজ হয়। হাতে-কলমে করার সময় wiring diagram এবং নিজের নোট সংরক্ষণ করুন।",
      },
      {
        heading: "৫. ছোট একটি সম্পূর্ণ প্রজেক্ট করুন",
        body: "শুধু ভিডিও দেখা বা instruction মুখস্থ করা যথেষ্ট নয়। একটি সমস্যা নির্বাচন করুন, I/O লিখুন, logic তৈরি করুন, নিরাপদে পরীক্ষা করুন এবং fault খুঁজে বের করুন। কোর্সের ধারাবাহিকতা ও আপনার বর্তমান দক্ষতা অনুযায়ী উপযুক্ত learning path নিয়ে আমাদের সঙ্গে কথা বলুন।",
      },
    ],
  },
  {
    id: "article-vfd",
    slug: "vfd-variable-frequency-drive-basics",
    title: "VFD কীভাবে মোটরের গতি ও energy ব্যবহার নিয়ন্ত্রণ করে?",
    excerpt:
      "Frequency, voltage, ramp time—VFD parameter-এর পেছনের ধারণাগুলো সহজ ভাষায় বুঝুন।",
    category: "Technical guide",
    date: "2026-10-24",
    readMinutes: 3,
    art: "automation",
    published: true,
    sections: [
      {
        heading: "VFD কেন ব্যবহার করা হয়?",
        body: "Variable Frequency Drive মোটরকে দেওয়া frequency ও voltage নিয়ন্ত্রণ করে motor speed পরিবর্তন করতে সাহায্য করে। Pump, fan, conveyor ও অন্যান্য অনেক application-এ process-এর প্রয়োজন অনুযায়ী speed নির্ধারণ করা যায়। সঠিক application-এ এটি throttling-এর তুলনায় energy সাশ্রয়ের সুযোগ তৈরি করতে পারে, তবে সাশ্রয়ের পরিমাণ load profile ও operating condition-এর ওপর নির্ভর করে।",
      },
      {
        heading: "Motor nameplate থেকে শুরু করুন",
        body: "Parameter দেওয়ার আগে motor-এর rated voltage, current, frequency, speed এবং connection ধরন মিলিয়ে নিন। ভুল nameplate data drive-এর control performance ও protection-কে প্রভাবিত করতে পারে। Drive, motor এবং supply-এর compatibility যাচাই করা এবং manufacturer-এর manual অনুসরণ করা জরুরি।",
      },
      {
        heading: "Ramp time ও command source",
        body: "Acceleration time নির্ধারণ করে motor কত দ্রুত target speed-এ যাবে। Deceleration time নির্ধারণ করে কত দ্রুত থামবে। অতিরিক্ত দ্রুত ramp overcurrent বা overvoltage fault তৈরি করতে পারে। Start-stop command keypad, terminal নাকি communication থেকে আসবে এবং speed reference কোথা থেকে পাবে—এই দুটি বিষয় আলাদাভাবে বুঝুন।",
      },
      {
        heading: "নিরাপত্তা কখনো bypass করবেন না",
        body: "Power off করার পরও DC bus capacitor-এ বিপজ্জনক voltage থাকতে পারে। Manufacturer-এর নির্ধারিত discharge time মানুন এবং যোগ্য ব্যক্তির supervision ছাড়া কাজ করবেন না। Emergency-stop function ও safe isolation আলাদাভাবে design করতে হয়; শুধু একটি run command বন্ধ করাকে নিরাপদ isolation মনে করা যাবে না।",
      },
    ],
  },
  {
    id: "article-solar",
    slug: "solar-system-design-load-calculation",
    title: "সোলার সিস্টেম ডিজাইনের প্রথম ধাপ: সঠিক load calculation",
    excerpt:
      "Panel কেনার আগে দৈনিক energy demand, autonomy এবং system loss কীভাবে হিসাব করবেন।",
    category: "Solar & energy",
    date: "2026-10-18",
    readMinutes: 3,
    art: "solar",
    published: true,
    sections: [
      {
        heading: "Watt আর Watt-hour এক নয়",
        body: "একটি appliance-এর watt হলো তার power demand। আর watt-hour হলো নির্দিষ্ট সময়ে ব্যবহৃত energy। 40 W-এর একটি fan দিনে 5 ঘণ্টা চললে আনুমানিক 200 Wh energy ব্যবহার করে। সব appliance-এর watt × operating hours যোগ করে দৈনিক energy estimate তৈরি করুন।",
      },
      {
        heading: "Peak load আলাদাভাবে দেখুন",
        body: "দৈনিক energy ছাড়াও একই সময়ে সর্বোচ্চ কত load চলতে পারে তা হিসাব করুন। Motor বা pump-এর starting demand বেশি হতে পারে। Inverter নির্বাচনের সময় continuous rating, surge capability, battery voltage এবং manufacturer-এর specification বিবেচনা করতে হয়।",
      },
      {
        heading: "Loss ও বাস্তব পরিস্থিতি ধরুন",
        body: "Temperature, shading, cable loss, inverter efficiency, battery behavior এবং panel orientation বাস্তব output-কে প্রভাবিত করে। তাই শুধু panel-এর nameplate watt দিয়ে হিসাব করলে প্রত্যাশা পূরণ নাও হতে পারে। Site-specific irradiance data এবং প্রযোজ্য design standard ব্যবহার করে qualified designer-এর সহায়তা নিন।",
      },
      {
        heading: "একটি যাচাইযোগ্য proposal তৈরি করুন",
        body: "Load schedule, daily energy estimate, system architecture, component list, protection plan এবং wiring diagram একসঙ্গে রাখুন। On-grid, off-grid ও hybrid ব্যবস্থার প্রয়োজন আলাদা। Grid connection-এর ক্ষেত্রে প্রযোজ্য অনুমোদন ও utility requirement যাচাই করুন। আমাদের Solar PV কোর্সে এই পরিকল্পনা ও ব্যবহারিক ভিত্তি নিয়ে কাজ করা হয়।",
      },
    ],
  },
];

export const SEED_GALLERY: GalleryItem[] = [
  {
    id: "gallery-plc",
    title: "Inside the PLC control station",
    category: "Training lab",
    type: "image",
    art: "plc",
    description:
      "Technical illustration of a PLC panel, terminal connections and operator interface. Built-in artwork, not a photograph of the facility.",
  },
  {
    id: "gallery-network",
    title: "The connected automation stack",
    category: "Automation",
    type: "image",
    art: "automation",
    description:
      "PLC, VFD and HMI integration shown as a code-generated technical illustration.",
  },
  {
    id: "gallery-cad",
    title: "From floor plan to electrical design",
    category: "Design & power",
    type: "image",
    art: "cad",
    description:
      "An original vector illustration of an electrical drafting workspace.",
  },
  {
    id: "gallery-power",
    title: "Power distribution, visualized",
    category: "Design & power",
    type: "image",
    art: "substation",
    description:
      "A technical illustration of sub-station and distribution equipment.",
  },
  {
    id: "gallery-solar",
    title: "Engineering a brighter energy future",
    category: "Field applications",
    type: "image",
    art: "solar",
    description:
      "A built-in vector illustration of a rooftop solar PV installation.",
  },
  {
    id: "gallery-cctv",
    title: "Connected security systems",
    category: "Field applications",
    type: "image",
    art: "cctv",
    description:
      "An original illustration of IP camera, network and recorder integration.",
  },
];
