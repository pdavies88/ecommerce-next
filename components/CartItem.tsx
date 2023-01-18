import { useQuery } from '@apollo/client'
import { Button, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utils/formatCurrency'
import { GET_ALL_BOXES } from './Boxes'

interface CartItemProps {
  id: string
  quantity: number
}

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart()
  const { data, error, loading } = useQuery(GET_ALL_BOXES)
  if (loading) return <p>Loading...</p>
  if (error != null) return <p>Error: {error.message}</p>

  const item = data.getBoxes.find((i: any = {}) => i._id === id)
  if (item == null) return null

  return (
    <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
      <img
        alt={item.name}
        src={item.image}
        style={{ width: '125px', height: '75px', objectFit: 'contain' }}
      />
      <div className='me-auto'>
        <div>
          {item.name}{' '}
          {quantity > 1 && (
            <span className='text-muted' style={{ fontSize: '.65rem' }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className='text-muted' style={{ fontSize: '.75rem' }}>
          {formatCurrency(item.cost)}
        </div>
      </div>
      <div> {formatCurrency(item.cost * quantity)}</div>
      <Button
        variant='outline-danger'
        size='sm'
        onClick={() => {
          removeFromCart(item._id)
        }}
      >
        &times;
      </Button>
    </Stack>
  )
}

export default CartItem
