import React, { useState, useEffect } from 'react'
import { useCart } from '../hooks/Cart/useCart'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { useGetStripePublicKey } from '../hooks/Payments/useGetStripePublicKey'
import { useCreateStripeCheckoutSession } from '../hooks/Payments/useCreateStripeCheckoutSession'
import { Section } from '../components/Section'

const Payment: React.FC = () => {
  const [stripe, setStripe] = useState<Stripe | null>(null)
  const { items } = useCart()

  const { sessionId, createCheckoutSession, loading, error } =
    useCreateStripeCheckoutSession()

  const { publicKey, error: publicKeyError } = useGetStripePublicKey()

  useEffect(() => {
    const initializeStripe = async () => {
      if (publicKey) {
        const stripeInstance = await loadStripe(publicKey)
        setStripe(stripeInstance)
      }
    }

    initializeStripe()
  }, [publicKey])

  useEffect(() => {
    const initializeCheckout = async () => {
      if (!stripe || items.length === 0) return

      await createCheckoutSession(items)

      if (sessionId) {
        const { error } = await stripe.redirectToCheckout({ sessionId })
        if (error) {
          console.error('Stripe Checkout error:', error)
        }
      }
    }

    initializeCheckout()
  }, [stripe, sessionId])

  if (items.length === 0) {
    return <>Your cart is empty</>
  }

  if (loading || !stripe) {
    return <p className="text-center">Redirecting to payment...</p>
  }

  if (error || publicKeyError) {
    return (
      <p className="text-center text-red-600">
        Error: {error || publicKeyError}
      </p>
    )
  }

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
