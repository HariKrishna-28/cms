"use client"

import React, { useEffect } from 'react'
import { AppDispatch } from '@/redux/store'
// import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme, setTheme } from '@/redux/features/themeSlice'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase'
import { LoadingAnimation, LoginButton, LogoutButton, ErrorMessagebox } from '@/components'
import { darkThemePreferenceGetter } from '@/utils/ThemeExporter'

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

  const UserPresentScreen = () => {
    return (
      <>
        <div>
          Welcome {user?.displayName}
        </div>
        <button
          onClick={handleThemeChange}>
          Change theme
        </button>
        <LogoutButton />
      </>
    )
  }

  const NoUser = () => {
    return (
      <LoginButton />
    )
  }

  // theme preference setter
  useEffect(() => {
    const isDark = darkThemePreferenceGetter()
    dispatch(setTheme({
      darkTheme: isDark
    }))
  }, [])

  // useEffect(() => {
  //   if (loading) return
  //   console.log(user)
  // }, [user, loading])

  return (
    <main className={themePreference ? 'dark' : ''}>
      <div className='flex flex-col items-center justify-center h-screen bg-white dark:bg-black text-black dark:text-white transition-all duration-100'>
        {
          loading ?
            <LoadingAnimation />
            :
            user == null ?
              <NoUser />
              :
              <UserPresentScreen />
        }
      </div>
    </main>
  )
}
