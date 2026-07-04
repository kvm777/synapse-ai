"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

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

      <Sidebar collapsed={collapsed} />

      <main className="pt-16">
        <div className="mx-auto w-full max-w-[1700px] pl-24 pr-4 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}