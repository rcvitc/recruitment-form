import { cookies, headers } from "next/headers"
import { createServerClient } from "@supabase/ssr"

let _serverClient: ReturnType<typeof createServerClient> | null = null

export function getServerSupabase() {
  if (_serverClient) return _serverClient
  const cookieStore = cookies()
  const headerList = headers()
  _serverClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
      headers: {
        "X-Forwarded-For": headerList.get("x-forwarded-for") ?? undefined,
        "User-Agent": headerList.get("user-agent") ?? undefined,
      },
    },
  )
  return _serverClient
}
