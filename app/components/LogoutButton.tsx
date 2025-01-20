'use client';
import React from 'react'
import { logoutUser } from '../actions';

const LogoutButton = () => {
  return (
    <button className='rounded-full p-2 flex gap-2 text-center hover:text-[#2FA8FA]' onClick={() => logoutUser()}>
        <span>Logout</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
        </svg>
    </button>
  )
}

export default LogoutButton