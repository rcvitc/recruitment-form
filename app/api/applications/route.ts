import { NextResponse } from "next/server"
import { getServerSupabase } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const supabase = getServerSupabase()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  // TODO: Persist to DB if needed. For now, just log.
  console.log("[v0] Application received from", user.id, body)

  return NextResponse.json({ ok: true })
}
