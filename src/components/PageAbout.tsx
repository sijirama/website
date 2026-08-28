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
		label: "projects",
		href: "/projects",
		icon: Folder,
	},
	{
		label: "library",
		href: "/library",
		icon: BookOpen,
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

const featuredProjects = [
	{
		name: "muna",
		href: "https://onmuna.com",
		description: "a private-beta general agent assistant for friends.",
	},
	{
		name: "pico",
		href: "https://github.com/sijirama/pico",
		description: "a tiny ml framework in c, built to learn autograd.",
	},
	{
		name: "scholic",
		href: "https://scholic.com",
		description: "social annotation for highlights and threaded notes.",
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
			className={`w-full text-zinc-900 ${manrope.className} text-sm leading-relaxed`}
		>
			<div className="w-full space-y-5">
				<div className="flex items-start justify-between gap-4">
					<div className="space-y-1">
						<h1 className="text-base font-medium leading-none text-zinc-950 lg:text-lg">
							oluwasijibomi<span className="text-orange-500">.</span>
						</h1>
						<p className="text-zinc-700">software engineer based in lagos.</p>
					</div>

					<div className="flex shrink-0 items-center gap-1.5">
						{socials.map(({ label, href, icon: Icon }) => (
							<a
								key={label}
								href={href}
								target={href.startsWith("http") ? "_blank" : undefined}
								rel={href.startsWith("http") ? "noreferrer" : undefined}
								aria-label={label}
								className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
							>
								<Icon className="h-4 w-4" aria-hidden="true" />
							</a>
						))}
					</div>
				</div>

				<div className="space-y-2 text-zinc-800">
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

				<section className="space-y-1.5 pt-0.5" aria-labelledby="featured-projects">
					<p
						id="featured-projects"
						className="text-sm text-zinc-950"
					>
						a few projects i'm currently working on:
					</p>

					<ul className="list-disc space-y-1 pl-5 marker:text-zinc-500">
						{featuredProjects.map((project) => (
							<li key={project.name} className="text-sm leading-relaxed text-zinc-700">
								<a
									href={project.href}
									target={project.href.startsWith("http") ? "_blank" : undefined}
									rel={project.href.startsWith("http") ? "noreferrer" : undefined}
									className="text-zinc-950 underline decoration-zinc-300 underline-offset-2 transition-colors hover:text-orange-800 hover:decoration-orange-300"
								>
									{project.name}
								</a>
								<span> - {project.description}</span>
							</li>
						))}
					</ul>
				</section>

				<nav className="flex flex-wrap gap-2 pt-1" aria-label="Homepage links">
					{links.map(({ label, href, icon: Icon, external }) => (
						<a
							key={label}
							href={href}
							target={external ? "_blank" : undefined}
							rel={external ? "noreferrer" : undefined}
							className="inline-flex h-8 items-center gap-1.5 rounded-md border border-zinc-200 bg-white/90 px-3 text-[12px] text-zinc-800 transition-colors hover:border-orange-300 hover:bg-white hover:text-orange-800"
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
