import axios from 'axios'
import { CartItem } from '../../types/'

export const useGetCartTotal = async (
  items: CartItem[]
): Promise<number | null> => {
  if (items.length === 0) {
    return 0
  }

  try {
    const url = `${process.env.REACT_APP_API_URL}/products/cart_total`
    const response = await axios.post(url, {
      items: items.map((item) => ({ id: item.id, quantity: item.quantity }))
    })
    return Number(response.data.total)
  } catch {
    return null
  }
}
