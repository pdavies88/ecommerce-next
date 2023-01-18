import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utils/formatCurrency'
import CartItem from './CartItem'
import { useQuery } from '@apollo/client'
import { GET_ALL_BOXES } from './Boxes'

interface ShoppingCartProps {
  isOpen: boolean
}

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCart()
  const { data, error, loading } = useQuery(GET_ALL_BOXES)
  if (loading) return <p>Loading...</p>
  if (error != null) return <p>Error: {error.message}</p>

  return (
    <Offcanvas onHide={closeCart} show={isOpen} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className='ms-auto fw-bold fs-5'>
            Total{' '}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = data.getBoxes.find(
                  (i: any = {}) => i._id === cartItem.id
                )
                return (
                  total +
                  (item?.cost != null ? item?.cost : 0) * cartItem.quantity
                )
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ShoppingCart
