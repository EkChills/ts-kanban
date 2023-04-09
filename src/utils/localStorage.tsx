import boardData from '../data.json'

export const getFromLocalStorage = (storageItem:typeof boardData.boards | string, storageString:string) => {
  const confirmedItem = localStorage.getItem(storageString)
  if(confirmedItem) {
    return JSON.parse(confirmedItem)
  }
  return storageItem
}
export default localStorage