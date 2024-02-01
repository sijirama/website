"use client"
import LatestUpdateComponent from "@/components/LatestUpdate";
import { Information } from "@/components/Information";
import { Marquee } from "@/components/boxes/marquee";
import { MiniPortfolio } from "@/components/miniportfolio";
import HomePage from "@/components/Homepage";

export default function Home() {
    return (
        <main className="w-full h-full overflow-x-hidden pt-20 lg:pt-12">
            <LatestUpdateComponent />
            <Information />
            <MiniPortfolio />
            <Marquee />
        </main>
    )
}
