export const expereince = [
  {
    role: "Fullstack Software developer",
    name: "Nject",
    period: "September 2024 - Present",
    mode: "Remote",
    description:
      "Developed engaging and accessible frontend features using Next.js, enhancing user experience and platform usability. Played a key role in migrating the backend from Python to Golang, leading to a 5x increase in speed and performance. Optimized system scalability and response times, ensuring high reliability and seamless support for a growing user base.",
  },
  {
    role: "Backend Web Developer",
    name: "Tradit Markets",
    period: "Aug 2023 - October 2023",
    mode: "Remote",
    description:
      "Completely implemented a backend server using NestJS for a service advertisement application. Designed and optimized functionalities to enhance the user experience and facilitate efficient service promotion. Leveraged NestJS robust capabilities to create a seamless and responsive backend infrastructure for the application.",
  },
  {
    role: "Full Stack Web Developer Intern",
    name: "ChamsAccess Nigeria",
    period: "Jan 2023 - July 2023",
    mode: "Hybrid",
    description:
      "Revamped the Chamsaccess BOS web platform to optimize user experience and streamline complaint management processes. Developed the frontend using a modern and efficient technology stack, including Typescript, React, and C# (.Net), leading to improved performance. Collaborated with a team of developers to iteratively enhance project functionalities, contributing to a significant boost in customer experience scores.",
  },
  {
    role: "Full Stack Web Developer Intern",
    name: "Sunu Assurances Nigeria",
    period: "May 2022 - August 2022",
    mode: "Onsite",
    description:
      "Developed a Django Web app exclusively for company use, streamlining the online handling of technical complaints and resources. Collaborated with developers to conduct user research and iterated on design for optimal functionality, resulting in a substantial increase in user satisfaction. Implemented the web application, achieving a more efficient working environment for staff.",
  },
];

export const education = [
  {
    name: "Babcock Unversity",
    description: "Bachelor's Degree in Software Engineering",
    period: "Sept 2020 - June 2024!!!",
  },
];

export const skills = [
  "TypeScript/JavaScript",
  "Golang",
  "Zig",
  "C/C++",
  "NextJS/React",
  "Node.Js",
  "TailwindCSS",
  "Docker",
  "PostgreSQL",
  "MongoDB",
  "MySQL/MariaDB",
  "Redis",
  "Git/Github",
  "Neovim/Vim",
  "Linux (ARCH BTW)",
  "Kafka",
  "Sysadmin, i can and do self host and manage my servers",
  "Devops",
];

export type ProjectStatus = "ongoing" | "research" | "completed";

export interface MediaItem {
  type: "image" | "video";
  // cloudflare r2 url
  url: string;
  alt?: string;
}

export interface Project {
  name: string;
  description: string;
  status: ProjectStatus;
  technologies: string[];
  // no longer maintained
  deprecated?: boolean;
  // a short handwritten aside (rendered in the caveat font)
  note?: string;
  // live site / demo
  link?: string;
  // source code
  github?: string;
  // articles / writeups i wrote about this project
  papers?: { title: string; link: string }[];
  // screenshots / clips on cloudflare r2; the first one is the card peek
  media?: MediaItem[];
}

