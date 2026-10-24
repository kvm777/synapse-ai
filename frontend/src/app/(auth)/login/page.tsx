
import Field from "@/components/ui/Field";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex  justify-center px-4 py-4">
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
            Welcome Back
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Sign in to your Synapse AI workspace
          </p>
        </div>

        <form className="space-y-4">
          <Field
            id="email"
            label="Email or Username"
            placeholder="Enter email or username"
            autoComplete="username"
            required
          />

          <Field
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-xs hover:underline"
              style={{ color: "var(--accent)" }}
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{
              background: "var(--accent)",
              color: "var(--background)",
            }}
          >
            Sign In
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
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold hover:underline"
            style={{ color: "var(--accent)" }}
          >
            Create account
          </Link>
        </p>
      </div>
    </main>
  );
}
