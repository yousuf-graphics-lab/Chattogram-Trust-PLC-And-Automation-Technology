/**
 * Trust Assist — trilingual (বাংলা / English / Banglish) rule-based assistant.
 * Understands romanized Bangla (Banglish), institute queries AND a broad
 * electrical / automation knowledge base so it can answer "other topics" too.
 */
import { courses } from '@/data/courses';
import type { Course } from '@/types';
import { SITE, formatTaka } from '@/lib/site';

export type Lang = 'bn' | 'en' | 'banglish';

const BANGLISH_TOKENS =
  /\b(ami|amader|apni|apnar|tumi|tomar|koto|koto taka|dam|daam|khoroch|khoroch koto|vorti|bhorti|bhorte|vorte|hote|ki|ki ki|kobe|kokhon|kivabe|kemne|kothay|koi|ache|ase|chai|chan|jante|bolun|bolo|den|din|sir|teacher|trainer|ke|kar|taka|poisha|bkash|nagad|whatsapp|number|jogajog|thikana|class|somoy|batch|chakri|kaj|bidesh|salary|beton|certificate|kisti|installment|female|meye|lab|ghurte|parbo|hobe|lagbe|lage|dorkar|shikhbo|shikhte|ki jinis|jinis|ta|ti|er|e|te|ro|ra|der|jonno|nite|pabo|pawa|jay|jabe|korbo|korte|kori|koren|korun|ache ki|ase ki|bolo to|janan|janaben|bolen|shuni|dekhi|dekhun|course ta|course fee|fee koto|plc ki|scada ki|vfd ki|hmi ki)\b/;

export function detectLang(text: string): Lang {
  if (/[\u0980-\u09FF]/.test(text)) return 'bn';
  return BANGLISH_TOKENS.test(text.toLowerCase()) ? 'banglish' : 'en';
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\w\u0980-\u09FF\s+]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

type Tri = { bn: string; en: string; banglish: string };
const pick = (t: Tri, lang: Lang) => t[lang];

/* ---------------- course matching ---------------- */
const COURSE_KEYS: { slug: string; keys: string[] }[] = [
  { slug: 'advance-automation-plc-vfd-hmi', keys: ['vfd', 'hmi', 'scada', 'advance', 'advanced', 'drive', 'inverter', 'modbus', 'servo'] },
  { slug: 'electrical-autocad', keys: ['autocad', 'auto cad', 'cad', 'drawing', 'sld', 'অটোক্যাড', 'ড্রয়িং'] },
  { slug: 'electrical-substation-design', keys: ['substation', 'sub station', 'sub-station', 'switchgear', 'pfi', 'সাবস্টেশন', 'সুইচগিয়ার'] },
  { slug: 'advanced-cctv', keys: ['cctv', 'camera', 'nvr', 'dvr', 'ip camera', 'সিসিটিভি', 'ক্যামেরা'] },
  { slug: 'solar-pv-system', keys: ['solar', 'pv', 'photovoltaic', 'net metering', 'সোলার', 'সৌর'] },
  { slug: 'industrial-automation-plc', keys: ['plc', 'automation', 'industrial', 'relay', 'ladder', 'delta', 'siemens', 'অটোমেশন', 'পিসিএল', 'রিলে'] },
];

function matchCourse(t: string): Course | undefined {
  for (const { slug, keys } of COURSE_KEYS) {
    if (keys.some((k) => t.includes(k))) return courses.find((c) => c.slug === slug);
  }
  return undefined;
}

const feeList = courses.map((c) => `• ${c.shortTitle} — ${formatTaka(c.fee)} (${c.duration})`).join('\n');
const courseLine = (c: Course) =>
  `${c.title}\n💰 ${formatTaka(c.fee)}  ⏱ ${c.duration}  🎯 ${c.level}\n👥 ${c.seats} seats/batch\n🛠 ${c.tools.slice(0, 4).join(', ')}\n🔗 /courses/${c.slug}`;

