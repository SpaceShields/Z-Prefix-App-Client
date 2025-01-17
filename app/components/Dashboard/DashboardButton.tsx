import Link from 'next/link'
import React from 'react'

const DashboardButton = () => {
  return (
    <Link href="/dashboard" className='px-2 py-1 rounded-lg my-auto hover:text-[#2FA8FA]'>Dashboard</Link>
  )
}

export default DashboardButton