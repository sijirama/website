import JobHunt from "./PageAbout";
import { Location } from "./boxes/loaction";
import { Marquee } from "./boxes/marquee";

export function Information() {

    return (
        <div className="flex flex-col gap-4 md:grid md:grid-cols-4 md:grid-row-1 px-2 py-4 lg:px-4 lg:py-6">
            <div className="col-span-3">
                <JobHunt />
            </div>
            <div className="hidden  min-h-36 md:col-span-1 md:flex items-center justify-center">
                <Location />
            </div>
        </div>
    )
}
