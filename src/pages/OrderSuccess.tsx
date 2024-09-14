import React, { useEffect } from 'react'
import { Section } from '../components/Section'
import { useGetOrderFromCS } from '../hooks/Orders/useGetOrderFromCS'
import { OrderCard } from '../components/Order'
import { useCart } from '../hooks/Cart/useCart'

export const OrderSuccess: React.FC = () => {
  const { clearCart } = useCart()

  const sessionId = new URLSearchParams(window.location.search).get(
    'session_id'
  )
  const { order, loading, error } = useGetOrderFromCS(sessionId) // Call the hook at the top level

  useEffect(() => {
    clearCart()
  }, [])

  if (loading) {
    return (
      <Section
        title="Loading"
        titleClassName="text-3xl font-thin tracking-wide my-8 mt-12"
      >
        <p className="text-center">Loading order details...</p>
      </Section>
    )
  }

  if (error) {
    return (
      <Section
        title="Error"
        titleClassName="text-3xl font-thin tracking-wide my-8 mt-12"
      >
        <p className="text-center text-red-600">{error}</p>
      </Section>
    )
  }

  return (
    <div className="px-4">
      <h2 className="text-3xl font-thin tracking-wide my-8 text-center mt-12">
        Order Success
      </h2>
      <p className="max-w-4xl text-lg justify-center mx-auto mt-8 text-center">
        Thank you for your purchase! You should receive an email confirmation
        shortly with your order details.
      </p>
      <div className="mx-auto justify-center mt-8">
        {order ? (
          <OrderCard order={order} />
        ) : (
          <p className="text-center">No order details available.</p>
        )}
      </div>
    </div>
  )
}

export default OrderSuccess
