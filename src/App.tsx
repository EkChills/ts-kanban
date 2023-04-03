import { useEffect} from 'react'
import styled from 'styled-components'
import AllBoards from './components/AllBoards'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { changeTheme } from './store/features/eventActionsSlice'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import Tasks from './pages/Tasks'

const App = ():JSX.Element => {
  const {theme, isSidebarOpen} = useAppSelector((store) => store.eventsActions)
  const dispatch = useAppDispatch()

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
      <Tasks />
    </>
  )
}

const Wrapper = styled.div`
  
`

export default App