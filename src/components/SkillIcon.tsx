import {
  Bot,
  CarFront,
  Cctv,
  ChartNoAxesCombined,
  Cog,
  Cpu,
  DraftingCompass,
  Gauge,
  HardHat,
  MonitorDot,
  Network,
  PanelsTopLeft,
  PlugZap,
  Ruler,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  ToggleRight,
  UtilityPole,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Bot,
  CarFront,
  Cctv,
  ChartNoAxesCombined,
  Cog,
  Cpu,
  DraftingCompass,
  Gauge,
  HardHat,
  MonitorDot,
  Network,
  PanelsTopLeft,
  PlugZap,
  Ruler,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  ToggleRight,
  UtilityPole,
  Workflow,
};
export function SkillIcon({
  name,
  size = 21,
}: {
  name: string;
  size?: number;
}) {
  const Icon = icons[name] || Cpu;
  return <Icon size={size} strokeWidth={1.65} aria-hidden="true" />;
}
