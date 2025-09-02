"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { getBrowserSupabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()
  const supabase = getBrowserSupabase()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500)) // 0.5s delay for smoothness
    await supabase.auth.signOut()
    setLoading(false)
    router.push("/login")
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      className={`
        bg-[#00040D] 
        border-2 border-[#FEAD53] 
        text-white 
        hover:bg-[#FEAD53] 
        hover:text-[#00040D]
        transition-all 
        duration-300
        font-semibold 
        flex items-center gap-2 
        px-4 py-2 
        rounded-full
        shadow-md
        relative
        ${loading ? "opacity-60 cursor-not-allowed" : ""}
      `}
    >
      <span
        className={`
          flex items-center gap-2 transition-opacity duration-300
          ${loading ? "opacity-0" : "opacity-100"}
        `}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign out
      </span>
      {loading && (
        <span className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <svg className="animate-spin h-5 w-5 text-[#FEAD53]" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#FEAD53" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="#FEAD53" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </span>
      )}
    </Button>
  )
}
