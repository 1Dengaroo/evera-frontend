import { useState } from 'react'
import axios from 'axios'
import { Product } from '../../../types'
import { setAuthToken } from '../../../utils/auth/setAuthToken'
import { GetProductsParams } from './types'

export const useGetProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async (params?: GetProductsParams) => {
    setLoading(true)
    setError(null)
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
      if (params?.endDate) {
        queryParams['created_at[end_date]'] = params.endDate
      }
      if (params?.sortByDate) queryParams.sort_by_date = params.sortByDate

      const queryString = new URLSearchParams(
        queryParams as Record<string, string>
      ).toString()

      const finalUrl = queryString ? `${url}?${queryString}` : url

      const response = await axios.get(finalUrl)
      setProducts(response.data)
    } catch (err: any) {
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return { products, fetchProducts, loading, error }
}
