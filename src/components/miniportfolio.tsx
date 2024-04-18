"use client"
import { education, expereince } from "@/lib/data";
import { manrope } from "@/lib/fonts";

export function MiniPortfolio() {

    return (
        <section className={`flex-1 ${manrope.className} text-sm lg:text-base md:w-[95%] mx-auto flex flex-col gap-5 my-3 py-6 border-y-zinc-400 dark:border-y-zinc-700 border-y-[0.1px] text-zinc-900 dark:text-zinc-300 `}>
            <div className="grid md:grid-cols-4 md:grid-row-3 h-full w-full">
                <div className="md:col-span-1 row-span-3 py-4 ">
                    <p >Experience</p>
                </div>
                <div className="md:col-span-3 md:row-span-3">
                    {expereince.map((exp, index) => (
                        <div key={index} className=" gap-2 items-center justify-between border-b dark:border-zinc-700 border-zinc-400 w-full h-auto py-4 grid grid-cols-3 transition-colors duration-300 hover:text-orange-800 ">
                            <p className="col-span-1">{exp.role}</p>
                            <p className="col-span-1">{exp.name}</p>
                            <p className="col-span-1">{exp.period}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid md:grid-cols-4 md:grid-row-3 h-full w-full mt-4 ">
                <div className="md:col-span-1 row-span-3 py-1 ">
                    <p>Education</p>
                </div>
                <div className="md:col-span-3 md:row-span-3">
                    {education.map((exp, index) => (
                        <div key={index} className="items-center justify-between pb-5 dark:border-zinc-700 border-zinc-400 w-full h-auto py-4 grid grid-cols-3 hover:text-orange-800">
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
