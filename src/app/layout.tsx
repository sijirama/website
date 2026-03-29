import React from "react";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import { inter } from "@/lib/fonts";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
	title: "sijibomi",
	description: "still learning. probably always will be.",
	openGraph: {
		title: "sijibomi",
		description: "still learning. probably always will be.",
		images: "https://media.sijibomi.com/blob/website/f5922f41614775aba49ba6c49f6ef36f.jpg",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<head></head>
			<body
				suppressHydrationWarning={true}
				className={`${inter.className} bg-gray-50 bbg-[#f5f2e9] h-dvh flex flex-col px-3 md:px-0 `}
			>
				<ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" disableTransitionOnChange>
					<main className="flex-1">{children}</main>
				</ThemeProvider>
				<Script
					src="https://analytics.siji.ng/script.js"
					defer
					data-website-id="26f16359-f861-4461-8283-6b21d74330a5"
				/>
			</body>
		</html>
	);
}
