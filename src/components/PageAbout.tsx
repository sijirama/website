import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Folder,
  Github,
  Twitter,
} from "lucide-react";
import { manrope } from "@/lib/fonts";
import {
  GITHUB_CONTRIBUTIONS_URL,
  GITHUB_USERNAME,
  TOP_MEDIA_URL,
} from "@/lib/site";

const links = [
  { label: "projects", href: "/projects", icon: Folder },
  { label: "library", href: "/library", icon: BookOpen },
  {
    label: "portfolio",
    href: "https://flowcv.com/resume/qjwdae4u1j",
    icon: BriefcaseBusiness,
    external: true,
  },
];

const socials = [
  { label: "github", href: "https://github.com/sijirama", icon: Github },
  {
    label: "twitter",
    href: "https://twitter.com/oluwasijirama",
    icon: Twitter,
  },
];

const featuredProjects = [
  {
    name: "ferno",
    href: "https://useferno.com",
    description: "agentic product analytics for finding problems and patterns.",
  },
  {
    name: "pico",
    href: "https://github.com/sijirama/pico",
    description:
      "a tiny ml framework in c, built from scratch to learn autograd.",
  },
  {
    name: "sonar",
    href: "https://sonar.ng",
    description: "real-time community safety alerts and emergency reporting.",
  },
  {
    name: "scholic",
    href: "https://scholic.com",
    description: "social annotation for highlights and threaded discussions.",
  },
  {
    name: "muna",
    href: "https://onmuna.com",
    description: "a private-beta general agent assistant for friends.",
  },
];

const projectMarks: Record<string, { background: string; color: string }> = {
  muna: { background: "#ffe3ed", color: "#b33d6c" },
  pico: { background: "#dff4ff", color: "#16749b" },
  scholic: { background: "#e1efff", color: "#2667a8" },
  sonar: { background: "#dff7ef", color: "#14795b" },
  ferno: { background: "#ffe4d7", color: "#a74922" },
};

type Contribution = { date: string; count: number; level: number };

function GitHubGraph() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(GITHUB_CONTRIBUTIONS_URL)
      .then((response) => response.json())
      .then((data) => {
        setContributions(data.contributions ?? []);
        setTotal(data.total?.["2026"] ?? 0);
      })
      .catch(() => {
        setContributions([]);
      });
  }, []);

  const visibleContributions = contributions.filter(
    (contribution) =>
      contribution.date <= new Date().toISOString().slice(0, 10),
  );
  const weeks = [];
  for (let index = 0; index < visibleContributions.length; index += 7) {
    weeks.push(visibleContributions.slice(index, index + 7));
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
      <div className="mb-4 flex items-center justify-between text-xs text-zinc-500">
        <span className="inline-flex items-center gap-1.5 font-medium text-zinc-700">
          <Github className="h-3.5 w-3.5" /> contributions
        </span>
        <span>{total.toLocaleString()} contributions in 2026</span>
      </div>
      {weeks.length > 0 ? (
        <div
          className="grid grid-flow-col grid-rows-7 gap-1 pb-1"
          style={{
            gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
          }}
        >
          {weeks.flatMap((week) =>
            Array.from({ length: 7 }, (_, day) => {
              const contribution = week[day];
              return (
                <span
                  key={contribution?.date ?? `${week[0]?.date}-${day}`}
                  title={
                    contribution
                      ? `${contribution.count} contributions on ${contribution.date}`
                      : undefined
                  }
                  className={`aspect-square w-full rounded-[3px] ${
                    contribution?.level === 4
                      ? "bg-emerald-700"
                      : contribution?.level === 3
                        ? "bg-emerald-500"
                        : contribution?.level === 2
                          ? "bg-emerald-300"
                          : contribution?.level === 1
                            ? "bg-emerald-100"
                            : "bg-zinc-200"
                  }`}
                />
              );
            }),
          )}
        </div>
      ) : (
        <div className="h-[82px] animate-pulse rounded-lg bg-zinc-200/70" />
      )}
      <div className="mt-3 flex justify-between text-[10px] text-zinc-400">
        <span>Jan</span>
        <span>
          {new Intl.DateTimeFormat(undefined, { month: "short" }).format(
            new Date(),
          )}
        </span>
      </div>
    </div>
  );
}

function currentTime() {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date());
}

export default function Landing() {
  const [time, setTime] = useState(currentTime);

  useEffect(() => {
    const interval = window.setInterval(() => setTime(currentTime()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      className={`w-full text-zinc-900 ${manrope.className} text-sm leading-relaxed`}
    >
      <div className="w-full space-y-6">
        <div className="space-y-3">
          <nav
            className="flex items-center justify-end gap-1.5"
            aria-label="Primary navigation"
          >
            {links.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="group inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-950"
              >
                <Icon
                  className="h-3.5 w-3.5 text-zinc-400 transition-colors group-hover:text-zinc-700"
                  aria-hidden="true"
                />
                {label}
              </a>
            ))}
          </nav>
          <div className="h-44 w-full md:h-52">
            <img
              src={TOP_MEDIA_URL}
              alt="animated pond scene"
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="/images/landing.jpeg"
            alt="Oluwasijibomi"
            className="h-14 w-14 rounded-xl border border-zinc-200 object-cover"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-semibold leading-tight text-zinc-950">
                Oluwasijibomi
              </h1>
              <BadgeCheck
                className="h-4 w-4 fill-sky-500 text-white"
                aria-label="verified"
              />
            </div>
            <p className="text-sm text-zinc-500">fullstack software engineer</p>
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs text-zinc-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.12)]" />
            <span className="font-medium text-zinc-800">Open to work</span>
            <span className="text-zinc-300">·</span>
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-500 transition-colors hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-950"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-3 text-[15px] leading-[1.55] text-zinc-600">
          <p>
            i work across the fullstack, but i prefer backend work: business
            logic, infrastructure, and the systems underneath the product.
          </p>
          <p>
            lately, most of my spare time has been going into math, ai/ml, and
            research-y engineering: reading papers, building small systems, and
            trying to move closer to that kind of work.
          </p>
        </div>

        <section className="space-y-4 pt-2" aria-labelledby="featured-projects">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <p id="featured-projects">
              work <span className="ml-1 text-zinc-300">/</span>{" "}
              <span className="ml-1 tabular-nums">
                {String(featuredProjects.length).padStart(2, "0")}
              </span>
            </p>
            <a
              href="/projects"
              className="inline-flex items-center gap-1 transition-colors hover:text-zinc-950"
            >
              all work <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
          <ul className="space-y-3">
            {featuredProjects.map((project) => (
              <li
                key={project.name}
                className="group flex items-center gap-3 text-sm text-zinc-600"
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[10px] font-bold tracking-tight transition-transform duration-200 group-hover:scale-[1.04]"
                  style={projectMarks[project.name]}
                  aria-hidden="true"
                >
                  {project.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="min-w-0 flex-1">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block font-medium text-zinc-950 transition-colors hover:text-orange-800"
                  >
                    {project.name}
                  </a>
                  <span className="block line-clamp-2 text-[13px] leading-5 text-zinc-500">
                    {project.description}
                  </span>
                </span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-950"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        </section>

        <section
          className="space-y-4 pt-4"
          aria-labelledby="github-contributions"
        >
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <p id="github-contributions">github</p>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-zinc-950"
            >
              @{GITHUB_USERNAME}{" "}
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="block transition-colors hover:border-zinc-300"
          >
            <GitHubGraph />
          </a>
        </section>
      </div>
    </section>
  );
}
