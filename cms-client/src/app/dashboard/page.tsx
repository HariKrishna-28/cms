"use client"
import { selectToken } from '@/redux/features/tokenSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector } from 'react-redux'
import { auth } from '../firebase'
import { LoadingAnimation, NavBar } from '@/components'
import { isAuthenticated } from '@/redux/features/userSlice'
import { selectTheme } from '@/redux/features/themeSlice'

const Dashboard: React.FC = () => {
    // @ts-ignore
    const [user, uLoading, error] = useAuthState(auth)
    const router = useRouter()
    const isUser = useSelector(isAuthenticated)
    const theme = useSelector(selectTheme)


    // useEffect(() => {
    //     if (!isUser) router.push("/")
    // }, [isUser])


    useEffect(() => {
        if (uLoading) return
        if (!user) router.push("/")
    }, [user, uLoading])

    return (
        <main>
            <header className='p-0 m-0 -mt-2'>
                <NavBar />
            </header>
            <div>
                {
                    uLoading ?
                        <div className='flex flex-col items-center justify-center h-screen'>
                            <LoadingAnimation />
                        </div>
                        :
                        user !== null
                            ?
                            <div className='text-black bg-white dark:text-white dark:bg-black'>
                                <div>
                                    Welcome {user?.displayName}
                                </div>

                                <div className='text-4xl font-black'></div>


                            </div>
                            :
                            null
                }
            </div>
        </main>
    )
}

export default Dashboard