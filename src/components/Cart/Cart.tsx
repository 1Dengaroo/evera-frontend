import React from 'react'
import { useCart } from '../../hooks/useCart'
import { CartItem } from './CartItem'
import { calculateCartTotal } from '../../utils/calculateCartTotal'

export const Cart: React.FC = () => {
  const { items, clearCart } = useCart()

  if (items.length === 0) {
    return <p className="p-4 text-center">Your cart is empty</p>
  }

  return (
    <div className="p-4">
      {items.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      <div className="mt-4">
        <p className="text-lg font-semibold">
          Total: ${calculateCartTotal(items).toFixed(2)}
        </p>
        <button
          onClick={clearCart}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Clear Cart
        </button>
        <button className="mt-2 ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Checkout
        </button>
      </div>
    </div>
  )
}
