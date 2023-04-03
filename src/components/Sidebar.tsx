import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import BoardOption from "./ui/BoardOption";
import CreateBoard from "./ui/CreateBoard";
import ToggleTheme from "./ui/ToggleTheme";
import hideSidebar from '../assets/icon-hide-sidebar.svg'
import { useRef } from "react";
import useOnclickOutside from "../hooks/useOnclickOutside";
import { closeNavModal, closeSidebar } from "../store/features/eventActionsSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch()
  const { allBoards } = useAppSelector((store) => store.allBoards);
  return (
    <Wrapper
      className={`hidden mt-[5rem] relative md:pt-[8rem] py-[1rem] md:mt-0 md:flex flex-col w-[16.5rem]  md:w-[16rem] md:border-r md:border-r-[var(--lines-col)] rounded-lg md:rounded-none h-fit md:fixed md:top-0 md:left-0 md:h-auto md:bottom-0 `}
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
      <div className="flex md:absolute md:bottom-[6rem] md:flex-col md:space-y-8 md:w-full">
        <ToggleTheme />
        <div className="md:flex ml-[1.5rem] hidden  space-x-[10px] cursor-pointer" onClick={() => dispatch(closeSidebar())}>
          <img src={hideSidebar} alt="hide-sidebar" />
          <p className="text-[.938rem] font-bold text-[#828FA3] capitalize">hide sidebar</p>
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
