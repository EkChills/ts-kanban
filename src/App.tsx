import { useEffect} from 'react'
import styled from 'styled-components'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import  ReactDOM  from 'react-dom'
import AllBoards from './components/AllBoards'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { changeTheme, closeDeleteBoardModal } from './store/features/eventActionsSlice'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { ToastContainer, toast } from 'react-toastify';
import Tasks from './pages/Tasks'
import AppLayout from './routes/AppLayout';
import { useLocalStorage } from './utils/useLocalStorage'
import AddNewBoard from './pages/AddNewBoard'
import EditBoard from './pages/EditBoard'
import DeleteModal from './components/modals/DeleteModal';
import { changeBoard, deleteBoard } from './store/features/boardsSlice';
import Register from './pages/Register'
import ProtectedRoute from './routes/ProtectedRoute'

const App = ():JSX.Element => {
  const {editedBoardInfo, allBoards, selectedBoard,user} = useAppSelector((store) => store.allBoards)
  const {isAddBoardModal, isEditBoardModal, isDeleteBoardModalOpen,theme, isSidebarOpen} = useAppSelector((store) => store.eventsActions)
  const dispatch = useAppDispatch()
  useLocalStorage(theme,'kanban-theme')
console.log(user);

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
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/' element={
        <ProtectedRoute>
          <AppLayout deleteBoardFunc={deleteBoardFunc} />
        </ProtectedRoute>
      } />

   </Routes>
    
    </BrowserRouter>
      <ToastContainer position='bottom-right' />
    </>
  )
}

const Wrapper = styled.div`
  
`

export default App