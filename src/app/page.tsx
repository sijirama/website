"use client"
import LatestUpdateComponent from "@/components/LatestUpdate";
import { Information } from "@/components/Information";
import { Marquee } from "@/components/boxes/marquee";
import { MiniPortfolio } from "@/components/miniportfolio";

export default function Home() {
    return (
        <main className="w-full h-full overflow-x-hidden pt-10 lg:pt-2 bg-black">
            <LatestUpdateComponent />
            <Information />
            <MiniPortfolio />
            <Marquee />
        </main>
    )
}
