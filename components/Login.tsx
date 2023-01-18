import { useSession, signIn, signOut } from 'next-auth/react'
export default function Login () {
  const { data: session } = useSession()

  if (session != null) {
    return (
      <>
        Signed in as {session?.user?.name} <br />
        <button
          onClick={async () => {
            await signOut()
          }}
        >
          Sign out
        </button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button
        onClick={async () => {
          await signIn()
        }}
      >
        Sign in
      </button>
    </>
  )
}
