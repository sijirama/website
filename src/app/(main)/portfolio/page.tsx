import lagos from "../../../../public/images/pfp.jpg";
import { expereince, education, skills, projects } from "@/lib/data";
import { SlGlobe } from "react-icons/sl";
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter, IoMailOutline } from "react-icons/io5";
import { HiOutlinePhone } from "react-icons/hi";

export default function Page() {

    const iconStyle = "text-base md:text-lg text-zinc-400"

    const socials = [
        {
            "icon": <IoMailOutline className={`${iconStyle}`} />,
            "url": "mailto:gbemilesanmi@gmail.com"
        },
        {
            "icon": <HiOutlinePhone className={`${iconStyle}`} />,
            "url": "tel:+2348131172165"
        },
        {
            "icon": <IoLogoGithub className={`${iconStyle}`} />,
            "url": "https://github.com/sijirama"
        },
        {
            "icon": <IoLogoLinkedin className={`${iconStyle}`} />,
            "url": "https://www.linkedin.com/in/oluwasijibomi-ilesanmi-8504b123a/"
        },
        {
            "icon": <IoLogoTwitter className={`${iconStyle}`} />,
            "url": "https://twitter.com/sijisaidwhat"
        }
    ]


    return (
        <main className="flex min-h-screen flex-col gap-4 items-center mx-auto pt-20 w-full md:3/5 lg:w-3/6  text-zinc-300 -tracking-widest p-2.5  md:p-5">
            <div className="flex w-full">
                <div className="w-3/5 flex flex-col gap-2">
                    <p className="font-extrabold -tracking-wide text-lg">
                        Ilesanmi Oluwasijibomi
                    </p>
                    <p className="text-xs md:text-sm tracking-wide">
                        Full Stack Engineer focused on building products with extra attention to detail
                    </p>
                    <p className="font-light text-xs tracking-wide flex gap-1 items-center justify-start">
                        <SlGlobe className="" />
                        Victoria Island, Lagos, NG.
                    </p>
                    <div className="w-full flex gap-2 flex-wrap py-1 md:py-3">
                        {socials.map((social, i) => (
                            <a key={i} href={`${social.url}`} target="_blank">
                                <div className=" p-2 md:p-3 rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-colors duration-300">
                                    {social.icon}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
                <div
                    style={{
                        backgroundImage: `url(${lagos.src})`,
                    }}
                    className="w-2/5 rounded-lg bg-cover bg-center bg-no-repeat h-36 p-2 bg-red-800"
                >
                </div>

            </div>
            <div className="text-start  w-full flex flex-col gap-2">
                <p className="font-extrabold -tracking-wide text-lg">About</p>
                <p className="text-xs md:text-sm tracking-wide text-zinc-400">As a dedicated Full Stack Engineer, my passion lies in building technology that positively impacts and aids people. I am consistently excited about the opportunity to create, innovate, and contribute to meaningful solutions. Whether it is bringing ideas to life or leading collaborative efforts, I thrive on the constant journey of building and making a difference.</p>
            </div>
            <img src="http://ghchart.rshah.org/sijirama" alt="sijirama's Github chart" />
            <div className="w-full">
                <p className="font-extrabold -tracking-wide text-lg">Work Experience</p>
                {expereince.map((exp , i) => (
                    <div className="my-3"  key={i}>
                        <div className="flex items-center justify-between">
                            <div className="flex-col-reverse justify-start flex items-start md:flex-row md:items-center gap-1 md:gap-3 my-2 md:my-1 ">
                                <p className="font-semibold text-sm md:text-base tracking-[0.010em] text-clip ">{exp.name}</p>
                                <div className="text-xs bg-zinc-200 text-black rounded-md py-0.5 px-1 md:px-3 font-semibold tracking-wide" >{exp.mode}</div>
                            </div>
                            <p className="text-xs md:text-sm tracking-wide">{exp.period}</p>
                        </div>
                        <p className="text-xs md:text-sm font-light tracking-wide text-zinc-400">
                            {exp.description}
                        </p>
                    </div>
                ))}
            </div>
            <div className="w-full">
                <p className="font-extrabold -tracking-wide text-lg">Education</p>
                {education.map((exp , i) => (
                    <div className="my-3" key={i}>
                        <div className="flex items-center justify-between">
                            <p className="font-semibold tracking-[0.010em] ">{exp.name}</p>
                            <p className="text-xs md:text-sm tracking-wide">{exp.period}</p>
                        </div>
                        <p className="text-xs md:text-sm font-light tracking-wide text-zinc-400">
                            {exp.description}
                        </p>
                    </div>
                ))}
            </div>
            <div className="w-full">
                <p className="font-extrabold -tracking-wide text-lg">Skills</p>
                <div className="flex items-center flex-wrap gap-3 my-2">
                    {skills.map((skill , i) => (
                        <div key={i} className="text-xs bg-zinc-200 text-black rounded-md py-0.5 px-3 font-semibold tracking-wide" >{skill}</div>
                    ))}
                </div>
            </div>
            <div className="w-full">
                <p className="font-extrabold -tracking-wide text-lg">Projects</p>
                <div className="items-center gap-3 my-2 grid grid-cols-2 md:grid-cols-3">
                    {projects.map((project, i) => (
                        <a href="" key={i}>
                            <div className="p-3 hover:bg-zinc-950 transition-colors duration-200 border border-zinc-800 rounded-xl h-72 md:h-56 flex flex-col justify-between">
                                <div>
                                    <p className="font-bold tracking-[0.010em]">{project.title}</p>
                                    <p className="text-xs tracking-wide text-zinc-400">{project.description}</p>
                                </div>
                                <div className="flex gap-2 flex-wrap py-1">
                                    {project.technologies.map((skill , i) => (
                                        <div key={i} className="text-xs bg-zinc-200 text-black rounded-md py-0.5 px-2 md:px-3 font-semibold tracking-wide" >{skill}</div>
                                    ))}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

        </main>
    )
}
