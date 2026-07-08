"use client";
import Header from "@/components/Header";
import LandingPage from "@/components/PageAbout";

export default function Home() {
  return (
    <main className="home-noise-bg min-h-svh overflow-x-hidden flex flex-col">
      <div className="lg:hidden">
        <Header />
      </div>
      <div className="relative z-10 px-4 md:px-8 w-full mt-3 md:mt-4 lg:mt-0 max-w-xl mx-auto lg:min-h-svh lg:flex lg:items-center">
        <LandingPage />
      </div>
    </main>
  );
}
