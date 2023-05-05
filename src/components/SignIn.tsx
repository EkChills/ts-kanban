import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import FormRow from "./FormRow";
import { auth } from "../firebase/firebaseHelpers";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { changeUser } from "../store/features/boardsSlice";
import {CircleLoader,PacmanLoader} from 'react-spinners'
import { addUserToLocalStorage } from "../utils/localStorage";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";

export default function SignIn({setIsMember}:{setIsMember:Dispatch<React.SetStateAction<boolean>>}) {
  const [formInputs, setFormInputs] = useState<{
    email: string;
    password: string;
  }>({email:'', password:''});
  const [isError, setIsError] = useState<{
    emailErr:boolean;
    passwordErr:boolean;
  }>({emailErr:false, passwordErr:false})
  const {user} = useAppSelector(store => store.allBoards)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormInputs((prevInputs) => ({...prevInputs, [name]:value}))
    if(formInputs.email !== '' ) {
      setIsError(prev => ({...prev, emailErr:false}))
    } 
    if(formInputs.password !== '') {
      setIsError(prev => ({...prev, passwordErr:false}))
    }
  }


  const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!formInputs.email || !formInputs.password  || 
      formInputs.email.length < 3 || formInputs.password.length < 8 || !formInputs.email.includes('@')) {
      if(!formInputs.email) {
        setIsError(prev => ({...prev, emailErr:true}))
      }
      if(!formInputs.password) {
        setIsError(prev => ({...prev, passwordErr:true}))
      }
      return 
    }
    try {
      setIsLoading(true)
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formInputs.email,
        formInputs.password
      );
      // Signed in
      const user = await userCredential.user;
      dispatch(changeUser(user))
      addUserToLocalStorage(user)
      toast.success(`Welcome ${user.email}`)
      console.log(user);
    } catch (error:FirebaseError | any) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col rounded-md bg-[var(--side-bar-bcg)] p-[1.5rem] w-full max-w-[30rem]">
      <h3 className="mb-[2.5rem] text-[2rem] font-[300] capitalize text-[var(--tasks-text)]">
        Login
      </h3>
      <FormRow name="email" placeholderText="email address" error={isError.emailErr} type="text" value={formInputs.email} handleChange={handleChange} />
      <FormRow name="password" placeholderText="password" error={isError.passwordErr} type="password" value={formInputs.password} handleChange={handleChange} />
      <button className="w-full btn rounded-md h-[3rem] flex items-center capitalize text-[1rem] justify-center font-[300] text-white bg-[#635FC7] mt-[1.5rem]">
        {isLoading ? <PacmanLoader size={14} color="#ffffff" /> :  'Login to your account'}
        </button>
      <p className="text-[var(--board-text)] mt-[1.5rem] mx-auto font-[300]">Don’t have an account? <span onClick={() => setIsMember(false)} className=" cursor-pointer text-[#635FC7]">Sign Up</span></p>
    </form>
  );
}
