import React, { useState, useEffect } from 'react'
import { useCart } from '../../hooks/Cart/useCart'
import { useGetProductPriceById } from '../../hooks/Products/useGetProductPriceById'

interface CartItemProps {
  id: string
  name: string
  size: string
  quantity: number
  imageUrl: string
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  quantity,
  imageUrl
}) => {
  const { removeItem, updateQuantity } = useCart()
  const [price, setPrice] = useState<number | null>(null)

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const p = await useGetProductPriceById(id)
        setPrice(p)
      } catch {
        setPrice(0)
      }
    }

    fetchPrice()
  }, [id])

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
            {price !== null
              ? `$${Number(price).toFixed(2)}`
              : 'Loading price...'}
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