export const projects: Project[] = [
  // ───────────── ongoing ─────────────
  {
    name: "Soro",
    description:
      "an interpreter for a language whose keywords are broken english (pidgin). bytecode compiler + stack vm, started in zig, now rewriting in c.",
    status: "ongoing",
    technologies: ["C"],
    github: "https://github.com/sijirama/soro",
    note: "my forever side project",
  },
  {
    name: "Pico",
    description:
      "a tiny ml framework from scratch in c++: tensors, reverse-mode autograd and backprop, built to understand them instead of trusting pytorch.",
    status: "ongoing",
    technologies: ["C++"],
    github: "https://github.com/sijirama/pico",
  },
  {
    name: "Danfo",
    description:
      "transit infrastructure over lagos' informal danfo network with no gps on the buses. the bet: instrument the riders, not the vehicles, and infer routes and stops from their telemetry.",
    status: "ongoing",
    technologies: ["Golang", "TypeScript"],
    link: "https://danfo.ng",
  },

  // ───────────── research ─────────────
  {
    name: "mnesh",
    description:
      "a local shell next-command predictor. trains on session telemetry (cmd, cwd, git state, exit codes) to rank likely next commands. began as an rnn, now a local qwen on llama-server.",
    status: "research",
    technologies: ["Python", "PyTorch"],
    github: "https://github.com/sijirama/mnesh",
    papers: [
      {
        title: "RNN train run for Mnesh",
        link: "/library/Research/RNN%20train%20run%20for%20Mnesh.md",
      },
    ],
    note: "completely flopped",
  },
  {
    name: "bbn-sim",
    description:
      "big brother simulacra: a house of llm agents that talk, scheme and form alliances on their own. exploring memory, reflection and emergent group dynamics in a reality-tv frame.",
    status: "research",
    technologies: ["Golang"],
    github: "https://github.com/sijirama/bbn-sim",
  },

  // ───────────── completed ─────────────
  {
    name: "Scholic",
    description:
      "a social annotation platform: chrome extension + web app for highlighting and threading discussions over any page. margins and book clubs for the whole web.",
    status: "completed",
    technologies: ["Golang", "TypeScript"],
    github: "https://github.com/sijirama/scholic",
    link: "https://scholic.com",
    note: "for all the research papers i read",
    media: [
      {
        type: "image",
        url: "https://media.sijibomi.com/blob/website/projects/Screenshot%20from%202026-06-04%2002-53-28.png",
        alt: "scholic annotations in the margin",
      },
      {
        type: "image",
        url: "https://media.sijibomi.com/blob/website/projects/Screenshot%20from%202026-06-04%2002-56-26.png",
        alt: "scholic threaded discussion",
      },
      {
        type: "image",
        url: "https://media.sijibomi.com/blob/website/projects/Screenshot%20from%202026-06-04%2002-58-02.png",
        alt: "scholic annotation page",
      },
    ],
  },
  {
    name: "Beacon",
    description:
      "a self-hosted event relay that fans events out to any notification channel you want, no third-party saas in the loop.",
    status: "completed",
    technologies: ["Golang", "HTML"],
    github: "https://github.com/sijirama/beacon",
    media: [
      {
        type: "image",
        url: "https://media.sijibomi.com/blob/website/projects/Screenshot%20from%202026-06-04%2003-22-45.png",
        alt: "beacon relay dashboard",
      },
      {
        type: "image",
        url: "https://media.sijibomi.com/blob/website/projects/Screenshot%20from%202026-06-04%2003-22-52.png",
        alt: "beacon relay dashboard",
      },
    ],
  },
  {
    name: "Lumen",
    description:
      "a screen-aware ai agent for linux. desktop chat with tool access to your obsidian vault, gmail, calendar and screen, and it acts on them. built on gemini, one-line install.",
    status: "completed",
    technologies: ["Rust", "React", "Gemini"],
    github: "https://github.com/sijirama/lumen",
    note: "i daily drive this",
    // MOCK media — swap these urls for your cloudflare r2 links
    media: [
      {
        type: "image",
        url: "https://media.sijibomi.com/blob/website/projects/Screenshot%20from%202026-06-04%2003-00-53.png",
        alt: "lumen chat overlay",
      },
      {
        type: "image",
        url: "https://media.sijibomi.com/blob/website/projects/Screenshot%20from%202026-06-04%2003-01-55.png",
        alt: "lumen chhat overlay and dashboard showing memory system",
      },
      {
        type: "video",
        url: "https://media.sijibomi.com/blob/website/projects/Screencast%20from%2004-06-26%2003_03_17%20%28online-video-cutter.com%29.mp4",
        alt: "lumen chat in action",
      },
      {
        type: "video",
        url: "https://media.sijibomi.com/blob/website/projects/simplescreenrecorder2-2026-06-04_03.15.03.mkv",
        alt: "lumen chat in action again",
      },
    ],
  },
  {
    name: "Voxel",
    description:
      "a lightweight clipboard manager for linux. a go clipboard watcher that persists history to sqlite, with a react ui to search back through it.",
    status: "completed",
    technologies: ["Golang", "React"],
    github: "https://github.com/sijirama/voxel",
  },
  {
    name: "naira-bert",
    description:
      "a bert-style encoder pretrained on ~200k nairaland posts i scraped. a small mlm that actually models how nigerians write online.",
    status: "completed",
    technologies: ["Python", "PyTorch"],
    github: "https://github.com/sijirama/nairaland_scraper",
    note: "scraped 200k posts for this",
  },
  {
    name: "jason",
    description:
      "a json parser in zig with jsonpath-style queries and zero deps beyond the stdlib. my first zig project, built to learn the language.",
    status: "completed",
    technologies: ["Zig"],
    github: "https://github.com/sijirama/jason",
    note: "my first ever zig",
  },
  {
    name: "sweep.nvim",
    description:
      "fully local ai code completion for neovim on sweep next-edit. groups edits into hunks with inline virtual-text previews and jump-to-change.",
    status: "completed",
    technologies: ["Lua", "Python"],
    github: "https://github.com/sijirama/sweep.nvim",
    note: "the 6★ one ✶",
  },

  // shape reference for fields i'll fill in later:
  // papers: [{ title: "why i built X", link: "https://..." }],
  // media: [{ type: "image", url: "https://<r2>/x.png", alt: "X screenshot" }],
];
