import { useState } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'
import { CartItem } from '../../../types'

export const useCreateStripeCheckoutSession = () => {
  const [sessionUrl, setSessionUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const createCheckoutSession = async (items: CartItem[]) => {
    setLoading(true)
    setError(null)
    try {
      const filteredItems = items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        size: item.size
      }))

      const response = await axiosInstance.post(`/orders`, {
        items: filteredItems
      })

      setSessionUrl(response.data.session_url)
    } catch (err: any) {
      setError('Failed to create checkout session')
    } finally {
      setLoading(false)
    }
  }

  return { sessionUrl, createCheckoutSession, loading, error }
}
