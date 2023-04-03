import { RefObject, useState, useEffect } from "react";

type Event = MouseEvent | TouchEvent
const useOnclickOutside = (refObj:RefObject<any>, closeAction:(e:Event) => void) => {
  useEffect(() => {
   const handler = (event:Event) => {
     const el = refObj?.current
     if(!el || el.contains(event.target as Node) || null) {
       return
     }
     closeAction(event)
   }

   document.addEventListener('mousedown', handler)
   document.addEventListener('touchstart', handler)

   return () => {
    document.removeEventListener('mousedown', handler)
    document.removeEventListener('touchstart', handler)
   }
  },[refObj]) 
}

export default useOnclickOutside