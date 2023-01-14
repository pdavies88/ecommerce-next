import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Product from './Product'

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`
interface ProductType {
  id: number
  photo: {
    id: string
    image: {
      publicUrlTransformed: string
    }
  }
  name: string
  price: number
  description: string
}

export default function Products () {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY)
  if (loading) return <p>Loading...</p>
  if (error != null) return <p>Error: {error.message}</p>
  return (
    <div>
      <div>
        {data.allProducts.map((product: ProductType) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
