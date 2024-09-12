import React, { useState, useEffect } from 'react'
import { Section } from '../components/Section'
import { Order } from '../types'
import { useGetOrderFromCS } from '../hooks/Orders/useGetOrderFromCS'
import { OrderCard } from '../components/Order'
import { useCart } from '../hooks/Cart/useCart'

export const OrderSuccess: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { clearCart } = useCart()

  const sessionId = new URLSearchParams(window.location.search).get(
    'session_id'
  )

  useEffect(() => {
    const fetchOrder = async () => {
      if (sessionId) {
        try {
          const fetchedOrder = await useGetOrderFromCS(sessionId)
          setOrder(fetchedOrder)
        } catch (err) {
          setError('Failed to load order details.')
        }
      } else {
        setError('No session ID found in the URL.')
      }
    }

    clearCart()
    fetchOrder()
  }, [sessionId])

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
      <p className="w-3/4 text-lg justify-center mx-auto mt-8 text-center">
        Thank you for your purchase! You can continue shopping or check your
        email for further details. You should also receive an email confirmation
        shortly with your order details.
      </p>
      <div className="mx-auto justify-center mx-auto mt-8">
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
