"use client"

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react"
import { useDepartmentStore } from "@/lib/departmentStore"
import { Fragment } from "react"
import { Check, ChevronDown } from "lucide-react"

type Props = {
  dept1: string | ""
  dept2: string | ""
  setDept1: (v: string | "") => void
  setDept2: (v: string | "") => void
}

export function DepartmentSelectors({ dept1, dept2, setDept1, setDept2 }: Props) {
  const onDept1 = (v: string) => {
    setDept1(v)
    if (v && v === dept2) setDept2("")
  }
  const { departments, loaded, load } = useDepartmentStore()
  if (!loaded) load()
  const deptOptions1 = departments
  const deptOptions2 = departments.filter((d) => d.key !== dept1)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Department 1 <span className="text-[#fead53]">*</span>
        </label>
        <DepartmentDropdown
          value={dept1}
          onChange={onDept1}
          options={deptOptions1}
          placeholder="Select Department"
        />
      </div>
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Department 2 <span className="text-[#fead53]">*</span>
        </label>
        <DepartmentDropdown
          value={dept2}
          onChange={setDept2}
          options={deptOptions2}
          placeholder={dept1 ? "Select Department" : "Select Department 1 first"}
          disabled={!dept1}
        />
      </div>
    </div>
  )
}

function DepartmentDropdown({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}: {
  value: string
  onChange: (val: string) => void
  options: { key: string; name: string }[]
  placeholder: string
  disabled?: boolean
}) {
  const selectedDept = options.find((d) => d.key === value)

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <div className="relative">
        <ListboxButton
          className={`w-full rounded-md bg-white/5 text-white px-4 py-2 flex items-center justify-between font-sans border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#fead53] transition
            ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-[#fead53]"}
          `}
        >
          <span className="truncate text-left text-white/90">
            {selectedDept ? (
              selectedDept.name
            ) : (
              <span className="text-white/50">{placeholder}</span>
            )}
          </span>
          <ChevronDown className="w-5 h-5 ml-2 text-[#fead53]" />
        </ListboxButton>

        <ListboxOptions className="absolute z-10 mt-2 w-full rounded-md bg-[#191d2b] shadow-lg border border-[#fead53]/30 max-h-60 overflow-auto">
          {options.length === 0 && (
            <div className="px-4 py-2 text-white/70">No departments available</div>
          )}

          {options.map((dept) => (
            <ListboxOption key={dept.key} value={dept.key} as={Fragment}>
              {({ active, selected }) => (
                <li
                  className={`cursor-pointer select-none px-4 py-2 flex items-center justify-between
                    ${active ? "bg-[#fead53]/10 text-[#fead53]" : "text-white/80"}
                    ${selected ? "font-bold" : ""}
                  `}
                >
                  <span>{dept.name}</span>
                  {selected && <Check className="w-4 h-4 text-[#fead53]" />}
                </li>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
