import React from 'react'

interface CartItemProps {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl: string
}

export const CheckoutCartItem: React.FC<CartItemProps> = ({
  name,
  price,
  quantity,
  imageUrl
}) => {
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
          ${Number(price * quantity).toFixed(2)}
        </p>
      </div>
    </>
  )
}
