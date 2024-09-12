import axios from 'axios'
import { Order } from '../../types'
import { setAuthToken } from '../Users/setAuthToken'
import { UpdateOrderParams } from './types'

export const useUpdateOrder = async ({
  orderId,
  delivery_attributes: delivery
}: UpdateOrderParams): Promise<Order | null> => {
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
  } catch {
    return null
  }
}
