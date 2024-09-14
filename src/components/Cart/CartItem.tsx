import React from 'react'
import { useCart } from '../../hooks/Cart/useCart'
import { QuantityInput } from '../Input'
import { UnderlineButton } from '../Button'
import { ExtendedCartItem } from './types'

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
  validationMessage,
  showMobileLayout = false
}) => {
  const { removeItem, updateQuantity } = useCart()

  const handleIncrement = () => {
    updateQuantity(id, size, quantity + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(id, size, quantity - 1)
    }
  }

  const handleQuantityChange = (newValue: number) => {
    updateQuantity(id, size, newValue)
  }

  const displayError = !isValid ? validationMessage : null

  return (
    <div className="flex items-start md:items-center justify-between py-12 px-2 border-b w-full">
      <div className="flex items-start items-center">
        <img
          alt={name}
          className="w-32 h-44 object-cover rounded-md"
          src={imageUrl}
        />
        <div className="ml-6 h-full">
          <h3 className="text-md font-thin tracking-wider">
            {size ? `${name} (${size})` : name}
          </h3>
          <p
            className={`text-sm ${
              displayError ? 'text-red-600' : 'text-gray-500'
            }`}
          >
            {displayError
              ? displayError
              : price !== undefined
                ? `$${(price / 100).toFixed(2)}`
                : 'Price not available'}
          </p>
          {/* Mobile Layout */}
          <div
            className={`flex items-center mt-4 ${
              showMobileLayout ? 'block' : 'md:hidden'
            }`}
          >
            <QuantityInput
              onChange={handleQuantityChange}
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
              value={quantity}
            />
            <UnderlineButton
              className="ml-4 tracking-wider text-sm"
              label="Remove"
              onClick={() => removeItem(id, size)}
            />
          </div>
        </div>
      </div>
      {/* Desktop Layout */}
      <div
        className={`hidden ${
          showMobileLayout ? 'hidden' : 'md:flex'
        } items-center`}
      >
        <QuantityInput
          onChange={handleQuantityChange}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
          value={quantity}
        />
        <UnderlineButton
          className="ml-4 tracking-wider text-sm"
          label="Remove"
          onClick={() => removeItem(id, size)}
        />
      </div>
    </div>
  )
}
