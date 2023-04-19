import { useEffect} from 'react'
import styled from 'styled-components'
import  ReactDOM  from 'react-dom'
import AllBoards from './components/AllBoards'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { changeTheme, closeDeleteBoardModal } from './store/features/eventActionsSlice'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { ToastContainer, toast } from 'react-toastify';
import Tasks from './pages/Tasks'
import { useLocalStorage } from './utils/useLocalStorage'
import AddNewBoard from './pages/AddNewBoard'
import EditBoard from './pages/EditBoard'
import DeleteModal from './components/modals/DeleteModal';
import { changeBoard, deleteBoard } from './store/features/boardsSlice';

const App = ():JSX.Element => {
  const {editedBoardInfo, allBoards, selectedBoard} = useAppSelector((store) => store.allBoards)
  const {isAddBoardModal, isEditBoardModal, isDeleteBoardModalOpen,theme, isSidebarOpen} = useAppSelector((store) => store.eventsActions)
  const dispatch = useAppDispatch()
  useLocalStorage(theme,'kanban-theme')

  useEffect(() => {
    window.matchMedia(`(prefers-color-scheme: dark)`)
    .addEventListener('change', (event:MediaQueryListEvent) => {
      const colorTheme = event.matches ? 'dark-mode' : 'light-mode'  
      console.log(colorTheme);
      console.log('hi');
      
      dispatch(changeTheme(colorTheme))
    })

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {})
    } 
      
  },[])

  useEffect(() => {
    document.body.className = theme
  },[theme])

  const deleteBoardFunc = () => {
    const allBoardNames = allBoards.map((board) => board.name.trim().toLowerCase())
    
    // const boardNameSet = [...new Set(...allBoardNames)]
    // let currentBoardInd = boardNameSet.indexOf(selectedBoard.trim().toLowerCase())
    // let changedBoard = boardNameSet[currentBoardInd + 1]
    
    dispatch(closeDeleteBoardModal())
    // dispatch(changeBoard(changedBoard))
    dispatch(deleteBoard(editedBoardInfo))
    toast.success('Board deleted successfully')
  }

  return (
    <>
      <Navbar />
      {isSidebarOpen && <Sidebar />}
      {isAddBoardModal && ReactDOM.createPortal(<AddNewBoard />, document.getElementById('modal') as Element | DocumentFragment)}
      {isEditBoardModal && ReactDOM.createPortal(<EditBoard />, document.getElementById('modal') as Element | DocumentFragment)}
      {isDeleteBoardModalOpen && ReactDOM.createPortal(<DeleteModal deleteFunc={deleteBoardFunc} deleteFor="board" boardName={editedBoardInfo.name} />, document.getElementById('modal') as HTMLElement )}
      <Tasks />
      <ToastContainer position='bottom-right' />
    </>
  )
}

const Wrapper = styled.div`
  
`

export default App