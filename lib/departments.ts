import {
  FolderGit2,
  BookOpenText,
  ShieldCheck,
  BrainCircuit,
  Globe,
  Palette,
  Megaphone,
} from "lucide-react";

export type QuestionOption = { value: string; label: string };
export type Question =
  | {
      id: string;
      type: "text" | "textarea";
      label: string;
      required?: boolean;
      placeholder?: string;
      description?: string;
    }
  | {
      id: string;
      type: "mcq";
      label: string;
      required?: boolean;
      options: QuestionOption[];
      description?: string;
    }
  | {
      id: string;
      type: "checkbox";
      label: string;
      required?: boolean;
      options: QuestionOption[];
      description?: string;
    };

export type PersonalQuestion = {
  id: "firstName" | "middleName" | "lastName" | "regNo" | "email" | "phone";
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "number" | "email";
};

export const personalQuestions: PersonalQuestion[] = [
  {
    id: "firstName",
    type: "text",
    label: "First name",
    placeholder: "John",
    required: true,
  },
  { id: "middleName", type: "text", label: "Middle name", placeholder: "A." },
  {
    id: "lastName",
    type: "text",
    label: "Last name",
    placeholder: "Doe",
    required: true,
  },
  {
    id: "regNo",
    type: "text",
    label: "Registration number",
    placeholder: "2xBxx1xxx",
    required: true,
  },
  {
    id: "email",
    type: "email",
    label: "Email",
    placeholder: "someone@rcvitc.com",
    required: true,
  },
  {
    id: "phone",
    type: "number",
    label: "Phone Number",
    placeholder: "xxxxxxxxxx",
    required: true,
  },
];

export const departments = [
  {
    id: "projects",
    key: "projects",
    name: "Projects",
    blurb:
      "From autonomous robots to complex systems, the Projects team is where ideas become reality. We build, test, and compete at the highest levels.",
    icon: FolderGit2,
    questions: [],
  },
  {
    id: "teaching",
    key: "teaching",
    name: "Teaching",
    blurb:
      "Passionate about sharing knowledge? The Teaching team creates workshops and tutorials to upskill our members and the wider community.",
    icon: BookOpenText,
    questions: [],
  },
  {
    id: "cybersec",
    key: "cybersec",
    name: "Cybersec",
    blurb:
      "Focused on securing our digital and physical creations. We explore vulnerabilities, implement defenses, and compete in CTF challenges.",
    icon: ShieldCheck,
    questions: [],
  },
  {
    id: "data-science",
    key: "data-science",
    name: "Data Science",
    blurb:
      "Leveraging data to make our robots smarter. This team works on machine learning models, computer vision, and data analysis for robotics.",
    icon: BrainCircuit,
    questions: [],
  },
  {
    id: "web",
    key: "web",
    name: "Web",
    blurb:
      "Crafting our digital presence. The Web team builds and maintains our websites, recruitment portals, and internal tools.",
    icon: Globe,
    questions: [],
  },
  {
    id: "media-design",
    key: "media-design",
    name: "Media & Design",
    blurb:
      "The creative force behind our brand. This team handles our visual identity, social media content, videos, and merchandise design.",
    icon: Palette,
    questions: [],
  },
  {
    id: "marketing-sponsorship",
    key: "marketing-sponsorship",
    name: "Marketing & Sponsorship",
    blurb:
      "Building connections and securing resources. This team manages our outreach, public relations, and partnerships with industry leaders.",
    icon: Megaphone,
    questions: [],
  },
];
