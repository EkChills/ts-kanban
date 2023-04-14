import { useState, useEffect } from "react";
import boardsData from '../data.json'


type StorageItem = {
  name: string;
  columns: {
      name: string;
      tasks: {
          id: number | string;
          title: string;
          description: string;
          status: string;
          subtasks: {
              title: string;
              isCompleted: boolean;
          }[];
      }[];
  }[];
}[] | string


export const useLocalStorage = (storageItem:StorageItem, storageString:string) => {
  useEffect(() => {
    localStorage.setItem(storageString, JSON.stringify(storageItem))
  }, [storageItem])
}