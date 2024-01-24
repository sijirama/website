import JobHunt from "./PageAbout";
import { Location } from "./boxes/loaction";
import { Marquee } from "./boxes/marquee";
import { useGSAP } from "@gsap/react";

export function Information() {
    // useGSAP(() => {
    //
    //     gsap.registerPlugin(ScrollTrigger)
    //     let tl = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: contref.current,
    //             start: "top center",
    //             //markers: true,
    //         }
    //     })
    //     tl.from([exprole.current, expname.current, expperiod.current], {
    //         y: 100,
    //         opacity: 0,
    //         duration: 1,
    //         ease: "power3.inOut",
    //         stagger: {
    //             amount: 0.1
    //         }
    //     }, ">")
    //
    // }, {})
    //
    return (
        <div className="flex flex-col gap-4 md:grid md:grid-cols-4 md:grid-row-1 px-2 py-4 lg:px-4 lg:py-6 bg-black">
            <div className="col-span-3">
                <JobHunt />
            </div>
            <div className="hidden  min-h-36 md:col-span-1 md:flex items-center justify-center">
                <Location />
            </div>
        </div>
    )
}
