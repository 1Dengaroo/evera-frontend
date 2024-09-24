import { useState } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'
import { Order } from '../../../types'
import { UpdateOrderParams } from './types'

export const useUpdateOrder = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const updateOrder = async ({
    orderId,
    delivery_attributes: delivery
  }: UpdateOrderParams): Promise<Order | null> => {
    setLoading(true)
    setError(null)
    try {
      const response = await axiosInstance.patch(`/orders/${orderId}`, {
        order: {
          delivery_attributes: delivery
        }
      })
      return response.data
    } catch (err: any) {
      setError(err.message || 'Unknown error')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { updateOrder, loading, error }
}
