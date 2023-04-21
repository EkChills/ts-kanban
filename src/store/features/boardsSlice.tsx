import { createSlice } from "@reduxjs/toolkit";
import boardData from "../../data.json";
import { getFromLocalStorage } from "../../utils/localStorage";
import { EditTaskDetails } from "./eventActionsSlice";
import AllBoards from "../../components/AllBoards";

type AllBoardsType =  {
  id:number | string;
  name: string;
  columns: {
      id:number | string;
      name: string;
      tasks: {
          id: number | string;
          title: string;
          description: string;
          status: string;
          subtasks: {
              id:number | string;
              title: string;
              isCompleted: boolean;
          }[];
      }[];
  }[];
}[]

interface InitialState {
  allBoards: AllBoardsType;
  selectedBoard: string;
  editedBoardInfo:BoardColumn;
}

const initialState: InitialState = {
  allBoards: getFromLocalStorage(boardData.boards, 'allTasks'),
  selectedBoard: getFromLocalStorage(boardData.boards, 'allTasks').length > 0 ? getFromLocalStorage(boardData.boards, 'allTasks')[0].name  : getFromLocalStorage(boardData.boards, 'allTasks').length <= 0 ? 'you have no boards' : "platform launch",
  editedBoardInfo:{id:'', name:'', columns:[]}

};

interface SingleTask {
  id:number | string;
  title: string;
  description: string;
  status: string;
  subtasks: {
    id:number | string;
    title: string;
    isCompleted: boolean;
  }[];
}

interface AddParams {
  payload: {
    colName: string;
    singleTask: SingleTask;
  };
}

export type Tasks = {
    id: string | number;
    title: string;
    description: string;
    status: string;
    subtasks: {
        id: string | number;
        title: string;
        isCompleted: boolean;
    }[];
}[];


type BoardColumn = {
  id:number | string;
  name:string,
  columns:{
    id:number | string;
    name:string;
    tasks:Tasks
  }[]
}



const boardSlice = createSlice({
  name: "boardSlice",
  initialState,
  reducers: {
    changeBoard: (state: InitialState, { payload }: { payload: string }) => {
      state.selectedBoard = payload;
    },
    addNewTask: (
      state: InitialState,
      { payload: { colName, singleTask } }: AddParams
    ) => {
      console.log(colName);
      
      const foundBoard = state.allBoards.find(board => board.name.trim().toLowerCase() === state.selectedBoard.toLowerCase().trim())?.
      columns.find((column) => column.name.trim().toLowerCase() === colName.trim().toLowerCase())
       
        if(foundBoard) {
          foundBoard.tasks = [...foundBoard.tasks, singleTask]
          return
        }
        console.log('not found');
        console.log(state.allBoards);

    },
    editTask:(state:InitialState,{payload}:{payload:SingleTask}) => {
      const currentBoard =  state.allBoards.find(board => board.name.trim().toLowerCase() === state.selectedBoard.toLowerCase().trim())
      const foundBoard = state.allBoards.find(board => board.name.trim().toLowerCase() === state.selectedBoard.toLowerCase().trim())?.
      columns.find((column) => column.name.trim().toLowerCase() === payload.status.trim().toLowerCase())
      if(foundBoard) {
        const checkItemPosition = foundBoard?.tasks.find((taskItem) => taskItem.id === payload.id)
        if(foundBoard.tasks.includes(checkItemPosition!)){
          const itemPositionIndex = foundBoard.tasks.indexOf(checkItemPosition!)
          foundBoard.tasks.splice(itemPositionIndex,1,payload)
          // console.log('im in ');
          
        } else {
          const filteredColumn = currentBoard?.columns.find((column) => column.tasks.find((item) => item.id == payload.id))
          filteredColumn!.tasks! = filteredColumn!.tasks.filter((column) => column.id !== payload.id)
          console.log(filteredColumn);
          
          foundBoard.tasks = [...foundBoard.tasks, payload]
          // filteredColumns?.filter(col => col.name === payload.status)
        }
        
      }
    },
    addBoard:(state:InitialState, {payload}:{payload:BoardColumn}) => {
      state.allBoards = [...state.allBoards, payload]
      state.selectedBoard = state.allBoards[0].name
    },
    setEditedBoardInfo:(state:InitialState, {payload}:{payload:BoardColumn}) => {
      state.editedBoardInfo = payload
    },
    editBoard:(state:InitialState, {payload}:{payload:BoardColumn}) => {
      const foundBoard = state.allBoards.find((board) => board.id === payload.id)
      console.log(foundBoard?.name);
      
      if(foundBoard) {
        let spliceIndex = state.allBoards.indexOf(foundBoard)
        let newBoards = state.allBoards.map((board) => {
          if(board.id === payload.id) {
            return payload
          }
          return board
        })
        console.log(spliceIndex);
        let tempBoards = [...state.allBoards]
        state.allBoards! = newBoards
      } else {
        return
      }
    },
    
    deleteTask: (
      state: InitialState,
      { payload}: {payload:EditTaskDetails}
    ) => {
      // console.log();
      
      const foundBoard = state.allBoards.find(board => board.name.trim().toLowerCase() === state.selectedBoard.toLowerCase().trim())?.
      columns.find((column) => column.name.trim().toLowerCase() === payload.status.trim().toLowerCase())
       
        if(foundBoard) {
          let NewTasks = [...foundBoard.tasks]
          NewTasks = NewTasks.filter((task) => task.id !== payload.id)
          foundBoard.tasks = [...NewTasks]
          return
        }
        console.log('not found');
        // console.log(state.allBoards);

    },
    deleteBoard:(state:InitialState, {payload}:{payload:BoardColumn}) => {
      let newBoards = [...state.allBoards]
      if(newBoards.length == 1 && newBoards[0].id === payload.id) {
        
        newBoards = []
        state.allBoards = newBoards
        state.selectedBoard = "You have no boards"
        return
      }
      newBoards = newBoards.filter((board) => board.id !== payload.id)
      
      
      
      state.allBoards = [...newBoards]
      state.selectedBoard = state.allBoards[0].name
    },
  },
});

export const { changeBoard, addNewTask, editTask, addBoard, editBoard, setEditedBoardInfo, deleteTask, deleteBoard } = boardSlice.actions;
export default boardSlice.reducer;
