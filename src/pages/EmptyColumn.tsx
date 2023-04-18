
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import showSide from '../assets/icon-show-sidebar.svg'
import ShowSidebar from '../components/ShowSidebar'
import EditBoard from './EditBoard'
import { openAddBoardModal, openEditBoard } from '../store/features/eventActionsSlice'
import { setEditedBoardInfo } from '../store/features/boardsSlice'
import { useEffect } from 'react'

const EmptyColumn = () => {
  const {isSidebarOpen} = useAppSelector((store) => store.eventsActions)
  const dispatch = useAppDispatch()



  return (
    <div className={` ${isSidebarOpen ? 'md:w-[calc(100%-16rem)]' : 'md:min-w-full' } bg-[var(--main-bcg)] ${isSidebarOpen ? 'md:ml-[16rem]' : 'md:ml-0' } flex justify-center items-center relative  min-h-[100vh]`}>
      <div className='text-center flex flex-col space-y-[1.5rem] items-center'>
        <h5 className='text-[1.125rem] font-bold text-[#828FA3]'>You have no boards. Create a new<br className='md:hidden'/> board to get started</h5>
        <button onClick={() => dispatch(openAddBoardModal())} className='bg-[#635FC7] btn flex items-center justify-center h-[3rem]  rounded-full'>
          <p className='text-[.938rem] capitalize font-bold text-[#ffffff]'>+ add new  board</p>
        </button>
      </div>
      {!isSidebarOpen && <ShowSidebar />}
    </div>
  )
}

export default EmptyColumn