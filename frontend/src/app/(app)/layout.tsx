"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

// Detect when the component is running in the browser.
function subscribeToMount() {
  return () => {};
}

function getMountedSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(true);

  // Avoid setState inside an effect and prevent hydration mismatches.
  const mounted = useSyncExternalStore(
    subscribeToMount,
    getMountedSnapshot,
    getServerSnapshot
  );

  const router = useRouter();
  const pathname = usePathname();

  // Read the browser session only after mounting.
  const isLoggedIn =
    mounted && Boolean(sessionStorage.getItem("accessToken"));

  const username = mounted
    ? sessionStorage.getItem("username") || ""
    : "";

  // Redirect visitors who aren't logged in.
  useEffect(() => {
    if (!mounted) return;

    const publicPages = [
      "/login",
      "/register",
      "/forgot-password",
    ];

    if (!isLoggedIn && !publicPages.includes(pathname)) {
      router.replace("/login");
    }
  }, [mounted, isLoggedIn, pathname, router]);

  // Wait until the browser session can be checked.
  if (!mounted) return null;

  const publicPages = [
    "/login",
    "/register",
    "/forgot-password",
  ];

  // Hide protected content while redirecting.
  if (!isLoggedIn && !publicPages.includes(pathname)) {
    return null;
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--background-gradient)",
      }}
    >
      {/* Display the current login state and username. */}
      <Header
        collapsed={collapsed}
        onToggle={() => setCollapsed((previous) => !previous)}
        isLoggedIn={isLoggedIn}
        username={username}
      />

      <Sidebar
        collapsed={collapsed}
        isLoggedIn={isLoggedIn}
      />

      <main className="pt-16">
        <div className="mx-auto w-full max-w-[1700px] pl-24 pr-4 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}