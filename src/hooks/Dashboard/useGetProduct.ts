import axios from 'axios'
import { setAuthToken } from '../Users/setAuthToken'
import { Product } from '../../types'

export const useGetProduct = async (
  productId: string | undefined
): Promise<Product | null> => {
  try {
    if (!productId) return null
    const url = `${process.env.REACT_APP_API_URL}/products/${productId}/edit`
    const token = localStorage.getItem('jwtToken')
    setAuthToken(token)
    const response = await axios.get(url)
    return response.data
  } catch {
    return null
  }
}
