import {Bebas_Neue ,Bai_Jamjuree , Manrope , Rubik , Inter , Roboto } from "next/font/google"

export const bai = Bai_Jamjuree({
    weight: ['400', '500','700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})

export const roboto = Roboto({
    weight: ['400', '500','700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})

export const bebas = Bebas_Neue({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
})


export const manrope = Manrope({subsets:["latin"]})
export const rubik = Rubik({subsets:["latin"]})
export const inter = Inter({subsets:["latin"]})
