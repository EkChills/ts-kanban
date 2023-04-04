import AllBoards from '../components/AllBoards'
import { useAppSelector } from '../hooks/reduxHooks'
import showSide from '../assets/icon-show-sidebar.svg'
import EmptyBoard from './EmptyBoard'
import ShowSidebar from '../components/ShowSidebar'
import SingleTaskDetails from './SingleTaskDetails'


const Tasks = () => {
  const {isSidebarOpen,isDetailModalOpen} = useAppSelector((store) => store.eventsActions)
  const {allBoards, selectedBoard} = useAppSelector((store) => store.allBoards)
  const singleBoard = allBoards.find((task) => task.name.trim().toLowerCase() === selectedBoard.trim().toLowerCase())
  let tasksLength = singleBoard?.columns.reduce((total, task) => {
    if(task.tasks.length > 0) {
      return task.tasks.length + total
    }
    return total
  }, 0)
  console.log(tasksLength);

  if(tasksLength! <= 0) {
    return <EmptyBoard />
  }
  
  return (
    <div className={` ${isSidebarOpen ? 'md:w-[calc(100%-16rem)]' : 'md:min-w-full' } bg-[var(--main-bcg)] ${isSidebarOpen ? 'md:ml-[16rem]' : 'md:ml-0' }  md:relative min-h-[100vh] md:min-h-[calc(100vh-5rem)] md:mt-[5rem]`}>
      <AllBoards />
      {!isSidebarOpen && <ShowSidebar />}
      
    </div>
  )
}

export default Tasks