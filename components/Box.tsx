import Link from 'next/link'
import { formatCurrency } from '../utils/formatCurrency'
import DeleteBox from './DeleteBox'

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
        <Link href={`/box/${box._id}`}>{box.name}</Link>
      </div>
      <div>{formatCurrency(box.cost)}</div>
      <p>{box.description}</p>
      <Link
        href={{
          pathname: 'edit',
          query: {
            id: box._id
          }
        }}
      >
        Click here to edit
      </Link>
      <DeleteBox id={box._id} />
    </div>
  )
}
