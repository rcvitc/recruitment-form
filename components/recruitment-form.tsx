"use client"

import { useMemo, useState } from "react"
import { departments as defaultDepartments } from "@/lib/departments"
import { DepartmentSelector } from "@/components/department-selector"
import { QuestionRenderer, type AnswerValue } from "@/components/question-renderer"
import type { Department } from "@/components/department-selector"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Answers = Record<string /*deptId*/, Record<string /*qId*/, AnswerValue>>

export function RecruitmentForm({
  departments = defaultDepartments,
}: {
  departments?: Department[]
}) {
  const [selected, setSelected] = useState<string[]>([])
  const [answers, setAnswers] = useState<Answers>({})
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const selectedDepts = useMemo(() => departments.filter((d) => selected.includes(d.id)), [departments, selected])

  function setAnswer(deptId: string, qId: string, value: AnswerValue) {
    setAnswers((prev) => ({
      ...prev,
      [deptId]: { ...(prev[deptId] || {}), [qId]: value },
    }))
  }

  async function onSubmitConfirm() {
    setSubmitting(true)
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedDepartments: selected,
          answers,
        }),
      })
      if (!res.ok) throw new Error("Failed to submit")
      setSubmitted(true)
      setSelected([])
      setAnswers({})
      setActiveTab(undefined)
    } catch (e) {
      console.error("[v0] Submit error:", (e as Error).message)
      alert("Submission failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <Card className="border-[#0b1320] bg-[#00040D] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-balance text-xl font-semibold text-white">Select up to two departments</h2>
            <p className="text-sm text-white/70">
              You can choose any two areas of interest. This helps us tailor your questions.
            </p>
          </div>
          <div className="rounded-md bg-[#FEAD53] px-3 py-1 text-sm font-medium text-black">
            {selected.length} / 2 selected
          </div>
        </div>
        <div className="mt-4">
          <DepartmentSelector
            departments={departments}
            selected={selected}
            onChange={(ids) => {
              setSelected(ids)
              if (ids.length > 0 && !ids.includes(activeTab || "")) {
                setActiveTab(ids[0])
              } else if (ids.length === 0) {
                setActiveTab(undefined)
              }
            }}
            max={2}
          />
        </div>
      </Card>

      {selected.length > 0 ? (
        <Card className="border-[#0b1320] bg-[#00040D] p-6">
          <h3 className="mb-3 text-lg font-semibold text-white">Questions</h3>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2 bg-[#0b1320]">
              {selectedDepts.map((dept) => (
                <TabsTrigger
                  key={dept.id}
                  value={dept.id}
                  className="data-[state=active]:bg-[#FEAD53] data-[state=active]:text-black"
                >
                  {dept.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {selectedDepts.map((dept) => (
              <TabsContent key={dept.id} value={dept.id}>
                <div className="grid gap-4">
                  {dept.questions.map((q) => (
                    <QuestionRenderer
                      key={q.id}
                      q={q}
                      value={answers[dept.id]?.[q.id] ?? (q.type === "checkbox" ? [] : "")}
                      onChange={(v) => setAnswer(dept.id, q.id, v)}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <Separator className="my-4 bg-[#0b1320]" />
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div className="text-sm text-white/70">Please review your answers before submitting.</div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="bg-[#FEAD53] text-black hover:bg-[#f7a043]"
                  disabled={selected.length === 0 || submitting}
                >
                  {submitting ? "Submitting..." : "Review & Submit"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-h-[85vh] overflow-auto border-[#0b1320] bg-[#00040D] text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm your application</AlertDialogTitle>
                  <AlertDialogDescription className="text-white/70">
                    Review your selections and answers below. Confirm to submit your application.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-4">
                  {selectedDepts.map((dept) => (
                    <div key={dept.id} className="rounded-lg border border-[#0b1320] bg-[#0b1320] p-4">
                      <div className="mb-2 font-semibold text-white">{dept.name}</div>
                      <div className="grid gap-2 text-sm">
                        {dept.questions.map((q) => {
                          const v = answers[dept.id]?.[q.id]
                          return (
                            <div key={q.id}>
                              <div className="text-white/80">{q.label}</div>
                              <div className="text-white">{Array.isArray(v) ? v.join(", ") : (v as string) || "-"}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <AlertDialogFooter>
                  <AlertDialogCancel className="border-[#FEAD53] text-[#FEAD53] hover:bg-[#FEAD53] hover:text-black">
                    Edit
                  </AlertDialogCancel>
                  <AlertDialogAction className="bg-[#FEAD53] text-black hover:bg-[#f7a043]" onClick={onSubmitConfirm}>
                    Confirm & Submit
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Card>
      ) : null}

      {submitted ? (
        <Card className="border-[#0b1320] bg-[#00040D] p-6">
          <div className="text-balance text-center text-white">Thank you! Your application has been submitted.</div>
        </Card>
      ) : null}
    </div>
  )
}
