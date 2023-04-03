import React, { ChangeEvent } from 'react'
import light from '../../assets/icon-light-theme.svg'
import dark from '../../assets/icon-dark-theme.svg'
import { toggleTheme } from '../../store/features/eventActionsSlice'
import { useAppSelector,useAppDispatch } from '../../hooks/reduxHooks'

const ToggleTheme = () => {
  const {theme} = useAppSelector((store) => store.eventsActions)
  const dispatch = useAppDispatch()
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {checked} = e.target    
    dispatch(toggleTheme(checked))
  }
  return (
    <div className='flex w-[90%] mt-[1rem] md:mt-[0] rounded-md h-[3rem] bg-[var(--main-bcg)] justify-center mx-auto space-x-[1.5rem] items-center'>
      <img src={light} alt="light-mode" />
        <input onChange={handleChange} type="checkbox" checked={theme === 'dark-mode' ? true : false} className="toggle toggle-info" />
      <img src={dark} alt="light-mode" />
    </div>
  )
}

export default ToggleTheme