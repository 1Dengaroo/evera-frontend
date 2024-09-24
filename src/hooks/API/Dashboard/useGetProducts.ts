import { useState } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'
import { Product } from '../../../types'
import { GetProductsParams } from './types'

export const useGetProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async (params?: GetProductsParams) => {
    setLoading(true)
    setError(null)
    try {
      const queryParams = {
        ...(params?.active !== undefined && { active: String(params.active) }),
        ...(params?.name && { name: params.name }),
        ...(params?.startDate && {
          'created_at[start_date]': params.startDate
        }),
        ...(params?.endDate && { 'created_at[end_date]': params.endDate }),
        ...(params?.sortByDate && { sort_by_date: params.sortByDate })
      }

      const queryString = new URLSearchParams(queryParams).toString()
      const finalUrl = queryString
        ? `/products/admin_index?${queryString}`
        : `/products/admin_index`

      const response = await axiosInstance.get(finalUrl)
      setProducts(response.data)
    } catch (err: any) {
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return { products, fetchProducts, loading, error }
}
