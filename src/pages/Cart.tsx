import { Section } from '../components/Section/Section'
import { Cart } from '../components/Cart/Cart'
import React from 'react'

const CartPage: React.FC = () => {
  return (
    <>
      <Section
        title="Your Shopping Cart"
        titleClassName="text-4xl font-serif my-8"
        shortHeight
      >
        <div className="container mx-auto p-4">
          <Cart />
        </div>
      </Section>
    </>
  )
}

export default CartPage
