import AppShell from "@/components/layout/AppShell";

export default function Home() {
  return (
    <AppShell>
      <div className="space-y-3">
        <h1
          className="text-5xl font-bold"
          style={{
            background:
              "linear-gradient(to right, var(--accent), var(--accent-secondary))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Welcome to Synapse AI
        </h1>

        <p
          className="text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Intelligent workspace for AI, CRM and enterprise productivity.
        </p>
      </div>
    </AppShell>
  );
}

