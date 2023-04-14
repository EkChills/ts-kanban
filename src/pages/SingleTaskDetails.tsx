import React, { useRef, useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import ModalOverlay from "../components/ui/ModalOverlay";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import verticalEllipsis from "../assets/icon-vertical-ellipsis.svg";
import BoardBcg from "../components/ui/BoardBcg";
import Checkbox from "../components/ui/Checkbox";
import SelectRow from "../components/ui/SelectRow";
import useOnclickOutside from "../hooks/useOnclickOutside";
import { changeEditDetails, closeDetailModal, openEditModal } from "../store/features/eventActionsSlice";
import EditTask from "./EditTask";

interface Props {
  id:number | string
  title: string;
  description: string;
  status: string;
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
  completedSubtasks: number;
}

const SingleTaskDetails = ({
  id,
  title,
  description,
  status,
  subtasks,
  completedSubtasks,
}: Props) => {
  const { allBoards, selectedBoard } = useAppSelector(
    (store) => store.allBoards
  );
  const [showEditDropdown, setShowEditDropdown] = useState<boolean>(false);
  const tasksList = allBoards.find(
    (board) =>
      board.name.trim().toLowerCase() === selectedBoard.trim().toLowerCase()
  );
  const boardColumns = [
    ...new Set(tasksList?.columns.map((item) => item.name)),
  ];
  const {  isEditModalOpen } = useAppSelector((store) => store.eventsActions);
  const overlayRef = useRef(null);
  const editDropdownRef = useRef(null)
  const dispatch = useAppDispatch();
  useOnclickOutside(overlayRef, () => dispatch(closeDetailModal()));
  useOnclickOutside(editDropdownRef, () => setShowEditDropdown(false))  

  const handleOpenEdit = () => {
    setShowEditDropdown(false) 
    dispatch(openEditModal())
    dispatch(closeDetailModal())
  }

  useEffect(() => {
    dispatch(changeEditDetails({
      id:id,
      description:description,
      status:status,
      subtasks:subtasks,
      title:title
    }))
  },[])

  return (
    <>
    <ModalOverlay className="px-[1rem]">
      <BoardBcg
        overlayRef={overlayRef}
        className=" flex flex-col space-y-[1.5rem] p-[2rem]"
      >
        <article className="flex flex-col space-y-[1.5rem]">
          <div className="relative flex items-center justify-between">
            <h3 className="max-w-[274px] text-[1.125rem] font-bold text-[var(--board-text)] md:max-w-[387px]">
              {title}
            </h3>
            <img
              onClick={() => setShowEditDropdown(true)}
              src={verticalEllipsis}
              className="cursor-pointer"
              alt="vertical ellipsis"
            />
            {showEditDropdown && <div ref={editDropdownRef} className="absolute left-[273px] top-[93px] min-w-[160px] w-full max-w-[192px] rounded-md bg-[var(--edit-dropdown)] p-4 md:left-[353px]">
              <div className="flex flex-col space-y-4">
                <span className="text-[.813rem] font-[500] text-[#828FA3]" onClick={handleOpenEdit} >
                  Edit Task
                </span>
                <span className="text-[.813rem] font-[500] text-[#EA5555]">
                  Delete Task
                </span>
              </div>
            </div>}
          </div>
          <p className="text-[0.813rem] font-[500] text-[#828FA3] ">
            {description}
          </p>
        </article>
        <div className="flex flex-col space-y-[1rem]">
          <h4 className="text-[.75rem] font-bold text-[var(--board-text)] ">
            Subtasks({completedSubtasks} of {subtasks.length})
          </h4>
          <div className="flex flex-col space-y-[.5rem]">
            {subtasks.map((subtask, index) => {
              const { isCompleted, title } = subtask;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-[1rem] bg-[var(--main-bcg)] px-[1rem] py-[.813rem]"
                >
                  <Checkbox isChecked={isCompleted} />
                  <p className="text-[.75rem] font-bold text-[var(--subtask-text)]">
                    {title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col space-y-[.5rem]">
          <h4 className="text-[.75rem] font-bold text-[var(--select-label)]">
            Status
          </h4>
          <SelectRow selectedTask={status} selectList={boardColumns} />
        </div>
      </BoardBcg>
    </ModalOverlay>
    </>
  );
};

export default SingleTaskDetails;
