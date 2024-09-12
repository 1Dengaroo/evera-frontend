import axios from 'axios'
import { Product } from '../../types'

export const useGetSimilarProducts = async (id: string): Promise<Product[]> => {
  if (!id) return []
  try {
    const url = `${process.env.REACT_APP_API_URL}/products/${id}/similar_products`
    const response = await axios.get(url)
    return response.data
  } catch {
    return []
  }
}
