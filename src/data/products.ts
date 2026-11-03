import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'PLC Trainer Kit (Siemens S7-1200)',
    nameBn: 'PLC ট্রেনার কিট (সিমেন্স S7-1200)',
    category: 'Training Kits',
    price: 42000,
    description:
      'Complete bench-top PLC training station with S7-1200 CPU, digital I/O simulator, pilot lamps, push buttons and potentiometer.',
    specs: ['S7-1200 CPU 1212C', '8DI/6DO simulator board', '24V PSU & protected terminals', 'Carry-case with manual'],
    illustration: 'plc',
    badge: 'Best Seller',
  },
  {
    id: 'p2',
    name: 'VFD + Motor Training Kit',
    nameBn: 'VFD + মোটর ট্রেনিং কিট',
    category: 'Training Kits',
    price: 28500,
    description:
      '0.75 kW VFD with three-phase induction motor, braking resistor and control panel for speed-control experiments.',
    specs: ['0.75 kW VFD (220V)', '3-phase motor with coupling', 'Potentiometer & switch panel', 'Experiment guide'],
    illustration: 'vfd',
  },
  {
    id: 'p3',
    name: 'HMI + PLC Combo Panel',
    nameBn: 'HMI + PLC কম্বো প্যানেল',
    category: 'Training Kits',
    price: 56000,
    description:
      'Integrated training panel with 7" HMI, PLC, VFD and sensor suite — a mini automation line on your desk.',
    specs: ['7" HMI + S7-1200', 'VFD & motor module', 'Sensor & analog simulator', 'Modbus networking lab'],
    illustration: 'hmi',
    badge: 'Advanced',
  },
  {
    id: 'p4',
    name: 'Industrial Sensor Kit (12 pcs)',
    nameBn: 'ইন্ডাস্ট্রিয়াল সেন্সর কিট (১২ পিস)',
    category: 'Equipment',
    price: 8500,
    description:
      'Assorted NPN/PNP proximity, photoelectric, capacitive sensors and encoders with cables and mounting brackets.',
    specs: ['Inductive & capacitive prox', 'Photoelectric (through/diffuse)', 'Rotary encoder', '4–20 mA transmitter'],
    illustration: 'sensor',
  },
  {
    id: 'p5',
    name: 'Motor Control Practice Panel',
    nameBn: 'মোটর কন্ট্রোল প্র্যাকটিস প্যানেল',
    category: 'Training Kits',
    price: 18000,
    description:
      'DOL, Star-Delta and Reverse-Forward starter practice board with contactors, overloads, timers and pilot lamps.',
    specs: ['Contactors & overload relays', 'Star-Delta timer', 'Interlocked push buttons', 'Fault simulation switches'],
    illustration: 'motor',
  },
  {
    id: 'p6',
    name: 'Solar PV Training Kit (200W)',
    nameBn: 'সোলার পিভি ট্রেনিং কিট (২০০W)',
    category: 'Training Kits',
    price: 32000,
    description:
      '200W panel, charge controller, battery and inverter kit with metering for complete off-grid experiments.',
    specs: ['200W mono panel', 'MPPT charge controller', 'Battery & inverter', 'DC metering & MC4 tools'],
    illustration: 'solar',
  },
  {
    id: 'p7',
    name: 'CCTV Installation Kit (4CH IP)',
    nameBn: 'সিসিটিভি ইনস্টলেশন কিট (৪CH IP)',
    category: 'Equipment',
    price: 24500,
    description:
      '4-channel IP camera bundle with NVR, PoE switch, 1TB HDD and cable pack — ready for a live installation.',
    specs: ['4× 4MP IP cameras', '4CH NVR + 1TB HDD', 'PoE switch & Cat6 pack', 'Mounting accessories'],
    illustration: 'cctv',
  },
  {
    id: 'p8',
    name: 'Electrician Tool Bag (Pro)',
    nameBn: 'ইলেকট্রিশিয়ান টুল ব্যাগ (প্রো)',
    category: 'Tools & Accessories',
    price: 6500,
    description:
      'Professional-grade insulated tool set: pliers, strippers, crimping tool, tester, multimeter and carry bag.',
    specs: ['VDE insulated screwdrivers', 'Wire stripper & crimper', 'Digital multimeter', 'Heavy-duty tool bag'],
    illustration: 'tools',
  },
];

export const productCategories = ['All', 'Training Kits', 'Equipment', 'Tools & Accessories'] as const;
