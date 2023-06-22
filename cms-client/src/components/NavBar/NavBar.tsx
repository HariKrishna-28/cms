import React from 'react'
import LogoutButton from '../Auth/LogoutButton'

const NavBar: React.FC = () => {
    return (
        <div className='sticky'>
            <div className='w-full bg-yellow-500'>
                <LogoutButton />
            </div>
        </div>
    )
}

export default NavBar