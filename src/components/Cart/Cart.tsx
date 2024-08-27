import React, { useState, useEffect, useContext } from 'react'
import { useCart } from '../../hooks/Cart/useCart'
import { CartItem } from './CartItem'
import { useNavigate } from 'react-router-dom'
import { useGetCartTotal } from '../../hooks/Products/useGetCartTotal'
import { AuthContext } from '../../context/AuthContext'

export const Cart: React.FC = () => {
  const { items } = useCart()
  const navigate = useNavigate()
  const [total, setTotal] = useState<number>(0)
  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    const fetchTotal = async () => {
      const total = await useGetCartTotal(items)
      setTotal(total || 0)
    }
    fetchTotal()
  }, [items])

  if (items.length === 0) {
    return <>Your cart is empty</>
  }

  return (
    <div className="container mx-auto p-4">
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
      <p className="text-right mt-4 pr-10 font-serif">
        Total: ${total.toFixed(2)}
      </p>
      {!isAuthenticated ? (
        <>
          <button
            className="bg-black text-white font-serif py-2 px-4 mt-8"
            onClick={() => {
              navigate('/login')
            }}
          >
            Login and track your orders
          </button>
          <div
            className="text-center mt-4 hover:underline cursor-pointer"
            onClick={() => navigate('/checkout')}
          >
            Checkout as guest
          </div>
        </>
      ) : (
        <>
          <button
            className="bg-black text-white font-serif py-2 px-4 mt-8"
            onClick={() => {
              navigate('/checkout')
            }}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  )
}
