import React, { useState, useEffect } from 'react'
import { useCart } from '../hooks/Cart/useCart'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { useGetStripePublicKey } from '../hooks/Payments/useGetStripePublicKey'
import { useCreateStripeCheckoutSession } from '../hooks/Payments/useCreateStripeCheckoutSession'
import { Section } from '../components/Section'
import { LoadingSpinner } from '../components/LoadingSpinner'

const Payment: React.FC = () => {
  const [stripe, setStripe] = useState<Stripe | null>(null)
  const { items } = useCart()

  const { sessionUrl, createCheckoutSession, loading, error } =
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

      if (sessionUrl) {
        window.location.replace(sessionUrl)
      }
    }

    initializeCheckout()
  }, [stripe, sessionUrl, items, createCheckoutSession])

  if (items.length === 0) {
    return <>Your cart is empty</>
  }

  if (loading || !stripe) {
    return (
      <div className="flex justify-center items-center h-16">
        <LoadingSpinner />
      </div>
    )
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
      titleClassName="text-3xl font-light tracking-wide my-8"
      shortHeight
    >
      <div>
        <Payment />
      </div>
    </Section>
  )
}

export default Checkout
