import { useState } from 'react'
import axios from 'axios'
import { CartItem } from '../../types/'
import { setAuthToken } from '../Users/setAuthToken'

export const useCreateStripeCheckoutSession = () => {
  const [sessionId, setSessionId] = useState<string | null>(null)
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

      const url = `${process.env.REACT_APP_API_URL}/orders`
      const token = localStorage.getItem('jwtToken')
      setAuthToken(token)

      const response = await axios.post(url, {
        items: filteredItems
      })

      setSessionId(response.data.session_id)
    } catch (err: any) {
      setError('Failed to create checkout session')
    } finally {
      setLoading(false)
    }
  }

  return { sessionId, createCheckoutSession, loading, error }
}
