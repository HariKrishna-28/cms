"use client"
import React, { useEffect } from 'react'
import ThemeSwitcher from '@/components/Theme/ThemeSwitcher'
import Image from 'next/image'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
import Link from 'next/link';
import { NavBar } from '@/components';


export default function Home() {
  const router = useRouter()
  // @ts-ignore
  const [user, loading, error] = useAuthState(auth)


  useEffect(() => {
    auth.onIdTokenChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdToken()
        Cookies.set('idToken', idToken);
      } else {
        Cookies.remove('idToken');
      }
    })
  }, [])

  useEffect(() => {
    if (loading) return
    if (!user) {
      // update the user in the database
      // initialiseUser()
      // set the user data in redux
      // updateUser()
      router.push('/login')
    }
  }, [user, loading])


  return (
    <>
      <header>
        <NavBar />
      </header>
      <main
        className="flex min-h-screen flex-col items-center justify-center "
      >
        <div className='font-black text-3xl'>
          Hello friend how is it going
        </div>
        <div className='text-lg'>
          Drawer is a grid layout that can show/hide a sidebar on the left or right side of the page.
        </div>
        <Link href="/dashboard">Dashboard</Link>
        <ThemeSwitcher />
        <button onClick={() => auth.signOut()}>
          Log out
        </button>
      </main>
    </>
  )
}
