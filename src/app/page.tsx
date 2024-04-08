"use client"
import { Information } from "@/components/Information";
import { Marquee } from "@/components/Marquee";
import { MiniPortfolio } from "@/components/miniportfolio";

export default function Home() {
    return (
        <main className="h-full overflow-x-hidden flex flex-col">
            <Information />
            <MiniPortfolio />
            <Marquee />
        </main>
    )
}
