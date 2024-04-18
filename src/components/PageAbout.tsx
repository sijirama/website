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
    return <section className={`w-full h-full text-zinc-900 dark:text-zinc-300 items-center flex ${manrope.className} text-sm lg:text-base `}>
        <div className="w-full lg:w-[95%] flex gap-3 md:gap-1.5 flex-col items-left h-full md:py-2">
            <p id='target'>
                my name is <SpanWord word=" Oluwasijibomi Ilesanmi " />, a software developer based in Lagos, Nigeria. I have a deep passion for crafting applications that not only solve problems but also contribute positively to the well-being of people around me. I <SpanWord word="love music" link="https://open.spotify.com/user/31okn5a72nq67rs2sndgdoudfm3y" /> and listen mostly to R&B, Rap and occasionally Afro beats. i also love reading books, both fictional and non-fictional, you probrably should check out the notes and articles i have written <SpanWord word="Here in my library" link="/library" />, if you want more info on my professional background, the details can be found here  <SpanWord word="in my portfolio page" link="/portfolio" /></p>
            <div>
                <p>i am really really really excited about ...</p>
                <ul className="pl-4 list-disc">
                    <li>
                        the interesting discourse at the intersection of science and religion,
                        exploring nuanced discussions on origins, evolution, and ultimate
                        implicaions for humanity, i grew up in a christian home, but have the mind of a scientist, things are bound to clash.
                    </li>
                    <li>engineering endeavors that have the potential to positively transform lives, i believe that this talent i have been given by God, i should try and use it to help people too.</li>
                    <li>
                        music and people that share music, sharing music is a love
                        language, beautiful music is the art of the prophets that can calm the agitations of the soul; it is one of the most magnificent and delightful presents God has given us.
                    </li>
                    <li>the future and what it holds for us, are we really all gonna make it?</li>
                </ul>
            </div>
            <p>
                shoot me a dm on <SpanWord word="Twitter/X" link="https://twitter.com/sijiramakun" /> or <SpanWord word="Discord" link="https://discord.com/channels/@me/529714655333974025" /> or even  <SpanWord word="Github" link="https://github.com/sijirama" />, if you want to chat, vibe, or build something cool together.
            </p>
        </div>
    </section>
}


