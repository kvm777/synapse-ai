
"use client";

import { useState } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Field from "@/components/ui/Field";

export default function RegisterPage() {
  const router = useRouter();

  // Store the registration form values.
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Update the corresponding field as the user types.
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // Submit registration details to the Django backend.
  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");
    setSuccess("");

    // Check that both password fields match.
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      // Stop early if the API URL is not configured.
      if (!apiUrl) {
        setError("Backend API URL is not configured.");
        return;
      }

      const response = await fetch(
        `${apiUrl}/auth/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Send only the fields expected by Django.
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Display validation errors returned by the backend.
        const messages = Object.values(data)
          .flat()
          .filter(
            (item): item is string =>
              typeof item === "string"
          );

        setError(messages.join(" ") || "Registration failed.");
        return;
      }

      setSuccess(
        "Account created successfully! Redirecting to sign in..."
      );

      // Navigate to login after successful registration.
      window.setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch {
      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

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

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Field
            id="username"
            label="Username"
            placeholder="Choose a username"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <Field
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Field
            id="password"
            label="Password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            minLength={8}
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Field
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            minLength={8}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {/* Show validation and API response messages. */}
          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          {success && (
            <p role="status" className="text-sm text-green-400">
              {success}
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
            {loading ? "Creating Account..." : "Create Account"}
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
