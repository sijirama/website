"use client"
import { manrope, sail } from "@/lib/fonts"

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
    return <section className={`w-full h-full  text-zinc-950 dark:text-zinc-100 items-center flex ${manrope.className} text-sm lg:text-base `}>
        <div className="w-full lg:w-[95%] flex gap-3 md:gap-1.5 flex-col items-left h-full md:py-2">
            <p id='target'>
                My name is <SpanWord word="Oluwasijibomi Ilesanmi" />{", a software developer based in Lagos, Nigeria. I've got this deep passion for crafting applications that don't just solve problems, but actually make life better for the people around me. It's like coding with a purpose."}
            </p>

            <p>
                <SpanWord word="I really love music" link="https://open.spotify.com/user/31okn5a72nq67rs2sndgdoudfm3y" />{" and listen mostly to R&B, Rap and occasionally Afrobeats. I also love reading books; both fiction and non-fiction hold a special place in my intellectual pursuits. They serve as windows to new worlds and reservoirs of knowledge - two things I'm especially addicted to."}
            </p>

            <p>
                I occasionally pen down my thoughts and insights. You can check out <SpanWord word="what I've written here" link="/library" />. If you want more info on my professional background, the details can be found <SpanWord word="in my portfolio page" link="/portfolio" />.
            </p>
            <div>
                <p className="font-bold">what keeps me up at night</p>
                <ul className="pl-4 list-disc space-y-2">
                    <li>engineering endeavors that have the potential to positively transform lives, i believe that this talent we have been given by God, we should use it to positively impact the people around us, a totally random but apparently wise man once said - <span className="font-bold">Concern for man himself and his fate must always form the chief interest of all technical endeavors</span></li>
                    <li>
                        the interesting discourse at the intersection of science and religion, i grew up in a christian home, but have the mind of a scientist, things are bound to clash.
                    </li>
                    <li>
                        music and people that share music, sharing music is a love
                        language, beautiful music is one of the most magnificent and delightful presents God has given us.
                    </li>
                    <li>the future and what it holds for us</li>
                </ul>
            </div>
            <p>
                shoot me a dm on <SpanWord word="Twitter/X" link="https://twitter.com/sijiramakun" /> or <SpanWord word="Discord" link="https://discord.com/channels/@me/529714655333974025" /> or even  <SpanWord word="Github" link="https://github.com/sijirama" />, if you want to chat, vibe, or build something cool together.
            </p>
        </div>
    </section>
}


