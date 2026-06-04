"use client";
import { manrope, caveat } from "@/lib/fonts";

type Anno = {
	text: string;
	top?: number; // px offset from the top of the section
	rotate?: number; // deg
	tone?: "orange" | "ink" | "violet";
};

const toneClass: Record<NonNullable<Anno["tone"]>, string> = {
	orange: "text-orange-500/85",
	ink: "text-zinc-500/85",
	violet: "text-violet-500/85",
};

export default function Landing() {
	const niceHeaders = [
		"https://i.pinimg.com/736x/98/7f/a5/987fa59827a8a8f8ea6a916abaf5a859.jpg", // texture design
	];

	return (
		<section
			className={`w-full h-full text-zinc-900 items-center flex ${manrope.className} text-[13px] lg:text-sm `}
		>
			<div className="w-full flex gap-8 flex-col items-left h-full md:py-2">
				<div className="w-full h-20 lg:h-28 bg-black rounded-md overflow-hidden">
					<img
						src={niceHeaders[0]}
						alt="Header Texture"
						className="w-full object-center h-full"
					/>
				</div>

				<Section
					right={[
						{
							text: "↳ the pivot scares me a little, but a boring life scares me a lot more.",
							top: 4,
							rotate: 3,
						},
					]}
				>
					i'm a software engineer based in Lagos. i currently
					do fullstack engineering for work, but most of my
					spare time right now goes into studying math and
					trying to do ai/ml research, hoping to fully pivot
					there eventually.
				</Section>

				<Section
					left={[
						{
							text: "convinced silence is overrated — i've got a soundtrack for basically everything.",
							top: 2,
							rotate: -3,
						},
					]}
					right={[
						{
							text: "i cook now. it's going terribly and i refuse to quit — ask me about the rice.",
							top: 34,
							rotate: 2,
							tone: "ink",
						},
					]}
				>
					outside of work i read a lot, cycle when i can, and
					spend time with people i like. i physically can't
					function without music and always have something
					playing. i write occasionally too, mostly notes and
					thoughts from things i’ve been reading or thinking
					about. there isn’t much up there right now but i plan
					to write a lot more soon,{" "}
					<SpanWord word="check it out here" link="/library" />.
					some of the things i've built (and am still building)
					are{" "}
					<SpanWord word="in my projects" link="/projects" />, and
					professional background is{" "}
					<SpanWord
						word="in my portfolio"
						link="https://flowcv.com/resume/qjwdae4u1j"
					/>
					.
				</Section>

				<Section
					left={[
						{
							text: "↳ slow on dms but i always circle back. not ignoring you, promise.",
							top: 4,
							rotate: -3,
							tone: "ink",
						},
					]}
				>
					if you read all this and for some reason still want to
					chat, you can find me on{" "}
					<SpanWord
						word="Twitter/X"
						link="https://twitter.com/oluwasijirama"
					/>{" "}
					or{" "}
					<SpanWord
						word="Github"
						link="https://github.com/sijirama"
					/>
					, or simply just email me at{" "}
					<SpanWord
						word="gbemilesanmi@gmail.com"
						link="mailto:gbemilesanmi@gmail.com"
					/>
					.
				</Section>

				<div className="flex gap-0.5 items-center max-w-full flex-wrap mt-1">
					<img width="88px" height="31px" src="/badges/debian.gif" alt="Debian" />
					<img width="88px" height="31px" src="/badges/vi.gif" alt="Vi" />
					<img width="88px" height="31px" src="/badges/anime.gif" alt="Anime" />
					<img width="88px" height="31px" src="/badges/animegirl.gif" alt="Anime Girl" />
					<img width="88px" height="31px" src="/badges/fingers.gif" alt="Fingers" />
					<img width="88px" height="31px" src="/badges/trustme.gif" alt="Trust Me" />
					<img width="88px" height="31px" src="/badges/firefox.gif" alt="Firefox" />
					<img width="88px" height="31px" src="/badges/linux.gif" alt="Linux" />
					<img width="88px" height="31px" src="/badges/linuxnow.gif" alt="Linux Now" />
					<img width="88px" height="31px" src="/badges/luffy.gif" alt="Luffy" />
					<img width="88px" height="31px" src="/badges/gecko.gif" alt="Gecko" />
					<img width="88px" height="31px" src="/badges/eyes.gif" alt="Eyes" />
					<img width="88px" height="31px" src="/badges/sijis.png" alt="Siji's Badge" />
				</div>
			</div>
		</section>
	);
}

function Section({
	left = [],
	right = [],
	children,
}: {
	left?: Anno[];
	right?: Anno[];
	children: React.ReactNode;
}) {
	return (
		<div className="relative">
			{left.map((a, i) => (
				<span
					key={`l-${i}`}
					className={`${caveat.className} hidden xl:block absolute right-full mr-4 w-40 text-right text-[16px] leading-snug ${toneClass[a.tone ?? "orange"]}`}
					style={{
						top: a.top ?? 0,
						transform: `rotate(${a.rotate ?? -2}deg)`,
					}}
				>
					{a.text}
				</span>
			))}

			<p>{children}</p>

			{right.map((a, i) => (
				<span
					key={`r-${i}`}
					className={`${caveat.className} hidden xl:block absolute left-full ml-4 w-40 text-[16px] leading-snug ${toneClass[a.tone ?? "orange"]}`}
					style={{
						top: a.top ?? 0,
						transform: `rotate(${a.rotate ?? 2}deg)`,
					}}
				>
					{a.text}
				</span>
			))}
		</div>
	);
}

interface Props {
	word: string;
	link?: string;
}
export function SpanWord({ word, link }: Props) {
	return (
		<a href={link ?? link} target="_blank">
			<span className="border border-zinc-500 rounded-md px-2 hover:bg-orange-400 hover:text-black transition-colors duration-200">
				{word}
			</span>
		</a>
	);
}
