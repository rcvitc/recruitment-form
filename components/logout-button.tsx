"use client"

import { getBrowserSupabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const supabase = getBrowserSupabase()
  return (
    <Button
      variant="outline"
      onClick={async () => {
        await supabase.auth.signOut()
        if (typeof window !== "undefined") window.location.reload()
      }}
      className="border-[#FEAD53] text-[#FEAD53] hover:bg-[#FEAD53] hover:text-black"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sign out
    </Button>
  )
}
