import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage } from "../../utils/localStorage";

type EditTaskDetails= {
  title:string;
  description:string;
  subtasks: {
    title: string;
    isCompleted: boolean;
}[];
  status:string
}

interface InitialState {
  isNavModalOpen: boolean;
  isSidebarOpen: boolean;
  isBoardOpen:boolean;
  isDetailModalOpen:boolean;
  theme:string;
  modalParam:string;
  isAddModalOpen:boolean;
  isEditModalOpen:boolean;
  editTaskDetails:EditTaskDetails
}

const initialState:InitialState = {
  isNavModalOpen: false,
  isSidebarOpen: false,
  isBoardOpen: false,
  isDetailModalOpen:false,
  theme:getFromLocalStorage('dark-mode', 'kanban-theme'),
  modalParam:'',
  isAddModalOpen:false,
  isEditModalOpen:false,
  editTaskDetails:{
    description:'',
    status:'',
    subtasks:[],
    title:''
  }
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
    openDetailModal:(state:InitialState) => {
      state.isDetailModalOpen = true
    },
    closeDetailModal:(state:InitialState) => {
      state.isDetailModalOpen = false
    },
    openAddModal:(state:InitialState) => {
      state.isAddModalOpen = true
    },
    closeAddModal:(state:InitialState) => {
      state.isAddModalOpen = false
    },
    openEditModal:(state:InitialState) => {
      state.isEditModalOpen = true
    },
    closeEditModal:(state:InitialState) => {
      state.isEditModalOpen = false
    },
    changeEditDetails:(state:InitialState, {payload}:{payload:EditTaskDetails}) => {
      state.editTaskDetails = payload
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
    changeModalParam:(state:InitialState, {payload}:{payload:string}) => {
      state.modalParam = payload
    }
  },
});

export const {changeTheme, toggleTheme, openNavModal, closeNavModal, openSidebar, closeSidebar, 
  openDetailModal, 
  closeDetailModal, 
  changeModalParam,
  openAddModal,
  closeAddModal,
  openEditModal,
  closeEditModal,
  changeEditDetails
} =  actionsSLice.actions
export default actionsSLice.reducer;
