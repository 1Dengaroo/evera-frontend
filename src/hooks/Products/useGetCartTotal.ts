import axios from 'axios'
import { CartItem } from '../../types/'

const API_URL = 'http://localhost:5000/api/v1/products'

export const useGetCartTotal = async (
  items: CartItem[]
): Promise<number | null> => {
  try {
    const response = await axios.post(`${API_URL}/get_cart_total`, {
      items: items
    })
    return Number(response.data.total)
  } catch {
    return null
  }
}
