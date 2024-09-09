import React, { useState, useEffect, useContext } from 'react'
import { useCart } from '../../hooks/Cart/useCart'
import { CartItem } from './CartItem'
import { useNavigate } from 'react-router-dom'
import { useGetCartTotal } from '../../hooks/Products/useGetCartTotal'
import { AuthContext } from '../../context/AuthContext'
import { useValidateCart } from '../../hooks/Products/useValidateCart'
import { ButtonOne } from '../Button/ButtonOne'
import { UnderlineButton } from '../Button/UnderlineButton'

export const Cart: React.FC = () => {
  const { items } = useCart()
  const navigate = useNavigate()
  const [total, setTotal] = useState<number>(0)
  const { isAuthenticated } = useContext(AuthContext)
  const [cartIsValid, setCartIsValid] = useState<boolean>(false)

  useEffect(() => {
    const fetchTotal = async () => {
      const total = await useGetCartTotal(items)
      setTotal(total || 0)
    }

    const validateCart = async () => {
      const { valid } = await useValidateCart(items)
      !valid ? setCartIsValid(false) : setCartIsValid(true)
    }

    validateCart()
    fetchTotal()
  }, [items])

  if (items.length === 0) {
    return <p className="text-center mt-8">Your cart is empty</p>
  }

  return (
    <div className="container">
      <div className="w-full">
        {items.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            size={item.size}
            quantity={item.quantity}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
      <p className="text-right mt-4 pr-10">
        Total: ${(total / 100).toFixed(2)}
      </p>
      {!isAuthenticated ? (
        <>
          {cartIsValid && (
            <div className="w-full flex flex-col items-center">
              <ButtonOne
                className="mt-8"
                label="Login and track your order"
                onClick={() => {
                  navigate('/login')
                }}
              />
              <UnderlineButton
                label="Checkout as guest"
                className="text-sm cursor-pointer mt-2"
                onClick={() => navigate('/checkout')}
              />
            </div>
          )}
        </>
      ) : (
        <>
          {cartIsValid && (
            <div className="w-full flex flex-col items-center">
              <ButtonOne
                className="mt-8"
                label="Checkout"
                onClick={() => {
                  navigate('/checkout')
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
