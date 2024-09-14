import { useState } from 'react'
import axios from 'axios'
import { Order } from '../../types'
import { setAuthToken } from '../Users/setAuthToken'
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
      const url = `${process.env.REACT_APP_API_URL}/orders/${orderId}`
      const token = localStorage.getItem('jwtToken')
      setAuthToken(token)
      const response = await axios.patch(url, {
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
