"use client"

import { getBrowserSupabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Github, ArrowRight, Globe } from "lucide-react"
import { useState } from "react"

export function SignIn() {
  const supabase = getBrowserSupabase()
  const [loading, setLoading] = useState<null | string>(null)

  async function signInWithProvider(provider: "google" | "github") {
    try {
      setLoading(provider)
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            (typeof window !== "undefined" ? window.location.origin : undefined),
        },
      })
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="w-full max-w-md rounded-lg border border-[#0b1320] bg-[#00040D] p-6 shadow-sm">
      <div className="mb-4">
        <h1 className="text-balance text-2xl font-semibold text-white">Sign in to continue</h1>
        <p className="text-sm text-white/70">Use your preferred provider to access the recruitment form.</p>
      </div>
      <div className="flex flex-col gap-3">
        <Button
          onClick={() => signInWithProvider("google")}
          className="w-full bg-[#FEAD53] text-black hover:bg-[#f7a043]"
          disabled={!!loading}
        >
          <Globe className="mr-2 h-4 w-4" />
          {loading === "google" ? "Redirecting..." : "Continue with Google"}
          <ArrowRight className="ml-auto h-4 w-4 opacity-80" />
        </Button>
        <Button
          onClick={() => signInWithProvider("github")}
          className="w-full bg-white text-black hover:bg-white/90"
          disabled={!!loading}
        >
          <Github className="mr-2 h-4 w-4" />
          {loading === "github" ? "Redirecting..." : "Continue with GitHub"}
          <ArrowRight className="ml-auto h-4 w-4 opacity-80" />
        </Button>
        <div className="mt-3 text-center text-xs text-white/60">
          By continuing you agree to our terms and privacy policy.
        </div>
      </div>
    </div>
  )
}