/* ---------------- technical / general knowledge base ---------------- */
const KB: { keys: string[]; tri: Tri }[] = [
  {
    keys: ['plc ki', 'what is plc', 'plc meaning', 'plc mane', 'plc jinis', 'পিএলসি কি', 'পিএলসি কী'],
    tri: {
      bn: 'PLC (Programmable Logic Controller) হলো ইন্ডাস্ট্রিয়াল কম্পিউটার যা মেশিন/প্রসেস অটোমেট করে। এটি ইনপুট (সেন্সর/সুইচ) পড়ে, ল্যাডার লজিক প্রোগ্রাম চালায় এবং আউটপুট (মোটর/ভালভ/রিলে) কন্ট্রোল করে। Siemens, Delta, Mitsubishi জনপ্রিয় ব্র্যান্ড।',
      en: 'A PLC (Programmable Logic Controller) is an industrial computer that automates machines/processes. It reads inputs (sensors/switches), runs a ladder-logic program and drives outputs (motors/valves/relays). Popular brands: Siemens, Delta, Mitsubishi.',
      banglish: 'PLC (Programmable Logic Controller) holo industrial computer ja machine/process automate kore. Input (sensor/switch) pore, ladder logic program chalay, output (motor/valve/relay) control kore. Brand: Siemens, Delta, Mitsubishi.',
    },
  },
  {
    keys: ['scada ki', 'what is scada', 'scada meaning', 'scada mane', 'স্কাডা'],
    tri: {
      bn: 'SCADA (Supervisory Control And Data Acquisition) হলো সফটওয়্যার সিস্টেম যা দূর থেকে প্ল্যান্ট মনিটর ও কন্ট্রোল করে, ডেটা লগ করে, অ্যালার্ম ও ট্রেন্ড দেখায়। PLC-এর উপরের স্তরে কাজ করে।',
      en: 'SCADA (Supervisory Control And Data Acquisition) is a software system that monitors & controls a plant remotely, logs data and shows alarms/trends. It sits above the PLC layer.',
      banglish: 'SCADA holo software system ja dur theke plant monitor & control kore, data log kore, alarm/trend dekhay. PLC er upore kaj kore.',
    },
  },
  {
    keys: ['vfd ki', 'what is vfd', 'vfd meaning', 'variable frequency', 'ভিএফডি'],
    tri: {
      bn: 'VFD (Variable Frequency Drive) মোটরের স্পিড ও টর্ক কন্ট্রোল করে ফ্রিকোয়েন্সি/ভোল্টেজ বদলে। এতে এনার্জি সেভ হয়, সফট স্টার্ট ও প্রসেস কন্ট্রোল পাওয়া যায়।',
      en: 'A VFD (Variable Frequency Drive) controls motor speed & torque by varying frequency/voltage. It saves energy and gives soft-start + process control.',
      banglish: 'VFD motor er speed & torque control kore frequency/voltage bodle. Energy save hoy, soft start & process control pawa jay.',
    },
  },
  {
    keys: ['hmi ki', 'what is hmi', 'hmi meaning', 'এইচএমআই'],
    tri: {
      bn: 'HMI (Human Machine Interface) হলো টাচ স্ক্রিন/প্যানেল যা অপারেটরকে মেশিনের স্ট্যাটাস দেখায় ও কন্ট্রোল করতে দেয়। PLC-এর সাথে যুক্ত থাকে।',
      en: 'An HMI (Human Machine Interface) is a touch screen/panel that shows machine status to the operator and lets them control it. It connects to the PLC.',
      banglish: 'HMI holo touch screen/panel ja operator ke machine status dekhay & control korte dey. PLC er sathe connected thake.',
    },
  },
  {
    keys: ['plc vs scada', 'difference plc scada', 'plc scada parthokko'],
    tri: {
      bn: 'PLC হলো হার্ডওয়্যার কন্ট্রোলার (লজিক চালায়), SCADA হলো সফটওয়্যার সুপারভাইজরি সিস্টেম (মনিটর/ডেটা/অ্যালার্ম)। PLC = মাঠ পর্যায়ের কন্ট্রোল, SCADA = উপরের তত্ত্বাবধান।',
      en: 'PLC is the hardware controller (runs logic); SCADA is the supervisory software (monitoring/data/alarms). PLC = field control, SCADA = oversight.',
      banglish: 'PLC holo hardware controller (logic chalay); SCADA holo supervisory software (monitor/data/alarm). PLC = field control, SCADA = oversight.',
    },
  },
  {
    keys: ['autocad ki', 'what is autocad', 'auto cad', 'অটোক্যাড'],
    tri: {
      bn: 'AutoCAD হলো 2D/3D ড্রয়িং সফটওয়্যার। ইলেকট্রিক্যাল কাজে SLD, ফ্লোর প্ল্যান, MDB/SDB লোড ডিজাইন ও প্যানেল GA ড্রয়িং তৈরি করতে ব্যবহৃত হয়।',
      en: 'AutoCAD is a 2D/3D drafting software. In electrical work it is used for SLDs, floor plans, MDB/SDB load design and panel GA drawings.',
      banglish: 'AutoCAD holo 2D/3D drawing software. Electrical kaj e SLD, floor plan, MDB/SDB load design & panel GA drawing korte use hoy.',
    },
  },
  {
    keys: ['cctv ki', 'ip camera', 'nvr', 'dvr', 'সিসিটিভি'],
    tri: {
      bn: 'CCTV সিস্টেমে ক্যামেরা, NVR/DVR, PoE সুইচ ও স্টোরেজ থাকে। IP ক্যামেরা নেটওয়ার্কে ভিডিও পাঠায়, NVR রেকর্ড করে। রিমোট ভিউ মোবাইলে দেখা যায়।',
      en: 'A CCTV system has cameras, NVR/DVR, PoE switch and storage. IP cameras send video over the network; the NVR records it. Remote view works on mobile.',
      banglish: 'CCTV system e camera, NVR/DVR, PoE switch & storage thake. IP camera network e video pathay, NVR record kore. Mobile e remote view dekha jay.',
    },
  },
  {
    keys: ['solar ki', 'solar pv', 'net metering', 'on grid', 'off grid', 'সোলার'],
    tri: {
      bn: 'সোলার PV সিস্টেমে প্যানেল, ইনভার্টার, ব্যাটারি (অফ-গ্রিড) ও নেট মিটার (অন-গ্রিড) থাকে। সাইজিং লোড ও পিক-সান-আওয়ারের উপর নির্ভর করে।',
      en: 'A solar PV system has panels, inverter, battery (off-grid) and net meter (on-grid). Sizing depends on load and peak-sun-hours.',
      banglish: 'Solar PV system e panel, inverter, battery (off-grid) & net meter (on-grid) thake. Sizing load & peak-sun-hours er upore depend kore.',
    },
  },
  {
    keys: ['substation ki', 'sub station', 'switchgear', 'সাবস্টেশন'],
    tri: {
      bn: 'সাব-স্টেশন ভোল্টেজ স্টেপ-ডাউন/আপ করে (যেমন 11kV→0.4kV)। এতে ট্রান্সফরমার, HT/LT সুইচগিয়ার, PFI প্ল্যান্ট ও প্রোটেকশন রিলে থাকে।',
      en: 'A substation steps voltage down/up (e.g. 11kV→0.4kV). It has a transformer, HT/LT switchgear, PFI plant and protection relays.',
      banglish: 'Substation voltage step-down/up kore (11kV→0.4kV). Ete transformer, HT/LT switchgear, PFI plant & protection relay thake.',
    },
  },
  {
    keys: ['sensor ki', 'what is sensor', 'proximity', 'photoelectric', 'সেন্সর'],
    tri: {
      bn: 'সেন্সর ফিজিক্যাল রাশি (পজিশন, প্রেজেন্স, টেম্পারেচার, প্রেশার) কে ইলেকট্রিক্যাল সিগনালে বদলায়। ইন্ডাস্ট্রিতে proximity, photoelectric, RTD/thermocouple, pressure transmitter বেশি ব্যবহৃত হয়।',
      en: 'A sensor converts a physical quantity (position, presence, temperature, pressure) into an electrical signal. Industry uses proximity, photoelectric, RTD/thermocouple and pressure transmitters.',
      banglish: 'Sensor physical quantity (position, presence, temperature, pressure) ke electrical signal e bodlay. Industry te proximity, photoelectric, RTD/thermocouple, pressure transmitter use hoy.',
    },
  },
  {
    keys: ['relay ki', 'contactor ki', 'relay contactor', 'রিলে', 'কন্টাক্টর'],
    tri: {
      bn: 'রিলে হলো ইলেকট্রোম্যাগনেটিক সুইচ (কম পাওয়ারে বেশি পাওয়ার কন্ট্রোল)। কন্টাক্টর হলো ভারী লোড (মোটর) এর জন্য বড় রিলে। ওভারলোড রিলে মোটরকে ওভারকারেন্ট থেকে রক্ষা করে।',
      en: 'A relay is an electromagnetic switch (low power controls high power). A contactor is a heavy-duty relay for motors. An overload relay protects the motor from overcurrent.',
      banglish: 'Relay holo electromagnetic switch (low power e high power control). Contactor holo motor er jonno heavy-duty relay. Overload relay motor ke overcurrent theke protect kore.',
    },
  },
  {
    keys: ['modbus ki', 'modbus', 'communication protocol', 'rs485'],
    tri: {
      bn: 'Modbus একটি ইন্ডাস্ট্রিয়াল কমিউনিকেশন প্রোটোকল (RTU সিরিয়াল RS-485, TCP ইথারনেট)। PLC, VFD, HMI, SCADA-এর মধ্যে ডেটা আদান-প্রদানে ব্যবহৃত হয়।',
      en: 'Modbus is an industrial communication protocol (RTU over RS-485, TCP over Ethernet). It exchanges data between PLC, VFD, HMI and SCADA.',
      banglish: 'Modbus holo industrial communication protocol (RTU RS-485, TCP Ethernet). PLC, VFD, HMI, SCADA er moddhe data exchange e use hoy.',
    },
  },
  {
    keys: ['ladder logic', 'ladder ki', 'ল্যাডার'],
    tri: {
      bn: 'ল্যাডার লজিক হলো PLC প্রোগ্রামিং ভাষা যা রিলে ডায়াগ্রামের মতো দেখতে। রান, কন্টাক্ট (NO/NC), কয়েল, টাইমার ও কাউন্টার দিয়ে লজিক লেখা হয়।',
      en: 'Ladder logic is a PLC programming language that looks like relay diagrams. Logic is written with rails, contacts (NO/NC), coils, timers and counters.',
      banglish: 'Ladder logic holo PLC programming language ja relay diagram er moto dekhte. Rail, contact (NO/NC), coil, timer & counter diye logic lekha hoy.',
    },
  },
  {
    keys: ['ac dc', 'ac vs dc', 'alternating current', 'direct current'],
    tri: {
      bn: 'AC (Alternating Current) দিক বদলায় (গ্রিড/বাসা বাড়ি), DC (Direct Current) এক দিকে চলে (ব্যাটারি/সোলার/ইলেকট্রনিক্স)। ইনভার্টার DC→AC, রেক্টিফায়ার AC→DC করে।',
      en: 'AC (alternating current) reverses direction (grid/homes); DC (direct current) flows one way (battery/solar/electronics). Inverter = DC→AC, rectifier = AC→DC.',
      banglish: 'AC direction bodlay (grid/home); DC ek dike chole (battery/solar/electronics). Inverter = DC→AC, rectifier = AC→DC.',
    },
  },
  {
    keys: ['ohm law', 'ohm', 'voltage current resistance', 'ওহম'],
    tri: {
      bn: 'ওহমের সূত্র: V = I × R। ভোল্টেজ (V) = কারেন্ট (I) × রেজিস্ট্যান্স (R)। পাওয়ার P = V × I। ইলেকট্রিক্যাল কাজের ভিত্তি এটি।',
      en: "Ohm's law: V = I × R. Voltage = Current × Resistance. Power P = V × I. This is the foundation of electrical work.",
      banglish: "Ohm's law: V = I × R. Voltage = Current × Resistance. Power P = V × I. Electrical kaj er base eta.",
    },
  },
  {
    keys: ['transformer ki', 'what is transformer', 'ট্রান্সফরমার'],
    tri: {
      bn: 'ট্রান্সফরমার AC ভোল্টেজ স্টেপ-আপ/ডাউন করে (ইলেকট্রোম্যাগনেটিক ইন্ডাকশন)। প্রাইমারি ও সেকেন্ডারি কয়েলের টার্ন অনুপাতে ভোল্টেজ বদলায়।',
      en: 'A transformer steps AC voltage up/down via electromagnetic induction. Voltage changes by the turns ratio of primary & secondary coils.',
      banglish: 'Transformer AC voltage step-up/down kore (electromagnetic induction). Primary & secondary coil er turns ratio te voltage bodlay.',
    },
  },
  {
    keys: ['earthing', 'grounding', 'আর্থিং'],
    tri: {
      bn: 'আর্থিং/গ্রাউন্ডিং ফল্ট কারেন্টকে মাটিতে পাঠিয়ে মানুষ ও ইকুইপমেন্টকে রক্ষা করে। আর্থ রেজিস্ট্যান্স কম রাখা জরুরি (সাধারণত < ১–৫ ওহম)।',
      en: 'Earthing/grounding sends fault current to earth, protecting people & equipment. Keep earth resistance low (typically < 1–5 ohm).',
      banglish: 'Earthing/grounding fault current ke matite pathay, manush & equipment protect kore. Earth resistance kom rakha joruri (< 1–5 ohm).',
    },
  },
  {
    keys: ['motor ki', 'induction motor', 'three phase motor', 'মোটর'],
    tri: {
      bn: 'ইন্ডাকশন মোটর AC পাওয়ারে ঘোরে; স্টার/ডেল্টা স্টার্টার বা VFD দিয়ে স্টার্ট/স্পিড কন্ট্রোল করা হয়। সিঙ্গেল ফেজ ছোট লোডে, থ্রি ফেজ ইন্ডাস্ট্রিতে ব্যবহৃত হয়।',
      en: 'An induction motor runs on AC; start/speed is controlled by star/delta starter or VFD. Single-phase for small loads, three-phase for industry.',
      banglish: 'Induction motor AC te ghore; star/delta starter ba VFD diye start/speed control hoy. Single-phase choto load e, three-phase industry te.',
    },
  },
  {
    keys: ['industry 4', 'iiot', 'iot ki', 'smart factory'],
    tri: {
      bn: 'Industry 4.0 / IIoT মানে মেশিন-টু-মেশিন কমিউনিকেশন, ক্লাউড ডেটা, প্রেডিক্টিভ মেইনটেন্যান্স ও স্মার্ট ফ্যাক্টরি। PLC+SCADA+নেটওয়ার্কিং এর সমন্বয়।',
      en: 'Industry 4.0 / IIoT means machine-to-machine communication, cloud data, predictive maintenance and smart factories — a combination of PLC + SCADA + networking.',
      banglish: 'Industry 4.0 / IIoT mane machine-to-machine communication, cloud data, predictive maintenance & smart factory. PLC + SCADA + networking er combination.',
    },
  },
  {
    keys: ['how to start', 'kivabe shikhbo', 'learn plc', 'start learning', 'কিভাবে শিখব'],
    tri: {
      bn: 'শুরু করুন বেসিক ইলেকট্রিক্যাল (রিলে, মোটর, সেন্সর) দিয়ে, তারপর PLC ল্যাডার লজিক, তারপর VFD/HMI ও SCADA। হাতে-কলমে প্র্যাকটিস সবচেয়ে জরুরি — আমাদের ল্যাবে ঠিক এভাবেই শেখানো হয়।',
      en: 'Start with basic electrical (relays, motors, sensors), then PLC ladder logic, then VFD/HMI and SCADA. Hands-on practice matters most — that is exactly how we teach in our lab.',
      banglish: 'Start korun basic electrical (relay, motor, sensor) diye, tarpor PLC ladder logic, tarpor VFD/HMI & SCADA. Hands-on practice sobcheye joruri — amader lab e evabei shekhano hoy.',
    },
  },
];

