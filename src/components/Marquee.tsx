"use client"

import { bebas as roboto } from "@/lib/fonts"
import Marqueee from "react-fast-marquee";


export function Marquee() {
    return (
        <div className={`w-full flex items-center flex-1 whitespace-nowrap  text-zinc-800 dark:text-zinc-600  ${roboto.className}`}>
            <a href="mailto:gbemilesanmi@gmail.com">
                <Marqueee pauseOnHover speed={200} className="overflow-hidden flex items-center">
                    <p className='inline-block  text-8xl/tight md:text-9xl/tight font-extrabold -tracking-wide hover:text-orange-800 transition-colors duration-300'> — LET’S TALK — LET’S COLLABORATE — SAY HELLO — WANNA BE STARTING SOMETHING?  — DO YOU NEED HELP? — DO YOU JUST WANT TO TALK ABOUT TECHONOLOGY — ARE YOU JUST DEPRESSED — AUTISTIC? — DID SHE SAY NO? — NEED A MEME BREAK? — WANNA DISCUSS THE MEANING OF LIFE? — CAN'T FIND YOUR KEYS AGAIN? — NEED A GOOD PUN? — WONDERING WHY YOU'RE TALKING TO A FUCKING MARQUEE? —</p>
                </Marqueee>
            </a>
        </div>
    )
}
