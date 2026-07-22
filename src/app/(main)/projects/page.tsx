"use client";

import {
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import gsap from "gsap";
import Header from "@/components/Header";
import { manrope, caveat } from "@/lib/fonts";
import {
	projects,
	type Project,
	type ProjectStatus,
	type MediaItem,
} from "@/lib/data";

// useLayoutEffect on the client, useEffect on the server (avoids SSR warning)
const useIsomorphicLayoutEffect =
	typeof window !== "undefined" ? useLayoutEffect : useEffect;

const statusMeta: Record<
	ProjectStatus,
	{ label: string; pill: string; dot: string }
> = {
	ongoing: {
		label: "ongoing",
		pill: "bg-orange-50 text-orange-600 border-orange-200",
		dot: "bg-orange-400",
	},
	research: {
		label: "research",
		pill: "bg-violet-50 text-violet-600 border-violet-200",
		dot: "bg-violet-400",
	},
	completed: {
		label: "completed",
		pill: "bg-emerald-50 text-emerald-600 border-emerald-200",
		dot: "bg-emerald-400",
	},
};

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
	HTML: "#e34c26",
	PyTorch: "#ee4c2c",
	Gemini: "#8e75ff",
	Research: "#a78bfa",
};

// pin these to the front, keep everything else in its current order
const PINNED = [
	"Pico",
	"Danfo",
	"Lumen",
	"Scholic",
	"Beacon",
	"bbn-sim",
	"naira-bert",
	"Soro",
	"mnesh",
];

// bottom-right peel: shallow along the bottom, sweeping up steeply at the right edge
const PEEL_W = 150;
const PEEL_H = 80;
const PEEL_CURVE = `M40 ${PEEL_H} C 108 ${PEEL_H}, ${PEEL_W} 52, ${PEEL_W} 4`;
const PEEL_PATH = `path('${PEEL_CURVE} L ${PEEL_W} ${PEEL_H} Z')`;

type Slide = {
	projectName: string;
	item: MediaItem;
	isFirstOfProject: boolean;
};

export default function ProjectsPage() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const ordered = useMemo<Project[]>(() => {
		const pinned = PINNED.map((n) =>
			projects.find((p) => p.name === n),
		).filter((p): p is Project => Boolean(p));
		const rest = projects.filter((p) => !PINNED.includes(p.name));
		return [...pinned, ...rest];
	}, []);

	// flatten every project's media into one continuous reel
	const { slides, firstSlideOf } = useMemo(() => {
		const slides: Slide[] = [];
		const firstSlideOf: Record<string, number> = {};
		for (const p of ordered) {
			if (!p.media?.length) continue;
			firstSlideOf[p.name] = slides.length;
			p.media.forEach((item, i) =>
				slides.push({
					projectName: p.name,
					item,
					isFirstOfProject: i === 0,
				}),
			);
		}
		return { slides, firstSlideOf };
	}, [ordered]);

	useIsomorphicLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
			if (!cards.length) return;
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
					trying to understand something by building it. the ones
					with a peeled corner have media — tap it.
				</p>

				<div className="grid grid-cols-1 gap-3 mt-10 pb-24 md:grid-cols-2">
					{ordered.map((project) => (
						<ProjectCard
							key={project.name}
							project={project}
							onOpenMedia={() =>
								setOpenIndex(firstSlideOf[project.name] ?? 0)
							}
						/>
					))}
				</div>
			</div>

			{openIndex !== null && slides.length > 0 && (
				<MediaViewer
					slides={slides}
					index={openIndex}
					setIndex={setOpenIndex}
					onClose={() => setOpenIndex(null)}
				/>
			)}
		</main>
	);
}

