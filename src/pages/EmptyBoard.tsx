import { useAppSelector } from '../hooks/reduxHooks'
import showSide from '../assets/icon-show-sidebar.svg'
import ShowSidebar from '../components/ShowSidebar'

const EmptyBoard = () => {
  const {isSidebarOpen} = useAppSelector((store) => store.eventsActions)
  return (
    <div className={` ${isSidebarOpen ? 'md:w-[calc(100%-16rem)]' : 'md:min-w-full' } bg-[var(--main-bcg)] ${isSidebarOpen ? 'md:ml-[16rem]' : 'md:ml-0' } flex justify-center items-center relative  min-h-[calc(100vh-5.063rem)]`}>
      <div className='text-center flex flex-col space-y-[1.5rem] items-center'>
        <h5 className='text-[1.125rem] font-bold text-[#828FA3]'>This board is empty. Create a new<br className='md:hidden'/> column to get started</h5>
        <button className='bg-[#635FC7] h-[3rem] w-[10.875rem] rounded-full'>
          <p className='text-[.938rem] font-bold text-[#ffffff]'>+ add new column</p>
        </button>
      </div>
      {!isSidebarOpen && <ShowSidebar />}
    </div>
  )
}

export default EmptyBoard