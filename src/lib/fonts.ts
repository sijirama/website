import { Sail, Bebas_Neue, Bai_Jamjuree, Manrope, Rubik, Inter, Roboto, Poppins, Source_Serif_4, DM_Sans } from "next/font/google"

export const bai = Bai_Jamjuree({
    weight: ['400', '500', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})

export const roboto = Roboto({
    weight: ['400', '500', '700'],
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

export const sail = Sail({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
})

export const manrope = Manrope({ subsets: ["latin"] })
export const rubik = Rubik({ subsets: ["latin"] })
export const inter = Inter({ subsets: ["latin"] })

export const poppinsFont = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

// Beautiful serif for reading content
export const sourceSerif = Source_Serif_4({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    style: ["normal", "italic"],
});

// Clean modern sans for UI elements
export const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
