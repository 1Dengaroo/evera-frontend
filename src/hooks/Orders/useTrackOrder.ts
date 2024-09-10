import axios from 'axios'
import { Order } from '../../types'

export const useTrackOrder = async (id: string): Promise<Order | null> => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/orders/${id}/track_order`
    const response = await axios.get(url)
    console.log(response.data)
    return response.data
  } catch {
    return null
  }
}
