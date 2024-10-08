import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Section } from '../components/Section'

export const OrderCancel: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Section
      title="Order Canceled"
      titleClassName="text-3xl font-light tracking-wide my-8 mt-12"
      shortHeight
    >
      <div className="flex flex-col items-center w-full">
        <p className="text-center w-3/4">
          Your order has been canceled, and you have not been charged. If you
          have any questions or need further assistance, please contact our
          support team. You can go back to the{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate('/')}
          >
            Home
          </span>{' '}
          page or continue shopping.
        </p>
      </div>
    </Section>
  )
}

export default OrderCancel
