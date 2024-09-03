import axios from 'axios'
import { CartItem } from '../../types/'

export const useValidateCart = async (items: CartItem[]): Promise<any> => {
  if (items.length === 0) {
    return 0
  }

  try {
    const url = `${process.env.REACT_APP_API_URL}/products/validate_cart`
    const response = await axios.post(url, {
      items: items.map((item) => ({ id: item.id, quantity: item.quantity }))
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}
