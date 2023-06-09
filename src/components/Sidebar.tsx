import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { signOut,deleteUser } from "firebase/auth";
import BoardOption from "./ui/BoardOption";
import CreateBoard from "./ui/CreateBoard";
import logoDark from "../assets/logo-dark.svg";
import { auth } from "../firebase/firebaseHelpers";
import logoLight from "../assets/logo-light.svg";
import ToggleTheme from "./ui/ToggleTheme";
import hideSidebar from "../assets/icon-hide-sidebar.svg";
import { closeSidebar } from "../store/features/eventActionsSlice";
import localStorage from "../utils/localStorage";
import { changeUser } from "../store/features/boardsSlice";
import { toast } from "react-toastify";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { allBoards, user } = useAppSelector((store) => store.allBoards);
  const { theme } = useAppSelector((store) => store.eventsActions);
  const signOutUser = async() => {
    try {
      await signOut(auth)
      localStorage.removeItem('kanban-user')
      toast.success('Logout successful')
      dispatch(changeUser(null))
      
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <Wrapper
      className={`relative z-[90] mt-[5rem] hidden h-fit w-[16.5rem] flex-col rounded-lg py-[1rem]  md:fixed  md:bottom-0 md:left-0 md:top-0 md:mt-0 md:flex md:h-auto md:w-[16rem] md:rounded-none md:border-r md:border-r-[var(--lines-col)] `}
    >
      <div className="mb-[5rem] ml-[1.5rem] mt-[.9rem] items-start">
        <img
          src={theme === "dark-mode" ? logoLight : logoDark}
          className="hidden md:z-[80] md:block"
          alt=""
        />
      </div>
      <h5 className="mb-4 ml-[1.5rem] text-[0.75rem] font-bold uppercase tracking-[.15rem] text-[#828FA3]">
        all boards({allBoards.length})
      </h5>
      <div className="pr-[1.5rem]">
        {allBoards.map((board, index) => (
          <BoardOption key={index} boardName={board.name} />
        ))}
        <CreateBoard />
      </div>
      <div className="pl-[1.5rem] mt-auto flex items-center space-x-2">
      <div className="w-[3rem] h-[3rem] rounded-full cursor-pointer flex items-center justify-center bg-[#635FC7] text-white text-[1.5rem] font-bold border-2 border-white">
        <p>{user?.email?.substring(0,2)}</p>
      </div>
          <button onClick={signOutUser} className="btn bg-[#635FC7] flex items-center justify-center text-[1rem] font-bold text-white">
            Sign Out
          </button>
      </div>
      <div className="flex md:absolute md:bottom-[6rem] md:w-full md:flex-col md:space-y-8">
        <ToggleTheme />
        <div
          className="ml-[1.5rem] hidden cursor-pointer  space-x-[10px] md:flex"
          onClick={() => dispatch(closeSidebar())}
        >
          <img src={hideSidebar} alt="hide-sidebar" />
          <p className="text-[.938rem] font-bold capitalize text-[#828FA3]">
            hide sidebar
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  background-color: var(--side-bar-bcg);

  @media (min-width: 768px) {
  }
`;
