"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--background-gradient)",
      }}
    >
      <Header
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />


      <main>
        <div className="mx-auto w-full max-w-[1700px]  pr-4">
          {children}
        </div>
      </main>
    </div>
  );
}