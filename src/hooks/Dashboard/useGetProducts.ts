import axios from 'axios'
import { Product } from '../../types'
import { setAuthToken } from '../Users/setAuthToken'
import { GetProductsParams } from './types'

export const useGetProducts = async (
  params?: GetProductsParams
): Promise<Product[]> => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/products/admin_index`
    const token = localStorage.getItem('jwtToken')
    setAuthToken(token)

    const queryParams: Record<string, string | boolean | undefined> = {}
    if (params?.active !== undefined) queryParams.active = params.active
    if (params?.name) queryParams.name = params.name
    if (params?.startDate) {
      queryParams['created_at[start_date]'] = params.startDate
    }
    if (params?.endDate) queryParams['created_at[end_date]'] = params.endDate
    if (params?.sortByDate) queryParams.sort_by_date = params.sortByDate

    const queryString = new URLSearchParams(
      queryParams as Record<string, string>
    ).toString()

    const finalUrl = queryString ? `${url}?${queryString}` : url

    const response = await axios.get(finalUrl)
    return response.data
  } catch {
    return []
  }
}
