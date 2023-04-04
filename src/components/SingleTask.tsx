import ReactDOM from 'react-dom';
import SingleTaskDetails from '../pages/SingleTaskDetails';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { changeModalParam, openDetailModal } from '../store/features/eventActionsSlice';

interface Props  {
  title: string;
  description: string;
  status: string;
  subtasks: {
      title: string;
      isCompleted: boolean;
  }[];
}

const SingleTask = ({title, description, status, subtasks}:Props) => {
  const dispatch = useAppDispatch()
  const {isDetailModalOpen,modalParam} = useAppSelector((store) => store.eventsActions)
  const completedSubtasks = subtasks.reduce((total, item) => {
    if(item.isCompleted === true) {
      return total + 1
    }
    return total
  }, 0)

  const openTaskDetails = () => {
    dispatch(changeModalParam(title))
    dispatch(openDetailModal())
  }
  return (
    <div onClick={openTaskDetails} className='min-w-[17.5rem] rounded-lg py-[1.5rem] cursor-pointer px-[1rem] bg-[var(--tasks-bcg)] '>
      <div className='flex flex-col space-y-[.5rem]'>
        <h5 className='text-[.938rem] font-bold text-[var(--tasks-text)]'>{title}</h5>
        <p className='text-[.75rem] font-bold text-[#828FA3]'>{`${completedSubtasks} of ${subtasks.length} subtasks`}</p>
      </div>
      { isDetailModalOpen && title === modalParam && ReactDOM.createPortal(<SingleTaskDetails title={title} description={description} completedSubtasks={completedSubtasks} status={status} subtasks={subtasks} />, document.getElementById('modal') as Element | DocumentFragment)}

    </div>
  )
}

export default SingleTask