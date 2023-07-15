"use client"

import React, { useState, useEffect } from 'react'
import { selectTheme, setTheme } from '@/redux/features/themeSlice'
import { AppDispatch } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { Lightbulb, NightlightRound, Logout } from '@mui/icons-material';
import { Tooltip, Zoom } from '@mui/material'
import { useTheme } from "next-themes";

const ThemeSwitcher: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const themePreference = useSelector(selectTheme)
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();


    useEffect(() => {
        setMounted(true);
    }, []);


    if (!mounted) {
        return null;
    }

    // const handleThemeChange = () => {
    //     dispatch(setTheme({
    //         darkTheme: !themePreference
    //     }))
    // }

    return (
        <button
            // onClick={handleThemeChange}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className='mx-1.5'
        >
            {/* <Tooltip
                TransitionComponent={Zoom}
                TransitionProps={{ timeout: 400 }}
                title="Switch theme"> */}
            {themePreference ? <Lightbulb className='h-auto' /> : <NightlightRound className='h-auto' />}
            {/* </Tooltip> */}
        </button>
    )
}

export default ThemeSwitcher