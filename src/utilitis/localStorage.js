function getLocalStorageItem() {
    const getitem = localStorage.getItem('passinfo')
    if (getitem) {
        return JSON.parse(getitem)
    } else {
        return [];
    }
}

function setValueLocalStorage(info) {
    localStorage.setItem('passinfo', JSON.stringify(info))
}

function removeLocalStorageItem(id){
    const passinfo = getLocalStorageItem()
    const filterData = passinfo.filter((info=> info.id !== id))
    setValueLocalStorage(filterData)
}

export { getLocalStorageItem, setValueLocalStorage, removeLocalStorageItem }