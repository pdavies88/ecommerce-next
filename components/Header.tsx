import Link from 'next/link'
import React from 'react'
import Nav from './Nav'

export default function Header () {
  return (
    <header>
      <div className='bg-black'>
        <Link href='/' passHref>
          <a className='text-light d-block py-4 text-center'>Boosted Boxes</a>
        </Link>
      </div>
      <Nav />
    </header>
  )
}
