import { useDispatch } from "react-redux"
import { useAppSelector } from "../../hooks/reduxHooks"
import { changeBoard } from "../../store/features/boardsSlice"
import { closeNavModal, openAddBoardModal } from "../../store/features/eventActionsSlice"

const BoardOption = ({boardName}:{boardName:string}) => {
  const {selectedBoard} = useAppSelector((store) => store.allBoards)
  const dispatch = useDispatch()
  return (
    <div onClick={() =>{
     dispatch(changeBoard(boardName))
     dispatch(closeNavModal())
    }
     } className={`flex pl-[1.5rem] select-none cursor-pointer items-center space-x-[.75rem] py-[1rem] rounded-r-full ${selectedBoard.trim().toLowerCase() === boardName.trim().toLowerCase() ? 'bg-[#635FC7]' : 'bg-[none]'}`}>
      <svg width="16" height="16" className={`${selectedBoard.trim().toLowerCase() === boardName.trim().toLowerCase() ? 'fill-[#ffffff]' : 'fill-[#828FA3]'}`} xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"/></svg>
      <p className={`text-[0.938rem]  ${selectedBoard.trim().toLowerCase() === boardName.trim().toLowerCase() ? 'text-[#ffffff]' : 'text-[#828FA3]'} font-bold`}>{boardName}</p>
    </div>
  )
}

export default BoardOption