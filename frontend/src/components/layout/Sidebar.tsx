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
      className={`flex h-[calc(100vh-64px)] flex-col justify-between border-r transition-all duration-300 ${collapsed ? "w-22" : "w-64"
        }`}
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <nav className="flex flex-col gap-2 p-4">
        {menuItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className={`group flex items-center rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/5 ${collapsed ? "justify-center" : "gap-3"
              }`}
            style={{
              color: "var(--text-secondary)",
            }}
          >
            <Icon
              size={collapsed ? 28 : 20}
              className="transition-all duration-200 group-hover:scale-110"
            />

            {!collapsed && (
              <span className="font-medium">
                {label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div
        className="border-t p-4"
        style={{
          borderColor: "var(--border)",
        }}
      >
        <Link
          href="/settings"
          className={`group flex items-center rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/5 ${collapsed ? "justify-center" : "gap-3"
            }`}
          style={{
            color: "var(--text-secondary)",
          }}
        >
          <Settings
            size={20}
            className="transition group-hover:rotate-90"
          />

          {!collapsed && (
            <span className="font-medium">
              Settings
            </span>
          )}
        </Link>
      </div>
    </aside>
  );
}