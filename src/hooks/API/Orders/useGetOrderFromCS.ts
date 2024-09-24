import { useState, useEffect } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'
import { Order } from '../../../types'

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
        const response = await axiosInstance.get(
          `/orders/success?session_id=${sessionId}`
        )
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
