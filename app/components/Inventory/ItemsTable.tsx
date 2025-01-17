import { formatDesc } from '@/app/utils/formatDesc'
import Link from 'next/link'
import React from 'react'

const ItemsTable = ({items}: {items: any[]}) => {


  return (
    <table className='w-full justify-self-center table-auto border-separate border-spacing-y-4'>
            <thead className='bg-transparent pt-6 text-[#8E7DBE]'>
                <tr>
                  <th className='text-left'>Name</th>
                  <th className='text-left'>Description</th>
                  <th className='text-center'>Quantity</th>
                  <th className='text-left'>Manager</th>
                  <th></th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (<tr key={item.id} className='hover:text-[#8E7DBE]'>
                  <td>{item.itemName}</td>
                  <td>{formatDesc(item.description)}</td>
                  <td className='text-center'>{item.quantity}</td>
                  <td>
                    <button className='hover:text-[#2FA8FA]'>
                        <Link href={`/profile/${item.user.id}`}>
                            <p>@{item.user.username}</p>
                        </Link>
                    </button>
                    </td>
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
  )
}

export default ItemsTable