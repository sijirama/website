const label = "ExplorerPath"

function SetItemForPath(path: string) {
    localStorage.setItem(label, path)
}

function GetItemForPath() {
    return localStorage.getItem(label)
}

function isTherePathStored() {
    const pathStored = localStorage.getItem(label)
    return pathStored ? true : false
}

export {
    SetItemForPath,
    GetItemForPath,
    isTherePathStored
}
