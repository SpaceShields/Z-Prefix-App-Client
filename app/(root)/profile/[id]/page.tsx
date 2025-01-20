'use client';

import { getAllItemsByUserId } from '@/app/actions';
import { formatDesc } from '@/app/utils/formatDesc';
import Link from 'next/link';
import React, { Suspense, useEffect, useState } from 'react'

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

const UserProfilePage = (
  { params }: { params: Promise<{ id: string }> }) => {
  
  const [items, setItems] = useState<Item[]>([]);
    
  useEffect(() => {
    const fetchItemData = async () => {
      const id = (await params).id;
      const itemData = await getAllItemsByUserId({ itemId: id });
      if(itemData.error) {
        setItems([]);
      } else {
        setItems(itemData);
      }
    }
    fetchItemData();
  }, []);

  return (
    <>
      <p className="text-center my-2 mt-8 text-6xl font-exo py-5">@{items[0]?.user.username} Inventory</p>
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
                          Details
                      </Link>
                    </button>
                  </td>
                  </tr>))}
              </tbody>
              </table>
          </div>
        </Suspense>
    </>
  )
}

export default UserProfilePage