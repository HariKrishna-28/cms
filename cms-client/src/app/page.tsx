"use client"

import React, { useEffect } from 'react'
import { AppDispatch } from '@/redux/store'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme, setTheme } from '@/redux/features/themeSlice'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase'
import LoginButton from '@/components/LoginButton'
// import '@firebase/auth-types'

// import { selectTheme } from '@/redux/features/themeSlice'

export default function Home() {

  const dispatch = useDispatch<AppDispatch>()
  const themePreference = useSelector(selectTheme)

  // @ts-ignore
  const [user, loading, error] = useAuthState(auth)


  const handleThemeChange = () => {
    dispatch(setTheme({
      darkTheme: !themePreference
    }))
  }

  return (
    <main className={themePreference ? 'dark' : ''}>
      <div className='flex flex-col items-center justify-center h-screen bg-white dark:bg-black text-black dark:text-white transition-all duration-100'>
        <div>
          hi frans elarum epdi irukinga
        </div>
        <LoginButton />
        <button
          onClick={handleThemeChange}>
          Change theme
        </button>
      </div>
    </main>
  )
}
