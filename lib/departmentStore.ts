import { create } from "zustand";
import { getBrowserSupabase } from "./supabase/client";

export async function fetchDepartments() {
  const { data, error } = await getBrowserSupabase()
    .from("departments")
    .select(
      `
      id,
      key,
      name,
      blurb,
      icon,
      questions:questions(
        id,
        question_key,
        type,
        label,
        required,
        placeholder,
        options:question_options (
          id,
          value,
          label
        )
      )
    `,
    )
    .order("name", { ascending: true });

  if (error) throw error;
  return data;
}

export type Department = {
  id: string;
  key: string;
  name: string;
  blurb: string;
  icon: string;
  questions: Question[];
};

export type Question = {
  id: string;
  question_key: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options: { id: string; value: string; label: string }[];
};

interface DepartmentState {
  departments: Department[];
  loaded: boolean;
  load: () => Promise<void>;
}

export const useDepartmentStore = create<DepartmentState>((set) => ({
  departments: [],
  loaded: false,
  load: async () => {
    const data = await fetchDepartments();
    set({ departments: data as Department[], loaded: true });
  },
}));
