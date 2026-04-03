import React from "react";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import { inter } from "@/lib/fonts";
import { Metadata } from "next";
import Script from "next/script";
import { OG_IMAGE } from "@/lib/config";

export const metadata: Metadata = {
	metadataBase: new URL("https://sijibomi.com"),
	title: "sijibomi",
	description: "still learning. probably always will be.",
	openGraph: {
		title: "sijibomi",
		description: "still learning. probably always will be.",
		images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
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
