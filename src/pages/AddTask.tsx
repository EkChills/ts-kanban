import React, { ChangeEvent, FormEvent, useState } from "react";
import {v4 as uuid} from 'uuid'
import ModalOverlay from "../components/ui/ModalOverlay";
import BoardBcg from "../components/ui/BoardBcg";
import {PuffLoader} from 'react-spinners'
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import useOnclickOutside from "../hooks/useOnclickOutside";
import { closeAddModal } from "../store/features/eventActionsSlice";
import InputCustom from "../components/InputCustom";
import cancel from "../assets/icon-cross.svg";
import {useForm} from 'react-hook-form'
import SelectRow from "../components/ui/SelectRow";
import { addNewTask } from "../store/features/boardsSlice";
import { toast } from "react-toastify";

const AddTask = (): JSX.Element => {
  const {allBoards, selectedBoard} = useAppSelector((store) => store.allBoards)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const tasksList = allBoards.find((board) => board.name.trim().toLowerCase() === selectedBoard.trim().toLowerCase())
  const boardColumns = [...new Set(tasksList?.columns.map((item) => item.name))]
  const [formInputs, setFormInputs] = useState<{title:string, description:string, status:string}>({
    title:'',
    description:'',
    status:boardColumns[0]
  })
  const [subtaskList, setSubtaskList] = useState<{
    id:number | string
    title: string;
    isCompleted: boolean;
}[]>([{id:uuid(), isCompleted:false, title:''}])
  const [subtasksValue, setSubtaskValue] = useState({})
  const boardRef = useRef<Element>(null);
  const dispatch = useAppDispatch();
  useOnclickOutside(boardRef, () => {
    dispatch(closeAddModal());
  });
  const {register, handleSubmit, formState:{errors}} = useForm()

  

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name,value} = e.target
    setFormInputs((prevInputs) => ({...prevInputs, [name]:value}))    
  }

  const onSubtaskChange = (e:React.ChangeEvent<HTMLInputElement>, index:number) => {
    const {name, value} = e.target
    const newValues = [...subtaskList]
    newValues[index].title = value
    setSubtaskList(newValues)
  }
  

  const addSubtask = () => {
    const lastIndex = subtaskList.length - 1
    setSubtaskList(prevList => [...prevList, {id:lastIndex + 1 , isCompleted:false, title:"add new"}])
  }

  const removeSubtask = (title:number | string) => {
    setSubtaskList(subtaskList.filter((listItem) => listItem.id !== title))
  }


  interface SingleTask {
    id:number | string;
    title: string;
    description: string;
    status: string;
    subtasks: {
        id:number | string
        title: string;
        isCompleted: boolean;
    }[];
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
      // const subtaskInput = Object.values(subtasksValue).map((subtask) => ({id:uuid(), title:subtask as string, isCompleted:false}))  
        dispatch(addNewTask({colName:formInputs.status, singleTask:{id:uuid(), title:formInputs.title, description:formInputs.description, status:formInputs.status,subtasks:[...subtaskList]} }))
        dispatch(closeAddModal())
        toast.success('Task Added')
    } catch (error) {
      console.log(error);
      
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
            add new task
          </h3>
          <div>
          <InputCustom
            Element="input"
            value={formInputs.title}
            inputId="title"
            placeholderText="e.g. Take coffee break"
            labelText="Title"
            className={`input-bordered input w-full max-w-full border-[#828FA3] bg-transparent py-[.5rem] text-[var(--board-text)] ${errors.title ? 'border-[#EA5555] border' : ''}`}
            {...register('title', {required:false, onChange:(e:React.ChangeEvent<HTMLInputElement>) => handleChange(e)})}
          />
          </div>
          <div>
          <InputCustom
            Element='textarea'
            value={formInputs.description}
            inputId="description"
            placeholderText="e.g. It’s always good to take a break. This15 minute break will  recharge the batteries a little."
            labelText="description"
            className={`input-bordered input min-h-[7rem] w-full max-w-full border-[#828FA3] bg-transparent py-[.5rem] text-[var(--board-text)] ${errors.description ? 'border-[#EA5555] border' : ''} `}
            {...register('description', {required:false, onChange:(e:React.ChangeEvent<HTMLSelectElement>) => handleChange(e)})}
          />
          </div>
          
          <div className="flex flex-col space-y-[.5rem]">
            <label className="text-[.75rem] font-bold capitalize text-[var(--select-label)]">
              subtasks
            </label>
            <div className="flex flex-col space-y-[.75rem]">
            {subtaskList.map((subtask, index) => {
                  return (
                    <div key={index} className="flex items-center space-x-4">
                    <input
                      placeholder={"e.g. Make coffee"}
                      className={`input-bordered input w-full  max-w-full border-[#828FA3] bg-transparent py-[.5rem] text-[var(--board-text)] placeholder:text-[.813rem] ${errors[subtask.title.trim().toLowerCase()] ? 'border-[#EA5555] border' : ''}  `}
                      {...register(`${index}`, {required:true, onChange:(e:React.ChangeEvent<HTMLInputElement>) => onSubtaskChange(e, index)})}
                    ></input>
                    <img src={cancel} onClick={() => removeSubtask(subtask.id)} className=" cursor-pointer" alt="cancel" />
                  </div>
                  )
                })}
            
              <button type="button" onClick={addSubtask} className="flex btn  items-center justify-center rounded-full bg-[var(--subtasks-btn)] py-[.5rem]">
                <p className="text-[.813rem] font-bold capitalize text-[#635FC7]">
                  + add new subtask
                </p>
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-[.5rem]">
          <label className="text-[.75rem] font-bold capitalize text-[var(--select-label)]">
              status
            </label>
          <SelectRow selectList={boardColumns || ['todo', 'doing', 'done']} value={formInputs.status} name="status" onChange={handleChange} />
          </div>
          <button type="submit" className="flex items-center btn hover:bg-opacity-50 justify-center rounded-full bg-[#635FC7] py-[.5rem]">
            {isLoading ? <PuffLoader size={27} color="#ffffff"/> :
                <p className="text-[.813rem] font-bold capitalize text-[#ffffff]">
                  Create Task
                </p>}
              </button>
        </form>
      </BoardBcg>
    </ModalOverlay>
  );
};

export default AddTask;
