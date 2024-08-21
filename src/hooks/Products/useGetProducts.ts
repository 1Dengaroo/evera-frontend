import axios from 'axios'
import { Product } from '../../types'

const API_URL = 'http://localhost:5000/api/v1/products'

export const useGetProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch {
    return []
  }
}
