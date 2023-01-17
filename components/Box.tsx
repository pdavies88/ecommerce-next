import Link from 'next/link'
import { formatCurrency } from '../utils/formatCurrency'

interface BoxProps {
  box: {
    _id: string
    cost: number
    createdAt: string
    description: string
    image: string
    inventory: number
    name: string
  }
}

export default function Box ({ box }: BoxProps) {
  return (
    <div>
      <img src={box?.image} alt={box.name} />
      <div>
        <Link href={`/box/${box.name}`}>{box.name}</Link>
      </div>
      <div>{formatCurrency(box.cost)}</div>
      <p>{box.description}</p>
      {/* TODO: Add buttons to edit and delete item */}
    </div>
  )
}
