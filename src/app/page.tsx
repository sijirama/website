"use client";
import LandingPage from "@/components/PageAbout";

export default function Home() {
  return (
    <main className="h-full overflow-x-hidden flex flex-col">
      <div className="px-1 w-full md:max-w-4xl xl:max-w-3xl mx-auto">
        <LandingPage />
      </div>
    </main>
  );
}
