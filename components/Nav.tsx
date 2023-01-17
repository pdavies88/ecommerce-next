import Link from 'next/link'
import React from 'react'

export default function Nav () {
  return (
    <nav>
      <Link href='/create'>Create</Link>
      <Link href='/edit'>Edit</Link>
    </nav>
  )
}
