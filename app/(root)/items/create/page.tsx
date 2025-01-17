import CreateItemForm from '@/app/components/Inventory/CreateItemForm'
import Image from 'next/image'
import React from 'react'

const CreateItemPage = () => {
  return (
    <div className='w-full h-auto justify-center flex'>
      <div className='lg:w-1/3 h-10/12 sm:w-2/3 mt-20 rounded-lg shadow-lg shadow-black backdrop-blur-md'>
        <div className='justify-self-center mt-8'>
          <p className="text-center mt-8 text-6xl font-exo py-5">NEW ITEM</p>
        </div>
        <div className='w-full py-3 px-6 mt-1 text-center'>
          <CreateItemForm />
        </div>
      </div>
    </div>
  )
}

export default CreateItemPage