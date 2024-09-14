import React, { useContext } from 'react'
import { useCart } from '../../hooks/Cart/useCart'
import { CartItem } from './CartItem'
import { useNavigate } from 'react-router-dom'
import { useGetCartTotal } from '../../hooks/Cart/useGetCartTotal'
import { AuthContext } from '../../context/AuthContext'
import { useValidateCart } from '../../hooks/Cart/useValidateCart'
import { ButtonOne, UnderlineButton } from '../Button'

export const Cart: React.FC = () => {
  const { items } = useCart()
  const navigate = useNavigate()
  const { isAuthenticated } = useContext(AuthContext)

  const { total, loading: totalLoading } = useGetCartTotal(items)
  const { isValid: cartIsValid, loading: validateLoading } =
    useValidateCart(items)

  if (items.length === 0) {
    return <p className="text-center mt-8">Your cart is empty</p>
  }

  if (totalLoading || validateLoading) {
    return <p className="text-center mt-8">Loading...</p>
  }

  return (
    <div className="container">
      <div className="w-full">
        {items.map((item) => (
          <CartItem
            key={`${item.id}-${item.size}`}
            id={item.id}
            imageUrl={item.imageUrl}
            name={item.name}
            quantity={item.quantity}
            size={item.size}
          />
        ))}
      </div>
      <div className="text-right">
        <p className="font-gray-500">Subtotal: ${(total / 100).toFixed(2)}</p>
        <p className="text-gray-500 italic">Tax: TBD</p>
        <p className="text-gray-500 italic">Shipping: TBD</p>
        <p className="font-semibold">Total: ${(total / 100).toFixed(2)}</p>
      </div>

      {cartIsValid && (
        <div className="w-full flex flex-col items-center mt-8">
          {!isAuthenticated ? (
            <>
              <ButtonOne
                className="px-6 py-3 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 transition-colors duration-300 rounded-full shadow-md"
                label="Login and track your order"
                onClick={() => navigate('/login')}
              />
              <UnderlineButton
                className="text-sm mt-4 hover:underline transition-all"
                label="Checkout as guest"
                onClick={() => navigate('/checkout')}
              />
            </>
          ) : (
            <ButtonOne
              className="px-6 py-3 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 transition-colors duration-300 rounded-full shadow-md"
              label="Checkout"
              onClick={() => navigate('/checkout')}
            />
          )}
        </div>
      )}
    </div>
  )
}
