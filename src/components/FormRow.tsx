import React from 'react'

export default function FormRow({name,value, handleChange, placeholderText, type, error}:{name:string, value:string, type:string; error:boolean; handleChange:(e:React.ChangeEvent<HTMLInputElement>) => void, placeholderText:string}) {
  return (
    <div className={`py-4 px-4 border-b-2 ${!error ? ' border-[hsl(0,0%,60%)]' : 'border-[#EA5555] flex items-center justify-between'}`}>
      <input onChange={handleChange} type={type} placeholder={placeholderText} className='font-[300] bg-transparent  placeholder:capitalize text-[1rem] placeholder:text-[hsl(0,0%,40%)] text-[var(--tasks-text)] outline-none ' name={name} value={value} />
      {error && <p className={`font-[300] text-[#EA5555] text-[1rem]`}>Can't be empty</p>}
    </div>
  )
}
