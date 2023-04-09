import { createSlice } from "@reduxjs/toolkit";
import boardData from "../../data.json";
import { getFromLocalStorage } from "../../utils/localStorage";

interface InitialState {
  allBoards: typeof boardData.boards;
  selectedBoard: string;
}

const initialState: InitialState = {
  allBoards: getFromLocalStorage(boardData.boards, 'allTasks'),
  selectedBoard: "platform launch",
};

interface SingleTask {
  title: string;
  description: string;
  status: string;
  subtasks: {
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
  },
});

export const { changeBoard, addNewTask } = boardSlice.actions;
export default boardSlice.reducer;
