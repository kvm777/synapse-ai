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
      className="flex h-16 items-center justify-between border-b px-6"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onToggle}
          className="rounded-lg p-2 transition hover:bg-white/5"
        >
          <Menu size={20} />
        </button>

        <h1
          className="text-xl font-semibold"
          style={{ color: "var(--accent)" }}
        >
          Synapse AI
        </h1>
      </div>

      <div className="flex items-center gap-5">
        <Search
          className="cursor-pointer transition hover:scale-110"
          size={20}
        />

        <Bell
          className="cursor-pointer transition hover:scale-110"
          size={20}
        />

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