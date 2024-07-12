import JobHunt from "./PageAbout";

export function Information() {
    return (
        <div className="flex-1 flex flex-col md:flex-row py-1 md:w-[95%] mx-auto transition-all duration-300">
            <div className="flex-1 ">
                <JobHunt />
            </div>
            <div className="hidden lg:w-1/6 xl:w-1/2 h-full lg:grid items-center ">
            </div>
        </div>
    )
}
