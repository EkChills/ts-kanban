import React, { useRef, useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import ModalOverlay from "../components/ui/ModalOverlay";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import verticalEllipsis from "../assets/icon-vertical-ellipsis.svg";
import BoardBcg from "../components/ui/BoardBcg";
import Checkbox from "../components/ui/Checkbox";
import SelectRow from "../components/ui/SelectRow";
import useOnclickOutside from "../hooks/useOnclickOutside";
import { changeEditDetails, closeDetailModal, openDeleteTaskModal, openEditModal } from "../store/features/eventActionsSlice";
import EditTask from "./EditTask";
import { editTask } from "../store/features/boardsSlice";

interface Props {
  id:number | string
  title: string;
  description: string;
  status: string;
  subtasks: {
    id:number | string
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
  const [isSubtaskChecked, setIsSubtaskChecked] = useState<boolean>(false)
  const [selectValue, setSelectValue] = useState<string>(status)
  const tasksList = allBoards.find(
    (board) =>
      board.name.trim().toLowerCase() === selectedBoard.trim().toLowerCase()
  );
  const boardColumns = [
    ...new Set(tasksList?.columns.map((item) => item.name)),
  ];
  const {  isEditModalOpen, isDetailModalOpen,editTaskDetails } = useAppSelector((store) => store.eventsActions);
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
  },[isSubtaskChecked,selectValue])

  const handleSubtaskChange = (e:React.ChangeEvent<HTMLInputElement> ,currentSubtaskIndex:number) => {    
    const {checked} = e.target
    setIsSubtaskChecked(checked)
    let newTs = subtasks.map((sub) => ({id:sub.id, isCompleted:sub.isCompleted, title:sub.title}))
    const newSubs = [...newTs]
    newSubs[currentSubtaskIndex].isCompleted = checked
    
    dispatch(editTask({id:id,title:title, description:description, status:status, subtasks:[...newSubs]}))
    
  }


  const handleSelectChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value)
    // dispatch(editTask({id:id,title:title, description:description, status:selectValue, subtasks:subtasks}))
    // console.log(boardColumns);
  }

  useEffect(() => {
     dispatch(editTask({id:id,title:title, description:description, status:selectValue, subtasks:subtasks}))
  },[selectValue])
  

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
                <span className="text-[.813rem] cursor-pointer font-[500] text-[#828FA3]" onClick={handleOpenEdit} >
                  Edit Task
                </span>
                <span onClick={() => {
                  dispatch(openDeleteTaskModal())
                }} className="text-[.813rem] cursor-pointer font-[500] text-[#EA5555]">
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
          <div className="flex flex-col space-y-[.5rem] ">
            {subtasks.map((subtask, index) => {
              const { isCompleted, title } = subtask;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-[1rem]  bg-[var(--main-bcg)] px-[1rem] rounded-md py-[.813rem]"
                >
                  <Checkbox isChecked={isCompleted} handleChange={(e:React.ChangeEvent<HTMLInputElement>) => handleSubtaskChange(e, index)} />
                  <span className="text-[.75rem] relative font-bold text-[var(--subtask-text)]">
                    {title}
                  {isCompleted && <div className="absolute left-0 w-full h-[1px] top-1/2 bg-[var(--subtask-text)]"></div>}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col space-y-[.5rem]">
          <h4 className="text-[.75rem] font-bold text-[var(--select-label)]">
            Status
          </h4>
          {/* <SelectRow selectedTask={selectValue} onChange={handleSelectChange} selectList={boardColumns} /> */}
          <select
      value={selectValue}
      onChange={handleSelectChange}
      className="select-bordered select w-full max-w-full border-[#828FA3] bg-transparent capitalize text-[var(--tasks-text)]"
    >
      {boardColumns.map((option, index) => {
        return (
          <option  key={index} value={option} >
            {option}
          </option>
        );
      })}
    </select>
        </div>
      </BoardBcg>
    </ModalOverlay>
    </>
  );
};

export default SingleTaskDetails;
