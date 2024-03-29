"use client"
import React, { useEffect, useState } from 'react'
import { AppDispatch } from '@/redux/store'
// import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme, setTheme } from '@/redux/features/themeSlice'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase'
import { useRouter } from 'next/navigation'
import { LoadingAnimation, LoginButton, LogoutButton } from '@/components'
// import { darkThemePreferenceGetter } from '@/utils/ThemeExporter'
import { setUser } from '@/redux/features/userSlice'
import { INITIALISE_USER } from '@/api/UserAPI';

export default function Home() {

  const dispatch = useDispatch<AppDispatch>()
  const themePreference = useSelector(selectTheme)
  const router = useRouter()
  // @ts-ignore
  const [user, loading, error] = useAuthState(auth)

  const updateUser = () => {
    dispatch(setUser({
      isAuthenticated: true,
      userData: {
        // @ts-ignore
        displayName: user.displayName,
        // @ts-ignore
        email: user.email,
        // @ts-ignore
        photoURL: user.photoURL
      }
    }))
  }

  const initialiseUser = async () => {
    try {
      // @ts-ignore
      const res = await INITIALISE_USER(user?.displayName, user?.email, user?.photoURL)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

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


  useEffect(() => {
    if (loading) return
    if (user) {
      // update the user in the database
      initialiseUser()
      // set the user data in redux
      updateUser()
      router.push('/dashboard')
    }
  }, [user, loading])

  return (
    <main >
      <div className='flex flex-col items-center justify-center h-screen text-black transition-all duration-700 bg-white bg-transition transition-background-color dark:bg-black dark:text-white'>
        {
          loading ?
            <LoadingAnimation />
            :
            user == null ?
              <NoUser />
              :
              null
          // <UserPresentScreen />
        }
      </div>
    </main>
  )
}
