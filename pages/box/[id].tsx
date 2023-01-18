import SingleBox from '../../components/SingleBox'

interface QueryProps {
  query: {
    id: string
  }
}

export default function SingleBoxPage ({ query }: QueryProps) {
  return <SingleBox id={query.id} />
}
