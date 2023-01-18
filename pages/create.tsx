import React from 'react'
import CreateBox from '../components/CreateBox'
import { useSession } from 'next-auth/react'

export default function Create () {
  const { data: session } = useSession()
  if (session != null) {
    return (
      <div>
        <CreateBox />
      </div>
    )
  } else {
    return null
  }
}
