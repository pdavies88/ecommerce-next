import Link from 'next/link'
import React from 'react'
import Nav from './Nav'

export default function Header () {
  return (
    <header>
      <div>
        <Link href='/'>Boosted Boxes</Link>
      </div>
      <Nav />
    </header>
  )
}