function ProjectCard({
	project,
	onOpenMedia,
}: {
	project: Project;
	onOpenMedia: () => void;
}) {
	const status = statusMeta[project.status];
	const hasMedia = Boolean(project.media?.length);
	const gutter = hasMedia ? "pr-[96px]" : "";

	return (
		<div
			data-card
			className="group relative flex min-h-[150px] flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white/60 p-4 transition-all duration-200 hover:border-orange-300 hover:bg-white hover:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.12)]"
		>
			<div className={gutter}>
				{/* top row: name + status + deprecated */}
				<div className="flex items-center gap-2 flex-wrap">
					<h3 className="text-sm font-semibold text-zinc-900 group-hover:text-orange-700 transition-colors">
						{project.name}
					</h3>
					<span
						className={`inline-flex items-center gap-1 text-[9px] font-medium border rounded px-1.5 py-px ${status.pill}`}
					>
						<span
							className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
						/>
						{status.label}
					</span>
					{project.deprecated && (
						<span className="text-[9px] uppercase tracking-wider text-rose-500/80 border border-rose-200 bg-rose-50 rounded px-1.5 py-px">
							deprecated
						</span>
					)}
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
			</div>

			{/* links */}
			<div
				className={`flex gap-2 flex-wrap items-center mt-auto pt-3 ${gutter}`}
			>
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
				{project.huggingface && (
					<ProjectLink
						href={project.huggingface}
						label="hugging face"
						kind="huggingface"
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

			{/* bottom-right media peek — the card looks lifted off a larger image behind it */}
			{hasMedia && (
				<>
					<span
						onClick={onOpenMedia}
						className={`${caveat.className} absolute z-30 cursor-pointer select-none text-[15px] leading-none text-orange-500/90 -rotate-6`}
						style={{ bottom: PEEL_H - 45, right: 15 }}
					>
						click me ↘
					</span>
					<button
						type="button"
						onClick={onOpenMedia}
						aria-label={`view ${project.name} media`}
						className="group/peek absolute bottom-0 right-0 z-20 overflow-hidden"
						style={{
							width: PEEL_W,
							height: PEEL_H,
							clipPath: PEEL_PATH,
						}}
					>
						{project.media![0].type === "video" ? (
							<video
								src={project.media![0].url}
								muted
								playsInline
								preload="metadata"
								className="absolute bottom-0 right-0 h-[190px] w-[330px] max-w-none object-cover transition-transform duration-300 group-hover/peek:scale-[1.04]"
							/>
						) : (
							<img
								src={project.media![0].url}
								alt={project.media![0].alt ?? ""}
								className="absolute bottom-0 right-0 h-[190px] w-[330px] max-w-none object-cover transition-transform duration-300 group-hover/peek:scale-[1.04]"
							/>
						)}
					</button>
					{/* thin line tracing the peel curve (no shadow) */}
					<svg
						width={PEEL_W}
						height={PEEL_H}
						viewBox={`0 0 ${PEEL_W} ${PEEL_H}`}
						className="pointer-events-none absolute bottom-0 right-0 z-20"
					>
						<path
							d={PEEL_CURVE}
							fill="none"
							stroke="rgba(0,0,0,0.22)"
							strokeWidth={1}
						/>
					</svg>
				</>
			)}
		</div>
	);
}

function MediaViewer({
	slides,
	index,
	setIndex,
	onClose,
}: {
	slides: Slide[];
	index: number;
	setIndex: (i: number) => void;
	onClose: () => void;
}) {
	const touchX = useRef<number | null>(null);
	const current = slides[index];

	// the current project's contiguous range in the flat slides array
	let start = index;
	while (start > 0 && slides[start - 1].projectName === current.projectName)
		start--;
	let end = index;
	while (
		end < slides.length - 1 &&
		slides[end + 1].projectName === current.projectName
	)
		end++;
	const count = end - start + 1;

	// swiping stays inside the current project (wraps its own media);
	// crossing to another project only happens via the "next project" button
	const go = (dir: 1 | -1) =>
		setIndex(start + ((index - start + dir + count) % count));

	const nextProject = () => {
		for (let step = 1; step <= slides.length; step++) {
			const i = (index + step) % slides.length;
			if (slides[i].isFirstOfProject) {
				setIndex(i);
				return;
			}
		}
	};

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			else if (e.key === "ArrowRight") go(1);
			else if (e.key === "ArrowLeft") go(-1);
		};
		document.addEventListener("keydown", onKey);
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = prevOverflow;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [index, slides.length]);

	const posInProject = index - start + 1;

	return (
		<div
			className={`${manrope.className} fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm`}
			onClick={onClose}
			onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
			onTouchEnd={(e) => {
				if (touchX.current === null) return;
				const dx = e.changedTouches[0].clientX - touchX.current;
				if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
				touchX.current = null;
			}}
		>
			{/* top bar */}
			<div
				className="flex items-center justify-between px-5 py-4 text-white/80"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-baseline gap-3">
					<span className="text-sm font-semibold text-white">
						{current.projectName}
					</span>
					<span className="text-xs text-white/50 tabular-nums">
						{posInProject} / {count}
					</span>
				</div>
				<button
					type="button"
					onClick={onClose}
					aria-label="close"
					className="text-white/70 hover:text-white text-xl leading-none px-2"
				>
					✕
				</button>
			</div>

			{/* stage */}
			<div
				className="relative flex-1 flex items-center justify-center px-4 pb-2 min-h-0"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					type="button"
					onClick={() => go(-1)}
					aria-label="previous"
					className="absolute left-2 md:left-6 z-10 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-lg grid place-items-center transition-colors"
				>
					‹
				</button>

				{current.item.type === "video" ? (
					<video
						key={current.item.url}
						src={current.item.url}
						controls
						autoPlay
						muted
						playsInline
						className="max-h-full max-w-full rounded-lg shadow-2xl"
					/>
				) : (
					<img
						key={current.item.url}
						src={current.item.url}
						alt={current.item.alt ?? ""}
						className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
					/>
				)}

				<button
					type="button"
					onClick={() => go(1)}
					aria-label="next"
					className="absolute right-2 md:right-6 z-10 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-lg grid place-items-center transition-colors"
				>
					›
				</button>
			</div>

			{/* bottom bar */}
			<div
				className="flex items-center justify-center gap-4 px-5 py-4"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-center gap-1.5">
					{Array.from({ length: count }).map((_, i) => {
						const idx = start + i;
						return (
							<button
								key={idx}
								type="button"
								onClick={() => setIndex(idx)}
								aria-label={`go to ${current.projectName} media ${i + 1}`}
								className={`h-1.5 rounded-full transition-all ${
									idx === index
										? "w-5 bg-white"
										: "w-1.5 bg-white/30 hover:bg-white/50"
								}`}
							/>
						);
					})}
				</div>
				<button
					type="button"
					onClick={nextProject}
					className="text-xs text-white/80 hover:text-white border border-white/30 hover:border-white/60 rounded-md px-3 py-1 transition-colors"
				>
					next project →
				</button>
			</div>
		</div>
	);
}

type LinkKind = "live" | "github" | "paper" | "huggingface";

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
	if (kind === "huggingface") {
		return (
			<span className="text-[12px] leading-none" aria-hidden>
				🤗
			</span>
		);
	}
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
