"use client"
import { selectToken } from '@/redux/features/tokenSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector } from 'react-redux'
import { auth } from '../firebase'
import { LoadingAnimation } from '@/components'

const Dashboard: React.FC = () => {
    // @ts-ignore
    const [user, uLoading, error] = useAuthState(auth)
    const router = useRouter()

    useEffect(() => {
        if (uLoading) return
        if (!user) router.push("/")
        console.log(user)
    }, [user, uLoading])

    return (
        <div>
            {
                uLoading ?
                    <div className='h-screen flex flex-col items-center justify-center'>
                        <LoadingAnimation />
                    </div>
                    :
                    <div>
                        vanakam fransssssssssssssss
                    </div>
            }
        </div>
    )
}

export default Dashboard