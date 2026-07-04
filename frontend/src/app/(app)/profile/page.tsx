export default function Profile() {
  return (
    <div className="space-y-20">
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
          Profile Page
        </h1>

        
      </section>
    </div>
  );
}