
type FieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
};

export default function Field({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  required = false,
  minLength,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm"
      >
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
        className="w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm outline-none focus:ring-1"
        style={{ borderColor: "var(--border)" }}
      />
    </div>
  );
}
