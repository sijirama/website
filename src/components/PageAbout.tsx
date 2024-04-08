"use client"
import { bebas, manrope, sail } from "@/lib/fonts"
import { useRef } from 'react'

interface Props {
    word: string
    link?: string
}
export function SpanWord({ word, link }: Props) {
    return <a href={link ?? link} target="_blank">
        <span className="border border-zinc-500 rounded-xl px-2 hover:bg-white hover:text-black transition-colors duration-200">
            {word}
        </span>
    </a>
}
export function ImportantWord({ word, link }: Props) {
    return <a href={link ?? link} target="_blank">
        <span className={`${sail.className} border border-zinc-500 text-4xl rounded-md px-2 hover:bg-white hover:text-black transition-colors duration-200`}>
            {word}
        </span>
    </a>
}


export default function JobHunt() {
    return <section className={`w-full h-full text-zinc-900 dark:text-zinc-300 items-center flex ${manrope.className} text-base md:text-base `}>
        <div className="w-full lg:w-[95%] flex gap-1.5 flex-col items-left h-full md:py-2">
            <p id='target'>
                hi, my name is <SpanWord word=" Oluwasijibomi Ilesanmi " />, a software developer based in Lagos, Nigeria. I have a deep passion for crafting applications that not only solve problems but also contribute positively to the well-being of humanity. I <SpanWord word="love music" link="https://open.spotify.com/user/31okn5a72nq67rs2sndgdoudfm3y" /> and listen mostly to R&B, Rap and occasionally Afro beats. i also love reading books, both fictional and non-fictional, you probrably should check out the notes and articles i have written <SpanWord word="Here in my Digital Garden" link="/library" />, i am also in search of a job, and my <SpanWord word="Portfolio can be found here." link="/portfolio" /></p>
            <div>
                <p>i am really really really excited about ...</p>
                <ul className="pl-4 list-disc">
                    <li>
                        the interesting discourse at intersection of science and religion,
                        exploring nuanced discussions on origins, evolution, and ultimate
                        implicaions for humanity.
                    </li>
                    <li>engineering endeavors that have the potential to positively transform lives, whether through innovative technologies or sustainable solutions.</li>
                    <li>
                        music and people that share music, sharing music is a love
                        language.
                    </li>
                    <li>the future and what it holds for us.</li>
                </ul>
            </div>
            <p>
                shoot me a dm on <SpanWord word="Twitter/X" link="https://twitter.com/sijiramakun" /> or <SpanWord word="Discord" link="https://discord.com/channels/@me/529714655333974025" /> or even  <SpanWord word="Github" link="https://github.com/sijirama" />, if you want to chat, vibe, or build something cool together.
            </p>
        </div>
    </section>
}


