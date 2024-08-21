import React, { useState, useEffect } from 'react'
import { Section } from '../components/Section/Section'
import axios from 'axios'
import { useCart } from '../hooks/useCart'
import { calculateCartTotal } from '../utils/calculateCartTotal'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { CheckoutForm } from '../components/Cart/CheckoutForm'

const Payment = () => {
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null)
  const [clientSecret, setClientSecret] = useState<string>('')
  const { items, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="text-center">
        <p>Your cart is empty</p>
      </div>
    )
  }

  useEffect(() => {
    const pKey =
      'pk_test_51Ppx4nRx549mv7EGWPmnwyciCBRvjFSTTQNcu0smjgyBD2zvZUoFeOoF94kFizpecuWW3wCbogVRi4QIMam8GCsZ00YzGWrQ26'
    setStripePromise(loadStripe(pKey))
  }, [])

  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await axios.post(
        'http://localhost:5000/api/v1/orders/',
        {
          amount: calculateCartTotal(items) * 100
        }
      )
      setClientSecret(response.data.client_secret)
    }
    fetchClientSecret()
  }, [])

  return (
    <>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  )
}

const Checkout: React.FC = () => {
  return (
    <Section
      title="Checkout"
      titleClassName="text-4xl font-serif my-8"
      shortHeight
    >
      <div>
        <Payment />
      </div>
    </Section>
  )
}

export default Checkout
