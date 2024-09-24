import { useState } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'
import { Order } from '../../../types'

export const useTrackOrder = () => {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const trackOrder = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axiosInstance.get(`/orders/${id}/track_order`)
      setOrder(response.data)
    } catch (err: any) {
      setError('Failed to track order')
    } finally {
      setLoading(false)
    }
  }

  return { order, trackOrder, loading, error }
}
