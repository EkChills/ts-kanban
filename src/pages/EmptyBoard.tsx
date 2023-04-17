import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import showSide from '../assets/icon-show-sidebar.svg'
import ShowSidebar from '../components/ShowSidebar'
import EditBoard from './EditBoard'
import { openEditBoard } from '../store/features/eventActionsSlice'
import { setEditedBoardInfo } from '../store/features/boardsSlice'
import { useEffect } from 'react'

const EmptyBoard = () => {
  const {isSidebarOpen} = useAppSelector((store) => store.eventsActions)
  const dispatch = useAppDispatch()
  const {allBoards, selectedBoard, editedBoardInfo} = useAppSelector((store) => store.allBoards)
  const {isDeleteTaskModalOpen, editTaskDetails} = useAppSelector((store) => store.eventsActions)
  const tasksList = allBoards.find((board) => board.name.trim().toLowerCase() === selectedBoard.trim().toLowerCase()) || allBoards[0]
  const boardColumns = [...new Set(tasksList?.columns.map((item) => item.name))]
  // let coo = tasksList?.columns

  useEffect(() => {
    dispatch(setEditedBoardInfo({id:tasksList!.id, name:tasksList!.name, columns:tasksList!.columns}))
  },[selectedBoard, setEditedBoardInfo])
  return (
    <div className={` ${isSidebarOpen ? 'md:w-[calc(100%-16rem)]' : 'md:min-w-full' } bg-[var(--main-bcg)] ${isSidebarOpen ? 'md:ml-[16rem]' : 'md:ml-0' } flex justify-center items-center relative  min-h-[100vh]`}>
      <div className='text-center flex flex-col space-y-[1.5rem] items-center'>
        <h5 className='text-[1.125rem] font-bold text-[#828FA3]'>This board is empty. Create a new<br className='md:hidden'/> column to get started</h5>
        <button onClick={() => dispatch(openEditBoard())} className='bg-[#635FC7] btn flex items-center justify-center h-[3rem]  rounded-full'>
          <p className='text-[.938rem] capitalize font-bold text-[#ffffff]'>+ add new column</p>
        </button>
      </div>
      {!isSidebarOpen && <ShowSidebar />}
    </div>
  )
}

export default EmptyBoard