import ReactDOM from 'react-dom';
import React from 'react';
import SingleTaskDetails from '../pages/SingleTaskDetails';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { changeModalParam, closeEditModal, openDetailModal } from '../store/features/eventActionsSlice';
import EditTask from '../pages/EditTask';

 interface Props  {
  id:number | string;
  title: string;
  description: string;
  status: string;
  subtasks: {
      id:number | string
      title: string;
      isCompleted: boolean;
  }[];
}

const SingleTask = ({id,title, description, status, subtasks}:Props) => {
  const dispatch = useAppDispatch()
  const {isDetailModalOpen,modalParam, isEditModalOpen} = useAppSelector((store) => store.eventsActions)
  const completedSubtasks = React.useMemo(() => subtasks.reduce((total, item) => {
    if(item.isCompleted === true) {
      return total + 1
    }
    return total
  }, 0), [subtasks])  

  const openTaskDetails = () => {
    dispatch(changeModalParam(title))
    dispatch(openDetailModal())
  }


  const dragStartHandler = (e:React.DragEvent<HTMLDivElement>, data:Props) => {
    e.dataTransfer.setData
  }




  return (
    <div onClick={openTaskDetails} className='min-w-[17.5rem] shadow-md hover:translate-y-1 transition-all duration-200 rounded-lg py-[1.5rem] cursor-pointer px-[1rem] bg-[var(--tasks-bcg)] '>
      <div className='flex flex-col space-y-[.5rem]'>
        <h5 className='text-[.938rem] font-bold text-[var(--tasks-text)]'>{title}</h5>
        <p className='text-[.75rem] font-bold text-[#828FA3]'>{`${completedSubtasks} of ${subtasks.length} subtasks`}</p>
      </div>
      { isDetailModalOpen && title === modalParam && ReactDOM.createPortal(<SingleTaskDetails id={id}  title={title} description={description} completedSubtasks={completedSubtasks} status={status} subtasks={subtasks} />, document.getElementById('modal') as Element | DocumentFragment)}
    </div>
  )
}

export default SingleTask