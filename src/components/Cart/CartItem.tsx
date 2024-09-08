import React, { useState, useEffect } from 'react'
import { useCart } from '../../hooks/Cart/useCart'
import { useGetProductPriceById } from '../../hooks/Products/useGetProductPriceById'
import { useValidateProduct } from '../../hooks/Products/useValidateProduct'
import { CartItemProps } from '../../types'
import { QuantityInput } from '../Input/QuantityInput'
import { UnderlineButton } from '../Button/UnderlineButton'

interface ExtendedCartItemProps extends CartItemProps {
  showMobileLayout?: boolean
}

export const CartItem: React.FC<ExtendedCartItemProps> = ({
  id,
  name,
  size,
  quantity,
  imageUrl,
  showMobileLayout = false // Add prop to control layout
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

  return (
    <div className="flex items-start md:items-center justify-between py-12 px-2 border-b w-full">
      <div className="flex items-start items-center">
        <img
          src={imageUrl}
          alt={name}
          className="w-32 h-44 object-cover rounded-md"
        />
        <div className="ml-6 h-full">
          <h3 className="text-md font-thin tracking-wider font-serif">
            {size ? `${name} (${size})` : name}
          </h3>
          <p className={`text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
            {error
              ? error
              : price !== null
                ? `$${(price / 100).toFixed(2)}`
                : 'Loading price...'}
          </p>
          {/* Mobile Layout */}
          <div
            className={`flex items-center mt-4 ${showMobileLayout ? 'block' : 'md:hidden'}`}
          >
            <QuantityInput
              value={quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onChange={handleQuantityChange}
            />
            <UnderlineButton
              label="Remove"
              onClick={() => removeItem(id, size)}
              className="ml-4 tracking-wider text-sm font-serif"
            />
          </div>
        </div>
      </div>
      {/* Desktop Layout */}
      <div
        className={`hidden ${showMobileLayout ? 'hidden' : 'md:flex'} items-center`}
      >
        <QuantityInput
          value={quantity}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onChange={handleQuantityChange}
        />
        <UnderlineButton
          label="Remove"
          onClick={() => removeItem(id, size)}
          className="ml-4 tracking-wider text-sm font-serif"
        />
      </div>
    </div>
  )
}
