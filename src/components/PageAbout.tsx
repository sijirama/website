"use client";
import { manrope } from "@/lib/fonts";

export default function Landing() {
	const niceHeaders = [
		"https://i.pinimg.com/736x/98/7f/a5/987fa59827a8a8f8ea6a916abaf5a859.jpg", // texture design
	];

	return (
		<section
			className={`w-full h-full  text-zinc-950 dark:text-zinc-100 items-center flex ${manrope.className} text-sm lg:text-base `}
		>
			<div className="w-full lg:w-[95%] flex gap-3 md:gap-1.5 flex-col items-left h-full md:py-2 ">
				<div className="w-full h-20 lg:h-28 bg-black rounded-md overflow-hidden mb-1 lg:mb-4">
					<img src={niceHeaders[0]} className="w-full object-center h-full" />
				</div>
				<p className="font-bold text-lg tracking-tight underline">
					Hey I'm siji
				</p>
				<p id="target">
					i'm a software developer based and building in Lagos, Nigeria.
				</p>

				<p>
					occasionally(ish) I write. You can check out{" "}
					<SpanWord word="what I've written here" link="/library" />. If you
					want more info on my professional background, the details can be found{" "}
					<SpanWord word="in my portfolio page" link="/portfolio" />.
				</p>
				<div>
					<p className="font-bold">what keeps me up at night</p>
					<ul className="pl-4 list-disc space-y-2">
						<li>computers... i just wanna know everything about them</li>
						<li>
							engineering endeavors that have the potential to positively
							transform lives -{" "}
							<span className="font-bold">
								man’s fate is the heart of tech, right?
							</span>
						</li>
						<li>
							Exploring the science-faith intersection (Christian upbringing
							meets scientific mind)
						</li>
						<li>
							{"music and people that share music: it's a love language, "}
							<SpanWord
								word="here are some playlists i've worked on"
								link="https://open.spotify.com/user/31okn5a72nq67rs2sndgdoudfm3y"
							/>
						</li>
					</ul>
				</div>
				<p>
					shoot me a dm on{" "}
					<SpanWord word="Twitter/X" link="https://twitter.com/sijiramakun" />{" "}
					or{" "}
					<SpanWord
						word="Discord"
						link="https://discord.com/channels/@me/529714655333974025"
					/>{" "}
					or even <SpanWord word="Github" link="https://github.com/sijirama" />,
					if you want to chat, vibe, or build something cool together.
				</p>
				<div className="flex gap-0.5 items-center max-w-full flex-wrap">
					<img width="88px" height="31px" src="/badges/debian.gif" />
					<img width="88px" height="31px" src="/badges/vi.gif" />
					<img width="88px" height="31px" src="/badges/anime.gif" />
					<img width="88px" height="31px" src="/badges/animegirl.gif" />
					<img width="88px" height="31px" src="/badges/fingers.gif" />
					<img width="88px" height="31px" src="/badges/trustme.gif" />
					<img width="88px" height="31px" src="/badges/firefox.gif" />
					<img width="88px" height="31px" src="/badges/linux.gif" />
					<img width="88px" height="31px" src="/badges/linuxnow.gif" />
					<img width="88px" height="31px" src="/badges/luffy.gif" />
					<img width="88px" height="31px" src="/badges/gecko.gif" />
					<img width="88px" height="31px" src="/badges/eyes.gif" />
					<img width="88px" height="31px" src="/badges/sijis.png" />
				</div>
			</div>
		</section>
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
