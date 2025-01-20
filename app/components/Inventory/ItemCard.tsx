import { formatDesc } from '@/app/utils/formatDesc';
import Link from 'next/link';
import React from 'react'

const ItemCard = ({item}: {item: any}) => {

    const {id, itemName, description, quantity, user: {id: userId, username}} = item;

  return (
    <li className='item-card' data-testid="item-card">
        <div className='flex-between'>
            <p className='item-card_name font-exo'>{itemName}</p>
            {quantity < 3 ? <p className='text-[#F02D3A]'>{quantity} Left in Vault!</p> : <p className='text-green-500'>{quantity} Left in Vault!</p>}
        </div>
        <p className='item-card_description my-5 py-2'>{formatDesc(description)}</p>
        <div className='flex-between'>
            <Link href={`/profile/${userId}`}>
                <button>
                    <p className='line-clamp-1 px-2 py-1 rounded-lg shadow-inner shadow-black hover:text-[#2FA8FA]'>@{username}</p>
                </button>
            </Link>
            
            <Link href={`/items/${id}`}>
                <button className='item-card_btn'>
                    Details
                </button>
            </Link>
        </div>
    </li>
  )
}

export default ItemCard