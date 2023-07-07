import React from 'react'
import LogoutButton from '../Auth/LogoutButton'

const NavBar: React.FC = () => {
    return (
        <div className='sticky flex items-center justify-between'>
            <div className='font-bold'>
                CMS
            </div>
            <div className=''>
                <LogoutButton />
            </div>
        </div>
    )
}

export default NavBar