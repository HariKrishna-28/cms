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
            <header>
                <NavBar />
            </header>
            <div>
                {
                    uLoading ?
                        <div className='h-screen flex flex-col items-center justify-center'>
                            <LoadingAnimation />
                        </div>
                        :
                        user !== null
                            ?
                            <div className='dark:text-white dark:bg-black text-black bg-white'>
                                vanakam fransssssssssssssss
                            </div>
                            :
                            null
                }
            </div>
        </main>
    )
}

export default Dashboard