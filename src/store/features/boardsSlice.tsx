import {createSlice} from '@reduxjs/toolkit'
import boardData from '../../data.json'

interface InitialState {
  allBoards: typeof boardData.boards;
  selectedBoard:string;
}

const initialState:InitialState = {
  allBoards:boardData.boards,
  selectedBoard:'platform launch'
}

const boardSlice = createSlice({
  name:'boardSlice',
  initialState,
  reducers:{
   changeBoard:(state:InitialState, {payload}:{payload:string}) => {
    state.selectedBoard = payload
   }
  }
})

export const {changeBoard} = boardSlice.actions
export default boardSlice.reducer