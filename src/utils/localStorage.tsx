import { User } from 'firebase/auth'
import boardData from '../data.json'

export const getFromLocalStorage = (storageItem:typeof boardData.boards | string, storageString:string) => {
  const confirmedItem = localStorage.getItem(storageString)
  if(confirmedItem) {
    return JSON.parse(confirmedItem)
  }
  return storageItem
}

export const addUserToLocalStorage = (user:User) => {
  localStorage.setItem('kanban-user', JSON.stringify(user))
}

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('kanban-user') || null
    return JSON.parse(result!)
  
}
export default localStorage