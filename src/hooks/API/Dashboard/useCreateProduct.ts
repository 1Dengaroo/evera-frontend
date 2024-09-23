import axios from 'axios'
import { Product } from '../../../types'
import { setAuthToken } from '../../../utils/auth/setAuthToken'

export const useCreateProduct = () => {
  const createProduct = async (
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

  return { createProduct }
}
