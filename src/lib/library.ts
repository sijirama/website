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

export interface Directory {
    path: string;
    type: string;
    fullPath: string;
    files: (File | Directory)[];
}


export function structureRepositoryData(data: any[]): Directory[] {
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

    return rootDirectory.files as Directory[];
}

// Simple Cache implementation for GitHub API
const cache: Record<string, { data: any, timestamp: number }> = {};
const CACHE_TTL = 3600 * 1000; // 1 hour

export async function fetchWithCache(url: string) {
    const now = Date.now();
    if (cache[url] && (now - cache[url].timestamp < CACHE_TTL)) {
        return cache[url].data;
    }

    const response = await fetch(url);
    const data = await response.json();

    cache[url] = { data, timestamp: now };
    return data;
}

