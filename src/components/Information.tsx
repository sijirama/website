import { Location } from "./boxes/loaction";
import { Marquee } from "./boxes/marquee";

export function Information() {

    return <div className="min-h-[25rem] grid-cols-2 py-4 lg:grid-rows-3 lg:grid-cols-4 mb-2 gap-2 grid items-center justify-center bg-black w-full px-3 lg:px-4">
        <div className="col-span-2 row-span-2 lg:row-span-2 lg:col-span-2 h-full w-full  rounded-lg"></div>
        <div className="lg:row-span-2 lg:col-span-1 h-full w-full bg-emerald-950">
        </div>
        <div className=" row-span-3 lg:row-span-1 lg:col-span-1 h-full w-full bg-transparent rounded-lg">
            <Location />
        </div>
        <div className="lg:row-span-2 lg:col-span-1 h-full w-full bg-sky-950 rounded-lg"></div>

        <div className=" col-span-2 lg:row-span-1 lg:col-span-3 h-full w-full bg-green-950 rounded-lg overflow-hidden ">
            <Marquee />
        </div>
    </div>
}
