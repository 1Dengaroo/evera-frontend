import { useState, useEffect } from 'react'
import axios from 'axios'
import { Order } from '../../types'
import { setAuthToken } from '../Users/setAuthToken'

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
        const url = `${process.env.REACT_APP_API_URL}/orders`
        const token = localStorage.getItem('jwtToken')
        setAuthToken(token)
        const response = await axios.get(url)
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
