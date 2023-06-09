import { auth, provider } from '@/app/firebase'
import { setAuthToken } from '@/redux/features/tokenSlice'
import { setUser } from '@/redux/features/userSlice'
import { AppDispatch } from '@/redux/store'
import React from 'react'
import { useDispatch } from 'react-redux'

const LogoutButton: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()

    const handleLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            await auth.signOut()
            dispatch(
                setAuthToken({
                    token: null
                })
            )
            dispatch(setUser({
                isAuthenticated: false,
                userData: null
            }))
        } catch (error) {
            console.log("error")
        }
    }


    return (
        <div>
            <button
                onClick={handleLogin}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Logout
            </button>
        </div>
    )
}

export default LogoutButton