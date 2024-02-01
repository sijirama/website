import { manrope } from "@/lib/fonts"
import { ReactNode } from "react"

interface Props {
    children: ReactNode
}
export default function CustomCode({ children }: Props) {
    return <code className={`w-full bg-slate-400 p-4 flex items-center rounded-lg ${manrope.className}`}>
        {children}
    </code>
}
