"use client"

import { bebas as roboto } from "@/lib/fonts"
import Marqueee from "react-fast-marquee";


export function Marquee() {

    // <span className='inline-block text-8xl font-extrabold -tracking-wider hover:text-orange-800 transition-colors duration-300'>{" • "}</span>
    //                 <span className='inline-block text-9xl font-extrabold -tracking-wider hover:text-orange-800 transition-colors duration-300'> {" "}LET'S COLLABORATE {" "}</span>
    //                 <span className='inline-block text-9xl font-extrabold -tracking-wider hover:text-orange-800 transition-colors duration-300'>{" • "}</span>
    //                 <span className='inline-block text-9xl font-extrabold -tracking-wider hover:text-orange-800 transition-colors duration-300'> {" "}SAY HELLO {" "}</span>

    return (
        <div className={`w-full h-full whitespace-nowrap bg-black text-zinc-800  ${roboto.className}`}>
            <a href="mailto:gbemilesanmi@gmail.com">
                <Marqueee pauseOnHover speed={150} className="overflow-hidden flex items-center">
                    <p className='inline-block text-9xl/tight font-extrabold -tracking-wide hover:text-orange-800 transition-colors duration-300'> — LET’S TALK — LET’S COLLABORATE — SAY HELLO — WANNA BE STARTING SOMETHING?</p>
                </Marqueee>
            </a>
        </div>
    )
}
