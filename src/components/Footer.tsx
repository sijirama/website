import { HTMLAttributes } from "react";

interface FooterProps extends HTMLAttributes<HTMLDivElement> { }

export default function Footer({ className, ...props }: FooterProps) {
    return <div {...props} className="min-h-24 flex items-center bg-black text-white z-[1] border-y-zinc-800 border-y w-full">
        <div className="w-[95%] flex items-center justify-center md:justify-between mx-auto text-xs md:text-sm -tracking-wider text-zinc-400">
            <p className="hover:text-orange-500">&#169; 2024 or something like that, idk.</p>
            <p className="hidden md:block hover:text-orange-500">Thank you for reading.</p>
        </div>
    </div>
}
