import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { Col, Row } from 'react-bootstrap'
import Box from './Box'

export const GET_ALL_BOXES = gql`
  query Query {
    getBoxes {
      _id
      cost
      createdAt
      description
      image
      inventory
      name
    }
  }
`

interface BoxType {
  _id: string
  cost: number
  createdAt: string
  description: string
  image: string
  inventory: number
  name: string
}

export default function Boxes () {
  const { data, error, loading } = useQuery(GET_ALL_BOXES)
  if (loading) return <p>Loading...</p>
  if (error != null) return <p>Error: {error.message}</p>
  return (
    <Row xs={1} md={2} lg={3} className='g-3'>
      {data.getBoxes.map((box: BoxType) => (
        <Col key={box._id}>
          <Box box={box} />
        </Col>
      ))}
    </Row>
  )
}
