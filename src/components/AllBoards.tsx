import { useAppSelector } from "../hooks/reduxHooks"
import BoardColumn from "./BoardColumn";



const AllBoards = ():JSX.Element => {
  const {allBoards, selectedBoard} = useAppSelector((store) => store.allBoards)
  const tasksList = allBoards.find((board) => board.name.trim().toLowerCase() === selectedBoard.trim().toLowerCase())
  const boardColumns = [...new Set(tasksList?.columns.map((item) => item.name))]
  
 
    return (
      <div className="pt-[4.5rem] md:pt-[1.5rem] pr-[1.5rem] pb-[1.5rem]">
        <div className="flex items-center pl-[1.5rem] space-x-[2.5rem] overflow-x-scroll">
          {boardColumns.map((column, index) => <BoardColumn tasksList={tasksList} colName={column} key={index} />)}
        </div>
      </div>
    )
  
}

export default AllBoards