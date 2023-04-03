import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./features/boardsSlice";
import eventActionsSlice from "./features/eventActionsSlice";


export const store = configureStore({
  reducer:{
    allBoards:boardsSlice,
    eventsActions:eventActionsSlice
  }
})

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch