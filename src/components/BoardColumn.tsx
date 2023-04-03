import React from 'react'

type TaskList = {
  name: string;
  columns: {
      name: string;
      tasks: {
          title: string;
          description: string;
          status: string;
          subtasks: {
              title: string;
              isCompleted: boolean;
          }[];
      }[];
  }[];
} | undefined

const BoardColumn = ({colName, tasksList }:{colName:string, tasksList:TaskList}) => {
  const columnList = tasksList?.columns.find((column) => column.name === colName)
  return (
    <div className='w-[260px] flex flex-col'>
      <div className='flex items-center space-x-[.75rem]'>
        <span className={`w-[15px] h-[15px] rounded-full ${colName.trim().toLowerCase() === 'todo'?'bg-[#49C4E5]' : colName.trim().toLowerCase() === 'doing' ? 'bg-[#8471F2]' : 'bg-[#67E2AE]' }`}></span>
        <h5 className='text-[.75rem] font-bold text-[#828FA3]'>{colName} ({columnList?.tasks.length})</h5>
      </div>
    </div>
  )
}

export default BoardColumn