export const BRAND = {
  name: "Chattogram Trust PLC & Automation Technology",
  shortName: "Chattogram Trust",
  navName: "Chattogram Trust PLC Automation Technology",
  phoneDisplay: "+880 1646-241953",
  phoneHref: "tel:+8801646241953",
  whatsapp: "https://wa.me/8801646241953",
  email: "uddinnizam701@gmail.com",
  address:
    "O.R Nizam Road, Nurbag Abasik, Nahar Villa 1st floor, GEC, Chattogram, Bangladesh",
  addressShort:
    "O.R Nizam Road, Nurbag Abasik, Nahar Villa 1st floor, GEC, Chattogram",
  founder: "Nezam uddin",
  profileName: "Md. Anas Nezam",
  facebookProfile: "https://www.facebook.com/share/1eN2YZFkU8/",
  facebookPage: "https://www.facebook.com/share/1EBKkCQVZh/",
  youtube: "https://www.youtube.com/@TrustTechBD-n7h",
  slogan: "কারিগরি দক্ষতায় সেরা, গড়বো উজ্জ্বল ভবিষ্যৎ ও স্মার্ট ক্যারিয়ার!",
  practicalSlogan:
    "হাতে-কলমে ইন্ডাস্ট ইন্ডাস্ট্রিয়াল অটোমেশন শিক্ষা — দেশে-বিদেশে শতভাগ কাজের নিশ্চয়তা।",
  quote: "আমি বিশ্বাস করি হাতে-কলমে শেখাই টেকনিক্যাল শিক্ষার আসল শক্তি।",
  defaultAnnouncement:
    "আমাদের সকল কোর্সে পাচ্ছেন বিশেষ ছাড়! ভর্তি চলছে... যোগাযোগ করুন: +880 1646-241953",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=O.R+Nizam+Road+Nurbag+Abasik+GEC+Chattogram+Bangladesh",
  mapEmbed:
    "https://maps.google.com/maps?q=O.R%20Nizam%20Road%2C%20Nurbag%20Abasik%2C%20GEC%2C%20Chattogram&t=&z=15&ie=UTF8&iwloc=&output=embed",
} as const;

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/courses" },
  { label: "Skills", to: "/skills" },
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function whatsappUrl(
  message = "আসসালামু আলাইকুম, আমি আপনাদের কোর্স ও ভর্তি প্রক্রিয়া সম্পর্কে জানতে চাই।",
) {
  return `${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}
