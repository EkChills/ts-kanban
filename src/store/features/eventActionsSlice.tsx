import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isNavModalOpen: boolean;
  isSidebarOpen: boolean;
  isBoardOpen:boolean;
  theme:string;
}

const initialState:InitialState = {
  isNavModalOpen: false,
  isSidebarOpen: false,
  isBoardOpen: false,
  theme:'light-mode'
};



const actionsSLice = createSlice({
  name: "actionsSlice",
  initialState,
  reducers: {
    openNavModal:(state:InitialState) => {
      state.isNavModalOpen = true
    },
    closeNavModal:(state:InitialState) => {
      state.isNavModalOpen = false
    },
    openSidebar:(state:InitialState) => {
      state.isSidebarOpen = true
    },
    closeSidebar:(state:InitialState) => {
      state.isSidebarOpen = false
    },
    toggleTheme:(state:InitialState, {payload}:{payload:boolean}) => {
      if(payload) {
        state.theme = 'dark-mode'
        console.log(state.theme);
        
        return
      }
      state.theme = 'light-mode'
      console.log(state.theme);
    },
    changeTheme:(state:InitialState, {payload}:{payload:string}) => {
      state.theme = payload
    },
    openBoard:(state:InitialState) => {
      state.isBoardOpen = true
    },
    closeBoard:(state:InitialState) => {
      state.isBoardOpen = false
    },
  },
});

export const {changeTheme, toggleTheme, openNavModal, closeNavModal, openSidebar, closeSidebar} =  actionsSLice.actions
export default actionsSLice.reducer;
