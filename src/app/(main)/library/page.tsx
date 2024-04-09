"use client"
import { useRouter } from 'next/navigation'
export default function Page() {
    const label = "ExplorerPath"

    function SetItemForPath(path: string) {
        if (typeof window !== undefined) {
            localStorage.setItem(label, path)
        }
    }

    function GetItemForPath() {
        if (typeof window !== undefined) {
            return localStorage.getItem(label)
        }
    }

    function isTherePathStored() {
        let pathStored
        if (typeof window !== undefined) {
            pathStored = localStorage.getItem(label)
        }
        return pathStored ? true : false
    }


    const router = useRouter()

    if (isTherePathStored()) {
        router.push(`/library/${GetItemForPath()}`)
    } else { router.push(`/library/Home.md`) }

    return null

}
