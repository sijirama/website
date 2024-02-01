import { roboto } from "@/lib/fonts";
import lagos from "../../../public/images/lagos.jpeg";

import { TbLocationFilled } from "react-icons/tb";

export function Location() {
    return (
        <div
            className={` ${roboto.className} relative h-5/6 w-5/6 rounded-2xl text-white bg-cover bg-no-repeat`}
            style={{
                backgroundImage: `url(${lagos.src})`,
            }}
        >
            <div className="absolute inset-0 backdrop-filter backdrop-blur-lg hover:backdrop-blur-0 transition-all duration-500 flex items-end justify-center rounded-2xl">
                <div className="w-full text-white text-lg px-4 py-3">
                    <p className="font-bold text-lg items-center flex mb-1 -tracking-wider">
                        <TbLocationFilled className="text-white text-sm mr-1 " />
                        Based in Lagos, Nigeria.</p>
                    <p className="font-extralight text-xs">would love to work remotely</p>
                </div>
            </div>
        </div>
    );
}

