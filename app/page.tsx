import { getServerSupabase } from "@/lib/supabase/server"
import { SignIn } from "@/components/auth/sign-in"
import { RecruitmentForm } from "@/components/recruitment-form"
import { LogoutButton } from "@/components/logout-button"

export default async function Page() {
  const supabase = getServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main className="min-h-[100svh] bg-[#00040D]">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-[#FEAD53]" aria-hidden />
          <span className="font-semibold text-white">Recruitment</span>
        </div>
        <nav className="flex items-center gap-3">{user ? <LogoutButton /> : null}</nav>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-4">
        <div className="mb-6">
          <h1 className="text-balance text-3xl font-semibold text-white">
            {user ? "Apply to up to two departments" : "Join our team"}
          </h1>
          <p className="text-pretty text-white/70">
            {user
              ? "Select departments, answer tailored questions, and confirm your application."
              : "Sign in to start your application. We use secure OAuth via Supabase."}
          </p>
        </div>

        {!user ? (
          <div className="flex justify-center">
            <SignIn />
          </div>
        ) : (
          <RecruitmentForm />
        )}
      </section>

      <footer className="border-t border-[#0b1320] bg-[#00040D]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6">
          <span className="text-sm text-white/60">Built with Next.js and Supabase</span>
          <span className="rounded-md bg-[#FEAD53] px-2 py-1 text-xs font-medium text-black">
            Brand: #00040D / #FEAD53 / #FFFFFF
          </span>
        </div>
      </footer>
    </main>
  )
}
