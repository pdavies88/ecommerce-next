import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import ShoppingCart from '../components/ShoppingCart'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface ShoppingCartProviderProps {
  children: ReactNode
}

interface ShoppingCartContextProps {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: string) => number | undefined
  increaseCartQuantity: (id: string) => void
  decreaseCartQuantity: (id: string) => void
  removeFromCart: (id: string) => void
  cartQuantity: number
  cartItems: CartItem[]
}

interface CartItem {
  id: string
  quantity: number
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const ShoppingCartContext = createContext({} as ShoppingCartContextProps)

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext)
}

export const ShoppingCartProvider = ({
  children
}: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  )
  const [isOpen, setIsOpen] = useState(false)
  const [cartQuantity, setCartQuantity] = useState(0)

  const getItemQuantity = (id: string) => {
    return cartItems.find(item => item.id === id) != null
      ? cartItems.find(item => item.id === id)?.quantity
      : 0
  }

  const increaseCartQuantity = (id: string) => {
    setCartItems(items => {
      if (items.find(item => item.id === id) == null) {
        return [...items, { id, quantity: 1 }]
      } else {
        return items.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  const decreaseCartQuantity = (id: string) => {
    setCartItems(items => {
      if (items.find(item => item.id === id)?.quantity === 1) {
        return items.filter(item => item.id !== id)
      } else {
        return items.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems(items => {
      return items.filter(item => item.id !== id)
    })
  }

  useEffect(() => {
    setCartQuantity(
      cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
    )
  }, [getItemQuantity])

  const openCart = () => {
    setIsOpen(true)
  }

  const closeCart = () => {
    setIsOpen(false)
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}
