'use client';

import { getAllItemsByUser, getCookie } from '@/app/actions';
import { formatDesc } from '@/app/utils/formatDesc';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'

interface Item {
  id: number;
  itemName: string;
  description: string;
  quantity: number;
}

const DashboardPage = () => {

  const [items, setItems] = useState<Item[]>([]);
  const [currenUser, setCurrenUser] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
    useEffect(() => {
      const fetchItemData = async () => {
        setIsLoading(true);

        const token = await getCookie('accessToken');
        const currentUser = await getCookie('currentUser');

        setCurrenUser(currentUser);
        if(token == '') redirect('/');

        const itemData = await getAllItemsByUser();

        if(itemData.error) {
          setItems([]);
        } else {
          setItems(itemData);
        }
        setIsLoading(false);
      }
      fetchItemData();
    }, []);

  return (
    <>
      <p className="text-center my-2 mt-8 text-6xl font-exo py-5">{currenUser.toUpperCase()} DASHBOARD</p>
      <p className="text-center my-2 text-2xl font-exo">My Inventory</p>
      <Suspense fallback={<p>Loading...</p>}>
        <div className='rounded-lg pb-10 px-3 w-11/12 justify-self-center shadow-md shadow-primary'>
        {items.length == 0 ? <p className='text-center text-[#F02D3A]'>No Items Found</p> : <p className='text-center text-green-500'>{items.length} Items Found</p>}
              <table className='w-full justify-self-center table-auto border-separate border-spacing-4'>
              <thead className='bg-transparent pt-6 text-[#8E7DBE]'>
                  <tr>
                    <th className='text-left'>Name</th>
                    <th className='text-left'>Description</th>
                    <th className='text-center'>Quantity</th>
                    <th></th>
                    <th></th>
                  </tr>
              </thead>
              <tbody>
                  {items.map((item) => (<tr key={item.id} className='hover:text-[#8E7DBE]'>
                    <td>{item.itemName}</td>
                    <td>{formatDesc(item.description)}</td>
                    <td className='text-center'>{item.quantity}</td>
                    <td className='text-center'>
                      <button className='hover:text-[#2FA8FA]'>
                        <Link href={`/items/${item.id}`}>
                            Edit
                        </Link>
                      </button>
                    </td>
                    <td className='text-end'>
                      <Link href={`/items/${item.id}/delete`} className='text-red-500 text-end'>
                        <button className='hover:text-orange-500 mt-1'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        </button>
                      </Link>
                    </td>
                  </tr>))}
              </tbody>
              </table>
              {isLoading && <p className='text-center text-yellow-500'>Loading...</p>}
          </div>
        </Suspense>
    </>
  )
}

export default DashboardPage