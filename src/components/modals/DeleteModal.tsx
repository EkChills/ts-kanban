import React, { RefObject, useEffect, useRef } from 'react'
import BoardBcg from '../ui/BoardBcg'
import ModalOverlay from '../ui/ModalOverlay'
import { useAppDispatch } from '../../hooks/reduxHooks';
import useOnclickOutside from '../../hooks/useOnclickOutside';
import { closeAddBoardModal, closeDeleteBoardModal, closeDeleteTaskModal, closeDetailModal } from '../../store/features/eventActionsSlice';

interface Props {
  deleteFor?:string;
  boardName?:string;
  taskName?:string;
  deleteFunc?:()=> void;
}

const DeleteModal = ({deleteFor, taskName, boardName, deleteFunc}:Props) => {
  const dispatch = useAppDispatch()
  const boardRef = useRef<RefObject<HTMLElement>>(null)
  useOnclickOutside(boardRef, () => {
    dispatch(closeDeleteBoardModal())
    dispatch(closeDeleteTaskModal())
   })

   useEffect(() => {
    dispatch(closeDetailModal())
   })
  return (
    <ModalOverlay>
    <BoardBcg overlayRef={boardRef} className=' p-[1.5rem]'>
      <div className='flex flex-col space-y-[1.5rem] w-full'>

      <h4 className='text-[1.125rem] font-bold text-[Red]'>Delete this {deleteFor === 'task' ? 'task' : 'board'} ?</h4>
      <p className='text-[.813rem] font-[500] text-[#828FA3]'>{deleteFor === 'task' ? `Are you sure you want to delete the '${taskName}' task and its subtasks? This action cannot be reversed.`:
      `Are you sure you want to delete the ‘${boardName}’ board? This action will remove all columns and tasks and cannot be reversed.`
      }</p>
      <div className='flex flex-col space-y-[1rem] md:flex-row md:space-y-0 md:space-x-[1rem]  md:items-center'>
        <button className='btn md:w-[100%] bg-[#EA5555] border-none md:max-w-[calc(50%-8px)] rounded-full' onClick={deleteFunc}>delete</button>
        <button className='btn md:w-[100%] md:max-w-[calc(50%-8px)] bg-[var(--cancel-btn)] border-none text-[#635FC7] rounded-full'>cancel</button>
      </div>
      </div>
    </BoardBcg>

    </ModalOverlay>
  )
}

export default DeleteModal