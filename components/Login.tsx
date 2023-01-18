import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from 'react-bootstrap'
export default function Login () {
  const { data: session } = useSession()

  if (session != null) {
    return (
      <div className='d-inline-block'>
        Signed in as {session?.user?.name}
        <Button
          onClick={async () => {
            await signOut()
          }}
          className='ms-3'
        >
          Sign out
        </Button>
      </div>
    )
  }
  return (
    <>
      Not signed in
      <Button
        onClick={async () => {
          await signIn()
        }}
        className='ms-3'
      >
        Sign in
      </Button>
    </>
  )
}
