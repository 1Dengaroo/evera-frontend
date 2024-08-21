import React, { useState, useEffect } from 'react'
import { getProductPriceById } from '../../services/ProductService'

interface CartItemProps {
  id: string
  name: string
  quantity: number
  imageUrl: string
}

export const CheckoutCartItem: React.FC<CartItemProps> = ({
  id,
  name,
  quantity,
  imageUrl
}) => {
  const [price, setPrice] = useState<number | null>(null)

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const p = await getProductPriceById(id)
        setPrice(p)
      } catch {
        setPrice(0)
      }
    }
    fetchPrice()
  }, [])

  return (
    <>
      <div className="flex items-center justify-between space-x-16 p-6 border-b w-full">
        <div className="flex items-center">
          <img
            src={imageUrl}
            alt={name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="ml-4">
            <h3 className="text-md font-serif">
              (x{quantity}) {name}
            </h3>
          </div>
        </div>
        <p className="text-md font-serif">
          {price !== null
            ? `$${(price * quantity).toFixed(2)}`
            : 'Loading price...'}
        </p>
      </div>
    </>
  )
}
