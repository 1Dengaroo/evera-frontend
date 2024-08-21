import React, { useEffect, useState } from 'react'
import { useStripe, useElements } from '@stripe/react-stripe-js'
import { PaymentElement, AddressElement } from '@stripe/react-stripe-js'
import { CheckoutCartItem } from './CheckoutCartItem'
import { useCart } from '../../hooks/useCart'
import { calculateCartTotal } from '../../utils/calculateCartTotal'

export const CheckoutForm: React.FC = () => {
  const stripe = useStripe()
  const elements = useElements()

  const { items } = useCart()

  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    const fetchTotal = async () => {
      const total = await calculateCartTotal(items)
      setTotal(total || 0)
    }
    fetchTotal()
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`
      }
    })

    if (error) {
      setMessage(`Payment failed: ${error.message}`)
    }

    setIsProcessing(false)
  }

  return (
    <>
      <p className="text-md font-serif mt-8">Your Items</p>
      <div className="w-full">
        {items.map((item) => (
          <CheckoutCartItem
            key={item.id}
            id={item.id}
            name={item.name}
            quantity={item.quantity}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
      <p className="text-right mt-4 pr-5 font-serif mb-16">
        Total: ${total.toFixed(2)}
      </p>
      <p className="text-md font-serif">Billing Information</p>
      <form id="payment-form" onSubmit={handleSubmit}>
        <AddressElement options={{ mode: 'billing' }} />
        <PaymentElement
          options={{ fields: { billingDetails: { email: 'auto' } } }}
        />
        <button
          disabled={isProcessing}
          id="submit"
          className="border rounded px-4 mt-4 font-serif"
        >
          <span id="button-text">
            {isProcessing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Pay'
            )}
          </span>
        </button>
        {message && <div className="mt-2 text-red-500">{message}</div>}
      </form>
    </>
  )
}
