import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Box from './Box'

const GET_ALL_BOXES = gql`
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
    <div>
      <div>
        {data.getBoxes.map((box: BoxType) => (
          <Box key={box._id} box={box} />
        ))}
      </div>
    </div>
  )
}
