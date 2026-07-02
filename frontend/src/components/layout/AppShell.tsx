"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen">
      <Header
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      <div className="flex">
        <Sidebar collapsed={collapsed} />

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}