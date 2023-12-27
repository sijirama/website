import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import { inter } from '@/lib/fonts'

export const metadata: Metadata = {
    title: 'oluwasijibomi',
    description: 'i live so i love.',
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
