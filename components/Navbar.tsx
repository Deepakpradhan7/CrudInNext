
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-gray-800 items-center px-8 py-3 text-white font-bold rounded-md'>
        <Link href='/'>Home</Link>
        <Link className='bg-white p-2 text-gray-800 rounded-sm' href='/addTopic'>Add a new Topic</Link>    
    </nav>
  )
}

export default Navbar
