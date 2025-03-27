"use client";
import Link from "next/link";
import { ThemeToggle } from "@/providers/theme-toggle";
//import { FaRegCircle } from "react-icons/fa";

export default function Header({}) {
  return (
    <header className="z-10 w-full ">
      <main className="z-50 flex justify-between w-[95%] mx-auto py-5 rounded-lg text-zinc-900 dark:text-zinc-300">
        <div className="hover:text-orange-800">
          <Link href="/" className="-tracking-widest font-bold">
            home
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="hover:text-orange-800 hidden">
            <ThemeToggle />
          </div>
        </div>
      </main>
    </header>
  );
}
//
