import React, { useState, useEffect } from 'react'
import { Section } from '../components/Section/Section'
import { useCart } from '../hooks/Cart/useCart'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { useGetStripePublicKey } from '../hooks/Payments/useGetStripePublicKey'
import { useCreateStripeCheckoutSession } from '../hooks/Payments/useCreateStripeCheckoutSession'

const Payment: React.FC = () => {
  const [stripe, setStripe] = useState<Stripe | null>(null)
  const { items } = useCart()

  if (items.length === 0) {
    return <>Your cart is empty</>
  }

  useEffect(() => {
    const fetchStripeKeyAndInit = async () => {
      const publicKey = await useGetStripePublicKey()
      const stripeInstance = await loadStripe(publicKey)
      setStripe(stripeInstance)
    }

    fetchStripeKeyAndInit()
  }, [])

  useEffect(() => {
    const initializeCheckout = async () => {
      if (!stripe || items.length === 0) return

      const sessionId = await useCreateStripeCheckoutSession(items)

      if (sessionId) {
        const { error } = await stripe.redirectToCheckout({ sessionId })
        if (error) {
          console.error('Stripe Checkout error:', error)
        }
      }
    }

    if (stripe) {
      initializeCheckout()
    }
  }, [stripe])

  return null
}

const Checkout: React.FC = () => {
  return (
    <Section
      title="Checkout"
      titleClassName="text-3xl font-thin tracking-wide my-8"
      shortHeight
    >
      <div>
        <Payment />
      </div>
    </Section>
  )
}

export default Checkout
