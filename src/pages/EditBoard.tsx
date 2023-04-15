import React, { ChangeEvent, FormEvent, RefObject, useState } from "react";
import {v4 as uuid} from 'uuid'
import ModalOverlay from "../components/ui/ModalOverlay";
import BoardBcg from "../components/ui/BoardBcg";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {PuffLoader} from 'react-spinners'
import useOnclickOutside from "../hooks/useOnclickOutside";
import { closeAddBoardModal, closeAddModal, closeEditBoard } from "../store/features/eventActionsSlice";
import InputCustom from "../components/InputCustom";
import cancel from "../assets/icon-cross.svg";
import {useForm} from 'react-hook-form'
import { Tasks } from "../store/features/boardsSlice";
import { addBoard, addNewTask, editBoard } from "../store/features/boardsSlice";
import { toast } from "react-toastify";

const EditBoard = (): JSX.Element => {
  const {allBoards, selectedBoard, editedBoardInfo} = useAppSelector((store) => store.allBoards)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const boardRef = useRef<RefObject<HTMLElement> | null>(null)
  const tasksList = allBoards.find((board) => board.name.trim().toLowerCase() === selectedBoard.trim().toLowerCase())
  const dispatch = useAppDispatch()
  const [boardColumns, setBoardColumns] = useState<{
    id:number | string;
    name:string;
    tasks:Tasks
  }[]>(editedBoardInfo.columns)
  const {formState:{errors}, register, handleSubmit} = useForm()
  useOnclickOutside(boardRef, () => dispatch(closeEditBoard()))
  const [boardNameInput, setBoardNameInput] = useState<string>(editedBoardInfo.name)

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

  const dummyFetch = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('resolved'), 2000)
    })
  }
  
 
  const onSubmitHandler = async() => {
    try {
      setIsLoading(true)
      await dummyFetch()
      dispatch(editBoard({...editedBoardInfo, name:boardNameInput!, columns:boardColumns}))
      dispatch(closeEditBoard())
      toast.success('Column Added')
    } catch (error) {
      
    }
    finally {
      setIsLoading(false)
    }
  }

  
  

  return (
    <ModalOverlay className="px-[1rem]">
      <BoardBcg overlayRef={boardRef}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col space-y-[1.5rem] p-[1.5rem]">
          <h3 className="text-[1.125rem] font-bold capitalize text-[var(--board-text)]">
            edit board
          </h3>
          <div>
          <InputCustom
            Element="input"
            value={boardNameInput}
            inputId="boardName"
            placeholderText="e.g. Web Design"
            labelText="Board Name"
            className={`input-bordered input w-full  max-w-full border-[#828FA3] bg-transparent py-[.5rem] text-[var(--board-text)] placeholder:text-[.813rem] ${errors[`boardName`] ? 'border-[#EA5555] border' : ''}  `}
            {...register('boardName', {required:false,  onChange:(e:React.ChangeEvent<HTMLInputElement>) => onBoardNameChange(e)})}
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
                      value={column.name}
                      className={`input-bordered input w-full  max-w-full border-[#828FA3] bg-transparent py-[.5rem] text-[var(--board-text)] placeholder:text-[.813rem] ${errors[`${index}`] ? 'border-[#EA5555] border' : ''}  `}
                      {...register(`${index}`, {required:true,  onChange:(e:React.ChangeEvent<HTMLInputElement>) => onBoardColumnChange(e, index)})}
                    ></input>
                    <img src={cancel} onClick={() => removeBoard(column.id)} alt="cancel" />
                  </div>
                  )
                })}
            
              <button type="button" onClick={addBoardColumn} className="flex btn items-center justify-center rounded-full bg-[var(--subtasks-btn)] py-[.5rem]">
                <p className="text-[.813rem] font-bold capitalize text-[#635FC7]">
                  + add new column
                </p>
              </button>
            </div>
          </div>
          <button type="submit" className="flex btn items-center justify-center rounded-full bg-[#635FC7] py-[.5rem]">
            {isLoading ? <PuffLoader size={27} color="#ffffff" /> :
                <p className="text-[.813rem] font-bold capitalize text-[#ffffff]">
                  save changes
                </p>}
              </button>
        </form>
      </BoardBcg>
    </ModalOverlay>
  );
};

export default EditBoard;
