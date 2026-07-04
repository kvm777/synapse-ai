export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="flex min-h-[55vh] flex-col items-center justify-center text-center">
        <h1
          className="text-6xl font-bold"
          style={{
            background:
              "linear-gradient(to right,var(--accent),var(--accent-secondary))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Welcome to Synapse AI
        </h1>

        <p
          className="mt-4 text-xl"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Intelligent workspace for AI, CRM and enterprise productivity.
        </p>
      </section>
    </div>
  );
}