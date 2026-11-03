export interface Testimonial {
  id: string;
  name: string;
  role: string;
  course: string;
  rating: number;
  text: string;
  outcome: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'ইঞ্জিনিয়ার তানভীর আহমেদ',
    role: 'Maintenance Engineer',
    course: 'Advance Automation (PLC, VFD, HMI)',
    rating: 5,
    text: 'হাতে-কলমে প্রশিক্ষণের জন্যই এখানে ভর্তি হয়েছিলাম। নিজাম স্যার প্রতিটি টপিক ধরে ধরে বুঝিয়েছেন — প্যানেল ওয়্যারিং থেকে Modbus কমিউনিকেশন পর্যন্ত। এখন নিজের ফ্যাক্টরির অটোমেশন প্রজেক্ট নিজেই কমিশন করি।',
    outcome: 'Promoted to Automation Lead',
  },
  {
    id: 't2',
    name: 'মো. সাকিব হাসান খান',
    role: 'PLC Technician',
    course: 'Industrial Automation & PLC',
    rating: 5,
    text: 'ডিপ্লোমা শেষ করে চাকরি পাচ্ছিলাম না। এখানে ৩ মাসের কোর্স শেষে সিমেন্স PLC-তে দক্ষ হই এবং এখন একটি টেক্সটাইল মিলে জুনিয়র অটোমেশন টেকনিশিয়ান হিসেবে কাজ করছি। ল্যাবের পরিবেশ অসাধারণ।',
    outcome: 'Placed at Textile Mill, Chattogram',
  },
  {
    id: 't3',
    name: 'ফারহানা করিম',
    role: 'Solar Design Assistant',
    course: 'Solar PV System Design',
    rating: 5,
    text: 'সোলার ডিজাইন কোর্সটি করে এখন একটি EPC কোম্পানিতে ডিজাইন অ্যাসিস্ট্যান্ট হিসেবে কাজ করছি। নেট মিটারিং ডকুমেন্টেশন ও ROI ক্যালকুলেশন শেখাটা ক্যারিয়ারে অনেক এগিয়ে দিয়েছে। ধন্যবাদ নিজাম স্যারকে।',
    outcome: 'Joined Solar EPC Company',
  },
];
