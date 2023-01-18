import EditBox from '../components/EditBox'
import { useSession } from 'next-auth/react'

interface QueryProps {
  query: {
    id: string
  }
}

export default function EditPage ({ query }: QueryProps) {
  const { data: session } = useSession()
  if (session != null) {
    return (
      <div>
        <EditBox id={query.id} />
      </div>
    )
  } else {
    return null
  }
}
