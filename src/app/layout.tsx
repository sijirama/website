import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import { inter } from '@/lib/fonts'

export const metadata: Metadata = {
    title: 'oluwasijibomi',
    description: 'i live so i love.',
    openGraph:{
        title:"siji's website",
        description:"i live so that i can love",
        images:"https://siji.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Faphrodite.ba7bb8a6.jpg&w=3840&q=75"
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                <main>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
