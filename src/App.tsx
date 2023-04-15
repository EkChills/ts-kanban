import { useEffect} from 'react'
import styled from 'styled-components'
import  ReactDOM  from 'react-dom'
import AllBoards from './components/AllBoards'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { changeTheme } from './store/features/eventActionsSlice'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { ToastContainer } from 'react-toastify';
import Tasks from './pages/Tasks'
import { useLocalStorage } from './utils/useLocalStorage'
import AddNewBoard from './pages/AddNewBoard'
import EditBoard from './pages/EditBoard'

const App = ():JSX.Element => {
  const {theme, isSidebarOpen} = useAppSelector((store) => store.eventsActions)
  const {isAddBoardModal, isEditBoardModal} = useAppSelector((store) => store.eventsActions)
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


  return (
    <>
      <Navbar />
      {isSidebarOpen && <Sidebar />}
      {isAddBoardModal && ReactDOM.createPortal(<AddNewBoard />, document.getElementById('modal') as Element | DocumentFragment)}
      {isEditBoardModal && ReactDOM.createPortal(<EditBoard />, document.getElementById('modal') as Element | DocumentFragment)}
      <Tasks />
      <ToastContainer position='top-center' />
    </>
  )
}

const Wrapper = styled.div`
  
`

export default App