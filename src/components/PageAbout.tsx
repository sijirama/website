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
    return <section className="w-full h-full text-zinc-400 items-center flex">
        <div className=" w-full md:w-5/6 flex items-center h-full md:py-5">
            <p id='target' className={`${manrope.className} text-base md:text-xl`} >
                Welcome, I am <SpanWord word=" Oluwasijibomi Ilesanmi " />, a software developer based in Lagos, Nigeria, Feel free to connect with me on <SpanWord word="Twitter/X" link="https://twitter.com/sijiramakun" /> or <SpanWord word="Discord" link="https://discord.com/channels/@me/529714655333974025"/> or even  <SpanWord word="Github" link="https://github.com/sijirama" />
            </p>
        </div>
    </section>
}


