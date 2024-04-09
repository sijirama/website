const label = 'ExplorerPath';

function setItemForPath(path: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(label, path);
    }
}

function getItemForPath() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(label);
    }
    return null; // Return null if localStorage is not available
}

function isTherePathStored() {
    if (typeof window !== 'undefined') {
        const pathStored = localStorage.getItem(label);
        return !!pathStored; // Convert to boolean using !! operator
    }
    return false; // Return false if localStorage is not available
}

export { setItemForPath, getItemForPath, isTherePathStored };

