import React, { useState } from 'react'
import { QuantityInput } from '../Input'
import { useCart } from '../../hooks/Cart/useCart'
import { useNotification } from '../../context/NotificationContext'
import { ProductDetailsProps } from './types'

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
    <div className="lg:sticky top-28 self-start p-8">
      <h1 className="text-2xl tracking-wider my-4">{product.name}</h1>
      <p className="text-md font-light text-gray-700 mb-4">
        ${Number(product.price / 100).toFixed(2)} USD
      </p>
      {product.sizes.length > 0 && (
        <p className="text-sm font-thin text-gray-700 mb-4">Size</p>
      )}
      <div className="flex space-x-2 mb-4">
        {product.sizes.map((size) => (
          <button
            key={size}
            className={`px-4 py-2 text-xs rounded-sm border border-black ${
              selectedSize === size ? 'bg-black text-white' : ''
            }`}
            onClick={() => setSelectedSize(size)}
            type="button"
          >
            {size}
          </button>
        ))}
      </div>
      <p className="text-sm font-thin text-gray-700 mb-2">Quantity</p>
      <QuantityInput
        className="mb-2 border-black"
        onChange={setQuantity}
        onDecrement={handleQuantityDecrement}
        onIncrement={handleQuantityIncrement}
        value={quantity}
      />
      <button
        className="w-full h-12 py-2 tracking-wider border border-black rounded-sm hover:bg-gray-100 mb-12 transition duration-500"
        onClick={handleAddToCart}
        type="button"
      >
        ADD TO BAG
      </button>
      <p className="text-gray-700 mb-4 tracking-wide font-thin text-sm">
        {product.description}
      </p>
      <p className="text-gray-700 mb-4 tracking-wide text-sm italic">
        *Size one up for a better oversized fit if you prefer a bigger hoodie.
        Keep regular size if you prefer the boxy and cropped fit of your hoodie.
        Refer to size chart for any sizing questions.
      </p>
    </div>
  )
}
