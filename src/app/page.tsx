import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* Placeholder for next section – replace with your content */}
      <section
        id="adventure"
        className="min-h-screen bg-[#0a0f2e] flex items-center justify-center"
      >
        <p className="text-white/40 text-lg">
          Macera bölümü yakında geliyor…
        </p>
      </section>
    </main>
  );
}
