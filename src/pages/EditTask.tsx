import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ModalOverlay from "../components/ui/ModalOverlay";
import BoardBcg from "../components/ui/BoardBcg";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import useOnclickOutside from "../hooks/useOnclickOutside";
import { closeAddModal, closeDetailModal, closeEditModal } from "../store/features/eventActionsSlice";
import InputCustom from "../components/InputCustom";
import cancel from "../assets/icon-cross.svg";
import {useForm} from 'react-hook-form'
import SelectRow from "../components/ui/SelectRow";
import { addNewTask, editTask } from "../store/features/boardsSlice";
import {v4 as uuid} from 'uuid'

interface Props {
  title:string;
  description:string;
  subtasks: {
    title: string;
    isCompleted: boolean;
}[];
  status:string;
}

const EditTask = (): JSX.Element => {
  const {allBoards, selectedBoard} = useAppSelector((store) => store.allBoards)
  const {editTaskDetails:{id, description,status,subtasks,title}} = useAppSelector((store) => store.eventsActions)
  const tasksList = allBoards.find((board) => board.name.trim().toLowerCase() === selectedBoard.trim().toLowerCase())
  const boardColumns = [...new Set(tasksList?.columns.map((item) => item.name))]
  const [formInputs, setFormInputs] = useState<{title:string, description:string, status:string}>({
    title:title,
    description:description,
    status:boardColumns[0]
  })
  const newArray = Array.from({length:subtasks.length}, (item, index) => '' + 'n' + index)
  const newArrangedSubtask = subtasks.map((taskItem, index) => ({...taskItem, id:index}))
  const [subtaskList, setSubtaskList] = useState<typeof newArrangedSubtask>([...newArrangedSubtask])
  const [subtasksValue, setSubtaskValue] = useState({})
  const boardRef = useRef<Element>(null);
  const dispatch = useAppDispatch();
  useOnclickOutside(boardRef, () => {
    dispatch(closeEditModal());
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
    // console.log(value);
    
    // setSubtaskValue(prev => ({...prev, [name]:value}))
    // // const recentObj = {title: subtaskList[index].title, isCompleted:false, id:index}
    // setSubtaskList((prevList) => prevList.map((item) => {
    //   if(item.id === index) {
    //     return {id:index, isCompleted:false, title:value}
    //   }
    //   return item
    // })) 
  }
  console.log(subtaskList);
  

  const addSubtask = () => {
    const lastIndex = subtaskList.length - 1
    setSubtaskList(prevList => [...prevList, {id:lastIndex + 1 , isCompleted:false, title:"add new"}])
  }

  const removeSubtask = (title:number) => {
    setSubtaskList(subtaskList.filter((listItem) => listItem.id !== title))
  }


  
  
    
  

  interface SingleTask {
    title: string;
    description: string;
    status: string;
    subtasks: {
        title: string;
        isCompleted: boolean;
    }[];
  }

  useEffect(() => {
    dispatch(closeDetailModal())
  })

  
  
  const onSubmitHandler = ()=> {
    dispatch(editTask({id:id,title:formInputs.title, description:formInputs.description, status:formInputs.status, subtasks:subtaskList}))
    dispatch(closeEditModal())
  }
  

  return (
    <ModalOverlay className="px-[1rem]">
      <BoardBcg overlayRef={boardRef}>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col space-y-[1.5rem] p-[1.5rem]">
          <h3 className="text-[1.125rem] font-bold capitalize text-[var(--board-text)]">
            edit task
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
                  const {id} = subtask
                  return (
                    <div key={index} className="flex items-center space-x-4">
                    <input
                      placeholder={subtask.title}
                      className={`input-bordered input w-full  max-w-full border-[#828FA3] bg-transparent py-[.5rem] text-[var(--board-text)] text-[.813rem] font-[500] placeholder:text-[.813rem] ${errors[subtask.title.trim().toLowerCase()] ? 'border-[#EA5555] border' : ''}  `}
                      {...register(`${index}` , {required:true, onChange:(e:React.ChangeEvent<HTMLInputElement>) => onSubtaskChange(e, subtask.id)})}
                      value={subtask.title}
                    ></input>
                    <img src={cancel} onClick={() => removeSubtask(id)} alt="cancel" />
                  </div>
                  )
                })}
            
              <button type="button" onClick={addSubtask} className="flex items-center justify-center rounded-full bg-[var(--subtasks-btn)] py-[.5rem]">
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
          <SelectRow selectList={boardColumns} value={formInputs.status}  name="status" onChange={handleChange} />
          </div>
          <button type="submit" className="flex items-center justify-center rounded-full bg-[#635FC7] py-[.5rem]">
                <p className="text-[.813rem] font-bold capitalize text-[#ffffff]">
                  save changes
                </p>
              </button>
        </form>
      </BoardBcg>
    </ModalOverlay>
  );
};

export default EditTask;
