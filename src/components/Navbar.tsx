import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";
import logoMobile from "../assets/logo-mobile.svg";
import styled from "styled-components";
import addTask from "../assets/icon-add-task-mobile.svg";
import chevronDown from "../assets/icon-chevron-down.svg";
import ReactDOM from "react-dom";
import chevronUp from "../assets/icon-chevron-up.svg";
import verticalEllipsis from "../assets/icon-vertical-ellipsis.svg";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import NavBoardModal from "./modals/NavBoardModal";
import { openAddModal, openDeleteBoardModal, openEditBoard, openNavModal } from "../store/features/eventActionsSlice";
import { RefObject, useRef, useState } from "react";
import useOnclickOutside from "../hooks/useOnclickOutside";
import { deleteBoard } from "../store/features/boardsSlice";

const Navbar = () => {
  const { theme, isNavModalOpen, isSidebarOpen } = useAppSelector(
    (store) => store.eventsActions
  );
  const { selectedBoard, editedBoardInfo } = useAppSelector((store) => store.allBoards);
  const dispatch = useAppDispatch();
  const portalCont = document.getElementById("modal") as
    | Element
    | DocumentFragment;
  const [showEditDropdown, setShowEditDropdown] = useState<boolean>(false)
  const editDropdownRef = useRef(null)  
  useOnclickOutside(editDropdownRef, () => setShowEditDropdown(false))

  const handleOpenEdit = () => {
    setShowEditDropdown(true)
  }

  const deleteSelectedBoard = () => {
    dispatch(openDeleteBoardModal())
  }

  return (
    <Wrapper
      className={`fixed left-0 right-0 top-0 z-[60] h-[4rem] border-b-2 px-[1rem]  ${
        isSidebarOpen
          ? "border-b-[var(--lines-col)]"
          : "border-b-[var(--lines-col)] "
      } flex items-center justify-between md:h-[5.063rem] md:px-[1.5rem]`}
    >
      <div className="relative flex items-center space-x-[1rem] md:space-x-[1rem]">
        <img src={logoMobile} className="md:hidden" alt="logo" />
        <img
          src={theme === "dark-mode" ? logoLight : logoDark}
          className="z-[100] hidden md:block "
          alt=""
        />
        <div className="logo-line absolute hidden md:block "></div>
        <div className="flex cursor-pointer items-center space-x-[.5rem] md:pl-[4rem]">
          <span className="board-text text-[1.125rem] font-bold capitalize md:text-[1.25rem]">
            {selectedBoard}
          </span>
          <img
            src={isNavModalOpen ? chevronUp : chevronDown}
            onClick={() => dispatch(openNavModal())}
            className="md:hidden"
            alt="arrow-open"
          />
        </div>
      </div>
      <div className="flex items-center relative space-x-[1rem] md:space-x-[1.5rem]">
        <button onClick={() => dispatch(openAddModal())} className="flex btn h-[2rem] w-[3rem] cursor-pointer items-center justify-center rounded-full bg-[#635FC7] md:h-[3rem] md:w-[11.5rem] md:space-x-[.5rem]">
          <img src={addTask} alt="add task icon" />
          <p className="hidden text-[0.938rem] font-bold capitalize text-[#ffffff] md:block">
            add new task
          </p>
        </button>
        <img className="cursor-pointer" src={verticalEllipsis} onClick={handleOpenEdit} alt="ellipsis hamburger" />
        {showEditDropdown && <div ref={editDropdownRef} className="absolute right-[2rem] top-[3rem] min-w-[160px] w-full max-w-[192px] rounded-md bg-[var(--edit-dropdown)] p-4 ">
              <div className="flex flex-col space-y-4">
                <span className="text-[.813rem] cursor-pointer font-[500] text-[#828FA3]" onClick={() => dispatch(openEditBoard())} >
                  Edit Board
                </span>
                <span onClick={deleteSelectedBoard} className="text-[.813rem] cursor-pointer font-[500] text-[#EA5555]">
                  Delete board
                </span>
              </div>
            </div>}
      </div>
      {isNavModalOpen && ReactDOM.createPortal(<NavBoardModal />, portalCont)}
    </Wrapper>
  );
};

const Wrapper = styled.nav`

background-color: var(--nav-bcg);
  .board-text {
    color: var(--board-text);
  }

  .logo-line {
    position: absolute;
    content: "";
    width: 1px;
    top: -1.5rem;
    bottom: -1.5rem;
    left: 13.5rem;
    background-color: var(--lines-col);
  }

  /* @media (min-width: 768px) {
  .logo-line {
    left:15rem;
  } */
`

export default Navbar;
