"use client"
import Link from "next/link";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'

export interface MenuState {
    initial?: boolean | null,
    clicked?: boolean | null,
    menuName?: "close" | "menu"
}
export default function Header({ }) {

    //state for menu state
    const [menuState, setMenuState] = useState<MenuState>({
        initial: false,
        clicked: null,
        menuName: "menu"
    })

    //listen when routes change
    const pathname = usePathname()
    useEffect(() => {
        const handleRouteChange = () => {
            console.log("url changed, close the fucking menu")
            setMenuState({ clicked: false, menuName: "menu" })
        }
        handleRouteChange()
        return () => {
            handleRouteChange()
        };
    }, [pathname])

    //state for menu disabled state
    const [disabled, setDisabled] = useState(false)

    //onclick the menu button
    const handleMenu = () => {
        disableAnimation()
        if (menuState.initial === false) {
            setMenuState({
                initial: null,
                clicked: true,
                menuName: "close"
            })
            console.log(1)
        } else if (menuState.clicked === true) {
            setMenuState({
                clicked: !menuState.clicked,
                menuName: "menu"
            })
            console.log(2)
        } else if (menuState.clicked === false) {
            setMenuState({
                clicked: !menuState.clicked,
                menuName: "close"
            })
            console.log(3)
        }
    }

    // tell us if the animation should be disabled to avaoid spam
    const disableAnimation = () => {
        setDisabled(!disabled)
        setTimeout(() => {
            setDisabled(false)
        }, 1300)
    }

    //<button disabled={disabled} onClick={handleMenu} className="underline font-semibold -tracking-wider">{menuState.menuName}</button>

    return (
        <header className="z-10 w-full ">
            <main className="z-50 flex justify-between w-[95%] mx-auto py-5 rounded-lg text-zinc-500">
                <div className="hover:text-orange-800">
                    <Link href="/" className="-tracking-widest font-bold">home</Link>
                </div>
                <div className="hover:text-orange-800">
                </div>
            </main>
            <Menu state={menuState} />
        </header>
    )
}
//
