"use client"

import React, { useEffect } from 'react'
import { AppDispatch, useAppSelector } from '@/redux/store'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme, setTheme } from '@/redux/features/themeSlice'
// import { selectTheme } from '@/redux/features/themeSlice'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const themePreference = useSelector(selectTheme)

  const handleThemeChange = () => {
    dispatch(setTheme({
      darkTheme: !themePreference
    }))
  }

  return (
    <main className={themePreference ? 'dark' : ''}>
      <div className='flex flex-col items-center justify-center h-screen bg-white dark:bg-black text-black dark:text-white'>
        <div>
          hi frans elarum epdi irukinga
        </div>
        <button
          onClick={handleThemeChange}>
          Change theme
        </button>
      </div>
    </main>
  )
}
