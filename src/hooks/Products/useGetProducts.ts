import axios from 'axios'
import { Product } from '../../types'

export const useGetProducts = async (): Promise<Product[]> => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/products/`
    const response = await axios.get(url)
    return response.data
  } catch {
    return []
  }
}
