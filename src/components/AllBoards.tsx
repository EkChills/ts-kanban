import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks"
import BoardColumn from "./BoardColumn";
import { deleteTask, setEditedBoardInfo } from "../store/features/boardsSlice";
import DeleteModal from "./modals/DeleteModal";
import ReactDOM from 'react-dom'
import { closeDeleteBoardModal, closeDeleteTaskModal } from "../store/features/eventActionsSlice";
import { toast } from "react-toastify";




const AllBoards = React.memo(():JSX.Element => {
  const {allBoards, selectedBoard, editedBoardInfo} = useAppSelector((store) => store.allBoards)
  const {isDeleteTaskModalOpen, editTaskDetails} = useAppSelector((store) => store.eventsActions)
  const tasksList = allBoards.find((board) => board.name.trim().toLowerCase() === selectedBoard.trim().toLowerCase()) || allBoards[0]
  const boardColumns = [...new Set(tasksList?.columns.map((item) => item.name))]
  const dispatch = useAppDispatch()
  // let coo = tasksList?.columns

  useEffect(() => {
    dispatch(setEditedBoardInfo({id:tasksList!.id, name:tasksList!.name, columns:tasksList!.columns}))
  },[selectedBoard, setEditedBoardInfo])

  const deleteFunc = () => {
    dispatch(closeDeleteTaskModal())
    dispatch(deleteTask(editTaskDetails))
    toast.success('the task has been successfully removed')
  }
  
 
    return (
      <div className="pt-[4.5rem] md:pt-[1.5rem] pr-[1.5rem] pb-[1.5rem]">
        <div className="flex items-center pl-[1.5rem] space-x-[2.5rem] overflow-x-scroll">
          {boardColumns.map((column, index) => <BoardColumn tasksList={tasksList} colName={column} key={index} />)}
        </div>
        {isDeleteTaskModalOpen && ReactDOM.createPortal(<DeleteModal deleteFunc={deleteFunc} deleteFor="task" taskName={editTaskDetails.title} />, document.getElementById('modal') as HTMLElement )}
      </div>
    )
  
})

export default AllBoards