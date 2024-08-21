import axios from 'axios'
import { Product } from '../../types'

const API_URL = 'http://localhost:5000/api/v1/products'

export const useGetProductById = async (
  id: string
): Promise<Product | null> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch {
    return null
  }
}
