import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { caveat, dmSans, manrope } from "@/lib/fonts";
import { getTree, type Directory, type File, type TreeItem } from "@/lib/library";

const isDir = (item: TreeItem): item is Directory => "files" in item;
const byName = (a: TreeItem, b: TreeItem) => a.path.localeCompare(b.path);
const href = (fullPath: string) => `/library/${fullPath.split("/").map(encodeURIComponent).join("/")}`;
const titleOf = (file: File) => file.path === "Home.md" ? "home" : file.path.replace(/\.md$/, "");
const folderNotes: Record<string, string> = {
  Research: "rabbit holes i fell into",
  Studying: "things i'm still learning",
  Writing: "essays, when i'm brave",
  Projects: "stuff i've built",
};

export default function LibraryPage() {
  const [tree, setTree] = useState<TreeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTree().then(setTree).finally(() => setLoading(false));
  }, []);

  const rootFiles = tree.filter((item): item is File => !isDir(item) && item.path.endsWith(".md"))
    .sort((a, b) => a.path === "Home.md" ? -1 : b.path === "Home.md" ? 1 : byName(a, b));
  const dirs = tree.filter(isDir).sort(byName).reverse();

  return (
    <div className={`${dmSans.className} min-h-svh bg-white px-4 py-6 md:px-8 lg:flex lg:items-center`}>
      <div className="w-full max-w-xl mx-auto">
        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className={`${manrope.className} text-3xl md:text-4xl font-bold tracking-tight text-zinc-900`}>the <span className="text-pink-600">library</span></h1>
            <p className={`${caveat.className} text-2xl md:text-[26px] text-pink-500 -rotate-1 mt-1`}>today i’m thinking about the trees and how beautiful they are</p>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed max-w-lg">notes, research and half-thoughts. i keep telling myself i’ll write more here — it’s a steady goal of mine.</p>
          </div>
          <Link to="/" className="shrink-0 mt-1.5 text-xs text-zinc-400 hover:text-pink-600 transition-colors whitespace-nowrap">← home</Link>
        </header>

        {loading && <p className="text-sm text-zinc-400">loading the library…</p>}
        {!loading && rootFiles.length > 0 && <div className="mb-8 flex flex-col gap-1.5">{rootFiles.map((file) => (
          <Link key={file.fullPath} to={href(file.fullPath)} className="group inline-flex w-fit items-baseline gap-2 text-[13px] text-zinc-700 hover:text-pink-600 transition-colors">
            <span className="text-pink-400">↳</span><span className="font-medium">{titleOf(file)}</span>
            {file.path === "Home.md" && <span className={`${caveat.className} text-lg text-pink-500 -rotate-2`}>start here</span>}
          </Link>
        ))}</div>}

        {!loading && <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-7">{dirs.map((dir, i) => <FolderSection key={dir.fullPath} dir={dir} flip={i % 2 === 0} />)}</div>}
        {!loading && tree.length === 0 && <p className="text-sm text-zinc-500">The library is unavailable right now.</p>}
      </div>
    </div>
  );
}

function FolderSection({ dir, flip }: { dir: Directory; flip: boolean }) {
  const files = dir.files.filter((item): item is File => !isDir(item) && item.path.endsWith(".md")).sort(byName);
  const subdirs = dir.files.filter(isDir).sort(byName);
  const hasIndex = files.some((file) => file.path === "index.md");
  return <section>
    <div className="flex items-baseline gap-3 mb-2"><h2 className={`${caveat.className} text-2xl text-pink-600 ${flip ? "-rotate-1" : "rotate-1"}`}>{hasIndex ? <Link to={href(dir.fullPath)}>{dir.path.toLowerCase()}</Link> : dir.path.toLowerCase()}</h2>{folderNotes[dir.path] && <span className="text-xs text-zinc-400">{folderNotes[dir.path]}</span>}</div>
    <ul className="flex flex-col">{files.filter((file) => file.path !== "index.md").map((file) => <li key={file.fullPath}><Link to={href(file.fullPath)} className="group flex items-center gap-2 py-1 text-[13px] text-zinc-700 hover:text-pink-600 transition-colors"><span className="text-pink-300">✦</span><span>{titleOf(file)}</span></Link></li>)}</ul>
    {subdirs.length > 0 && <div className="mt-5 ml-4 flex flex-col gap-6">{subdirs.map((subdir, i) => <FolderSection key={subdir.fullPath} dir={subdir} flip={i % 2 === 0} />)}</div>}
  </section>;
}
