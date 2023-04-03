import logoLight from '../assets/logo-light.svg'
import logoDark from '../assets/logo-dark.svg'
import logoMobile from '../assets/logo-mobile.svg'
import styled from 'styled-components'
import addTask from '../assets/icon-add-task-mobile.svg'
import chevronDown from '../assets/icon-chevron-down.svg'
import  ReactDOM  from 'react-dom'
import chevronUp from '../assets/icon-chevron-up.svg'
import verticalEllipsis from '../assets/icon-vertical-ellipsis.svg'
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks'
import NavBoardModal from './modals/NavBoardModal'
import { openNavModal } from '../store/features/eventActionsSlice'
const Navbar = () => {
  const {theme, isNavModalOpen} = useAppSelector((store) => store.eventsActions)
  const {allBoards, selectedBoard} = useAppSelector((store) => store.allBoards)
  const dispatch = useAppDispatch()
  const portalCont = document.getElementById('modal') as Element | DocumentFragment

  
  
  return (
    <Wrapper className={`px-[1rem] h-[4rem] border-b-2 border-b-[var(--lines-col)]  md:px-[1.5rem] md:h-[5.063rem] flex items-center justify-between`}>
      <div className="flex items-center space-x-[1rem] md:space-x-[1rem] relative">
        <img src={logoMobile} className="md:hidden" alt="logo" />
        <img src={theme === 'dark-mode' ? logoLight : logoDark} className="hidden md:block md:z-20" alt="" />
        <div className='absolute logo-line hidden md:block'></div>
        <div className="flex items-center space-x-[.5rem] cursor-pointer md:pl-[4rem]">
          <span className='capitalize text-[1.125rem] md:text-[1.25rem] font-bold board-text'>{selectedBoard}</span>
          <img src={isNavModalOpen ? chevronUp : chevronDown}  onClick={() => dispatch(openNavModal())} className='md:hidden' alt="arrow-open" />
        </div>
      </div>
      <div className="flex items-center space-x-[1rem] md:space-x-[1.5rem]">
        <button className='h-[2rem] cursor-pointer w-[3rem] md:space-x-[.5rem] bg-[#635FC7] rounded-full md:h-[3rem] md:w-[11.5rem] flex items-center justify-center'>
          <img src={addTask} alt="add task icon" />
          <p className='capitalize hidden md:block text-[#ffffff] text-[0.938rem] font-bold'>add new task</p>
        </button>
        <img className="" src={verticalEllipsis} alt="ellipsis hamburger" />
      </div>
      { isNavModalOpen && ReactDOM.createPortal( <NavBoardModal/>, portalCont )}
    </Wrapper>
  )
}

const Wrapper = styled.nav`
background-color: var(--nav-bcg);
  .board-text {
    color: var(--board-text);
  }

  .logo-line {
    position: absolute;
    content: "";
    width: 2px;
    top: -2.3rem;
    bottom: -2.3rem;
    left: 12rem;
    background-color: var(--lines-col);
  }
`

export default Navbar