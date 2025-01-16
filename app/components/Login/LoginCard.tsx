'use client';

import Image from 'next/image';
import LoginForm from './LoginForm';
import { useState } from 'react';

const LoginCard = () => {

    const [isNewUser, setIsNewUser] = useState<boolean>(false);

  return (
    <div className='lg:w-1/3 h-3/4 sm:w-2/3 my-auto rounded-lg shadow-lg shadow-black backdrop-blur-md'>
        <div className='justify-self-center mt-8'>
            <Image src="/logo.png" alt="logo" width={200} height={200} className='rounded-lg' />
        </div>
        <LoginForm />
        <div className='w-full text-center px-6'>
            <button className='rounded-lg p-2 bg-orange-500 hover:bg-green-500 text-white mt-2 mx-auto w-1/3'>Register</button>
        </div>
    </div>
  )
}

export default LoginCard