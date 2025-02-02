import Link from 'next/link'
import React from 'react'

const CreateItemButton = () => {
  return (
    <Link href="/items/create" className='px-2 py-1 rounded-lg my-auto hover:text-[#2FA8FA]'>Create Item</Link>
    
  )
}

export default CreateItemButton