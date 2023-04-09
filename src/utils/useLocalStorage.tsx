import { useState, useEffect } from "react";
import boardsData from '../data.json'


type StorageItem = typeof boardsData.boards | string


export const useLocalStorage = (storageItem:StorageItem, storageString:string) => {
  useEffect(() => {
    localStorage.setItem(storageString, JSON.stringify(storageItem))
  }, [storageItem])
}