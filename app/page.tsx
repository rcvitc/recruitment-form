import ParticlesCanvas from "@/components/particles-canvas"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { departments } from "@/lib/departments"
import Link from "next/link"
import { FileText, Code, Users, PartyPopper } from "lucide-react"

export default function CombinedPage() {
  const columns = 3

  return (
    <main
      className="min-h-screen bg-[#00040D] text-white relative z-10"
      style={{ scrollBehavior: "smooth" }}
    >
      <ParticlesCanvas />
      <SiteHeader />

      {/* HOME SECTION */}
      <section id="home" className="min-h-screen flex items-center justify-center scroll-mt-24">
        <div className="text-center flex flex-col items-center max-w-4xl px-4">
          <img
            alt="Robotics Club Logo"
            className="h-20 w-auto mb-8"
            src="./logo.png"
          />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Build the Future. Join Robotics Club.
          </h1>
          <p className="mt-6 text-lg md:text-xl leading-8 text-white/80 max-w-3xl">
            Innovate, create, and collaborate with the brightest minds. Our club is where your passion for robotics
            comes to life.
          </p>
          <div className="mt-10">
            <Link
              href="/form"
              className="px-8 py-3 rounded-md text-lg font-semibold shadow-lg bg-[#fead53] text-[#00040D] hover:bg-[#fdbd74] transition"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* DEPARTMENTS SECTION */}
      <section id="departments" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Our Departments</h2>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            Explore the diverse teams that power our innovation. Find where your passion fits.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((d, i) => {
            const Icon = d.icon
            let extraClasses = ""
            const itemsInLastRow = departments.length % columns
            const isLastItem = i === departments.length - 1
            if (itemsInLastRow === 1 && isLastItem) {
              extraClasses = "lg:col-start-2"
            }
            if (itemsInLastRow === 2 && i === departments.length - 2) {
              extraClasses = "lg:col-start-2"
            }
            return (
              <div
                key={d.id}
                className={`rounded-xl p-6 bg-white/5 border border-[#fead53]/20 hover:border-[#fead53] transition-colors ${extraClasses}`}
              >
                <div className="bg-[#fead53]/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <Icon className="text-[#fead53]" />
                </div>
                <h3 className="text-xl font-semibold">{d.name}</h3>
                <p className="text-white/70 mt-2">{d.blurb}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* PROCESS SECTION - Timeline Tree Style */}
      <section id="process" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Recruitment Process</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Follow these simple steps to become a part of our innovative team. We've streamlined our process to be as clear and straightforward as possible.
          </p>
        </div>
        <div className="relative">
          {/* Timeline vertical line */}
          <div aria-hidden="true" className="absolute left-1/2 h-full w-0.5 bg-gray-700/50 hidden md:block" />
          <div className="space-y-16">
            <ProcessStep
              icon={<FileText />}
              title="Submit Application"
              desc="Fill out our online form with your personal details, interests, and answer a few department-specific questions. This is your chance to show us your passion."
              align="left"
            />
            <ProcessStep
              icon={<Code />}
              title="Technical Challenge"
              desc="Shortlisted candidates will receive a small technical challenge relevant to their chosen departments. It's a fun way for us to see your skills in action."
              align="right"
            />
            <ProcessStep
              icon={<Users />}
              title="Face to Face Interview"
              desc="The final stage is a casual chat with team members. We want to get to know you, discuss your challenge submission, and see how you'd fit into our collaborative culture."
              align="left"
            />
            <ProcessStep
              icon={<PartyPopper />}
              title="Welcome Aboard!"
              desc="Successful applicants will receive their offer and join the club. Get ready to start building, learning, and innovating with us!"
              align="right"
              accent
            />
          </div>
        </div>
        <div className="text-center mt-20">
          <p className="text-gray-400 mb-6">Ready to start your journey?</p>
          <Link
            href="/form"
            className="bg-[#fead53] text-[#00040D] px-10 py-4 rounded-md text-lg font-semibold inline-block hover:bg-[#fdbd74] transition"
          >
            Start Your Application Now
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

// Timeline/Tree Step Component
function ProcessStep({
  icon,
  title,
  desc,
  align,
  accent,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  align: "left" | "right"
  accent?: boolean
}) {
  // left or right alignment
  const isLeft = align === "left"
  // Use group for hover
  return (
    <div className={`relative flex items-center ${isLeft ? "md:justify-start" : "md:justify-end"} group`}>
      {/* Card */}
      <div className={`${isLeft ? "md:w-1/2 md:pr-8" : "md:w-1/2 md:pl-8"}`}>
        <div className={`card p-6 rounded-lg text-left ${accent ? "border-green-500/30" : ""}`}>
          <div className="flex items-center mb-3">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${accent ? "bg-green-500 text-white" : "bg-[#fead53] text-[#00040D]"}`}>
              {icon}
            </div>
            <h3 className={`text-2xl font-bold ml-4 ${accent ? "text-green-400" : ""}`}>{title}</h3>
          </div>
          <p className="text-gray-300">{desc}</p>
        </div>
      </div>
      {/* Timeline dot - only on md+ */}
      <div className="absolute left-1/2 -translate-x-1/2 bg-transparent p-2 hidden md:block">
        <div
          className={
            `w-6 h-6 rounded-full bg-white ring-[#00040D] ring-8 mb-1 transition-colors duration-600 ` +
            (accent
              ? "group-hover:bg-green-500"
              : "group-hover:bg-[#fead53]")
          }
        />
      </div>
    </div>
  )
}
