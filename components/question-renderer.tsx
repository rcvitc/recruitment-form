"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import type { Question } from "@/components/department-selector"

export type AnswerValue = string | string[] | null

export function QuestionRenderer({
  q,
  value,
  onChange,
}: {
  q: Question
  value: AnswerValue
  onChange: (v: AnswerValue) => void
}) {
  return (
    <div className="space-y-2 rounded-lg border border-[#0b1320] bg-[#00040D] p-4">
      <div className="flex items-center justify-between">
        <Label htmlFor={q.id} className="text-white">
          {q.label} {q.required ? <span className="text-[#FEAD53]">*</span> : null}
        </Label>
        {q.description ? <span className="text-xs text-white/60">{q.description}</span> : null}
      </div>

      {q.type === "text" ? (
        <Input
          id={q.id}
          placeholder={(q as any).placeholder || ""}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="border-[#0b1320] bg-[#0b1320] text-white placeholder:text-white/40"
        />
      ) : q.type === "textarea" ? (
        <Textarea
          id={q.id}
          placeholder={(q as any).placeholder || ""}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="border-[#0b1320] bg-[#0b1320] text-white placeholder:text-white/40"
        />
      ) : q.type === "mcq" ? (
        <RadioGroup value={(value as string) ?? ""} onValueChange={onChange} className="grid gap-2">
          {(q as any).options.map((opt: { value: string; label: string }) => (
            <div
              key={opt.value}
              className="flex items-center gap-2 rounded-md border border-[#0b1320] bg-[#0b1320] p-2"
            >
              <RadioGroupItem id={`${q.id}-${opt.value}`} value={opt.value} />
              <Label htmlFor={`${q.id}-${opt.value}`} className="text-white">
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      ) : q.type === "checkbox" ? (
        <div className="grid gap-2">
          {(q as any).options.map((opt: { value: string; label: string }) => {
            const arr = Array.isArray(value) ? value : []
            const checked = arr.includes(opt.value)
            return (
              <label
                key={opt.value}
                className={cn(
                  "flex items-center gap-2 rounded-md border p-2",
                  "border-[#0b1320] bg-[#0b1320] text-white",
                )}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={(c) => {
                    if (c) onChange([...arr, opt.value])
                    else onChange(arr.filter((v) => v !== opt.value))
                  }}
                />
                <span>{opt.label}</span>
              </label>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
