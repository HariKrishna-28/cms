"use client"
import React from 'react'
import LogoutButton from '../Auth/LogoutButton'
import ThemeSwitcher from '../Theme/ThemeSwitcher'

const NavBar: React.FC = () => {
    return (
        <div className='sticky flex items-center justify-between dark:bg-dark_secondary bg-light_navbar text-white p-3'>
            <div className='font-bold text-2xl'>
                Content management system
            </div>
            <div className='flex items-center space-x-2'>
                <div className='cursor-pointer dark:hover:bg-dark_highlight hover:bg-light_navbar_hover rounded ease-in h-[30px] duration-150'>
                    <LogoutButton />
                </div>
                <div className='cursor-pointer dark:hover:bg-dark_highlight hover:bg-light_navbar_hover rounded ease-in h-[30px] duration-150'>
                    <ThemeSwitcher />
                </div>
            </div>
        </div>
    )
}

export default NavBar