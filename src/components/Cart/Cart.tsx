import React, { useState, useEffect } from 'react'
import { useCart } from '../../hooks/useCart'
import { CartItem } from './CartItem'
import { useNavigate } from 'react-router-dom'
import { calculateCartTotal } from '../../utils/calculateCartTotal'

export const Cart: React.FC = () => {
  const { items } = useCart()
  const navigate = useNavigate()
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    const fetchTotal = async () => {
      const total = await calculateCartTotal(items)
      setTotal(total || 0)
    }
    fetchTotal()
  }, [])

  return (
    <div className="container mx-auto p-4">
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
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
      )}
      <p className="text-right mt-4 pr-10 font-serif">
        Total: ${total.toFixed(2)}
      </p>
      <button
        className="bg-black text-white font-serif py-2 px-4 mt-4"
        onClick={() => {
          navigate('/checkout')
        }}
      >
        Checkout
      </button>
    </div>
  )
}
