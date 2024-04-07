import React from "react";
import { HTMLAttributes } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { inter } from "@/lib/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "sijiramakun ",
    description: "my fucking website.",
    openGraph: {
        title: "oluwasijibomi",
        description: "guys it's my website, check it out.",
        images:
            "https://siji.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Faphrodite.ba7bb8a6.jpg&w=3840&q=75",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="h-full">
            <body className={`${inter.className} bg-black w-full flex flex-col h-full px-2 md:px-0`} >
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    );
}

