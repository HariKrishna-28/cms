"use client"

import { selectTheme, setTheme } from '@/redux/features/themeSlice'
import { AppDispatch } from '@/redux/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Lightbulb, NightlightRound, Logout } from '@mui/icons-material';
import { Tooltip, Zoom } from '@mui/material'

const ThemeSwitcher: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const themePreference = useSelector(selectTheme)
    console.log(themePreference)

    const handleThemeChange = () => {
        dispatch(setTheme({
            darkTheme: !themePreference
        }))
    }

    return (
        <div
            onClick={handleThemeChange}
            className='mx-1.5'
        >
            {/* <Tooltip
                TransitionComponent={Zoom}
                TransitionProps={{ timeout: 400 }}
                title="Switch theme"> */}
            {themePreference ? <Lightbulb className='h-auto' /> : <NightlightRound className='h-auto' />}
            {/* </Tooltip> */}
        </div>
    )
}

export default ThemeSwitcher