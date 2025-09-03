"use client"

import ParticlesCanvas from "@/components/particles-canvas"
import { SiteHeader } from "@/components/site-header"
import { DepartmentSelectors } from "@/components/form/department-selectors"
import { QuestionRenderer } from "@/components/question-renderer"
import { ConfirmDialog } from "@/components/form/confirm-dialog"
import { personalQuestions } from "@/lib/departments"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { getBrowserSupabase } from "@/lib/supabase/client"
import Footer from "@/components/footer"
import { LoadingScreen } from "@/components/loading-screen"
import { Question, useDepartmentStore } from "@/lib/departmentStore"

type Answers = Record<string, any>
type DeptAnswers = Record<string, Answers>
const MIN_LOADING_TIME = 800

function getErrorDetails(searchParams: URLSearchParams) {
  const error = searchParams.get("error")
  const description = searchParams.get("error_description")
  if (error && description) {
    if (error === "server_error" && description === "Database error saving new user") {
      return {
        title: "Invalid Email",
        message: "Only vitstudent.ac.in emails are allowed. Please use your VIT student email address.",
      }
    }
    return {
      title: "Error",
      message: decodeURIComponent(description.replace(/\+/g, " ")),
    }
  }
  return null
}

export default function FormPage() {
  return (
    <Suspense fallback={<LoadingScreen text="Loading..." />}>
      <FormContent />
    </Suspense>
  )
}

