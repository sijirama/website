import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import { inter } from '@/lib/fonts'

export const metadata: Metadata = {
    title: 'oluwasijibomi',
    description: 'my fucking website.',
    openGraph:{
        title:"oluwasijibomi",
        description:"guys it's my website, check it out.",
        images:"https://opengraph.b-cdn.net/production/documents/6f6fe320-ad5f-4c32-ae18-8bd71717f445.jpg?token=_Uqx-HbKtoYMzIEDNJu12usQP2ygfPpkCh_U1LjyHvk&height=675&width=1200&expires=33239909303"
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
