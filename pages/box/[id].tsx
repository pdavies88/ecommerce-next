import { Container } from 'react-bootstrap'
import SingleBox from '../../components/SingleBox'

interface QueryProps {
  query: {
    id: string
  }
}

export default function SingleBoxPage ({ query }: QueryProps) {
  return (
    <Container className='d-flex justify-content-center'>
      <SingleBox id={query.id} />
    </Container>
  )
}
