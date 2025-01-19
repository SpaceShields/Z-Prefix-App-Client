'use client';

import { deleteItem, getItem } from '@/app/actions'
import { formatDesc } from '@/app/utils/formatDesc';
import Link from 'next/link';
import React, { useActionState, useEffect, useState } from 'react'

interface Item {
    id: number;
    itemName: string;
    description: string;
    user: {
      id: number;
      username: string;
    }
    quantity: number;
};

const DeleteItemPage = ({ params } : { params: Promise<{ id: string }> }) => {

    const [item, setItem] = useState<Item>();
    const [message, setMessage] = useState<string>('');
    const [state, formAction, isPending] = useActionState<string, FormData>(deleteItem, '');
    

    useEffect(() => {
        const fetchItemData = async () => {
          const id = (await params).id;
          const itemData = await getItem({ itemId: id });
          if(itemData.error) {
            setMessage(itemData.error);
          } else {
            setItem(itemData);
          }
        }
        fetchItemData();
      }, []);

  return (
    <>
        {item && item.id !== undefined ? (
            <div className='w-full h-auto justify-center flex'>
            <div className='lg:w-1/3 h-10/12 sm:w-2/3 mt-20 p-4 rounded-lg shadow-lg shadow-black backdrop-blur-md'>
                <p className='text-center my-2 text-md text-[#F02D3A]'>Are you sure you want to delete this item?</p>
                <p className='text-center my-2 text-2xl font-exo'>{item?.itemName}</p>
                <p className='text-center my-2 text-lg'>{formatDesc(item?.description || '')}</p>
                <p className='text-center my-2 text-lg'>Quantity: {item?.quantity}</p>
                <div className='flex-between'>
                    <form className='text-red-500 pt-1 text-center' action={formAction}>
                        <input type='hidden' name='id' value={item.id.toString() || '0'} />
                        <button disabled={isPending} className='bg-red-500 p-2 rounded-lg mt-2 text-white hover:bg-red-600 disabled:bg-gray-400' type='submit'> Confirm Delete</button>
                    </form>
                    <Link href={`/dashboard`} className='px-2 py-1 rounded-lg my-auto hover:text-[#2FA8FA]'>Cancel</Link>
                </div>
                {state && <p className='text-red-500 text-sm p-4'>{state}</p>}
                
            </div>
            {message && <p className='text-red-500'>{message}</p>}
        </div>
        ) : (
        <div className='w-full h-auto justify-center flex'>
            <div className='lg:w-1/3 h-10/12 sm:w-2/3 mt-20 p-4 rounded-lg shadow-lg shadow-black backdrop-blur-md'>
                <p>Item not found</p>
                <Link href={`/dashboard`} className='px-2 py-1 rounded-lg my-auto hover:text-[#2FA8FA]'>Cancel</Link>
            </div>
        </div>  
        )}
    </>
  )
}

export default DeleteItemPage