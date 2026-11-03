import {
  Calculator,
  Car,
  Cctv,
  CircuitBoard,
  Cog,
  Cpu,
  Factory,
  Gauge,
  GraduationCap,
  HardHat,
  MonitorSmartphone,
  Network,
  PenTool,
  PlugZap,
  RadioTower,
  Ruler,
  ShieldCheck,
  Sun,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  Calculator,
  Car,
  Cctv,
  CircuitBoard,
  Cog,
  Cpu,
  Factory,
  Gauge,
  GraduationCap,
  HardHat,
  MonitorSmartphone,
  Network,
  PenTool,
  PlugZap,
  RadioTower,
  Ruler,
  ShieldCheck,
  Sun,
  Workflow,
  Wrench,
  Zap,
};

export function Icon({ name, size = 22, className }: { name: string; size?: number; className?: string }) {
  const Cmp = map[name] ?? Cpu;
  return <Cmp size={size} className={className} />;
}
