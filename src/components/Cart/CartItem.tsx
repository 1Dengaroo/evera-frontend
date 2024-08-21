import React from 'react'
import { useCart } from '../../hooks/useCart'

interface CartItemProps {
  id: string
  name: string
  price: number
  size: string
  quantity: number
  imageUrl: string
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  imageUrl
}) => {
  const { removeItem, updateQuantity } = useCart()

  return (
    <div className="flex items-center justify-between space-x-16 p-6 border-b w-full">
      <div className="flex items-center">
        <img
          src={imageUrl}
          alt={name}
          className="w-20 h-20 object-cover rounded"
        />
        <div className="ml-4">
          <h3 className="text-md font-serif">{name}</h3>
          <p className="text-xs font-serif text-gray-600">
            ${Number(price).toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex items-center px-4">
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => updateQuantity(id, parseInt(e.target.value))}
          className="w-12 p-1 text-center border rounded font-serif text-sm"
        />
        <button
          onClick={() => removeItem(id)}
          className="ml-4 border px-2 rounded font-serif hover:bg-black hover:text-white"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
