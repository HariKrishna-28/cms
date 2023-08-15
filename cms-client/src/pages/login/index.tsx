"use client"
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, provider } from '../firebase'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import Cookies from 'js-cookie'
import { setUser } from '@/redux/features/userSlice'
import { userDataType } from '@/types/redux/ReduxType'

const Login: React.FC = () => {
    // @ts-ignore
    const [user, isLoading, error] = useAuthState(auth)
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    const navigator = (route: string) => router.push(route)

    const handleLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            await auth.signInWithPopup(provider)
                .then(res => {
                    const data = res.user
                    data?.getIdToken(true)
                        .then(token => {
                            Cookies.set("idToken", token)
                            const cred = {
                                displayName: data?.displayName,
                                email: data?.email,
                                photoURL: data?.photoURL
                            }
                            // @ts-ignore
                            initialiseUser(cred)
                        })
                    navigator("/dashboard")
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.log("error")
        }
    }


    const initialiseUser = async (cred: userDataType) => {
        try {
            dispatch(setUser({
                isAuthenticated: true,
                userData: cred
            }))
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if (isLoading) return
        if (user) router.push("/")
    }, [user, isLoading])

    return (
        <div className='flex items-center justify-center h-screen flex-col'>
            <button
                onClick={handleLogin}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Login with google
            </button>
        </div>
    )
}

export default Login