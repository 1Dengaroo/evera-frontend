import { useState, useEffect } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'
import { Order } from '../../../types'

export const useGetOrders = (isAuthenticated: boolean) => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    const fetchOrders = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axiosInstance.get('/orders')
        setOrders(response.data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch orders')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [isAuthenticated])

  return { orders, loading, error }
}
