"use client";
import { manrope } from "@/lib/fonts";

export default function Landing() {
	const niceHeaders = [
		"https://i.pinimg.com/736x/98/7f/a5/987fa59827a8a8f8ea6a916abaf5a859.jpg", // texture design
	];

	return (
		<section
			className={`w-full h-full text-zinc-900 items-center flex ${manrope.className} text-sm lg:text-base `}
		>
			<div className="w-full lg:w-[95%] flex gap-5 flex-col items-left h-full md:py-2 ">
				<div className="w-full h-20 lg:h-28 bg-black rounded-md overflow-hidden mb-1 lg:mb-4">
					<img
						src={niceHeaders[0]}
						alt="Header Texture"
						className="w-full object-center h-full"
					/>
				</div>
				<p id="target">
					i'm siji. software engineer based in
					Lagos. i currently do fullstack
					engineering for work, but what i’m
					really working toward is becoming a
					generalist, someone comfortable moving
					across systems, math, and ideas. so most
					of my spare time right now goes into
					studying math and trying to do ai/ml
					research, hoping to fully pivot there
					eventually.
				</p>

				<p>
					outside of work i read a lot, cycle when
					i can, and spend time with people i
					like. i physically can't function
					without music playing and always have
					something playing, i appreciate art when
					i understand it (and sometimes when i
					don’t), recently i’ve been getting into
					cooking, though time hasn’t made that
					easy.
				</p>

				<p>
					i write occasionally too, mostly notes
					and thoughts from things i’ve been
					reading or thinking about. there isn’t
					much up there right now but i plan to
					write a lot more soon,{" "}
					<SpanWord
						word="check it out here"
						link="/library"
					/>
					. professional background is{" "}
					<SpanWord
						word="in my portfolio"
						link="https://flowcv.com/resume/qjwdae4u1j"
					/>
					.
				</p>

				<p>
					if you read all this and for some reason
					still want to chat, you can find me on{" "}
					<SpanWord
						word="Twitter/X"
						link="https://twitter.com/sijiramakun"
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
				</p>
				<div className="flex gap-0.5 items-center max-w-full flex-wrap mt-4">
					<img
						width="88px"
						height="31px"
						src="/badges/debian.gif"
						alt="Debian"
					/>
					<img
						width="88px"
						height="31px"
						src="/badges/vi.gif"
						alt="Vi"
					/>
					<img
						width="88px"
						height="31px"
						src="/badges/anime.gif"
						alt="Anime"
					/>
					<img
						width="88px"
						height="31px"
						src="/badges/animegirl.gif"
						alt="Anime Girl"
					/>
					<img
						width="88px"
						height="31px"
						src="/badges/fingers.gif"
						alt="Fingers"
					/>
					<img
						width="88px"
						height="31px"
						src="/badges/trustme.gif"
						alt="Trust Me"
					/>
					<img
						width="88px"
						height="31px"
						src="/badges/firefox.gif"
						alt="Firefox"
					/>
					<img
						width="88px"
						height="31px"
						src="/badges/linux.gif"
						alt="Linux"
					/>
					<img
						width="88px"
						height="31px"
						src="/badges/linuxnow.gif"
						alt="Linux Now"
					/>
					<img
						width="88px"
						height="31px"
						src="/badges/luffy.gif"
						alt="Luffy"
					/>
					<img
						width="88px"
						height="31px"
						src="/badges/gecko.gif"
						alt="Gecko"
					/>
					<img
						width="88px"
						height="31px"
						src="/badges/eyes.gif"
						alt="Eyes"
					/>
					<img
						width="88px"
						height="31px"
						src="/badges/sijis.png"
						alt="Siji's Badge"
					/>
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
