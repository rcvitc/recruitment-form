"use client"

import ParticlesCanvas from "@/components/particles-canvas"
import { SiteHeader } from "@/components/site-header"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getBrowserSupabase } from "@/lib/supabase/client"
import Footer from "@/components/footer"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loadingEmail, setLoadingEmail] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const [error, setError] = useState("")
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const supabase = getBrowserSupabase()
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        const pathSegments = window.location.pathname.split("/").filter(Boolean)
        if (pathSegments.length === 0) {
          pathSegments.push("form")
        } else {
          pathSegments[pathSegments.length - 1] = "form"
        }
        const newPath = "/" + pathSegments.join("/")
        router.replace(newPath)
      }
    }
    checkSession()
  }, [router])

  const signInWithEmail = async () => {
    setLoadingEmail(true)
    setError("")
    try {
      const supabase = getBrowserSupabase()
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/form`
              : "/form",
        },
      })
      if (error) throw error
      setSent(true)
    } catch (e: any) {
      setError(e.message || "Failed to send magic link. Please try again.")
    } finally {
      setLoadingEmail(false)
    }
  }

  const signInWithGoogle = async () => {
    setLoadingGoogle(true)
    try {
      const supabase = getBrowserSupabase()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/form`
              : "/form",
        },
      })
      if (error) throw error
    } catch (e: any) {
      setError(e.message || "Google sign-in failed.")
      setLoadingGoogle(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#00040D] text-white relative z-10">
      <ParticlesCanvas />
      <SiteHeader />
      <section className="flex-grow flex items-center justify-center py-16">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">
              Login to Your Account
            </h1>
            <p className="mt-3 text-white/80">Welcome, future innovator!</p>
          </div>

          {/* Email login */}
          <div className="space-y-4">
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#fead53]"
              disabled={loadingEmail || sent}
            />
            <button
              onClick={signInWithEmail}
              className="w-full bg-[#fead53] text-[#00040D] font-bold rounded-md py-3 hover:bg-[#fdbd74] transition"
              disabled={loadingEmail || !email || sent}
            >
              {sent
                ? "Magic Link Sent!"
                : loadingEmail
                  ? "Sending..."
                  : "Sign in with Magic Link"}
            </button>
            {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
            {sent && (
              <div className="text-green-400 text-sm mt-2">
                Check your email for a login link!
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="relative my-6 flex justify-center items-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative bg-[#00040D] px-3 text-white/60 text-sm">
              Or continue
            </div>
          </div>

          {/* Google login */}
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 border border-white/30 text-white rounded-md py-3 hover:bg-white hover:text-[#00040D] transition"
            disabled={loadingGoogle}
          >
            {loadingGoogle ? (
              "Redirecting..."
            ) : (
              <>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
                </svg>
                Continue with Google
              </>
            )}
          </button>
        </div>
      </section>
      <Footer className="mt-auto" />
    </main>
  )
}
