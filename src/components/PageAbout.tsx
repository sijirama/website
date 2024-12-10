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

export default function JobHunt() {
    return <section className={`w-full h-full  text-zinc-950 dark:text-zinc-100 items-center flex ${manrope.className} text-xs lg:text-base `}>
        <div className="w-full lg:w-[95%] flex gap-3 md:gap-1.5 flex-col items-left h-full md:py-2 ">

            <p id="target">
                hi, i'm siji, a software developer currently working as a full-stack developer in Nigeria. I also collaborate with friends at <SpanWord word="mossgrid" link="https://mossgrid.netlify.app/" /> on various projects. we're planning to apply one of our projects to Y Combinator, so wish us luck!
            </p>

            <p>
                {"i'm currently interested and have experience in fullstack web-development, systems programming, a little bit of low level, sysadmin and basic devops."}
            </p>

            <p>
                occasionally(ish) I write. You can check out <SpanWord word="what I've written here" link="/library" />. If you want more info on my professional background, the details can be found <SpanWord word="in my portfolio page" link="/portfolio" />.
            </p>
            <div>
                <p className="font-bold">what keeps me up at night</p>
                <ul className="pl-4 list-disc space-y-2">
                    <li>computers... i just wanna know everything about them</li>
                    <li>engineering endeavors that have the potential to positively transform lives - <span className="font-bold">Concern for man himself and his fate must always form the chief interest of all technical endeavors</span></li>
                    <li>
                        Exploring the science-faith intersection (Christian upbringing meets scientific mind)
                    </li>
                    <li>
                        {"music and people that share music: it's a love language, "}<SpanWord word="here are some playlists i've worked on" link="https://open.spotify.com/user/31okn5a72nq67rs2sndgdoudfm3y" />
                    </li>
                </ul>
            </div>
            <p>
                shoot me a dm on <SpanWord word="Twitter/X" link="https://twitter.com/sijiramakun" /> or <SpanWord word="Discord" link="https://discord.com/channels/@me/529714655333974025" /> or even  <SpanWord word="Github" link="https://github.com/sijirama" />, if you want to chat, vibe, or build something cool together.
            </p>
            <div className="flex gap-0.5 items-center max-w-full flex-wrap">
                <img width="88px" height="31px" src="/badges/debian.gif" />
                <img width="88px" height="31px" src="/badges/vi.gif" />
                <img width="88px" height="31px" src="/badges/anime.gif" />
                <img width="88px" height="31px" src="/badges/animegirl.gif" />
                <img width="88px" height="31px" src="/badges/fingers.gif" />
                <img width="88px" height="31px" src="/badges/trustme.gif" />
                <img width="88px" height="31px" src="/badges/firefox.gif" />
                <img width="88px" height="31px" src="/badges/linux.gif" />
                <img width="88px" height="31px" src="/badges/linuxnow.gif" />
                <img width="88px" height="31px" src="/badges/luffy.gif" />
                <img width="88px" height="31px" src="/badges/gecko.gif" />
                <img width="88px" height="31px" src="/badges/eyes.gif" />
                <img width="88px" height="31px" src="/badges/sijis.png" />
            </div>

        </div>
    </section>
}


