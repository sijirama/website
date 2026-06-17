import matter from "gray-matter"

const user = "sijirama"
const repo = "cerebrum"

export const TreeUrl = `https://api.github.com/repos/${user}/${repo}/git/trees/master?recursive=1`

export function getFileUrl(path: string) {
    const cleanPath = path.replace(/^\//, '');
    // If it's Home.md, fetch from root. Otherwise fetch from Public/
    if (cleanPath === 'Home.md') {
        return `https://api.github.com/repos/${user}/${repo}/contents/${cleanPath}`
    }
    const fullPath = cleanPath.startsWith('Public/') ? cleanPath : `Public/${cleanPath}`;
    return `https://api.github.com/repos/${user}/${repo}/contents/${fullPath}`
}


export interface File {
    path: string;
    mode: string;
    type: string;
    sha: string;
    size?: number;
    url?: string;
    fullPath: string;
}

export type TreeItem = File | Directory;

export interface Directory {
    path: string;
    type: string;
    fullPath: string;
    files: TreeItem[];
}


export function structureRepositoryData(data: any[]): TreeItem[] {
    const rootDirectory: Directory = {
        path: '',
        type: 'tree',
        fullPath: '',
        files: []
    };

    // Filter for entries that start with 'Public/' OR is exactly 'Home.md'
    const allowedEntries = data.filter(entry =>
        entry.path.startsWith('Public/') || entry.path === 'Home.md'
    );

    allowedEntries.forEach((entry: any) => {
        // Remove 'Public/' prefix if it exists, otherwise keep as is (for Home.md)
        const cleanPath = entry.path.replace(/^Public\//, '');
        const pathComponents = cleanPath.split('/');

        let currentDirectory = rootDirectory;
        let currentFullPath = '';

        pathComponents.forEach((component: string, index: number) => {
            if (index !== pathComponents.length - 1) {
                currentFullPath += currentFullPath === '' ? component : `/${component}`;
                let foundDirectory = currentDirectory.files.find(
                    (fileOrDir) => fileOrDir.path === component && fileOrDir.type === 'tree'
                );

                if (!foundDirectory) {
                    foundDirectory = {
                        path: component,
                        type: 'tree',
                        fullPath: currentFullPath,
                        files: []
                    };
                    currentDirectory.files.push(foundDirectory);
                }

                currentDirectory = foundDirectory as Directory;
            } else {
                const fileName = component;
                const file: File = {
                    path: fileName,
                    mode: entry.mode,
                    type: entry.type,
                    sha: entry.sha,
                    size: entry.size,
                    url: entry.url,
                    fullPath: currentFullPath === '' ? fileName : `${currentFullPath}/${fileName}`
                };

                if (!currentDirectory.files) {
                    currentDirectory.files = [];
                }

                currentDirectory.files.push(file);
            }
        });
    });

    return rootDirectory.files as TreeItem[];
}

// ───────────────────────── server-side data (token stays on the server) ─────────────────────────

const ghHeaders = () => ({
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
});

export interface NotePost {
    title: string;
    content: string;
    [key: string]: any;
}

// fetch + structure the whole tree once (ISR-cached)
export async function getTree(): Promise<TreeItem[]> {
    const res = await fetch(TreeUrl, {
        headers: ghHeaders(),
        next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return structureRepositoryData(data.tree ?? []);
}

// flat list of every note path (for the random-note feature)
export function flattenNotePaths(items: TreeItem[]): string[] {
    const out: string[] = [];
    const walk = (nodes: TreeItem[]) => {
        for (const node of nodes) {
            if ("files" in node) walk(node.files);
            else if (node.path.endsWith(".md")) out.push(node.fullPath);
        }
    };
    walk(items);
    return out;
}

export async function getAllNotePaths(): Promise<string[]> {
    return flattenNotePaths(await getTree());
}

// fetch + parse a single note (server-side)
export async function getNote(slug: string[]): Promise<NotePost | null> {
    let blobPath = slug.join("/");
    if (slug.length > 0 && !blobPath.endsWith(".md")) blobPath = `${blobPath}/index.md`;
    else if (slug.length === 0) blobPath = "Home.md";

    const res = await fetch(getFileUrl(blobPath), {
        headers: ghHeaders(),
        next: { revalidate: 60 },
    });
    if (!res.ok) return null;

    const json = await res.json();

    // directory response → grab its index.md entry's content
    let base64: string | undefined;
    if (Array.isArray(json)) {
        const indexEntry = json.find((f: any) => f.name === "index.md");
        if (!indexEntry?.url) return null;
        const idxRes = await fetch(indexEntry.url, {
            headers: ghHeaders(),
            next: { revalidate: 60 },
        });
        if (!idxRes.ok) return null;
        base64 = (await idxRes.json()).content;
    } else {
        base64 = json.content;
    }
    if (!base64) return null;

    const raw = Buffer.from(base64.replace(/\s/g, ""), "base64").toString("utf-8");
    const parsed = matter(raw);

    // strip the first H1 (it becomes the title)
    const firstH1 = parsed.content.match(/^#\s+(.+)$/m);
    const content = firstH1 ? parsed.content.replace(/^#\s+.+$/m, "").trim() : parsed.content;

    return {
        title: parsed.data.title || firstH1?.[1] || "Untitled",
        content,
        ...parsed.data,
    };
}

