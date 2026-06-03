"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Header from "@/components/Header";

// useLayoutEffect on the client, useEffect on the server (avoids SSR warning)
const useIsomorphicLayoutEffect =
	typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { manrope, caveat } from "@/lib/fonts";
import { projects, type Project, type ProjectStatus } from "@/lib/data";

const groups: {
	status: ProjectStatus;
	label: string;
	dot: string;
	pill: string;
	blurb: string;
}[] = [
	{
		status: "ongoing",
		label: "ongoing",
		dot: "bg-orange-400",
		pill: "bg-orange-50 text-orange-600 border-orange-200",
		blurb: "things i'm actively building right now",
	},
	{
		status: "research",
		label: "research",
		dot: "bg-violet-400",
		pill: "bg-violet-50 text-violet-600 border-violet-200",
		blurb: "experiments where the point is to understand something",
	},
	{
		status: "completed",
		label: "completed",
		dot: "bg-emerald-400",
		pill: "bg-emerald-50 text-emerald-600 border-emerald-200",
		blurb: "shipped, or as done as side projects ever get",
	},
];

// github-ish language colors; non-languages fall back to a neutral dot
const techColors: Record<string, string> = {
	C: "#555555",
	"C++": "#f34b7d",
	Zig: "#ec915c",
	Rust: "#dea584",
	Golang: "#00ADD8",
	Python: "#3572A5",
	TypeScript: "#3178c6",
	Lua: "#000080",
	React: "#61dafb",
	PyTorch: "#ee4c2c",
	Gemini: "#8e75ff",
	Research: "#a78bfa",
};

export default function ProjectsPage() {
	const containerRef = useRef<HTMLDivElement>(null);

	useIsomorphicLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
			if (!cards.length) return;
			// explicit set + to (not gsap.from) so dev StrictMode's
			// double-mount can't capture mid-flight values as the target
			gsap.set(cards, { opacity: 0, y: 24 });
			gsap.to(cards, {
				opacity: 1,
				y: 0,
				duration: 0.6,
				ease: "power3.out",
				stagger: 0.06,
				overwrite: "auto",
			});
		}, containerRef);
		return () => ctx.revert();
	}, []);

	return (
		<main className="h-full overflow-x-hidden flex flex-col">
			<Header />
			<div
				ref={containerRef}
				className={`${manrope.className} px-4 md:px-8 w-full mt-2 md:mt-3 md:max-w-5xl lg:max-w-6xl mx-auto text-zinc-900`}
			>
				<a
					href="/"
					className="text-xs text-zinc-400 hover:text-orange-700 transition-colors"
				>
					← home
				</a>

				{/* title */}
				<div className="mt-6 mb-2">
					<h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">
						projects
					</h1>
					<p
						className={`${caveat.className} text-lg md:text-xl text-orange-500/90 mt-2`}
					>
						things i've made to understand things
					</p>
				</div>
				<p className="text-xs lg:text-sm text-zinc-600 max-w-xl leading-relaxed">
					some are products, some are research, most are just me
					trying to understand something by building it. roughly
					sorted by how alive they still are.
				</p>

				<div className="flex flex-col gap-12 mt-10 pb-24">
					{groups.map((group) => {
						const items = projects.filter(
							(p) => p.status === group.status,
						);
						if (items.length === 0) return null;
						return (
							<section key={group.status}>
								{/* group header */}
								<div className="flex items-center gap-3 mb-5">
									<span className="relative flex h-2 w-2">
										<span
											className={`absolute inline-flex h-full w-full rounded-full opacity-60 ${group.dot}`}
										/>
										<span
											className={`relative inline-flex h-2 w-2 rounded-full ${group.dot}`}
										/>
									</span>
									<span
										className={`text-[10px] tracking-wide font-medium border rounded px-2 py-0.5 ${group.pill}`}
									>
										{group.label}
									</span>
									<span className="text-[11px] text-zinc-400 hidden sm:inline">
										{group.blurb}
									</span>
								</div>

								{/* project grid */}
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
									{items.map((project) => (
										<ProjectCard
											key={project.name}
											project={project}
										/>
									))}
								</div>
							</section>
						);
					})}
				</div>
			</div>
		</main>
	);
}

