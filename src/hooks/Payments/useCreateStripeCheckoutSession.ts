import axios from 'axios'
import { CartItem } from '../../types/'
import { setAuthToken } from '../Users/setAuthToken'

export const useCreateStripeCheckoutSession = async (
  items: CartItem[]
): Promise<string | null> => {
  try {
    const filteredItems = items.map((item) => ({
      id: item.id,
      quantity: item.quantity
    }))

    const url = `${process.env.REACT_APP_API_URL}/orders`
    const token = localStorage.getItem('jwtToken')
    setAuthToken(token)

    const response = await axios.post(url, {
      items: filteredItems
    })

    return response.data.session_id
  } catch {
    return null
  }
}
