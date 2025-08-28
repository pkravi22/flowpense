import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      {/* Using the custom color variables directly */}
      <h1 className="text-4xl font-bold bg-foreground text-primary">
        Welcome to FlowPense
      </h1>

      <div className="mt-6 p-6 bg-white rounded-lg">
        <p>This uses the primary brand color as background.</p>
      </div>

      <button className="mt-4 px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-primary-hover transition-colors">
        Primary Button
      </button>

      <div className="mt-6 p-6 bg-brand-secondary text-white rounded-lg">
        <p>This uses the secondary brand color.</p>
      </div>

      {/* Using the neutral palette */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
          <div
            key={shade}
            className={`p-4 bg-neutral-${shade} ${
              shade < 500 ? "text-neutral-900" : "text-neutral-100"
            } rounded`}
          >
            Neutral {shade}
          </div>
        ))}
      </div>
    </main>
  );
}
