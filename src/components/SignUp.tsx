import React, { Dispatch, FormEvent, FormEventHandler, useState } from "react";
import FormRow from "./FormRow";
import { auth, signUpUser } from "../firebase/firebaseHelpers";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "../hooks/reduxHooks";
import { changeUser } from "../store/features/boardsSlice";
import { addUserToLocalStorage } from "../utils/localStorage";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
import { PacmanLoader } from "react-spinners";

export default function SignUp({SetIsMember}:{SetIsMember:Dispatch<React.SetStateAction<boolean>>}) {
  const [isError, setIsError] = useState<{
    emailErr:boolean;
    passwordErr:boolean;
    repeatPassErr:boolean;
  }>({emailErr:false, passwordErr:false, repeatPassErr:false})
  const [formInputs, setFormInputs] = useState<{
    email: string;
    password: string;
    repeatPassword:string;
  }>({email:'', password:'', repeatPassword:''});
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const handleChange = async(e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const {name, value} = e.target
    setFormInputs((prevInputs) => ({...prevInputs, [name]:value}))
  }

  const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!formInputs.email || !formInputs.password || !formInputs.repeatPassword || formInputs.password !== formInputs.repeatPassword ||
      formInputs.email.length < 3 || formInputs.password.length < 8 || !formInputs.email.includes('@')) {
        if(!formInputs.email) {
          setIsError(prev => ({...prev, emailErr:true}))
        }
        if(!formInputs.password) {
          setIsError(prev => ({...prev, passwordErr:true}))
        }
        if(!formInputs.repeatPassword) {
          setIsError(prev => ({...prev, repeatPassErr:true}))
        }
      return 
    }
    try {
      setIsLoading(true)
      const userCredential = await createUserWithEmailAndPassword(
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
        sign up
      </h3>
      <FormRow name="email" placeholderText="email address" error={isError.emailErr} type="text" value={formInputs.email} handleChange={handleChange} />
      <FormRow name="password" error={isError.passwordErr} placeholderText="password" type="password" value={formInputs.password} handleChange={handleChange} />
      <FormRow error={isError.repeatPassErr} name="repeatPassword" placeholderText="repeat password" type="password" value={formInputs.repeatPassword} handleChange={handleChange} />
      <button className="w-full rounded-md h-[3rem] btn capitalize flex items-center justify-center font-[300] text-[1rem] text-white bg-[#635FC7] mt-[1.5rem]">
        { isLoading ?  <PacmanLoader size={14} color="#ffffff" /> : 'Create an account'}
        </button>
      <p className="text-[var(--board-text)] mt-[1.5rem] mx-auto font-[300]">Already have an account? <span onClick={() => SetIsMember(true)} className=" cursor-pointer text-[#635FC7]">Login</span></p>
    </form>
  );
}
