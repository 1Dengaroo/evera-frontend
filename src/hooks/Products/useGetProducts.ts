import axios from 'axios'
import { Product } from '../../types'
import { ProductFilterParams } from './types'

export const useGetProducts = async (
  params: ProductFilterParams = {}
): Promise<Product[]> => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/products/`

    const queryParams: Record<string, string | boolean | undefined> = {}

    if (params.name) queryParams.name = params.name
    if (params.sort_by) queryParams.sort_by = params.sort_by
    if (params.sort_direction) {
      queryParams.sort_direction = params.sort_direction
    }

    const queryString = new URLSearchParams(
      queryParams as Record<string, string>
    ).toString()

    const fullUrl = queryString ? `${url}?${queryString}` : url
    const response = await axios.get(fullUrl)
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}
