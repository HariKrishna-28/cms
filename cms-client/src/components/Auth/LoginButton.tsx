import { auth, provider } from '@/app/firebase'
import { setAuthToken } from '@/redux/features/tokenSlice'
import { AppDispatch } from '@/redux/store'
import React from 'react'
import { useDispatch } from 'react-redux'

const LoginButton: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()

    const handleLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            await auth.signInWithPopup(provider)
                .then(res => {
                    const data = res.user
                    data?.getIdToken(true)
                        .then(token => {
                            dispatch(
                                setAuthToken({
                                    token: token
                                })
                            )
                        })
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.log("error")
        }
    }


    return (
        <div>
            <button
                onClick={handleLogin}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Login with google
            </button>
        </div>
    )
}

export default LoginButton