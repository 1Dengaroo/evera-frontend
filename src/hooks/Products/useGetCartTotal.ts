import axios from 'axios'
import { CartItem } from '../../types/'

export const useGetCartTotal = async (
  items: CartItem[]
): Promise<number | null> => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/products/get_cart_total`
    const response = await axios.post(url, {
      items: items
    })
    return Number(response.data.total)
  } catch {
    return null
  }
}
