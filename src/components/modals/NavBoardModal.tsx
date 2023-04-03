import React from 'react'
import Sidebar from '../Sidebar'
import NavModal from '../NavModal'

const NavBoardModal = () => {
  return (
    <div className='fixed flex justify-center inset-0 bg-opacity-40 md:hidden  bg-black'>
      <NavModal />
    </div>
  )
}

export default NavBoardModal