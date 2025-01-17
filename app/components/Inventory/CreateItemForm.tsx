'use client';

import { createItem } from '@/app/actions';
import React, { useActionState, useState } from 'react'

const CreateItemForm = () => {
    const [state, formAction, isPending] = useActionState<string, FormData>(createItem, '');
    const [value, setValue] = useState<any>({
        itemName: '',
        description: '',
        quantity: '',
    });
  
    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setValue({ ...value, itemName: name });
    }
    const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        const description = e.target.value;
        setValue({ ...value, description: description });
    }
    const onChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = e.target.value;
        setValue({ ...value, quantity: quantity });
    }
  
    return (
      <div className='w-full py-3 px-6 text-center'>
          <form action={formAction}>
              <input id='itemName' name="itemName" type='text' placeholder='Item Name' value={value.itemName} className='w-full p-2 text-center rounded-lg my-2' required onChange={onChangeName} />
              <input id='description' name="description" type='text' placeholder='Description' value={value.description} className='w-full p-2 text-center rounded-lg my-2' required onChange={onChangeDescription} />
              <input id='quantity' name="quantity" type='number' placeholder='quantity' value={value.quantity} className='w-full p-2 text-center rounded-lg my-2' required onChange={onChangeQuantity} />
              <button disabled={isPending} className='bg-blue-500 p-2 rounded-lg mt-2 w-1/3 text-white hover:bg-green-500 disabled:bg-gray-400' type="submit">Submit</button>
          </form>
          {isPending && <p>Loading...</p>}
          {state && <p className='text-red-500'>{state}</p>}
      </div>
    )
}

export default CreateItemForm