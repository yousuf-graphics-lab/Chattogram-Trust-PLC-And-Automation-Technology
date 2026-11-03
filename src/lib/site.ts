/* Central brand / contact constants — single source of truth. */

export const SITE = {
  name: 'Chattogram Trust PLC & Automation Technology',
  shortName: 'Chattogram Trust PLC',
  navName: 'Chattogram Trust PLC Automation Technology',
  acronym: 'CTPAT',
  tagline: 'Industrial Automation Training Institute',
  address:
    'O.R Nizam Road, Nurbag Abasik, Nahar Villa 1st floor, GEC, Chattogram, Bangladesh',
  addressShort: 'O.R Nizam Road, GEC, Chattogram',
  phoneDisplay: '+880 1646-241953',
  phoneTel: 'tel:+8801646241953',
  whatsappNumber: '8801646241953',
  whatsappBase: 'https://wa.me/8801646241953',
  email: 'uddinnizam701@gmail.com',
  founder: 'Nezam Uddin',
  founderBn: 'নিজাম উদ্দিন',
  founderRole: 'Founder, Owner, CEO & Head Trainer',
  facebookProfile: 'https://www.facebook.com/share/1eN2YZFkU8/',
  facebookPage: 'https://www.facebook.com/share/1EBKkCQVZh/',
  mapsQuery: 'O.R Nizam Road, Nurbag Abasik, GEC, Chattogram, Bangladesh',
  mapsLink: 'https://maps.app.goo.gl/bL4Zc76BY1y1M3ay5',
  mapsEmbed:
    'https://www.google.com/maps?q=O.R+Nizam+Road+Nurbag+Abasik+GEC+Chattogram+Bangladesh&output=embed',
  slogan1: 'কারিগরি দক্ষতায় সেরা, গড়বো উজ্জ্বল ভবিষ্যৎ ও স্মার্ট ক্যারিয়ার!',
  slogan2:
    'হাতে-কলমে ইন্ডাস্ট্রিয়াল অটোমেশন শিক্ষা — দেশে-বিদেশে শতভাগ কাজের নিশ্চয়তা।',
  founderQuote:
    '“আমি বিশ্বাস করি হাতে-কলমে শেখাই টেকনিক্যাল শিক্ষার আসল শক্তি।”',
  bkashMerchant: '+880 1646-241953',
  copyright:
    '© 2026 Chattogram Trust PLC & Automation Technology. All Rights Reserved.',
} as const;

export const ANNOUNCEMENT_DEFAULT =
  'আমাদের সকল কোর্সে পাচ্ছেন বিশেষ ছাড়! ভর্তি চলছে... যোগাযোগ করুন: +880 1646-241953';

/** Website developer / designer contact (footer credit). */
export const DEVELOPER = {
  name: 'Yousuf Hossain',
  facebook: 'https://www.facebook.com/yousuf.hossain74',
  phoneDisplay: '01646245214',
  phoneTel: 'tel:+8801646245214',
  whatsappNumber: '8801646245214',
  whatsappBase: 'https://wa.me/8801646245214',
} as const;

/** Pre-filled WhatsApp message to the developer. */
export function devWaLink(text?: string): string {
  const msg =
    text ??
    'আসসালামু আলাইকুম Yousuf Hossain, আমি এই ধরনের একটি ওয়েবসাইট বানাতে চাই। বিস্তারিত জানাবেন।';
  return `${DEVELOPER.whatsappBase}?text=${encodeURIComponent(msg)}`;
}

export const ADMIN_CREDENTIALS = {
  username: 'Trust1953',
  password: 'TrustPLC4624',
} as const;

/** Build a wa.me link with pre-filled text. */
export function waLink(text?: string): string {
  const base = SITE.whatsappBase;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const WA_INQUIRY_BN =
  'আসসালামু আলাইকুম, আমি Chattogram Trust PLC & Automation Technology-এর কোর্স সম্পর্কে জানতে চাই। অনুগ্রহ করে বিস্তারিত জানাবেন।';

export function formatTaka(amount: number): string {
  return `${amount.toLocaleString('en-US')} Taka`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
