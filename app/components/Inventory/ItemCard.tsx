import Link from 'next/link';
import React from 'react'

const ItemCard = ({item}: {item: any}) => {

    const {id, itemName, description, quantity, user: {id: userId, username}} = item;

  return (
    <li className='item-card'>
        <div className='flex-between'>
            <p className='item-card_name font-exo'>{itemName}</p>
            <p>{quantity} Left in Stock!</p>
        </div>
        <p className='item-card_description my-5 py-2'>{description}</p>
        <div className='flex-between'>
            <Link href={`/profile/${userId}`}>
                <p className='line-clamp-1 px-2 py-1 rounded-lg shadow-inner shadow-black'>@{username}</p>
            </Link>
            <button className='item-card_btn'>
                <Link href={`/items/${id}`}>
                    Details
                </Link>
            </button>
        </div>
    </li>
  )
}

export default ItemCard