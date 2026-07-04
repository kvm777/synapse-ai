"use client";

import { Menu, Bell, Search } from "lucide-react";

type HeaderProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export default function Header({
  onToggle,
}: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-slate-950/60 px-6 backdrop-blur-2xl"
      style={{
        borderColor: "rgba(255,255,255,.08)",
      }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onToggle}
          className="rounded-xl p-2 transition-all duration-300 hover:bg-white/10 hover:text-[var(--accent)]"
        >
          <Menu size={22} />
        </button>

        <h1
          className="text-xl font-semibold"
          style={{ color: "var(--accent)" }}
        >
          Synapse AI
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-xl p-2 transition-all duration-300 hover:bg-white/10 hover:text-[var(--accent)]">
          <Search size={20} />
        </button>

        <button className="rounded-xl p-2 transition-all duration-300 hover:bg-white/10 hover:text-[var(--accent)]">
          <Bell size={20} />
        </button>

        <div
          className="h-10 w-10 rounded-full"
          style={{
            background:
              "linear-gradient(135deg,var(--accent),var(--accent-secondary))",
          }}
        />
      </div>
    </header>
  );
}