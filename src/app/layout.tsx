import React from "react";
import { ThemeProvider } from "@/providers/theme-provider"
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { inter } from "@/lib/fonts";
import { Metadata } from "next";
import { InterfaceProvider } from "@/providers/InterfaceProvider";
import Script from "next/script";

export const metadata: Metadata = {
    title: "sijiramakun",
    description: "my fucking website.",
    openGraph: {
        title: "oluwasijibomi",
        description: "guys it's my website, check it out.",
        images:
            "https://i.pinimg.com/474x/f7/6e/c1/f76ec12821e613ef03bc78efb8bf3ef5.jpg"
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <head>
            </head>
            <body suppressHydrationWarning={true} className={`${inter.className} bg-gray-50 dark:bg-zinc-950 bbg-[#f5f2e9] dark:bbg-[#1e1e21] h-dvh flex flex-col px-3 md:px-0 `} >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <InterfaceProvider />
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}

