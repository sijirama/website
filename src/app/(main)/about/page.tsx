"use client";
import CustomCode from "@/components/CustomCodeBlock";
import { bai, manrope, rubik } from "@/lib/fonts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";

export default function About() {
  const title = useRef(null);
  const soc1 = useRef(null);
  const soc2 = useRef(null);
  const soc3 = useRef(null);

  const useNameInsteadOfIcon = true; // i want name instead of icons
  const socials = [
    {
      icon: <FaXTwitter />,
      link: "https://twitter.com/sijisaidwhat",
      ref: soc1,
      name: "Twitter/X",
    },
    {
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/in/oluwasijibomi-ilesanmi-8504b123a/",
      ref: soc2,
      name: "LinkedIn",
    },
    {
      icon: <FaGithub />,
      link: "https://github.com/sijirama",
      ref: soc3,
      name: "GitHub",
    },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline({});
      tl.from(title.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.inOut",
        delay: 0.5,
      });

      tl.from(
        [soc1.current, soc2.current, soc3.current],
        {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.inOut",
          stagger: {
            amount: 0.2,
          },
        },
        ">+0.1"
      );
    },
    { scope: title }
  );
  return (
    <main
      className={`min-h-screen items-center pt-12 md:pt-10 lg:pt-14 -tracking-wide bg-white ${manrope.className} flex flex-col justify-center text-black`}
    >
      {/* info side */}
      <div className="h-full w-full md:w-2/3 lg:w-3/5 row-span-4 flex flex-col items-center justify-center px-5 gap-2 py-7 -tracking-wide ">
        {/* title side */}
        <div
          className={`w-full flex flex-col items-center justify-center gap-2 `}
        >
          <p
            ref={title}
            className={`text-[2rem]/none md:text-[2rem]/none lg:text-[3rem]/none font-semibold ${rubik.className} -tracking-widest  w-full`}
          >
            me.
          </p>

          {/* icons */}
          <div className="flex gap-3 items-center justify-start w-full overflow-hidden">
            {socials.map((social, index) => (
              <a
                key={index}
                href={`${social.link}`}
                ref={social.ref}
                target="_blank"
              >
                {useNameInsteadOfIcon ? null : (
                  <div className="p-1 md:p-2 hover:text-gray-800  cursor-pointer border border-zinc-950 rounded-[0.58rem] flex items-center justify-center text-black transition-colors duration-200 text-sm md:text-xl">
                    {social.icon}
                  </div>
                )}
              </a>
            ))}
          </div>
          {/* end icons */}
        </div>

        <div className="mx-auto flex gap-1 flex-col">
          <p>
            my name is siji and i am currently studying
            software engineering as a final year student at Babcock University.
            I have a deep passion for crafting applications that not only solve
            problems but also contribute positively to the well-being of
            humanity.
          </p>
          <p></p>
          <p>
            When I am not glued to my computer or immersed in a good book, you
            will likely find me passionately defending Kanye West – he is
            practically a life priority at this point. Right after the debate, I
            dive into his music. Beyond hip hop, I groove to R&B and
            occasionally dip into the world of Afro beats. Ted Dekker is my
            go-to author, and I have devoured nearly all of R.L. Stines
            Goosebumps books (well, maybe not all, but a lot). In an alternate
            universe, I might have pursued physics in university, but no regrets
            – the people I have met along the way have been awesome
          </p>
        </div>
        <div className="w-full">
          <p>i am currently...</p>
          <ul className="pl-4 list-disc">
            <li>
              studying software engineering at Babcock University (i graduate
              june 2024!)
            </li>
            <li>
              making preparations to begin reading the Bhagavad Gita, a Hindu
              holy book.
            </li>
            <li>building projects to begin my Job hunt next year</li>
            <li>preparing my final year project for university.</li>
          </ul>
        </div>
        <div className="w-full">
          <p>i am really excited about...</p>
          <ul className="pl-4 list-disc">
            <li>
              the interesting discourse at intersection of science and religion,
              exploring nuanced discussions on origins, evolution, and ultimate
              outcomes.
            </li>
            <li>engineering that can transform lives.</li>
            <li>
              music and people that share music, sharing music is a love
              language.
            </li>
            <li>the future and what it holds for us.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
