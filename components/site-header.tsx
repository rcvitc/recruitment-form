"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { getBrowserSupabase } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { LogoutButton } from "./logout-button"

export function SiteHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function fetchSession() {
      const supabase = getBrowserSupabase()
      const { data } = await supabase.auth.getUser()
      setIsLoggedIn(!!data?.user)
      setChecking(false)
    }
    fetchSession()
  }, [])

  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img
          alt="Robotics Club Logo"
          className="h-10 w-auto cursor-pointer"
          src="./logo.png"
          onClick={() => window.open("/", "_self")}
        />
      </div>
      <nav className="flex items-center space-x-6">
        <a
          href="/#home"
          className={cn(
            "relative text-white/90 hover:text-[#fead53] transition-colors"
          )}
        >
          Home
        </a>
        <a
          href="/#departments"
          className={cn(
            "relative text-white/90 hover:text-[#fead53] transition-colors hidden md:inline"
          )}
        >
          Departments
        </a>
        <a
          href="/#process"
          className={cn(
            "relative text-white/90 hover:text-[#fead53] transition-colors hidden md:inline"
          )}
        >
          Process
        </a>
        <Link
          href="/form"
          className={cn(
            "relative text-white/90 hover:text-[#fead53] transition-colors"
          )}
        >
          Apply
        </Link>
        {checking ? (
          <span className={cn("relative text-white/90 transition-colors")}>???</span>
        ) : isLoggedIn ? (
          <LogoutButton />
        ) : (
          <Link
            href="/login"
            className={cn(
              "relative text-white/90 hover:text-[#fead53] transition-colors"
            )}
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  )
}
