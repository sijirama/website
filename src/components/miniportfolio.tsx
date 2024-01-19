import { education, expereince } from "@/lib/data";
import { manrope } from "@/lib/fonts";

export function MiniPortfolio() {
    return (
        <section className={` ${manrope.className} text-sm md:text-base min-h-30 w-[95%] mx-auto flex flex-col gap-5 my-3 py-6 px-2 md:px-0 border-y-zinc-900 border-y text-zinc-400`}>
            <div className="grid md:grid-cols-4 md:grid-row-3 h-full w-full">
                <div className="md:col-span-1 row-span-3 py-4 ">
                    <p>Experience</p>
                </div>
                <div className="md:col-span-3 md:row-span-3">
                    {expereince.map((exp) => (
                        <div className="items-center justify-between border-b border-zinc-900 w-full h-auto py-4 grid grid-cols-3 hover:bg-orange-950 transition-colors duration-300 hover:text-white">
                            <p className="col-span-1">{exp.role}</p>
                            <p className="col-span-1">{exp.name}</p>
                            <p className="col-span-1">{exp.period}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid md:grid-cols-4 md:grid-row-3 h-full w-full">
                <div className="md:col-span-1 row-span-3 py-4 ">
                    <p>Education</p>
                </div>
                <div className="md:col-span-3 md:row-span-3">
                    {education.map((exp) => (
                        <div className="items-center justify-between pb-5 border-zinc-900 w-full h-auto py-4 grid grid-cols-3 hover:bg-orange-950">
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