function FormContent() {
  // Call all hooks first, always
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sessionChecked, setSessionChecked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [supabaseEmail, setSupabaseEmail] = useState("")
  const [dept1, setDept1] = useState<string | "">("")
  const [dept2, setDept2] = useState<string | "">("")
  const [personal, setPersonal] = useState<Record<string, any>>({})
  const [answers, setAnswers] = useState<DeptAnswers>({})
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loadingText, setLoadingText] = useState("Checking authentication...")
  const [minTimePassed, setMinTimePassed] = useState(false)
  const [reviewPayload, setReviewPayload] = useState<any>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const errorDetails = getErrorDetails(searchParams)
  const { departments, loaded, load } = useDepartmentStore()

  useEffect(() => {
    const timer = setTimeout(() => setMinTimePassed(true), MIN_LOADING_TIME)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      setLoadingText("Checking authentication...")
      const supabase = getBrowserSupabase()
      const code = searchParams.get("code")
      if (code) {
        setLoadingText("Completing login...")
        await supabase.auth.getUser()
        const pathSegments = window.location.pathname.split("/").filter(Boolean)
        if (pathSegments.length === 0) {
          pathSegments.push("form")
        } else {
          pathSegments[pathSegments.length - 1] = "form"
        }
        const newPath = "/" + pathSegments.join("/")
        router.replace(newPath)
        return
      }
      const { data } = await supabase.auth.getUser()
      if (data?.user?.email) {
        const fullName = data.user.user_metadata?.full_name || ""
        let firstName = ""
        let middleName = ""
        let lastName = ""
        let regNumber = ""
        if (fullName) {
          const parts = fullName.trim().split(/\s+/)
          if (parts.length >= 2) {
            firstName = parts[0]
            regNumber = parts[parts.length - 1]
            if (parts.length === 3) {
              lastName = parts[1]
            } else if (parts.length > 3) {
              middleName = parts.slice(1, -2).join(" ")
              lastName = parts[parts.length - 2]
            } else {
              lastName = ""
            }
          }
        }
        setIsLoggedIn(true)
        setSupabaseEmail(data.user.email)
        setPersonal((p) => ({
          ...p,
          email: data.user.email,
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          regNo: regNumber,
        }))
      } else {
        setIsLoggedIn(false)
      }
      setSessionChecked(true)
    }
    checkAuth()
  }, [router, searchParams])

  useEffect(() => {
    if (dept2 && dept1 === dept2) setDept2("")
  }, [dept1, dept2])

  useEffect(() => {
    if (!loaded || departments.length == 0) load()
  }, [loaded, load])

  const selectedDepts = useMemo(() => [dept1, dept2].filter(Boolean) as string[], [dept1, dept2])
  const setPersonalField = (id: string, val: any) =>
    setPersonal((p) => ({ ...p, [id]: val }))
  const setDeptAnswer = (deptKey: string, qid: string, val: any) =>
    setAnswers((prev) => ({
      ...prev,
      [deptKey]: { ...(prev[deptKey] || {}), [qid]: val }
    }))
  const payload = { personal, dept1, dept2, answers, departments }

  const onSubmit = async () => {
    setSubmitted(false)
    setSubmitting(true)
    setSubmitError(null);
    try {
      const supabase = getBrowserSupabase()
      const { data: userData, error: userError } = await supabase.auth.getUser()
      if (userError || !userData?.user) {
        setSubmitError("Not authenticated");
        return
      }
      const insertObj = {
        user_id: userData.user.id,
        dept1,
        dept2,
        answers_dept1: answers[dept1] || {},
        answers_dept2: answers[dept2] || {},
        personal_questions: personal || {},
        created_at: new Date().toISOString(),
      }
      const { error } = await supabase
        .from("responses")
        .insert([insertObj])
      if (error) {
        if (
          error.message &&
          error.message.includes('duplicate key value violates unique constraint "responses_user_id_key"')
        ) {
          setSubmitError("You can't submit the form again. You have already submitted your application.");
        } else {
          setSubmitError("Submission failed. Please try again.");
        }
        throw error
      }
      setSubmitted(true)
      setConfirmOpen(false)
    } catch (e) {
      if (!submitError) setSubmitError("Submission failed. Please try again.");
      setConfirmOpen(false)
    } finally {
      setSubmitting(false)
    }
  }

  if (!loaded) {
    return <LoadingScreen text="Loading departments..." />
  }
  if (!sessionChecked || !minTimePassed) {
    return <LoadingScreen text={loadingText} />
  }
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#00040D] text-white relative z-10">
        <ParticlesCanvas />
        <SiteHeader />

        <section className="flex items-center justify-center min-h-[66vh] px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-3xl font-bold mb-3">Please log in to apply</h1>
            <p className="text-white/80 mb-6">
              You need to be signed in to access the application form.
            </p>

            {/* Show error if present */}
            {errorDetails && (
              <div className="bg-[#fead53]/10 border border-[#fead53] rounded py-3 px-4 text-[#fead53] font-semibold mb-6">
                <div className="text-lg mb-1">{errorDetails.title}</div>
                <div className="text-sm">{errorDetails.message}</div>
              </div>
            )}

            <Link
              href="/login"
              className="inline-block bg-[#fead53] text-[#00040D] px-6 py-2 rounded-md font-semibold hover:bg-[#fdbd74] transition"
            >
              Go to Login
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#00040D] text-white relative z-10">
      <ParticlesCanvas />
      <SiteHeader />
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[66vh]">
        <div className="w-full max-w-3xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
          {/* Show error if present */}
          {errorDetails && (
            <div className="bg-[#fead53]/10 border border-[#fead53] rounded py-3 px-4 text-[#fead53] font-semibold mb-6">
              <div className="text-lg mb-1">{errorDetails.title}</div>
              <div className="text-sm">{errorDetails.message}</div>
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold font-sans">Join Our Robotics Team</h1>
          <p className="text-white/80 mt-2">
            Select two departments (cannot be the same), answer the questions, and submit.
          </p>
          {/* ...rest of your form... */}
          <h2 className="text-xl font-semibold mt-8 mb-3">Your Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {personalQuestions.map((q) => (
              <div key={q.id} className="col-span-1">
                <label className="flex flex-col gap-1">
                  <span className="text-white text-sm font-large">
                    {q.label}
                    {q.required ? " *" : ""}
                  </span>
                  <input
                    className="w-full rounded-md bg-white/5 text-white px-3 py-2 font-sans focus:outline-none focus:ring-2 focus:ring-[#fead53] placeholder:text-white/50"
                    value={q.id === "email" ? (personal[q.id] || supabaseEmail) : (personal[q.id] || "")}
                    onChange={(e) => setPersonalField(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    required={q.required}
                    disabled={q.id === "email"}
                    type={q.type}
                    {...(q.type === "number" && { pattern: "[0-9]*" })}
                  />
                </label>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-3">Select Departments (Max 2)</h2>
          <DepartmentSelectors
            dept1={dept1}
            dept2={dept2}
            setDept1={setDept1}
            setDept2={setDept2}
          />

          {selectedDepts.map((key) => {
            const dept = departments.find((d) => d.key === key)!
            return (
              <section key={key} className="mt-8 py-10">
                <h1 className="text-lg font-bold mb-3">{dept.name} Questions</h1>
                <div className="grid gap-4">
                  {dept.questions.map((q: Question) => (
                    <QuestionRenderer
                      key={q.id}
                      question={q}
                      value={answers[key]?.[q.id]}
                      onChange={(val) => setDeptAnswer(key, q.id, val)}
                    />
                  ))}
                </div>
              </section>
            )
          })}


          <div className="flex flex-col sm:flex-row items-center gap-3 mt-10">
            <button
              className="bg-[#fead53] text-[#00040D] px-6 py-2 rounded-md font-semibold hover:bg-[#fdbd74] transition"
              onClick={() => {
                if (!dept1 || !dept2) {
                  alert("Please select two different departments.")
                  return
                }
                if (dept1 === dept2) {
                  alert("Departments must be different.")
                  return
                }
                const requiredIds = personalQuestions.filter(q => q.required).map(q => q.id)
                for (const id of requiredIds) {
                  if (!personal[id] && id !== "email") {
                    alert("Please fill all required personal fields.")
                    return
                  }
                }
                for (const deptKey of selectedDepts) {
                  const department = departments.find(d => d.key === deptKey);
                  if (!department) continue;
                  const requiredDeptQuestions = department.questions.filter(q => q.required);
                  for (const question of requiredDeptQuestions) {
                    if (!answers[deptKey]?.[question.id]) {
                      alert(`Please answer all required questions for the "${department.name}" department.`);
                      return;
                    }
                  }
                }
                setReviewPayload({ ...payload, departments: departments.filter(item => item.key in payload.answers) })
                setConfirmOpen(true)
              }}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Review & Submit"}
            </button>
            {submitError && (
              <div className="w-full text-center mb-4">
                <span className="text-red-500 font-semibold">{submitError}</span>
              </div>
            )}
            {submitted && (
              <span className="text-green-400 font-semibold">
                Submitted! We’ll be in touch.
              </span>
            )}
          </div>

          <ConfirmDialog
            open={confirmOpen}
            setOpenAction={setConfirmOpen}
            payload={reviewPayload}
            onConfirmAction={onSubmit}
            submitting={submitting}
          />
        </div>
      </section>
      <Footer />
    </main>
  )
}
