import Link from 'next/link'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utils/formatCurrency'
import DeleteBox from './DeleteBox'
import { Button, Card } from 'react-bootstrap'
import { useSession } from 'next-auth/react'

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
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart
  } = useShoppingCart()

  const boxId = box._id

  const quantity = getItemQuantity(boxId)

  const { data: session } = useSession()

  return (
    <Card className='h-100'>
      <Card.Img
        variant='top'
        height='200px'
        style={{ objectFit: 'contain' }}
        src={box?.image}
        alt={box.name}
      />
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='d-flex align-items-center mb-4 flex-column'>
          <Link className='fs-2' href={`/box/${box._id}`}>
            {box.name}
          </Link>
          <span className='ms-2 text-muted'>{formatCurrency(box.cost)}</span>
          <p>{box.description}</p>
        </Card.Title>
        <div className='mt-auto my-2'>
          {quantity === 0 ? (
            <Button
              className='w-100'
              onClick={() => {
                increaseCartQuantity(boxId)
              }}
            >
              Add to Cart
            </Button>
          ) : (
            <div
              className='d-flex align-items-center flex-column'
              style={{ gap: '0.5rem' }}
            >
              <div
                className='d-flex align-items-center justify-content-center'
                style={{ gap: '0.5rem' }}
              >
                <Button
                  onClick={() => {
                    decreaseCartQuantity(boxId)
                  }}
                >
                  -
                </Button>
                <div>
                  <span className='fs-3'>{quantity}</span> in cart
                </div>
                <Button
                  onClick={() => {
                    increaseCartQuantity(boxId)
                  }}
                >
                  +
                </Button>
              </div>
              <Button
                variant='danger'
                size='sm'
                onClick={() => {
                  removeFromCart(boxId)
                }}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
        {session != null && (
          <>
            <Button className='my-2'>
              <Link
                href={{
                  pathname: 'edit',
                  query: {
                    id: box._id
                  }
                }}
                passHref
              >
                <a className='link-light text-decoration-none d-block'>
                  Edit Box
                </a>
              </Link>
            </Button>
            <DeleteBox id={box._id} />
          </>
        )}
      </Card.Body>
    </Card>
  )
}
