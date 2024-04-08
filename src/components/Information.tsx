import JobHunt from "./PageAbout";
import { Location } from "./boxes/loaction";
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
        <div className="flex-1 flex flex-col md:flex-row gap-4 py-1 md:w-[95%] mx-auto ">
            <div className="flex-1">
                <JobHunt />
            </div>
            <div className="hidden lg:w-1/4 h-full lg:grid items-center">
                <Location />
            </div>
        </div>
    )
}
