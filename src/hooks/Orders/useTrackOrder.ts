import { useState } from 'react'
import axios from 'axios'
import { Order } from '../../types'

export const useTrackOrder = () => {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const trackOrder = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const url = `${process.env.REACT_APP_API_URL}/orders/${id}/track_order`
      const response = await axios.get(url)
      setOrder(response.data)
    } catch (err: any) {
      setError('Failed to track order')
    } finally {
      setLoading(false)
    }
  }

  return { order, trackOrder, loading, error }
}
