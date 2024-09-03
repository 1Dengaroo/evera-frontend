import { Cart } from '../components/Cart/Cart'
import React from 'react'

const CartPage: React.FC = () => {
  return (
    <div className="w-3/4 mx-auto flex flex-col items-center">
      <h2 className="text-3xl text-center font-serif mt-16">Your Cart</h2>
      <div className="w-full p-4">
        <Cart />
      </div>
    </div>
  )
}

export default CartPage
