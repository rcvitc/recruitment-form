"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { personalQuestions, Question } from "@/lib/departments"
import { Department } from "@/lib/departmentStore"

export function ConfirmDialog({
  open,
  setOpenAction,
  payload,
  onConfirmAction,
  submitting,
}: {
  open: boolean
  setOpenAction: (v: boolean) => void
  payload: any
  onConfirmAction: () => void
  submitting?: boolean
}) {
  if (!payload) return null;
  const getDeptName = (key?: string) => payload.departments.find((d: Department) => d.key === key)?.name
  return (
    <Dialog open={open} onOpenChange={setOpenAction}>
      <DialogContent className="bg-[#00040D] text-white border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">Confirm your application</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-auto pr-2">
          <section>
            <h4 className="text-[#fead53] font-semibold mb-2">Personal</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {personalQuestions.map((q) => (
                <div key={q.id} className="text-sm">
                  <span className="text-white/70">{q.label}:</span>{" "}
                  <span className="text-white">{payload.personal?.[q.id] || "-"}</span>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h4 className="text-[#fead53] font-semibold mb-2">Departments</h4>
            <div className="text-sm space-y-2">
              <div>
                First: <span className="text-white">{getDeptName(payload.dept1) || "-"}</span>
              </div>
              <div>
                Second: <span className="text-white">{getDeptName(payload.dept2) || "-"}</span>
              </div>
            </div>
          </section>
          {["dept1", "dept2"].map((slot) => {
            const key = payload[slot]
            if (!key) return null
            const dept = payload.departments.find((d: Department) => d.key === key)
            if (!dept) return null
            const answers = payload.answers?.[key] || {}
            return (
              <section key={slot}>
                <h4 className="text-[#fead53] font-semibold mb-2">{dept.name} answers</h4>
                <div className="space-y-2 text-sm">
                  {dept.questions.map((q: Question) => (
                    <div key={q.id}>
                      <div className="text-white/70">{q.label}</div>
                      <div className="text-white">
                        {Array.isArray(answers[q.id]) ? answers[q.id].join(", ") : (answers[q.id] ?? "-")}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
        <DialogFooter className="gap-2">

          <Button
            variant="ghost"
            onClick={() => setOpenAction(false)}
            className="text-white border border-white/20 hover:bg-white/10 hover:text-[#fead53]"
          >
            Back
          </Button>
          <Button onClick={onConfirmAction} disabled={submitting} className="bg-[#fead53] text-[#00040D] hover:bg-[#fdbd74]">
            {submitting ? "Submitting..." : "Confirm & Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
