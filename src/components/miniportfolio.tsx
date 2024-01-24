"use client"
import { education, expereince } from "@/lib/data";
import { manrope } from "@/lib/fonts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

export function MiniPortfolio() {

    const contref = useRef(null)

    const title1ref = useRef(null)
    const exprole = useRef(null)
    const expname = useRef(null)
    const expperiod = useRef(null)

    useGSAP(() => {

        gsap.registerPlugin(ScrollTrigger)
        // let tl = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: contref.current,
        //         start: "top center",
        //         //markers: true,
        //     }
        // })
        //
        // tl.from(title1ref.current, {
        //     y: 100,
        //     opacity: 0,
        //     duration: 1,
        //     ease: "power3.inOut"
        // })
        // tl.from([exprole.current, expname.current, expperiod.current], {
        //     y: 100,
        //     opacity: 0,
        //     duration: 1,
        //     ease: "power3.inOut",
        //     stagger: {
        //         amount: 0.1
        //     }
        // }, ">")
        //
    }, {})

    return (
        <section ref={contref} className={` ${manrope.className} text-sm md:text-base min-h-30 w-[95%] mx-auto flex flex-col gap-5 my-3 py-6 px-2 md:px-0 border-y-zinc-900 border-y text-zinc-500 bg-black`}>
            <div className="grid md:grid-cols-4 md:grid-row-3 h-full w-full">
                <div className="md:col-span-1 row-span-3 py-4 ">
                    <p ref={title1ref}>Experience</p>
                </div>
                <div className="md:col-span-3 md:row-span-3">
                    {expereince.map((exp , index) => (
                        <div key={index} className=" gap-2 items-center justify-between border-b border-zinc-900 w-full h-auto py-4 grid grid-cols-3 transition-colors duration-300 hover:text-orange-800 ">
                            <p ref={exprole} className="col-span-1 font-semibold ">{exp.role}</p>
                            <p ref={expname} className="col-span-1">{exp.name}</p>
                            <p ref={expperiod} className="col-span-1">{exp.period}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid md:grid-cols-4 md:grid-row-3 h-full w-full mt-4 ">
                <div className="md:col-span-1 row-span-3 py-4 ">
                    <p>Education</p>
                </div>
                <div className="md:col-span-3 md:row-span-3">
                    {education.map((exp , index) => (
                        <div key={index} className="items-center justify-between pb-5 border-zinc-900 w-full h-auto py-4 grid grid-cols-3 hover:text-orange-800">
                            <p className="col-span-1">{exp.name}</p>
                            <p className="col-span-1">{exp.description}</p>
                            <p className="col-span-1">{exp.period}</p>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    )
}
