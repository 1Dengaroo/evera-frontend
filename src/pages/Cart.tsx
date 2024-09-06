import { Cart } from '../components/Cart/Cart'
import React from 'react'

const CartPage: React.FC = () => {
  return (
    <div className="md:w-3/4 md:mx-auto px-4 flex flex-col items-center">
      <h2 className="text-3xl text-center font-serif mt-16">Your Cart</h2>
      <div className="w-full md:p-4">
        <Cart />
      </div>
    </div>
  )
}

export default CartPage
