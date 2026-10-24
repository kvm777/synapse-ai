
import Field from "@/components/ui/Field";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-4">
      <div
        className="w-full max-w-sm rounded-2xl border p-6 sm:p-7"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="mb-6 text-center">
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--accent)" }}
          >
            Forgot Password?
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Enter your registered email address.
            We`ll help you reset your password.
          </p>
        </div>

        <form className="space-y-4">
          <Field
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            required
          />

          <button
            type="submit"
            className="w-full rounded-lg py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{
              background: "var(--accent)",
              color: "var(--background)",
            }}
          >
            Send Reset Link
          </button>
        </form>

        <p className="mt-5 text-center text-sm">
          <Link
            href="/login"
            className="font-semibold hover:underline"
            style={{ color: "var(--accent)" }}
          >
            ← Back to Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