/* ---------------- intent engine ---------------- */
interface Intent {
  id: string;
  keys: string[];
  reply: (lang: Lang, course?: Course) => string;
}

const tri = (bn: string, en: string, banglish: string): Tri => ({ bn, en, banglish });

const INTENTS: Intent[] = [
  {
    id: 'greeting',
    keys: ['hello', 'hi', 'hey', 'salam', 'assalam', 'assalamu', 'nomoskar', 'সালাম', 'আসসালাম', 'হ্যালো', 'হাই'],
    reply: (l) =>
      pick(
        tri(
          'ওয়ালাইকুম আসসালাম! 😊 আমি Trust Assist। কোর্স ফি, ভর্তি, লোকেশন, ট্রেইনার অথবা PLC/SCADA/VFD ইত্যাদি টেকনিক্যাল বিষয়ে বাংলা, English বা Banglish-এ প্রশ্ন করুন।',
          'Hello! 😊 I am Trust Assist. Ask me about fees, admission, location, trainer — or technical topics like PLC/SCADA/VFD — in বাংলা, English or Banglish.',
          'Walaikum assalam! 😊 Ami Trust Assist. Course fee, vorti, location, trainer othoba PLC/SCADA/VFD technical bisoye Bangla, English ba Banglish e question korun.'
        ),
        l
      ),
  },
  {
    id: 'thanks',
    keys: ['thanks', 'thank you', 'dhonnobad', 'ধন্যবাদ', 'shukriya', 'thanks a lot'],
    reply: (l) =>
      pick(tri('আপনাকেও ধন্যবাদ! 🙏 আরও কিছু জানতে চাইলে নির্দ্বিধায় প্রশ্ন করুন।', 'You are welcome! 🙏 Feel free to ask anything else.', 'Apnakeo dhonnobad! 🙏 Aro kichu jante chaile nidridhay question korun.'), l),
  },
  {
    id: 'help',
    keys: ['help', 'what can you do', 'who are you', 'tumi ke', 'apni ke', 'ki ki paro', 'capabilities', 'menu'],
    reply: (l) =>
      pick(
        tri(
          'আমি Trust Assist 🤖 — যা যা পারি:\n• কোর্স ফি / ভর্তি / কিস্তি\n• ঠিকানা / যোগাযোগ / ক্লাস সময়\n• ট্রেইনার / চাকরি / সার্টিফিকেট\n• PLC, SCADA, VFD, HMI, AutoCAD, CCTV, Solar, Substation ব্যাখ্যা\n• ইলেকট্রিক্যাল বেসিক (ওহমের সূত্র, AC/DC, মোটর, আর্থিং)\n\nBanglish-এও লিখতে পারেন, যেমন: "vorti kivabe hobo?"',
          'I am Trust Assist 🤖 — I can help with:\n• Course fees / admission / installments\n• Address / contact / class timing\n• Trainer / jobs / certificate\n• Explaining PLC, SCADA, VFD, HMI, AutoCAD, CCTV, Solar, Substation\n• Electrical basics (Ohm law, AC/DC, motors, earthing)\n\nYou can also type Banglish, e.g. "vorti kivabe hobo?"',
          'Ami Trust Assist 🤖 — ja ja pari:\n• Course fee / vorti / kisti\n• Thikana / contact / class somoy\n• Trainer / chakri / certificate\n• PLC, SCADA, VFD, HMI, AutoCAD, CCTV, Solar, Substation explain\n• Electrical basic (Ohm law, AC/DC, motor, earthing)\n\nBanglish e o likhte paren, jemon: "vorti kivabe hobo?"'
        ),
        l
      ),
  },
  {
    id: 'requirements',
    keys: ['lagbe', 'lage', 'dorkar', 'requirements', 'documents', 'eligibility', 'qualification', 'যোগ্যতা', 'কী কী লাগে', 'ki ki lage', 'ki lagbe', 'nid', 'passport', 'photo', 'ssc'],
    reply: (l) =>
      pick(
        tri(
          'ভর্তি হতে লাগে:\n• জাতীয় পরিচয়পত্র/জন্মনিবন্ধনের ফটোকপি\n• ১ কপি পাসপোর্ট সাইজ ছবি\n• কোর্স ফি\n\nন্যূনতম এসএসসি/সমমান, তবে আগ্রহ ও হাতে-কলমে শেখার মানসিকতাই আসল।',
          'To enroll you need:\n• Copy of NID / birth certificate\n• 1 passport-size photo\n• Course fee\n\nMinimum SSC/equivalent, but interest and a hands-on mindset matter most.',
          'Vorti hote lage:\n• NID / birth certificate er photocopy\n• 1 copy passport size photo\n• Course fee\n\nMinimum SSC/somoman, tobe agroho & hands-on mindset tai asol.'
        ),
        l
      ),
  },
  {
    id: 'fee',
    keys: ['fee', 'price', 'cost', 'taka', 'dam', 'daam', 'khoroch', 'poisha', 'দাম', 'ফি', 'কত টাকা', 'খরচ', 'koto'],
    reply: (l, c) => {
      if (c) return pick(tri(`${courseLine(c)}\n\nবিস্তারিত: ${SITE.phoneDisplay}`, `${courseLine(c)}\n\nDetails: ${SITE.phoneDisplay}`, `${courseLine(c)}\n\nDetails: ${SITE.phoneDisplay}`), l);
      return pick(
        tri(`কোর্স ফি তালিকা:\n${feeList}\n\nবিকাশে পেমেন্ট করে সরাসরি ভর্তি হতে পারেন। ${SITE.phoneDisplay}`, `Course fees:\n${feeList}\n\nEnroll directly via bKash. ${SITE.phoneDisplay}`, `Course fee list:\n${feeList}\n\nbKash e payment kore direct vorti hote parben. ${SITE.phoneDisplay}`),
        l
      );
    },
  },
  {
    id: 'admission',
    keys: ['admission', 'enroll', 'join', 'register', 'process', 'kivabe', 'vorti', 'bhorti', 'ভর্তি', 'কিভাবে', 'প্রক্রিয়া'],
    reply: (l) =>
      pick(
        tri(
          `ভর্তি প্রক্রিয়া:\n১. Checkout পেজে কোর্স সিলেক্ট করুন\n২. বিকাশে Send Money: ${SITE.bkashMerchant}\n৩. ফর্মে TrxID দিয়ে Confirm করুন\n৪. WhatsApp-এ অটো কনফার্মেশন যাবে\n\nকল: ${SITE.phoneDisplay}`,
          `Admission steps:\n1. Select course on Checkout page\n2. bKash Send Money: ${SITE.bkashMerchant}\n3. Enter TrxID & confirm\n4. Auto WhatsApp confirmation\n\nCall: ${SITE.phoneDisplay}`,
          `Vorti process:\n1. Checkout page e course select korun\n2. bKash Send Money: ${SITE.bkashMerchant}\n3. Form e TrxID diye Confirm korun\n4. WhatsApp e auto confirmation jabe\n\nCall: ${SITE.phoneDisplay}`
        ),
        l
      ),
  },
  {
    id: 'installment',
    keys: ['kisti', 'installment', 'কিস্তি', 'part payment', '2 kisti', 'dui kisti'],
    reply: (l) =>
      pick(
        tri('হ্যাঁ, নির্বাচিত কোর্সে ২ কিস্তিতে ফি দেওয়া যায়। বিস্তারিত WhatsApp-এ: ' + SITE.phoneDisplay, 'Yes, selected courses allow 2 installments. Details on WhatsApp: ' + SITE.phoneDisplay, 'Ha, selected course e 2 kisti te fee deya jay. Details WhatsApp e: ' + SITE.phoneDisplay),
        l
      ),
  },
  {
    id: 'payment',
    keys: ['bkash', 'নগদ', 'nagad', 'payment', 'পেমেন্ট', 'trx', 'send money', 'বিকাশ'],
    reply: (l) =>
      pick(
        tri(`বিকাশ পেমেন্ট: ${SITE.bkashMerchant} নম্বরে Send Money করুন → Checkout পেজে কোর্স, নাম, মোবাইল ও TrxID দিন → Confirm করলে WhatsApp-এ কনফার্মেশন যাবে।`, `bKash payment: Send Money to ${SITE.bkashMerchant} → on Checkout enter course, name, mobile & TrxID → confirm to get WhatsApp confirmation.`, `bKash payment: ${SITE.bkashMerchant} e Send Money korun → Checkout e course, name, mobile & TrxID din → Confirm korle WhatsApp e confirmation jabe.`),
        l
      ),
  },
  {
    id: 'location',
    keys: ['location', 'address', 'where', 'kothay', 'koi', 'thikana', 'map', 'direction', 'কোথায়', 'ঠিকানা', 'gec', 'জিইসি'],
    reply: (l) =>
      pick(
        tri(`ঠিকানা: ${SITE.address}।\nজিইসি সার্কেলের কাছে, ও.আর নিজাম রোড। ফোন: ${SITE.phoneDisplay}`, `Address: ${SITE.address}.\nNear GEC Circle, O.R Nizam Road. Call: ${SITE.phoneDisplay}`, `Thikana: ${SITE.address}.\nGEC circle er kache, O.R Nizam Road. Call: ${SITE.phoneDisplay}`),
        l
      ),
  },
  {
    id: 'contact',
    keys: ['contact', 'phone', 'number', 'whatsapp', 'call', 'jogajog', 'যোগাযোগ', 'ফোন', 'নম্বর'],
    reply: (l) =>
      pick(
        tri(`যোগাযোগ:\n📞 ${SITE.phoneDisplay}\n💬 ${SITE.whatsappBase}\n📧 ${SITE.email}\n📍 ${SITE.addressShort}`, `Contact:\n📞 ${SITE.phoneDisplay}\n💬 ${SITE.whatsappBase}\n📧 ${SITE.email}\n📍 ${SITE.addressShort}`, `Contact:\n📞 ${SITE.phoneDisplay}\n💬 ${SITE.whatsappBase}\n📧 ${SITE.email}\n📍 ${SITE.addressShort}`),
        l
      ),
  },
  {
    id: 'schedule',
    keys: ['time', 'schedule', 'batch', 'timing', 'somoy', 'kobe', 'kokhon', 'class', 'সময়', 'কখন', 'ক্লাস', 'শনি'],
    reply: (l) =>
      pick(
        tri('ক্লাস শনি–বৃহস্পতি, সপ্তাহে ৬ দিন। সকাল ও সন্ধ্যা ব্যাচ আছে — চাকরিজীবীদের জন্য সুবিধাজনক। বিস্তারিত: ' + SITE.phoneDisplay, 'Classes Sat–Thu, 6 days/week. Morning & evening batches — flexible for job holders. Details: ' + SITE.phoneDisplay, 'Class Sat–Thu, soptaho 6 din. Morning & evening batch ache — job holders der jonno flexible. Details: ' + SITE.phoneDisplay),
        l
      ),
  },
  {
    id: 'duration',
    keys: ['duration', 'how long', 'koto din', 'kotodin', 'mas', 'month', 'সময়কাল', 'কত দিন', 'কত মাস'],
    reply: (l, c) =>
      c
        ? pick(tri(`${c.shortTitle} কোর্সের মেয়াদ ${c.duration}।`, `${c.shortTitle} runs for ${c.duration}.`, `${c.shortTitle} course er meyad ${c.duration}.`), l)
        : pick(tri('কোর্সভেদে মেয়াদ ১–৩ মাস। যেমন PLC ৩ মাস, AutoCAD ২ মাস, CCTV ১ মাস। নির্দিষ্ট কোর্সের নাম বললে সঠিক মেয়াদ বলব।', 'Duration is 1–3 months depending on course (PLC 3mo, AutoCAD 2mo, CCTV 1mo). Tell me a course name for exact duration.', 'Course bhede meyad 1–3 mas. Jemon PLC 3 mas, AutoCAD 2 mas, CCTV 1 mas. Course name bolle sothik meyad bolbo.'), l),
  },
  {
    id: 'trainer',
    keys: ['trainer', 'teacher', 'founder', 'owner', 'sir', 'nezam', 'who teach', 'ke poran', 'স্যার', 'প্রশিক্ষক', 'মালিক', 'নিজাম'],
    reply: (l) =>
      pick(
        tri(`Founder, Owner, CEO ও Head Trainer: ${SITE.founderBn} (${SITE.founder})। তিনি নিজেই হাতে-কলমে ক্লাস নেন — PLC, SCADA, VFD, HMI-এ এক্সপার্ট। যোগাযোগ: ${SITE.phoneDisplay}`, `Founder, Owner, CEO & Head Trainer: ${SITE.founder} (নিজাম উদ্দিন). He personally teaches hands-on — expert in PLC, SCADA, VFD, HMI. Contact: ${SITE.phoneDisplay}`, `Founder, Owner, CEO & Head Trainer: ${SITE.founder} (নিজাম উদ্দিন). Uni nijei hands-on class nin — PLC, SCADA, VFD, HMI te expert. Contact: ${SITE.phoneDisplay}`),
        l
      ),
  },
  {
    id: 'courses',
    keys: ['course', 'courses', 'subjects', 'topics', 'ki ki', 'kon kon', 'কোর্স', 'কি কি'],
    reply: (l) =>
      pick(
        tri(`আমাদের ৬টি কোর্স:\n${feeList}\n\nআরও ২০টি প্র্যাকটিক্যাল স্কিল মডিউল। Courses পেজে বিস্তারিত।`, `Our 6 courses:\n${feeList}\n\nPlus 20 practical skill modules. See Courses page.`, `Amader 6 ti course:\n${feeList}\n\nAro 20 ti practical skill module. Courses page e details.`),
        l
      ),
  },
  {
    id: 'job',
    keys: ['job', 'career', 'chakri', 'kaj', 'bidesh', 'placement', 'salary', 'beton', 'চাকরি', 'ক্যারিয়ার', 'কাজ', 'বিদেশ', 'বেতন'],
    reply: (l) =>
      pick(
        tri('কোর্স ১০০% জব-ওরিয়েন্টেড। CV, ইন্টারভিউ প্রস্তুতি ও ইন্ডাস্ট্রি রেফারেলে সহায়তা করি। প্রাক্তনরা দেশ ও বিদেশে (মধ্যপ্রাচ্য, মালয়েশিয়া) কর্মরত। ফ্রি কাউন্সেলিং: ' + SITE.phoneDisplay, 'Courses are 100% job-oriented. We help with CV, interview prep & industry referrals. Alumni work in BD & abroad (Middle East, Malaysia). Free counseling: ' + SITE.phoneDisplay, 'Course 100% job-oriented. CV, interview prep & industry referral e help kori. Alumni ra desh o bideshe (Middle East, Malaysia) kaj korche. Free counseling: ' + SITE.phoneDisplay),
        l
      ),
  },
  {
    id: 'certificate',
    keys: ['certificate', 'cert', 'সার্টিফিকেট', 'সনদ'],
    reply: (l) =>
      pick(
        tri('হ্যাঁ, কোর্স ও প্রজেক্ট মূল্যায়ন সফলভাবে সম্পন্ন করলে ইনস্টিটিউট সার্টিফিকেট দেওয়া হয়। তবে মূল ফোকাস দক্ষতা — যা চাকরি/ফ্রিল্যান্সে এগিয়ে রাখে।', 'Yes, on successful course + project assessment the institute issues a certificate. But the main focus is skill — what gets you jobs/freelance work.', 'Ha, course & project assessment successful hole institute certificate dey. Tobe main focus dokkhota — ja chakri/freelance e agiye rakhe.'),
        l
      ),
  },
  {
    id: 'female',
    keys: ['female', 'women', 'meye', 'নারী', 'মেয়ে', 'মহিলা'],
    reply: (l) =>
      pick(
        tri('হ্যাঁ, ল্যাব সবার জন্য উন্মুক্ত ও নিরাপদ। নারী শিক্ষার্থীদের জন্য বিশেষ ছাড় ও সুবিধাজনক ব্যাচ টাইম রয়েছে।', 'Yes, the lab is open & safe for everyone. Special discount and convenient batch timings for female students.', 'Ha, lab sobar jonno open & safe. Female students der jonno special discount & convenient batch time ache.'),
        l
      ),
  },
  {
    id: 'labvisit',
    keys: ['lab visit', 'visit', 'ghurte', 'dekhte', 'পরিদর্শন', 'ঘুরতে', 'দেখতে'],
    reply: (l) =>
      pick(
        tri('অবশ্যই! ভর্তির আগে যেকোনো দিন GEC, চট্টগ্রাম ল্যাব পরিদর্শন করতে পারেন। আসার আগে ফোন করুন: ' + SITE.phoneDisplay, 'Of course! You can visit our GEC, Chattogram lab any day before enrolling. Call first: ' + SITE.phoneDisplay, 'Oboshhoi! Vortir age jekono din GEC, Chattogram lab visit korte paren. Asar age call korun: ' + SITE.phoneDisplay),
        l
      ),
  },
  {
    id: 'whyus',
    keys: ['why choose', 'why us', 'keno', 'কেন', 'industry', 'industries', 'sector', 'graduate'],
    reply: (l) =>
      pick(
        tri('কেন আমরা: ১০০% হাতে-কলমে ল্যাব, ইন্ডাস্ট্রি-এক্সপার্ট ট্রেইনার, প্রজেক্ট-ভিত্তিক শেখা, ছোট ব্যাচ, লাইফটাইম সাপোর্ট। আমাদের গ্র্যাজুয়েটরা গার্মেন্টস, ফার্মা, ফুড, পাওয়ার, সিমেন্ট, স্টিল, সোলারসহ অনেক ইন্ডাস্ট্রিতে কাজ করে।', 'Why us: 100% hands-on lab, industry-expert trainer, project-based learning, small batches, lifetime support. Our graduates work across garments, pharma, food, power, cement, steel, solar and more.', 'Keno amra: 100% hands-on lab, industry-expert trainer, project-based learning, choto batch, lifetime support. Amader graduate ra garments, pharma, food, power, cement, steel, solar soho onek industry te kaj kore.'),
        l
      ),
  },
];

