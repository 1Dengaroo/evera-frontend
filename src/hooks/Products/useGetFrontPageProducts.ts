import axios from 'axios'
import { Product } from '../../types'

export const useGetFrontPageProducts = async (): Promise<Product[]> => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/products/get_front_page_products`
    const response = await axios.get(url)
    return response.data
  } catch {
    return []
  }
}
