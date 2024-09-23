import React, { useState } from 'react'
import { useCart } from '../../hooks/useCart'
import { UnderlineButton } from '../Button'
import { ExtendedCartItem } from './types'
import { CiTrash } from 'react-icons/ci'

interface CartItemProps extends ExtendedCartItem {
  price?: number
  isValid?: boolean
  validationMessage?: string
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  size,
  quantity,
  imageUrl,
  price,
  isValid,
  validationMessage
}) => {
  const { removeItem, updateQuantity } = useCart()
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleQuantityChange = async (newQuantity: number) => {
    setError(null)
    setUpdating(true)
    try {
      await updateQuantity(id, size, newQuantity)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setUpdating(false)
    }
  }

  const displayError = !isValid ? validationMessage : null

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <tbody>
          <tr className="border-b">
            <td className="py-4 w-1/2 pr-6">
              <div className="flex items-center">
                <a
                  href={`/shop/${id}`}
                  className="flex min-w-16 min-h-24 w-16 h-24"
                >
                  <img
                    alt={name}
                    className="w-full h-full object-cover rounded-md"
                    src={imageUrl}
                  />
                </a>
                <div className="ml-4">
                  <p className="text-sm tracking-wider">{name}</p>
                  {size && (
                    <p className="text-xs text-gray-500">Size: {size}</p>
                  )}
                </div>
              </div>
            </td>

            <td className="py-4 w-1/6">
              <div className="flex items-center gap-x-2">
                <button
                  onClick={() => removeItem(id, size)}
                  className="text-red-500"
                >
                  <CiTrash />
                </button>
                <div className="flex items-center">
                  <select
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(parseInt(e.target.value))
                    }
                    className="w-12 h-8 p-2 border text-xs rounded"
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <option value={i + 1} key={i}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  {updating && <span className="ml-2">Loading...</span>}
                </div>
                {error && <p className="text-red-600 mt-2">{error}</p>}
              </div>
            </td>

            <td className="py-4 w-1/6">
              <p
                className={`text-xs ${
                  displayError ? 'text-red-600' : 'text-gray-500'
                }`}
              >
                {displayError
                  ? displayError
                  : price !== undefined
                    ? `$${(price / 100).toFixed(2)}`
                    : 'Price not available'}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
