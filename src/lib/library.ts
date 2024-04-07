const user = "sijirama"
const repo = "cerebrum"

export const TreeUrl = `https://api.github.com/repos/${user}/${repo}/git/trees/master?recursive=1`

export function getFileUrl(path: string) {
    return `https://api.github.com/repos/${user}/${repo}/contents/${path}`
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

    data.forEach((entry: any) => {
        const pathComponents = entry.path.split('/');
        let currentDirectory = rootDirectory;
        let currentFullPath = ''; // Initialize currentFullPath here

        pathComponents.forEach((component: string, index: number) => {
            if (index !== pathComponents.length - 1) {
                currentFullPath += `/${component}`;
                let foundDirectory = currentDirectory.files.find(
                    (fileOrDir) => fileOrDir.path === component && fileOrDir.type === 'tree'
                );

                if (!foundDirectory) {
                    foundDirectory = {
                        path: component,
                        type: 'tree',
                        fullPath: currentFullPath,
                        files: [] // Initialize files array if it's not defined
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
                    fullPath: `${currentFullPath}/${fileName}` // Assign fullPath here for files
                };

                // Initialize files array if it's not defined
                if (!currentDirectory.files) {
                    currentDirectory.files = [];
                }

                currentDirectory.files.push(file);
            }
        });
    });

    return rootDirectory.files as Directory[];
}



/*
    reference sake
export function sstructureRepositoryData(data: any[]): Directory[] {
    const rootDirectory: Directory = {
        path: '',
        type: 'tree',
        fullPath: '',
        files: []
    };

    data.forEach((entry: any) => {
        const pathComponents = entry.path.split('/');
        let currentDirectory = rootDirectory;
        let currentFullPath = '';

        for (let i = 0; i < pathComponents.length - 1; i++) {
            const directoryName = pathComponents[i];
            currentFullPath += `/${directoryName}`;
            let foundDirectory = currentDirectory.files.find(
                (fileOrDir) => fileOrDir.path === directoryName && fileOrDir.type === 'tree'
            );

            if (!foundDirectory) {
                foundDirectory = {
                    path: directoryName,
                    type: 'tree',
                    fullPath: currentFullPath,
                    files: [] // Initialize files array if it's not defined
                };
                currentDirectory.files.push(foundDirectory);
            }

            currentDirectory = foundDirectory as Directory;
        }

        const fileName = pathComponents[pathComponents.length - 1];
        const file: File = {
            path: fileName,
            mode: entry.mode,
            type: entry.type,
            fullPath: `${currentFullPath}/${fileName}`,
            sha: entry.sha,
            size: entry.size,
            url: entry.url
        };

        // Initialize files array if it's not defined
        if (!currentDirectory.files) {
            currentDirectory.files = [];
        }

        currentDirectory.files.push(file);
    });

    return rootDirectory.files as Directory[];
}

    */
