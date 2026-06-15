import {
  LifeBuoy,
  Cloud,
  ShieldCheck,
  DatabaseBackup,
  Network,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import type { IconKey } from "@/cms/seed-data";

export const iconMap: Record<IconKey, LucideIcon> = {
  lifebuoy: LifeBuoy,
  cloud: Cloud,
  shield: ShieldCheck,
  database: DatabaseBackup,
  network: Network,
  cpu: Cpu,
};

export function iconFor(key: string | undefined | null): LucideIcon {
  return iconMap[(key as IconKey) ?? "lifebuoy"] ?? LifeBuoy;
}
