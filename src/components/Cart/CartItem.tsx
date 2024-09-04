import React, { useState, useEffect } from 'react'
import { useCart } from '../../hooks/Cart/useCart'
import { useGetProductPriceById } from '../../hooks/Products/useGetProductPriceById'
import { useValidateProduct } from '../../hooks/Products/useValidateProduct'
import { CartItemProps } from '../../types'

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  size,
  quantity,
  imageUrl
}) => {
  const { removeItem, updateQuantity } = useCart()
  const [price, setPrice] = useState<number | null>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchPrice = async () => {
      const { success, data } = await useGetProductPriceById(id)
      if (success) {
        setPrice(data)
      }
    }

    const validateItem = async () => {
      const { valid, message } = await useValidateProduct({
        id,
        quantity
      })
      !valid ? setError(message) : setError('')
    }

    validateItem()
    fetchPrice()
  }, [id, quantity])

  return (
    <div className="flex items-center justify-between p-4 border-b w-full">
      <div className="flex items-center">
        <img
          src={imageUrl}
          alt={name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="ml-6">
          <h3 className="text-lg font-semibold">
            {size ? `${name} (${size})` : name}
          </h3>
          <p className={`text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
            {error
              ? error
              : price !== null
                ? `$${(price / 100).toFixed(2)}`
                : 'Loading price...'}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => updateQuantity(id, size, parseInt(e.target.value))}
          className="w-12 h-8 text-center border rounded-md text-sm"
        />
        <button
          onClick={() => removeItem(id, size)}
          className="ml-4 text-red-600 hover:text-red-800"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
