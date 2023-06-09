import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import BoardOption from "./ui/BoardOption";
import CreateBoard from "./ui/CreateBoard";
import ToggleTheme from "./ui/ToggleTheme";
import hideSidebar from '../assets/icon-hide-sidebar.svg'
import { useRef } from "react";
import useOnclickOutside from "../hooks/useOnclickOutside";
import { closeNavModal } from "../store/features/eventActionsSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseHelpers";
import { toast } from "react-toastify";
import { changeUser } from "../store/features/boardsSlice";


const NavModal = () => {
  const boardRef = useRef<any>(null)
  const dispatch = useAppDispatch()
  const { allBoards,user } = useAppSelector((store) => store.allBoards);
  useOnclickOutside(boardRef, () => dispatch(closeNavModal()))
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
    ref={boardRef}
      className={`mt-[5rem] relative md:pt-[8rem] py-[1rem] md:mt-0 flex flex-col w-[16.5rem]  md:w-[16rem] md:border-r md:border-r-[var(--lines-col)] rounded-lg md:rounded-none h-fit md:fixed md:top-0 md:left-0 md:h-auto md:bottom-0 `}
    >
      <h5 className="text-[0.75rem] font-bold text-[#828FA3] uppercase tracking-[.15rem] ml-[1.5rem] mb-4">
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
      <div className="flex md:absolute md:bottom-[6rem] md:flex-col md:space-y-8 md:w-full">
        <ToggleTheme />
        <div className="md:flex ml-[1.5rem] hidden  space-x-[10px]">
          <img src={hideSidebar} alt="hide-sidebar" />
          <p className="text-[.938rem] font-bold text-[#828FA3] capitalize">hide sidebar</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default NavModal;

const Wrapper = styled.div`
  background-color: var(--side-bar-bcg);

  @media (min-width: 768px) {
  }
`;
