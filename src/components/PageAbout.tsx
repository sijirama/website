"use client"
import { manrope } from "@/lib/fonts"
import { useRef } from 'react'

interface Props {
    word: string
    link?: string
}
function SpanWord({ word, link }: Props) {
    return <a href={link ?? link} target="_blank">
        <span className="border border-white rounded-xl px-2 hover:bg-white hover:text-black transition-colors duration-200">
            {word}
        </span>
    </a>
}

export default function JobHunt() {
    return <section className="w-full h-full bg-black text-white items-center flex px-4 md:px-5 mx-auto">
        <div className=" w-full md:w-2/3 flex items-center h-full py-5">
            <p id='target' className={`${manrope.className} text-xl`} >
                Welcome to my personal website, a somehow almost well crafted playground where I intentionally overengineer various elements, pushing the boundaries to learn new things and explore intriguing technologies. I am Oluwasijibomi Ilesanmi, a software developer based in Lagos, Nigeria, passionate about crafting for the World Wide Web. As I am about to graduate from Babcock University, I am eager to dive into full-time opportunities, freelance work, or collaborative projects. Feel free to connect with me on <SpanWord word="Twitter/X" link="https://twitter.com/sijisaidwhat" /> or <SpanWord word="Github" link="https://github.com/sijirama" /> —I am not a big fan of <SpanWord word="LinkedIn" link="https://www.linkedin.com/in/oluwasijibomi-ilesanmi-8504b123a/" />.
            </p>
        </div>
    </section>
}


