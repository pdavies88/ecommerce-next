import EditBox from '../components/EditBox'

interface QueryProps {
  query: {
    id: string
  }
}

export default function EditPage ({ query }: QueryProps) {
  return (
    <div>
      <EditBox id={query.id} />
    </div>
  )
}
