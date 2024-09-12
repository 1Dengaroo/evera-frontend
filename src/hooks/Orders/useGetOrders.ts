import axios from 'axios'
import { Order } from '../../types'
import { setAuthToken } from '../Users/setAuthToken'

export const useGetOrders = async (): Promise<Order[]> => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/orders`
    const token = localStorage.getItem('jwtToken')
    setAuthToken(token)
    const response = await axios.get(url)
    return response.data
  } catch {
    return []
  }
}
