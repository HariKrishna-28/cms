"use client"
import { selectToken } from '@/redux/features/tokenSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../firebase'
import { LoadingAnimation, NavBar } from '@/components'

const Dashboard: React.FC = () => {
    // @ts-ignore
    const [user, uLoading, error] = useAuthState(auth)
    const router = useRouter()


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
                            <div>
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