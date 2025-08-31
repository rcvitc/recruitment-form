import type { Department } from "@/components/department-selector"

export const departments: Department[] = [
  {
    id: "projects",
    key: "projects",
    name: "Projects",
    blurb: "Build and ship impactful products.",
    questions: [
      {
        id: "why-projects",
        type: "textarea",
        label: "Why Projects?",
        required: true,
        placeholder: "Tell us why you're a great fit...",
      },
      {
        id: "experience-level",
        type: "mcq",
        label: "Experience Level",
        required: true,
        options: [
          { value: "beginner", label: "Beginner" },
          { value: "intermediate", label: "Intermediate" },
          { value: "advanced", label: "Advanced" },
        ],
      },
      {
        id: "skills",
        type: "checkbox",
        label: "Key Skills",
        options: [
          { value: "frontend", label: "Frontend" },
          { value: "backend", label: "Backend" },
          { value: "mobile", label: "Mobile" },
          { value: "pm", label: "Product/PM" },
        ],
      },
    ],
  },
  {
    id: "teaching",
    key: "teaching",
    name: "Teaching",
    blurb: "Educate and mentor learners.",
    questions: [
      { id: "why-teaching", type: "textarea", label: "Teaching Philosophy", required: true },
      {
        id: "format",
        type: "mcq",
        label: "Preferred Teaching Format",
        options: [
          { value: "workshops", label: "Workshops" },
          { value: "1-1", label: "1:1 Mentorship" },
          { value: "courses", label: "Courses" },
        ],
      },
    ],
  },
  {
    id: "cybersec",
    key: "cybersec",
    name: "Cybersecurity",
    blurb: "Protect and defend systems.",
    questions: [
      { id: "why-cyber", type: "textarea", label: "Why Cybersecurity?", required: true },
      {
        id: "domains",
        type: "checkbox",
        label: "Domains",
        options: [
          { value: "web", label: "Web" },
          { value: "infra", label: "Infrastructure" },
          { value: "reverse", label: "Reverse Engineering" },
        ],
      },
    ],
  },
  {
    id: "data-science",
    key: "data-science",
    name: "Data Science",
    blurb: "Analyze and model data.",
    questions: [
      { id: "stack", type: "text", label: "Favorite DS Stack", placeholder: "e.g. Python, Pandas, Scikit-learn" },
      {
        id: "experience",
        type: "mcq",
        label: "Experience",
        options: [
          { value: "student", label: "Student" },
          { value: "junior", label: "Junior" },
          { value: "senior", label: "Senior" },
        ],
      },
    ],
  },
  {
    id: "web",
    key: "web",
    name: "Web",
    blurb: "Craft web experiences.",
    questions: [
      { id: "framework", type: "text", label: "Preferred Framework", placeholder: "Next.js, SvelteKit, etc." },
      {
        id: "focus",
        type: "mcq",
        label: "Focus Area",
        options: [
          { value: "frontend", label: "Frontend" },
          { value: "fullstack", label: "Full-Stack" },
          { value: "devops", label: "DevOps" },
        ],
      },
    ],
  },
  {
    id: "media-design",
    key: "media-design",
    name: "Media & Design",
    blurb: "Visuals, content, and branding.",
    questions: [
      { id: "tools", type: "text", label: "Primary Tools", placeholder: "Figma, Adobe Suite, etc." },
      {
        id: "style",
        type: "mcq",
        label: "Design Style",
        options: [
          { value: "minimal", label: "Minimal" },
          { value: "playful", label: "Playful" },
          { value: "corporate", label: "Corporate" },
        ],
      },
    ],
  },
  {
    id: "marketing-sponsorship",
    key: "marketing-sponsorship",
    name: "Marketing & Sponsorship",
    blurb: "Grow awareness and partnerships.",
    questions: [
      { id: "pitch", type: "textarea", label: "Sample Pitch", placeholder: "Write a short sponsor pitch..." },
      {
        id: "channels",
        type: "checkbox",
        label: "Preferred Channels",
        options: [
          { value: "social", label: "Social Media" },
          { value: "email", label: "Email" },
          { value: "events", label: "Events" },
        ],
      },
    ],
  },
]
