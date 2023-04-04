import React, {  ReactNode } from 'react'

interface Props {
  children:ReactNode
  className?:string;
}

const ModalOverlay = ({children, className}:Props) => {
  return (
    <div className={`fixed inset-0 z-[100] bg-opacity-40 grid place-items-center bg-black ${className} `}>
      {children}
    </div>
  )
}

export default ModalOverlay