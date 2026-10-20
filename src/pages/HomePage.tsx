import LandingPage from "@/components/PageAbout";

export default function Home() {
  return (
    <main className="min-h-svh overflow-x-hidden bg-white flex flex-col">
      <div className="relative z-10 px-4 md:px-8 w-full mt-8 md:mt-10 lg:mt-0 max-w-[42rem] mx-auto lg:min-h-svh lg:flex lg:items-center lg:py-16">
        <LandingPage />
      </div>
    </main>
  );
}
