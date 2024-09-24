import React, { useEffect } from 'react'
import { Section } from '../components/Section'
import { useGetOrderFromCS } from '../hooks/API/Orders/useGetOrderFromCS'
import { OrderDetails } from '../components/Order'
import { useCart } from '../hooks/useCart'

export const OrderSuccess: React.FC = () => {
  const { clearCart } = useCart()

  const sessionId = new URLSearchParams(window.location.search).get(
    'session_id'
  )
  const { order, loading, error } = useGetOrderFromCS(sessionId)

  useEffect(() => {
    clearCart()
  }, [])

  if (loading) {
    return (
      <Section
        title="Loading"
        titleClassName="text-3xl tracking-wide my-8 mt-12"
      >
        <p className="text-center">Loading order details...</p>
      </Section>
    )
  }

  if (error) {
    return (
      <Section title="Error" titleClassName="text-3xl tracking-wide my-8 mt-12">
        <p className="text-center text-red-600">{error}</p>
      </Section>
    )
  }

  return (
    <div className="px-8 my-16">
      <div className="mx-auto justify-center max-w-4xl px-8">
        {order ? (
          <OrderDetails order={order} />
        ) : (
          <p className="text-center">No order details available.</p>
        )}
      </div>
    </div>
  )
}

export default OrderSuccess
