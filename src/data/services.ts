import type { Service } from '@/types';

export const services: Service[] = [
  {
    id: 's1',
    title: 'PLC Programming & Commissioning',
    titleBn: 'PLC প্রোগ্রামিং ও কমিশনিং',
    description:
      'New machine logic, legacy program migration and on-site commissioning for Siemens, Delta, Mitsubishi and other platforms.',
    features: ['Ladder / FBD development', 'On-site commissioning', 'Program backup & documentation'],
    icon: 'Cpu',
  },
  {
    id: 's2',
    title: 'Control Panel Design & Building',
    titleBn: 'কন্ট্রোল প্যানেল ডিজাইন ও বিল্ডিং',
    description:
      'Complete PLC, VFD, MCC and PFI panels — from GA drawings and BOQ to wiring, ferruling and FAT.',
    features: ['GA & wiring drawings', 'Panel fabrication & wiring', 'Factory acceptance testing'],
    icon: 'CircuitBoard',
  },
  {
    id: 's3',
    title: 'SCADA & HMI Integration',
    titleBn: 'স্কাডা ও HMI ইন্টিগ্রেশন',
    description:
      'Plant-wide monitoring dashboards, alarm systems, historical logging and operator HMI screens.',
    features: ['SCADA tag engineering', 'Alarm & trend configuration', 'Remote monitoring setup'],
    icon: 'MonitorSmartphone',
  },
  {
    id: 's4',
    title: 'VFD & Motor Control Solutions',
    titleBn: 'VFD ও মোটর কন্ট্রোল সলিউশন',
    description:
      'Energy-saving VFD retrofits, soft starter applications and motor protection for pumps, fans and conveyors.',
    features: ['VFD selection & retrofit', 'PID & multi-speed setup', 'Energy saving analysis'],
    icon: 'Gauge',
  },
  {
    id: 's5',
    title: 'Sub-Station & HT/LT Works',
    titleBn: 'সাব-স্টেশন ও এইচটি/এলটি ওয়ার্কস',
    description:
      '11/0.4 kV substation design, HT switchgear testing, PFI plants and utility approval documentation.',
    features: ['Substation design & BOQ', 'HT testing & maintenance', 'PFI panel solutions'],
    icon: 'Factory',
  },
  {
    id: 's6',
    title: 'Solar PV EPC & Maintenance',
    titleBn: 'সোলার পিভি EPC ও মেইনটেন্যান্স',
    description:
      'Rooftop solar design, installation, net metering support and annual maintenance contracts.',
    features: ['On-grid / hybrid design', 'Rooftop installation', 'Net metering & O&M'],
    icon: 'Sun',
  },
  {
    id: 's7',
    title: 'CCTV & Security Systems',
    titleBn: 'সিসিটিভি ও সিকিউরিটি সিস্টেম',
    description:
      'IP CCTV, access control and network infrastructure for factories, offices and residential buildings.',
    features: ['IP CCTV design & install', 'Remote monitoring', 'AMC & support'],
    icon: 'Cctv',
  },
  {
    id: 's8',
    title: 'Corporate Training & AMC',
    titleBn: 'কর্পোরেট ট্রেনিং ও AMC',
    description:
      'Customized automation training for factory maintenance teams plus annual maintenance contracts.',
    features: ['On-site team training', 'Preventive maintenance', '24/7 breakdown support'],
    icon: 'GraduationCap',
  },
];

export const serviceProcess = [
  { step: '01', title: 'Site Survey', description: 'We visit your facility, study the process and document requirements.' },
  { step: '02', title: 'Design & Quote', description: 'Drawings, BOQ and a transparent proposal with timeline.' },
  { step: '03', title: 'Build & Program', description: 'Panel building, PLC/HMI programming and factory testing.' },
  { step: '04', title: 'Commission & Support', description: 'On-site commissioning, operator training and AMC support.' },
];
