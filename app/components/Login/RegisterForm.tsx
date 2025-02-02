'use client';

import { registerUser } from '@/app/actions';
import React, { useActionState, useState } from 'react'

const LoginForm = () => {

    const [state, formAction, isPending] = useActionState<string, FormData>(registerUser, '');
    const [value, setValue] = useState<any>({
        firstName: undefined,
        lastName: undefined,
        username: undefined,
    });


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

  return (
    <div className='w-full py-3 px-6 mt-6 text-center'>
        <form action={formAction} data-testid='register-form'>
            <input id='firstName' name="firstName" type='text' placeholder='First Name' value={value.firstName} className='w-full p-2 text-center rounded-lg my-2 text-black' required onChange={onChange} />
            <input id='lastName' name="lastName" type='text' placeholder='Last Name' value={value.lastName} className='w-full p-2 text-center rounded-lg my-2 text-black' required onChange={onChange} />
            <input id='username' name="username" type='text' placeholder='Username' value={value.username} className='w-full p-2 text-center rounded-lg my-2 text-black' required onChange={onChange} />
            <input id='password' name="password" type='password' placeholder='Password' className='w-full p-2 text-center rounded-lg my-2 text-black' required/>
            <button disabled={isPending} className='bg-blue-500 p-2 rounded-lg mt-2 w-1/3 text-white hover:bg-green-500 disabled:bg-gray-400' type="submit">Submit</button>
        </form>
        {isPending && <p>Loading...</p>}
        {state && <p className='text-red-500'>{state}</p>}
    </div>
  )
}

export default LoginForm