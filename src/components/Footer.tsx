import { HTMLAttributes } from "react";

interface FooterProps extends HTMLAttributes<HTMLDivElement> {}

export function Footer({ className, ...props }: FooterProps) {
    return <div {...props} className="h-24 flex items-center bg-black text-white z-[1] border-y-zinc-800 border-y w-full">
        <div className="md:w-5/6 flex items-center justify-between mx-auto text-sm -tracking-wider text-zinc-400">
            <p className="hover:text-orange-500">&#169; 2024 or something like that, idk.</p>
            <p className="hidden md:block hover:text-orange-500">Thank you for reading.</p>
        </div>
    </div>
}
