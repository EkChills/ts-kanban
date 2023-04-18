import AllBoards from '../components/AllBoards'
import { useAppSelector } from '../hooks/reduxHooks'
import showSide from '../assets/icon-show-sidebar.svg'
import EmptyBoard from './EmptyBoard'
import ShowSidebar from '../components/ShowSidebar'
import SingleTaskDetails from './SingleTaskDetails'
import AddTask from './AddTask'
import  ReactDOM  from 'react-dom'
import { useLocalStorage } from '../utils/useLocalStorage'
import EditTask from './EditTask'
import AddNewBoard from './AddNewBoard'
import EmptyColumn from './EmptyColumn'


const Tasks = () => {
  const {isSidebarOpen,isAddModalOpen, isEditModalOpen, isAddBoardModal} = useAppSelector((store) => store.eventsActions)
  const {allBoards, selectedBoard} = useAppSelector((store) => store.allBoards)
  useLocalStorage(allBoards, 'allTasks')
  const singleBoard = allBoards.find((task) => task.name.trim().toLowerCase() === selectedBoard.trim().toLowerCase())
  let colName = singleBoard?.columns.map((col) => col.name)
  
  

  if(colName?.length! <= 0) {
    return <EmptyBoard />
  }

  if(allBoards.length <= 0) {
    return <EmptyColumn />
  }

  
  return (
    <div className={` ${isSidebarOpen ? 'md:w-[calc(100%-16rem)]' : 'md:min-w-full' } bg-[var(--main-bcg)] ${isSidebarOpen ? 'md:ml-[16rem]' : 'md:ml-0' }  md:relative min-h-[100vh] md:min-h-[calc(100vh-5rem)] md:mt-[5rem]`}>
      <AllBoards />
      {!isSidebarOpen && <ShowSidebar />}
      {isAddModalOpen && ReactDOM.createPortal(<AddTask />, document.getElementById('modal') as Element | DocumentFragment)}
      {isEditModalOpen && ReactDOM.createPortal(<EditTask />, document.getElementById('modal') as Element | DocumentFragment)}
    </div>
  )
}

export default Tasks