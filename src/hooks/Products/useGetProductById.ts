import axios from 'axios'
import { Product } from '../../types'

export const useGetProductById = async (
  id: string
): Promise<Product | null> => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/products/${id}`
    const response = await axios.get(url)
    return response.data
  } catch {
    return null
  }
}
