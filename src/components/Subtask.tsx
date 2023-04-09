import React from 'react'

const Subtask = ({className}:{className:string}) => {
  return (
    <div className="flex flex-col space-y-[.5rem]">
      <label
        className="text-[.75rem] font-bold capitalize text-[var(--select-label)]"
      >
        subtasks
      </label>
      <Element
        placeholder={'e.g. Make coffee'}
        className={`${className} placeholder:text-[.813rem]`}
        {...rest}
      ></Element>
    </div>
  )
}

export default Subtask