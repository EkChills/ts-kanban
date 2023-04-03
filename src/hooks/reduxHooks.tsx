import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, GlobalState } from "../store/store";

export const useAppSelector:TypedUseSelectorHook<GlobalState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()