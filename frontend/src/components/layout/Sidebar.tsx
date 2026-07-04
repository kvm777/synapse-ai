"use client";

import Link from "next/link";
import {
  House,
  MessageSquare,
  UserRound,
  Settings,
} from "lucide-react";

type SidebarProps = {
  collapsed: boolean;
};

const menuItems = [
  {
    label: "Feed",
    href: "/social",
    icon: House,
  },
  {
    label: "Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: UserRound,
  },
];

export default function Sidebar({
  collapsed,
}: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-16 z-40 flex h-[calc(100vh-64px)] flex-col justify-between border-r bg-slate-950/60 backdrop-blur-2xl transition-all duration-300 ${
        collapsed ? "w-20" : "w-50"
      }`}
      style={{
        borderColor: "rgba(255,255,255,.08)",
      }}
    >
      <nav className="flex flex-col gap-2 p-3">
        {menuItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className={`group flex items-center rounded-xl p-3 transition-all duration-300 hover:bg-white/10 hover:text-[var(--accent)] ${
              collapsed ? "justify-center" : "gap-3"
            }`}
            style={{
              color: "var(--text-secondary)",
            }}
          >
            <Icon
              size={collapsed ? 24 : 20}
              className="transition-all duration-300 group-hover:scale-110 group-hover:text-[var(--accent)]"
            />

            {!collapsed && (
              <span className="font-medium whitespace-nowrap">
                {label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div
        className="border-t p-3"
        style={{
          borderColor: "rgba(255,255,255,.08)",
        }}
      >
        <Link
          href="/settings"
          className={`group flex items-center rounded-xl p-3 transition-all duration-300 hover:bg-white/10 hover:text-[var(--accent)] ${
            collapsed ? "justify-center" : "gap-3"
          }`}
          style={{
            color: "var(--text-secondary)",
          }}
        >
          <Settings
            size={20}
            className="transition-all duration-300 group-hover:rotate-90 group-hover:text-[var(--accent)]"
          />

          {!collapsed && (
            <span className="font-medium whitespace-nowrap">
              Settings
            </span>
          )}
        </Link>
      </div>
    </aside>
  );
}