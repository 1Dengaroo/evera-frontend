import axios from 'axios'
import { Product } from '../../types'
import { setAuthToken } from '../Users/setAuthToken'

export const useUpdateProduct = async (
  id: string,
  updatedData: Partial<Product>
): Promise<Product | null> => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/products/${id}`
    const token = localStorage.getItem('jwtToken')
    setAuthToken(token)
    const response = await axios.patch(url, updatedData)
    return response.data
  } catch {
    return null
  }
}
