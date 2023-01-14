import Link from 'next/link'
import { formatCurrency } from '../utils/formatCurrency'

interface ProductProps {
  product: {
    photo: {
      id: string
      image: {
        publicUrlTransformed: string
      }
    }
    name: string
    id: number
    price: number
    description: string
  }
}

export default function Product ({ product }: ProductProps) {
  return (
    <div>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </div>
      <div>{formatCurrency(product.price)}</div>
      <p>{product.description}</p>
      {/* TODO: Add buttons to edit and delete item */}
    </div>
  )
}
