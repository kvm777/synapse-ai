"use client";

import type { ChangeEventHandler } from "react";

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export default function Field({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  required = false,
  minLength,
  value,
  onChange,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm">
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm outline-none focus:ring-1"
        style={{ borderColor: "var(--border)" }}
      />
    </div>
  );
}
