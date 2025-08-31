"use client"

import { deptIcons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type Question =
  | {
      id: string
      type: "text" | "textarea"
      label: string
      required?: boolean
      placeholder?: string
      description?: string
    }
  | {
      id: string
      type: "mcq"
      label: string
      required?: boolean
      options: { value: string; label: string }[]
      description?: string
    }
  | {
      id: string
      type: "checkbox"
      label: string
      required?: boolean
      options: { value: string; label: string }[]
      description?: string
    }

export type Department = {
  id: string
  key: string // icon key
  name: string
  blurb?: string
  questions: Question[]
}

export function DepartmentCard({
  dept,
  selected,
  disabled,
  onToggle,
}: {
  dept: Department
  selected: boolean
  disabled?: boolean
  onToggle: (id: string) => void
}) {
  const Icon = deptIcons[dept.key] ?? deptIcons["projects"]
  return (
    <button
      type="button"
      disabled={disabled && !selected}
      onClick={() => onToggle(dept.id)}
      className={cn(
        "group relative h-full w-full rounded-lg border p-4 text-left transition",
        "border-[#0b1320] bg-[#00040D] hover:border-[#FEAD53]/60",
        selected ? "ring-2 ring-[#FEAD53]" : "ring-0",
        disabled && !selected ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
      )}
    >
      <div className="mb-3 flex items-center gap-3">
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-md", "bg-[#FEAD53] text-black")}>
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <div className="font-semibold text-white">{dept.name}</div>
          {dept.blurb ? <div className="text-xs text-white/70">{dept.blurb}</div> : null}
        </div>
        {selected ? <Badge className="ml-auto bg-[#FEAD53] text-black hover:bg-[#f7a043]">Selected</Badge> : null}
      </div>
      <div className="text-xs text-white/60">{dept.questions.length} questions</div>
    </button>
  )
}

export function DepartmentSelector({
  departments,
  selected,
  onChange,
  max = 2,
}: {
  departments: Department[]
  selected: string[]
  onChange: (ids: string[]) => void
  max?: number
}) {
  function toggle(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((x) => x !== id))
    } else if (selected.length < max) {
      onChange([...selected, id])
    }
  }
  const isCapReached = selected.length >= max
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {departments.map((dept) => (
        <DepartmentCard
          key={dept.id}
          dept={dept}
          selected={selected.includes(dept.id)}
          disabled={isCapReached}
          onToggle={toggle}
        />
      ))}
    </div>
  )
}
