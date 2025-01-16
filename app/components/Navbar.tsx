'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoginButton from './Login/LoginButton';
import LogoutButton from './LogoutButton';
import { getCookie } from '../actions';
import CreateItemButton from './Inventory/CreateItemButton';

const Navbar = () => {

    const [token, setToken] = useState('');

    useEffect(() => {
        getCookie('accessToken').then((token) => setToken(token)).catch(() => setToken(''));
    });

  return (
    <div className='w-full shadow-sm shadow-black py-4 pl-5 pr-5 flex gap-2 justify-between'>
        <Link href="/">
            <Image src="/logo_icon.png" alt="name" width={45} height={45} style={{borderRadius: '50%'}}/>
        </Link>
        <div className='my-auto'>
            { token == '' ? <LoginButton /> : (
                <div className='flex gap-3'>
                    <CreateItemButton />
                    <LogoutButton />
                </div>
                )}
        </div>
    </div>
  )
}

export default Navbar