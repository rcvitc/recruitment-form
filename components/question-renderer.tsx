"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import type { Question } from "@/lib/departments"

export type AnswerValue = string | string[] | null

export function QuestionRenderer({
  q,
  question: questionProp,
  value,
  onChange,
}: {
  q?: Question
  question?: Question
  value: AnswerValue
  onChange: (v: AnswerValue) => void
}) {
  const Q = (questionProp || q)!

  return (
    <div className="space-y-2 rounded-lg border border-[#0b1320] bg-[#00040D] p-4">
      <div className="flex items-center justify-between">
        <Label htmlFor={Q.id} className="text-white">
          {Q.label}{" "}
          {Q.required ? (
            <span className="text-[#FEAD53] font-medium text-2xl leading-none">*</span>
          ) : null}
        </Label>
        {"description" in Q && Q.description ? <span className="text-xs text-white/60">{Q.description}</span> : null}
      </div>

      {Q.type === "text" ? (
        <Input
          id={Q.id}
          placeholder={("placeholder" in Q && Q.placeholder) || ""}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="border-[#0b1320] bg-[#0b1320] text-white placeholder:text-white/40"
        />
      ) : Q.type === "textarea" ? (
        <Textarea
          id={Q.id}
          placeholder={("placeholder" in Q && Q.placeholder) || ""}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="border-[#0b1320] bg-[#0b1320] text-white placeholder:text-white/40"
        />
      ) : Q.type === "mcq" ? (
        <RadioGroup value={(value as string) ?? ""} onValueChange={onChange as any} className="grid gap-2">
          {("options" in Q ? Q.options : []).map((opt: { value: string; label: string }) => (
            <div
              key={opt.value}
              className="flex items-center gap-2 rounded-md border border-[#0b1320] bg-[#0b1320] p-2"
            >
              <RadioGroupItem id={`${Q.id}-${opt.value}`} value={opt.value} />
              <Label htmlFor={`${Q.id}-${opt.value}`} className="text-white">
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      ) : Q.type === "checkbox" ? (
        <div className="grid gap-2">
          {("options" in Q ? Q.options : []).map((opt: { value: string; label: string }) => {
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
                  className={` 
                    border-2 border-[#fead53]  
                    data-[state=checked]:bg-[#fead53]
                    data-[state=checked]:border-[#fead53]
                    data-[state=checked]:text-[#00040D]
                    `}>
                </Checkbox>
                <span className="text-white">{opt.label}</span>
              </label>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