/* ---------------- main answer ---------------- */
export function answer(input: string): string {
  const t = norm(input);
  const lang = detectLang(input);
  const course = matchCourse(t);

  // score intents
  let best: Intent | undefined;
  let bestScore = 0;
  for (const it of INTENTS) {
    let score = 0;
    for (const k of it.keys) if (t.includes(k)) score += k.length > 3 ? 2 : 1;
    if (score > bestScore) {
      bestScore = score;
      best = it;
    }
  }

  // knowledge base score
  let kbBest: (typeof KB)[number] | undefined;
  let kbScore = 0;
  for (const entry of KB) {
    let score = 0;
    for (const k of entry.keys) if (t.includes(k)) score += k.length > 3 ? 2 : 1;
    if (score > kbScore) {
      kbScore = score;
      kbBest = entry;
    }
  }

  // prefer specific technical KB when it clearly wins
  if (kbBest && kbScore >= bestScore && kbScore >= 2) return pick(kbBest.tri, lang);
  if (best && bestScore >= 1) return best.reply(lang, course);
  if (kbBest && kbScore >= 1) return pick(kbBest.tri, lang);

  // course-only query -> course card
  if (course) return pick(tri(courseLine(course), courseLine(course), courseLine(course)), lang);

  // fallback
  return pick(
    tri(
      `বুঝতে পারিনি 🙏 আপনি জিজ্ঞাসা করতে পারেন:\n• কোর্স ফি / ভর্তি / ঠিকানা\n• PLC / SCADA / VFD কি?\n• চাকরি / সার্টিফিকেট\n\nঅথবা WhatsApp: ${SITE.whatsappBase}`,
      `I didn't catch that 🙏 You can ask:\n• Course fee / admission / address\n• What is PLC / SCADA / VFD?\n• Jobs / certificate\n\nOr WhatsApp: ${SITE.whatsappBase}`,
      `Bujhte parini 🙏 Apni jiggesh korte paren:\n• Course fee / vorti / thikana\n• PLC / SCADA / VFD ki?\n• Chakri / certificate\n\nOthoba WhatsApp: ${SITE.whatsappBase}`
    ),
    lang
  );
}

export const SUGGESTIONS = [
  { label: 'কোর্স ফি কত?', text: 'কোর্স ফি কত?' },
  { label: 'Vorti kivabe?', text: 'vorti kivabe hobo?' },
  { label: 'PLC ki jinis?', text: 'PLC ki jinis?' },
  { label: 'ঠিকানা কোথায়?', text: 'ঠিকানা কোথায়?' },
  { label: 'Course fees?', text: 'What are the course fees?' },
  { label: 'SCADA vs PLC?', text: 'difference between plc and scada' },
];
