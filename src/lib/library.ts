const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"
const CACHE_TTL_MS = 60_000;

type CacheEntry<T> = {
    expiresAt: number;
    value: Promise<T>;
};

let treeCache: CacheEntry<TreeItem[]> | null = null;
const noteCache = new Map<string, CacheEntry<NotePost | null>>();


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

export interface NotePost {
    title: string;
    content: string;
    [key: string]: any;
}

export async function getTree(): Promise<TreeItem[]> {
    if (treeCache && treeCache.expiresAt > Date.now()) return treeCache.value;

    const value = fetch(`${API_URL}/api/library/tree`)
        .then(async (res) => {
            if (!res.ok) return [];
            const data = await res.json();
            return structureRepositoryData(data.tree ?? []);
        })
        .catch(() => []);

    treeCache = { value, expiresAt: Date.now() + CACHE_TTL_MS };
    return value;
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

function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
    if (!raw.startsWith("---")) return { data: {}, content: raw };

    const end = raw.indexOf("\n---", 3);
    if (end === -1) return { data: {}, content: raw };

    const header = raw.slice(4, end).trim();
    const data: Record<string, any> = {};

    for (const line of header.split("\n")) {
        const separator = line.indexOf(":");
        if (separator === -1) continue;

        const key = line.slice(0, separator).trim();
        const value = line.slice(separator + 1).trim();
        if (!key) continue;

        if (value.startsWith("[") && value.endsWith("]")) {
            data[key] = value
                .slice(1, -1)
                .split(",")
                .map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
                .filter(Boolean);
        } else {
            data[key] = value.replace(/^['"]|['"]$/g, "");
        }
    }

    return { data, content: raw.slice(end + 4).trim() };
}

export async function getNote(slug: string[]): Promise<NotePost | null> {
    const path = slug.length > 0 ? slug.join("/") : "Home.md";
    const cached = noteCache.get(path);
    if (cached && cached.expiresAt > Date.now()) return cached.value;

    const endpoint = `${API_URL}/api/library/note/${path.split("/").map(encodeURIComponent).join("/")}`;
    const value = fetch(endpoint)
        .then(async (res) => {
            if (!res.ok) return null;

            const data = await res.json();
            const raw = data.content;
            if (typeof raw !== "string") return null;
            const parsed = parseFrontmatter(raw);

            // strip the first H1 (it becomes the title)
            const firstH1 = parsed.content.match(/^#\s+(.+)$/m);
            const content = firstH1 ? parsed.content.replace(/^#\s+.+$/m, "").trim() : parsed.content;

            return {
                title: parsed.data.title || firstH1?.[1] || "Untitled",
                content,
                ...parsed.data,
            };
        })
        .catch(() => null);

    noteCache.set(path, { value, expiresAt: Date.now() + CACHE_TTL_MS });
    return value;
}
