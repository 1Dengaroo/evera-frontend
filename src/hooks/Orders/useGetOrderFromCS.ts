import { useState, useEffect } from 'react'
import axios from 'axios'
import { Order } from '../../types'
import { setAuthToken } from '../Users/setAuthToken'

export const useGetOrderFromCS = (sessionId: string | null) => {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      if (!sessionId) {
        setError('No session ID found in the URL.')
        setLoading(false)
        return
      }
      try {
        const url = `${process.env.REACT_APP_API_URL}/orders/success?session_id=${sessionId}`
        const token = localStorage.getItem('jwtToken')
        setAuthToken(token)

        const response = await axios.get(url)
        setOrder(response.data)
      } catch (err: any) {
        setError('Failed to load order details.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [sessionId])

  return { order, loading, error }
}
