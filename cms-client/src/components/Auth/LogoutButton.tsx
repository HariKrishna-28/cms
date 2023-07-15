import { auth, provider } from '@/app/firebase'
import { setAuthToken } from '@/redux/features/tokenSlice'
import { setUser } from '@/redux/features/userSlice'
import { AppDispatch } from '@/redux/store'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Logout } from '@mui/icons-material';
import { Tooltip, Zoom } from '@mui/material'

const LogoutButton: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()

    const handleLogout = async (e: React.SyntheticEvent) => {
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
        <div
            onClick={handleLogout}
            className='mx-1.5'
        >
            {/* <Tooltip
                TransitionComponent={Zoom}
                TransitionProps={{ timeout: 400 }}
                title="Logout"> */}
            <Logout className='h-auto' />
            {/* </Tooltip> */}
        </div>
    )
}

export default LogoutButton


// dark:bg-dark_background dark:hover:bg-dark_highlight hover:bg-light_navbar_hover