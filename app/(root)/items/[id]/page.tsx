'use client';

import { getCookie, getItem, updateItem } from '@/app/actions';
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

const ItemDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {

  const [state, formAction, isPending] = useActionState<string, FormData>(updateItem, '');
  const [item, setItem] = useState<Item>();
  const [message, setMessage] = useState<string>('');
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrenUser] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<any>({
      itemName: '',
      description: '',
      quantity: '',
  });

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
      const name = e.target.value;
      setValue({ ...value, itemName: name });
  }
  const onChangeDescription = (e: any) => {
      const description = e.target.value;
      setValue({ ...value, description: description });
  }
  const onChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
      const quantity = e.target.value;
      setValue({ ...value, quantity: quantity });
  }

  const handleCancel = () => {
    setValue({itemName: item?.itemName, description: item?.description, quantity: item?.quantity });
    setEditMode(false);
  }
      
  useEffect(() => {
    const fetchItemData = async () => {
      const id = (await params).id;
      const token = await getCookie('accessToken');
      const currentUsername = await getCookie('currentUser');
      if(token != '') setSignedIn(true);
      if(currentUsername != '') setCurrenUser(currentUsername);
      const itemData = await getItem({ itemId: id });
      if(itemData.error) {
        setMessage(itemData.error);
      } else {
        setItem(itemData);
        setValue({itemName: itemData.itemName, description: itemData.description, quantity: itemData.quantity });
      }
    }
    fetchItemData();
  }, []);

  return (
    <>
      {item && (
        <>
          {item.user.username == currentUser && 
            <button disabled={editMode} className='border-[#2FA8FA] border-2 mt-5 p-2 rounded-lg mx-auto hover:bg-[#2FA8FA] fixed left-3 top-28 disabled:bg-gray-400' onClick={() => setEditMode(!editMode)}>
              Edit Mode
            </button>
          }
          {item.user.username == currentUser && editMode && signedIn ? (
            <>
              <form className='justify-items-center' action={formAction}>
                <input className="text-center mt-8 text-5xl font-exo pt-4 bg-transparent" name='itemName' value={value.itemName} type='text' required onChange={onChangeName} />
                <p className="text-center text-2xl font-exo py-5">Manager: @{item?.user.username}</p>
                <input type='hidden' name='id' value={item.id}></input>
                <div className='flex gap-4 px-10 h-80 justify-center mx-auto'>
                  <div className='w-10/12 backdrop-blur-sm mx-auto pb-4 rounded-xl shadow-md shadow-black'>
                    <p className="text-center text-3xl font-exo py-5 text-[#8E7DBE]">Description</p>
                    <textarea className="text-center lg:text-2xl sm:text-lg md:text-xl py-5 px-7 w-full h-52 bg-transparent" name='description' value={value.description} required onChange={onChangeDescription}/>
                  </div>
                  <div className='w-1/3 backdrop-blur-sm mx-auto pb-4 rounded-xl shadow-md shadow-black'>
                    <p className="text-center text-3xl font-exo py-5 text-[#8E7DBE]">Quantity</p>
                    {value.quantity < 3 ? 
                      <input className="text-center my-10 text-5xl ml-2 py-4 text-[#F02D3A] w-full bg-transparent" name='quantity' type='number' value={value.quantity} onChange={onChangeQuantity} /> 
                    : 
                      <input className="text-center bg-transparent w-full ml-2 my-10 text-5xl py-4 text-green-500" name='quantity' type='number' value={value.quantity} onChange={onChangeQuantity} />
                    }
                  </div>
                </div>
                <div className='flex gap-2'>
                  <button disabled={isPending} className='bg-[#2FA8FA] mt-5 p-2 rounded-lg mx-auto text-white hover:bg-green-500 disabled:bg-gray-400' type="submit" onClick={() => {
                    if(value.itemName != '' && value.description != '' && value.quantity > 0) {
                      setTimeout(() => setEditMode(false), 1250);
                      setItem({...item, itemName: value.itemName, description: value.description, quantity: value.quantity});
                    }
                  }}>Submit Changes</button>
                  <button disabled={isPending} className='bg-[#F02D3A] mt-5 p-2 rounded-lg mx-auto text-white hover:bg-orange-500 disabled:bg-gray-400' onClick={handleCancel}>Cancel</button>
                </div>
              </form>
              {state && <p className='text-red-500 text-center'>{state}</p>}
            </>
          ) : (
            <>
              <p className="text-center mb-1 mt-8 text-5xl font-exo pt-5">{item?.itemName}</p>
              <p className="text-center text-2xl font-exo py-5">Manager: @{item?.user.username}</p>
              <div className='flex gap-4 px-10 h-80 justify-center mx-auto'>
                <div className='w-10/12 backdrop-blur-sm mx-auto pb-4 rounded-xl shadow-md shadow-black'>
                  <p className="text-center text-3xl font-exo py-5 text-[#8E7DBE]">Description</p>
                  <p className="text-center lg:text-2xl sm:text-lg md:text-xl py-5 px-7">{item?.description}</p>
                </div>
                <div className='w-1/3 backdrop-blur-sm mx-auto pb-4 rounded-xl shadow-md shadow-black'>
                  <p className="text-center text-3xl font-exo py-5 text-[#8E7DBE]">Quantity</p>
                  {item.quantity < 3 ? <p className="text-center my-10 text-5xl py-5 text-[#F02D3A]">{item?.quantity}</p> : <p className="text-center my-10 text-5xl py-5 text-green-500">{item?.quantity}</p>}
                </div>
              </div>
            </>
          )}
          
        </>
      )}
      {message != '' ? <p className='text-[#F02D3A] text-center'>{message}</p> : <></>}
    </>
  )
}

export default ItemDetailsPage