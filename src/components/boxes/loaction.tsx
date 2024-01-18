import { roboto } from "@/lib/fonts";
import lagos from "../../../public/images/lagos.jpeg";
import { FaLocationPin } from "react-icons/fa6";

export function Location() {
    return (
        <div
            className={` ${roboto.className} relative h-full w-full rounded-3xl text-white bg-cover bg-no-repeat`}
            style={{
                backgroundImage: `url(${lagos.src})`,
            }}
        >
            <div className="absolute inset-0 backdrop-filter backdrop-blur-lg hover:backdrop-blur-0 transition-all duration-500 flex items-end justify-center rounded-3xl">
                <div className="w-full text-white text-lg px-4 py-3">
                    <p className="font-bold text-xl items-center flex mb-1 -tracking-wider">
                        <FaLocationPin className="text-white text-sm mr-1 " />
                        Based in Lagos, Nigeria.</p>
                    <p className="font-extralight text-sm">Can work remotely</p>
                </div>
            </div>
        </div>
    );
}

