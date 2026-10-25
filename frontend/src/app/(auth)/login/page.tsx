"use client";

import { useState } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import Field from "@/components/ui/Field";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  // Store the login form values.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Update form values as the user types.
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // Send login credentials to the Django API.
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // Stop if the backend URL is missing.
    if (!apiUrl) {
      setError("Backend API URL is not configured.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Django currently authenticates with username and password.
        body: JSON.stringify({
          username: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.detail || "Invalid username or password."
        );
        return;
      }

      // Keep tokens for this browser tab's session.
      sessionStorage.setItem("accessToken", data.access);
      sessionStorage.setItem("refreshToken", data.refresh);

      sessionStorage.setItem("username", formData.email.trim());

      // Return to the homepage after successful login.
      router.push("/");
    } catch {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex justify-center px-4 py-4">
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

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Field
            id="email"
            label="Email or Username"
            placeholder="Enter your username"
            autoComplete="username"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Field
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
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

          {/* Display authentication errors returned by the API. */}
          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              background: "var(--accent)",
              color: "var(--background)",
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
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
          Don`t have an account?{" "}
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