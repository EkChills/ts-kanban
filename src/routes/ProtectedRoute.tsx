import { Navigate } from "react-router-dom";

import React from 'react'
import { useAppSelector } from "../hooks/reduxHooks";
import { store } from "../store/store";

export default function ProtectedRoute({children}:{children:React.ReactNode}):JSX.Element | React.ReactNode | any  {
  const {user} = useAppSelector((store) => store.allBoards)

  if(!user) {
    return <Navigate to="/register" />
  }
  return children
}


