import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

let _serverClient: ReturnType<typeof createServerClient> | null = null;

export async function getServerSupabase() {
  if (_serverClient) return _serverClient;
  const cookieStore = await cookies();
  const response = NextResponse.next();
  _serverClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          } catch {
            console.log("Something went wrong setting cookies");
          }
        },
      },
    },
  );
  return { supabase: _serverClient, response };
}
