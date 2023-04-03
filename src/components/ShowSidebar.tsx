import showSide from '../assets/icon-show-sidebar.svg'
import { useAppDispatch } from '../hooks/reduxHooks';
import {openSidebar} from '../store/features/eventActionsSlice'


const ShowSidebar = () => {
  const dispatch = useAppDispatch()
  return (
    <button onClick={() => dispatch(openSidebar())} className="w-[56px] hidden h-[3rem] absolute bottom-[2rem] left-0  rounded-r-full bg-[#635FC7] md:flex items-center justify-center">
      <img src={showSide} alt="show-sidebar" />
    </button>
  );
};

export default ShowSidebar;