function ProjectCard({ project }: { project: Project }) {
	return (
		<div
			data-card
			className="group relative flex flex-col rounded-lg border border-zinc-200 bg-white/60 p-3 transition-all duration-200 hover:border-orange-300 hover:bg-white hover:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.12)]"
		>
			{/* top row: name + deprecated */}
			<div className="flex items-center gap-2 flex-wrap">
				<h3 className="text-sm font-semibold text-zinc-900 group-hover:text-orange-700 transition-colors">
					{project.name}
				</h3>
				{project.deprecated && (
					<span className="text-[9px] uppercase tracking-wider text-rose-500/80 border border-rose-200 bg-rose-50 rounded px-1.5 py-px">
						deprecated
					</span>
				)}
				<span className="ml-auto text-zinc-300 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all">
					↗
				</span>
			</div>

			{/* tech */}
			<div className="flex items-center gap-1.5 flex-wrap mt-2">
				{project.technologies.map((tech) => {
					const color = techColors[tech] ?? "#d4d4d8";
					return (
						<span
							key={tech}
							className="inline-flex items-center gap-1 h-[18px] font-mono text-[9px] leading-none text-zinc-500 bg-zinc-100 rounded px-1.5"
						>
							<span
								className="h-1.5 w-1.5 rounded-full shrink-0"
								style={{ backgroundColor: color }}
							/>
							<span className="relative top-[0.5px]">
								{tech}
							</span>
						</span>
					);
				})}
			</div>

			<p
				className={`text-[12px] text-zinc-600 mt-2.5 leading-snug ${project.deprecated ? "line-through decoration-zinc-300/70" : ""}`}
			>
				{project.description}
			</p>

			{project.note && (
				<p
					className={`${caveat.className} text-[15px] text-orange-500/80 leading-none mt-2 -rotate-1`}
				>
					↳ {project.note}
				</p>
			)}

			{/* links */}
			<div className="flex gap-2 flex-wrap mt-auto pt-3">
				{project.link && (
					<ProjectLink href={project.link} label="live" kind="live" />
				)}
				{project.github && (
					<ProjectLink
						href={project.github}
						label="github"
						kind="github"
					/>
				)}
				{project.papers?.map((paper) => (
					<ProjectLink
						key={paper.link}
						href={paper.link}
						label={paper.title}
						kind="paper"
					/>
				))}
			</div>
		</div>
	);
}

type LinkKind = "live" | "github" | "paper";

function ProjectLink({
	href,
	label,
	kind,
}: {
	href: string;
	label: string;
	kind: LinkKind;
}) {
	return (
		<a href={href} target="_blank" rel="noopener noreferrer">
			<span className="inline-flex items-center gap-1 text-[10px] text-zinc-600 border border-zinc-300 rounded-md pl-1.5 pr-2 py-0.5 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-700 transition-colors duration-200">
				<LinkIcon kind={kind} />
				{label}
			</span>
		</a>
	);
}

function LinkIcon({ kind }: { kind: LinkKind }) {
	if (kind === "github") {
		return (
			<svg
				viewBox="0 0 24 24"
				className="h-3 w-3 text-zinc-800"
				fill="currentColor"
				aria-hidden
			>
				<path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.16.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.36-1.34-1.72-1.34-1.72-1.09-.73.08-.72.08-.72 1.21.08 1.84 1.22 1.84 1.22 1.07 1.79 2.81 1.27 3.5.97.11-.76.42-1.27.76-1.56-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.13-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.21a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.13 3 .4 2.29-1.53 3.3-1.21 3.3-1.21.66 1.64.25 2.86.12 3.16.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .31.21.68.83.56A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5z" />
			</svg>
		);
	}
	if (kind === "live") {
		return (
			<svg
				viewBox="0 0 24 24"
				className="h-3 w-3 text-emerald-600"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				aria-hidden
			>
				<circle cx="12" cy="12" r="9" />
				<path d="M3 12h18" />
				<path d="M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18" />
			</svg>
		);
	}
	return (
		<svg
			viewBox="0 0 24 24"
			className="h-3 w-3 text-violet-500"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinejoin="round"
			aria-hidden
		>
			<path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8z" />
			<path d="M14 3v5h5" />
			<path d="M9.5 13h5M9.5 16.5h4" />
		</svg>
	);
}
