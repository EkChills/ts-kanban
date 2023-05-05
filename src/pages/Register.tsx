import React, { useEffect, useState } from 'react'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxHooks'

export default function Register() {
  const [isMember, setIsMember] = useState<boolean>(false)
  const {user} = useAppSelector((store) => store.allBoards)
  const navigate = useNavigate()

  useEffect(() => {
    if(user) {
      const navTimeout = setTimeout(() => {
        navigate('/')
      }, 1000)
      
      return () => clearTimeout(navTimeout)
    }

  },[user])
  return (
    <div className='min-h-screen grid place-items-center px-[1.5rem] bg-[var(--main-bcg)]'>
      {
        isMember ? <SignIn setIsMember={setIsMember} /> : <SignUp SetIsMember={setIsMember} />
      }
    </div>
  )
}
