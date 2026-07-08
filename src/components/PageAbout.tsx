"use client";

import { useEffect, useState } from "react";
import {
	BookOpen,
	BriefcaseBusiness,
	Folder,
	Github,
	Mail,
	Twitter,
} from "lucide-react";
import { manrope } from "@/lib/fonts";

const links = [
	{
		label: "library",
		href: "/library",
		icon: BookOpen,
	},
	{
		label: "projects",
		href: "/projects",
		icon: Folder,
	},
	{
		label: "portfolio",
		href: "https://flowcv.com/resume/qjwdae4u1j",
		icon: BriefcaseBusiness,
		external: true,
	},
];

const socials = [
	{
		label: "github",
		href: "https://github.com/sijirama",
		icon: Github,
	},
	{
		label: "twitter",
		href: "https://twitter.com/oluwasijirama",
		icon: Twitter,
	},
	{
		label: "email",
		href: "mailto:gbemilesanmi@gmail.com",
		icon: Mail,
	},
];

const badges = [
	{ src: "/badges/debian.gif", alt: "Debian" },
	{ src: "/badges/vi.gif", alt: "Vi" },
	{ src: "/badges/anime.gif", alt: "Anime" },
	{ src: "/badges/animegirl.gif", alt: "Anime Girl" },
	{ src: "/badges/fingers.gif", alt: "Fingers" },
	{ src: "/badges/trustme.gif", alt: "Trust Me" },
	{ src: "/badges/firefox.gif", alt: "Firefox" },
	{ src: "/badges/linux.gif", alt: "Linux" },
	{ src: "/badges/linuxnow.gif", alt: "Linux Now" },
	{ src: "/badges/luffy.gif", alt: "Luffy" },
	{ src: "/badges/gecko.gif", alt: "Gecko" },
	{ src: "/badges/eyes.gif", alt: "Eyes" },
];

export default function Landing() {
	const [badgeIndex, setBadgeIndex] = useState(0);
	const badge = badges[badgeIndex];

	useEffect(() => {
		const interval = window.setInterval(() => {
			setBadgeIndex((current) => (current + 1) % badges.length);
		}, 1800);

		return () => window.clearInterval(interval);
	}, []);

	return (
		<section
			className={`w-full text-zinc-900 ${manrope.className} text-[13px] leading-relaxed lg:text-sm`}
		>
			<div className="w-full space-y-6">
				<div className="flex items-start justify-between gap-4">
					<div className="space-y-1">
						<h1 className="text-sm font-semibold leading-none text-zinc-950 lg:text-base">
							Oluwasijibomi<span className="text-orange-500">.</span>
						</h1>
						<p className="text-zinc-500">software engineer based in Lagos.</p>
					</div>

					<div className="flex shrink-0 items-center gap-1.5">
						{socials.map(({ label, href, icon: Icon }) => (
							<a
								key={label}
								href={href}
								target={href.startsWith("http") ? "_blank" : undefined}
								rel={href.startsWith("http") ? "noreferrer" : undefined}
								aria-label={label}
								className="inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
							>
								<Icon className="h-3.5 w-3.5" aria-hidden="true" />
							</a>
						))}
					</div>
				</div>

				<div className="space-y-2.5 text-zinc-600">
					<p>
						i work across the fullstack, but i prefer backend work: business
						logic, infrastructure, and the systems underneath the product.
					</p>
					<p>
						lately, most of my spare time has been going into math, ai/ml, and
						research-y engineering: reading papers, building small systems, and
						trying to move closer to that kind of work.
					</p>
					<p>
						i also write notes sometimes, keep a few side projects alive, and
						occasionally document whatever i am learning or thinking through.
					</p>
				</div>

				<nav className="flex flex-wrap gap-2 pt-1" aria-label="Homepage links">
					{links.map(({ label, href, icon: Icon, external }) => (
						<a
							key={label}
							href={href}
							target={external ? "_blank" : undefined}
							rel={external ? "noreferrer" : undefined}
							className="inline-flex h-8 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 text-[12px] text-zinc-700 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-zinc-950"
						>
							<Icon className="h-3.5 w-3.5" aria-hidden="true" />
							<span>{label}</span>
						</a>
					))}
					<div
						className="inline-flex h-8 w-[112px] items-center overflow-hidden"
						aria-label="Rotating badge"
					>
						<img
							key={badge.src}
							className="h-[28px] w-auto"
							width="88"
							height="31"
							src={badge.src}
							alt={badge.alt}
						/>
					</div>
				</nav>
			</div>
		</section>
	);
}
