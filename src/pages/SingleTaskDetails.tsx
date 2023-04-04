import React, { useRef } from 'react'
import ModalOverlay from '../components/ui/ModalOverlay'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import verticalEllipsis from '../assets/icon-vertical-ellipsis.svg'
import BoardBcg from '../components/ui/BoardBcg';
import Checkbox from '../components/ui/Checkbox';
import SelectRow from '../components/ui/SelectRow';
import useOnclickOutside from '../hooks/useOnclickOutside';
import { closeDetailModal } from '../store/features/eventActionsSlice';

interface  Props {
  title: string;
  description: string;
  status: string;
  subtasks: {
      title: string;
      isCompleted: boolean;
  }[];
  completedSubtasks:number;
}

const SingleTaskDetails = ({title,description,status,subtasks, completedSubtasks}:Props) => {
  const {modalParam} = useAppSelector((store) => store.eventsActions)
  const overlayRef = useRef(null)
  const dispatch = useAppDispatch()
  useOnclickOutside(overlayRef, () => dispatch(closeDetailModal()))
  console.log(modalParam);

  return (
    <ModalOverlay className='px-[1rem]'>
      <BoardBcg overlayRef={overlayRef} className=' p-[2rem] flex flex-col space-y-[1.5rem]'>
        <article className='flex flex-col space-y-[1.5rem]'>
          <div className='flex items-center justify-between'>
            <h3 className='font-bold text-[1.125rem] max-w-[274px] md:max-w-[387px] text-[var(--board-text)]'>{title}</h3>
            <img src={verticalEllipsis} alt="vertical ellipsis" />
          </div>
          <p className='text-[#828FA3] text-[0.813rem] font-[500] '>{description}</p>
        </article>
        <div className='flex flex-col space-y-[1rem]'>
          <h4 className='text-[.75rem] font-bold text-[var(--board-text)] '>Subtasks({completedSubtasks} of {subtasks.length})</h4>
          <div className='flex flex-col space-y-[.5rem]'>
            {subtasks.map((subtask,index) => {
              const {isCompleted, title} = subtask
              return <div key={index} className='flex items-center bg-[var(--main-bcg)] space-x-[1rem] py-[.813rem] px-[1rem]'>
                <Checkbox isChecked={isCompleted} />
                <p className='text-[.75rem] font-bold text-[var(--subtask-text)]'>{title}</p>
              </div>
            })}
          </div>
        </div>
        <div className='flex flex-col space-y-[.5rem]'>
          <h4 className='text-[var(--select-label)] text-[.75rem] font-bold'>Status</h4>
          <SelectRow />
        </div>
      </BoardBcg>
    </ModalOverlay>
  )
}

export default SingleTaskDetails