
import Field from "@/components/ui/Field";
import Link from "next/link";

export default function RegisterPage() {
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
            Create Account
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Join the Synapse AI workspace
          </p>
        </div>

        <form className="space-y-4">
          <Field
            id="username"
            label="Username"
            placeholder="Choose a username"
            autoComplete="username"
            required
          />

          <Field
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            required
          />

          <Field
            id="password"
            label="Password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            minLength={8}
            required
          />

          <Field
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            minLength={8}
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
            Create Account
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-700" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-700" />
        </div>

        <button
          type="button"
          className="w-full rounded-lg border py-2.5 text-sm transition-colors hover:bg-white/5"
          style={{ borderColor: "var(--border)" }}
        >
          Continue with Google
        </button>

        <p className="mt-5 text-center text-xs text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold hover:underline"
            style={{ color: "var(--accent)" }}
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
