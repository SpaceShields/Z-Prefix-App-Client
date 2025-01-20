'use client';

import Image from 'next/image';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useState } from 'react';

const LoginCard = () => {

  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  return (
    <div className='lg:w-1/3 h-10/12 sm:w-2/3 my-auto rounded-lg shadow-lg shadow-black backdrop-blur-md' data-testid='login-card'>
        <div className='justify-self-center mt-8'>
            <Image src="/logo.png" alt="logo" width={200} height={200} className='rounded-lg' />
        </div>
        {isNewUser ? <RegisterForm /> : <LoginForm />}
        <div className='w-full text-center px-6 mb-5'>
            <button className='rounded-lg p-2 bg-orange-500 hover:bg-green-500 text-white mt-2 mx-auto w-1/3' onClick={() => setIsNewUser(!isNewUser)}>
              {isNewUser ? 'Login' : 'Register'}
            </button>
        </div>
    </div>
  )
}

export default LoginCard