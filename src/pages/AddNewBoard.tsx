import React, { ChangeEvent, FormEvent, RefObject, useState } from "react";
import {v4 as uuid} from 'uuid'
import ModalOverlay from "../components/ui/ModalOverlay";
import BoardBcg from "../components/ui/BoardBcg";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import useOnclickOutside from "../hooks/useOnclickOutside";
import { closeAddBoardModal, closeAddModal } from "../store/features/eventActionsSlice";
import InputCustom from "../components/InputCustom";
import cancel from "../assets/icon-cross.svg";
import {useForm} from 'react-hook-form'
import SelectRow from "../components/ui/SelectRow";
import { addBoard, addNewTask } from "../store/features/boardsSlice";

const AddNewBoard = (): JSX.Element => {
  const {allBoards, selectedBoard} = useAppSelector((store) => store.allBoards)
  const boardRef = useRef<RefObject<HTMLElement> | null>(null)
  const tasksList = allBoards.find((board) => board.name.trim().toLowerCase() === selectedBoard.trim().toLowerCase())
  const dispatch = useAppDispatch()
  const [boardColumns, setBoardColumns] = useState<{
    id:number | string;
    name:string;
    tasks:[]
  }[]>([{id:uuid(), name:"", tasks:[]}])
  const {formState:{errors}, register, handleSubmit} = useForm()
  useOnclickOutside(boardRef, () => dispatch(closeAddBoardModal()))
  const [boardNameInput, setBoardNameInput] = useState<string>()

  type BoardColumn = {
    name:string,
    columns:{
      id:number | string;
      name:string;
      tasks:[]
    }[]
  }

  const onBoardNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setBoardNameInput(e.target.value)
  }

  const onBoardColumnChange = (e:React.ChangeEvent<HTMLInputElement>, index:number) => {
    const newValues = [...boardColumns]
    newValues[index] = {...newValues[index], name:e.target.value, tasks:[]}
    setBoardColumns(newValues)
  }

  const removeBoard = (id:number | string) => {
  setBoardColumns((prevColumns) => prevColumns.filter(column => column.id !== id))
  }

  const addBoardColumn = () => {
    setBoardColumns(prev => [...prev, {id:uuid(), name:"", tasks:[]}])
  }
 
  const onSubmitHandler = () => {
    dispatch(addBoard({id:uuid(), name:boardNameInput!, columns:[...boardColumns]}))
    dispatch(closeAddBoardModal())
  }

  
  

  return (
    <ModalOverlay className="px-[1rem]">
      <BoardBcg overlayRef={boardRef}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col space-y-[1.5rem] p-[1.5rem]">
          <h3 className="text-[1.125rem] font-bold capitalize text-[var(--board-text)]">
            add new board
          </h3>
          <div>
          <InputCustom
            Element="input"
            value={boardNameInput}
            inputId="boardName"
            placeholderText="e.g. Web Design"
            labelText="Board Name"
            className={`input-bordered input w-full  max-w-full border-[#828FA3] bg-transparent py-[.5rem] text-[var(--board-text)] placeholder:text-[.813rem] ${errors[`boardName`] ? 'border-[#EA5555] border' : ''}  `}
            {...register('boardName', {required:false, onChange:(e:React.ChangeEvent<HTMLInputElement>) => onBoardNameChange(e)})}
          />
          </div>
          
          <div className="flex flex-col space-y-[.5rem]">
            <label className="text-[.75rem] font-bold capitalize text-[var(--select-label)]">
              board columns
            </label>
            <div className="flex flex-col space-y-[.75rem]">
            {boardColumns.map((column, index) => {
                  return (
                    <div key={index} className="flex items-center space-x-4">
                    <input
                      placeholder={"e.g Todo"}
                      className={`input-bordered input w-full  max-w-full border-[#828FA3] bg-transparent py-[.5rem] text-[var(--board-text)] placeholder:text-[.813rem] ${errors[`${index}`] ? 'border-[#EA5555] border' : ''}  `}
                      {...register(`${index}`, {required:true, onChange:(e:React.ChangeEvent<HTMLInputElement>) => onBoardColumnChange(e, index)})}
                    ></input>
                    <img src={cancel} onClick={() => removeBoard(column.id)} alt="cancel" />
                  </div>
                  )
                })}
            
              <button type="button" onClick={addBoardColumn} className="flex items-center justify-center rounded-full bg-[var(--subtasks-btn)] py-[.5rem]">
                <p className="text-[.813rem] font-bold capitalize text-[#635FC7]">
                  + add new subtask
                </p>
              </button>
            </div>
          </div>
          <button type="submit" className="flex items-center justify-center rounded-full bg-[#635FC7] py-[.5rem]">
                <p className="text-[.813rem] font-bold capitalize text-[#ffffff]">
                  Create Task
                </p>
              </button>
        </form>
      </BoardBcg>
    </ModalOverlay>
  );
};

export default AddNewBoard;
