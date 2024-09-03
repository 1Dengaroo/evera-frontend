import axios from 'axios'
import { Product } from '../../types'
import { setAuthToken } from '../Users/setAuthToken'

export const useCreateProduct = async (
  newProduct: Partial<Product>
): Promise<Product | null> => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/products`
    const token = localStorage.getItem('jwtToken')
    setAuthToken(token)
    const response = await axios.post(url, newProduct)
    return response.data
  } catch {
    return null
  }
}
