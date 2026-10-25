"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, ChevronDown, UserRound, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type HeaderProps = {
  collapsed: boolean;
  onToggle: () => void;
  isLoggedIn: boolean;
  username?: string;
};

export default function Header({
  collapsed,
  onToggle,
  isLoggedIn,
  username,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close the dropdown when clicking outside it.
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Sign out locally and ask Django to invalidate the refresh token.
  async function handleSignOut() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");

    try {
      if (apiUrl && accessToken && refreshToken) {
        await fetch(`${apiUrl}/auth/logout/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });
      }
    } catch {
      // Continue signing out locally if the backend is unavailable.
    } finally {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("username");

      setDropdownOpen(false);
      router.replace("/login");
    }
  }

  return (
    <header
      className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-slate-950/60 px-6 backdrop-blur-2xl"
      style={{ borderColor: "rgba(255,255,255,.08)" }}
    >
      {/* Brand and sidebar toggle */}
      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="rounded-xl p-2 transition-all duration-300 hover:bg-white/10 hover:text-[var(--accent)]"
          >
            <Menu size={22} />
          </button>
        )}

        <Link href="/">
          <h1
            className="text-xl font-semibold"
            style={{ color: "var(--accent)" }}
          >
            Synapse AI
          </h1>
        </Link>
      </div>

      {/* Sign-in link or account dropdown */}
      <div className="flex items-center gap-3">
        {!isLoggedIn ? (
          <Link
            href="/login"
            className="rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-300 hover:opacity-90"
            style={{
              background:
                "linear-gradient(135deg,var(--accent),var(--accent-secondary))",
              color: "#fff",
            }}
          >
            Sign In
          </Link>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-white/10"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg,var(--accent),var(--accent-secondary))",
                }}
              >
                <UserRound size={18} color="#fff" />
              </span>

              <span className="hidden text-sm font-medium text-white sm:block">
                {username || "User"}
              </span>

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile and sign-out actions */}
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl p-1 shadow-xl"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <Link
                  href="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white transition-colors hover:bg-white/10"
                >
                  <UserRound size={17} />
                  Profile
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition-colors hover:bg-white/10"
                >
                  <LogOut size={17} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}