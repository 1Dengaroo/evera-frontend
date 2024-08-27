import axios from 'axios'
import { Order } from '../../types'
import { setAuthToken } from '../Users/setAuthToken'

export const useGetOrderFromCS = async (
  sessionId: string
): Promise<Order | null> => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/orders/success?session_id=${sessionId}`
    const token = localStorage.getItem('jwtToken')
    setAuthToken(token)

    const response = await axios.get(url)
    return response.data
  } catch {
    return null
  }
}
