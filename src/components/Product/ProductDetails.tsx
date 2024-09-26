import React, { useState } from 'react'
import { QuantityInput } from '../Input'
import { useCart } from '../../hooks/useCart'
import { useNotification } from '../../context/NotificationContext'
import { ProductDetailsProps } from './types'
import { ButtonOne } from '../Button'

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)
  const { addItem } = useCart()
  const { showNotification } = useNotification()

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      showNotification('Please select a size', 'error')
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      quantity,
      size: selectedSize,
      imageUrl: product.cover_image
    })
    showNotification('Item added to cart', 'success')
  }

  const handleQuantityIncrement = () => {
    setQuantity(quantity + 1)
  }

  const handleQuantityDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="md:sticky md:top-56 self-start py-8">
      <h1 className="text-3xl leading-10 tracking-wide my-4 font-serif">
        {product.name}
      </h1>
      <p className="text-gray-500 mb-4 tracking-wide text-sm md:w-3/4">
        {product.description}
      </p>
      <p className="text-sm font-light text-gray-500 mb-4">
        ${Number(product.price / 100).toFixed(2)} USD
      </p>
      {product.sizes.length > 0 && (
        <p className="text-sm font-light text-gray-700 mb-2">Select Size</p>
      )}
      <div className="flex space-x-2 mb-4">
        {product.sizes.map((size) => (
          <button
            key={size}
            className={`px-4 py-2 text-xs rounded-lg bg-gray-100 border w-full max-w-36 ${
              selectedSize === size ? 'border-black border-1' : ''
            }`}
            onClick={() => setSelectedSize(size)}
            type="button"
          >
            {size}
          </button>
        ))}
      </div>
      <p className="text-sm font-light text-gray-700 mb-2">Quantity</p>
      <QuantityInput
        className="mb-2 border-gray-200 bg-gray-100 rounded-xl"
        onChange={setQuantity}
        onDecrement={handleQuantityDecrement}
        onIncrement={handleQuantityIncrement}
        value={quantity}
      />
      <ButtonOne
        className="w-full h-12 py-2 tracking-wide hover:bg-gray-100 mt-6 transition duration-500"
        label="Add to Cart"
        onClick={handleAddToCart}
        type="button"
      />
    </div>
  )
}
