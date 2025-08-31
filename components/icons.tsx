import { FolderGit2, BookOpenText, ShieldCheck, BrainCircuit, Globe, Palette, Megaphone } from "lucide-react"
import type { ComponentType, SVGProps } from "react"

export type LucideIcon = ComponentType<SVGProps<SVGSVGElement>>

export const deptIcons: Record<string, LucideIcon> = {
  projects: FolderGit2,
  teaching: BookOpenText,
  cybersec: ShieldCheck,
  "data-science": BrainCircuit,
  web: Globe,
  "media-design": Palette,
  "marketing-sponsorship": Megaphone,
}
