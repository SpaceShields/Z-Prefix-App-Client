import LoginCard from '@/app/components/Login/LoginCard'
import React from 'react'

const LoginPage = () => {

  return (
    <div className='w-screen h-screen justify-center flex bg-[url("/login-bg.jpg")] bg-center bg-cover'>
      <LoginCard />
    </div>
  )
}

export default LoginPage