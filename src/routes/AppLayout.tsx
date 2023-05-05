import React from 'react'
import ReactDOM from'react-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import AllBoards from '../components/AllBoards'
import { useAppSelector } from '../hooks/reduxHooks'
import Tasks from '../pages/Tasks'
import AddNewBoard from '../pages/AddNewBoard'
import EditBoard from '../pages/EditBoard'
import DeleteModal from '../components/modals/DeleteModal'

const AppLayout = ({deleteBoardFunc}:{deleteBoardFunc:() => void | any}) => {
  const {editedBoardInfo, allBoards, selectedBoard} = useAppSelector((store) => store.allBoards)
  const {isAddBoardModal, isEditBoardModal, isDeleteBoardModalOpen,theme, isSidebarOpen} = useAppSelector((store) => store.eventsActions)
  return (
    <>
      <Navbar />
      {isSidebarOpen && <Sidebar />}
      {isAddBoardModal && ReactDOM.createPortal(<AddNewBoard />, document.getElementById('modal') as Element | DocumentFragment)}
      {isEditBoardModal && ReactDOM.createPortal(<EditBoard />, document.getElementById('modal') as Element | DocumentFragment)}
      {isDeleteBoardModalOpen && ReactDOM.createPortal(<DeleteModal deleteFunc={deleteBoardFunc} deleteFor="board" boardName={editedBoardInfo.name} />, document.getElementById('modal') as HTMLElement )}
      <Tasks />
    </>
  )
}

export default AppLayout