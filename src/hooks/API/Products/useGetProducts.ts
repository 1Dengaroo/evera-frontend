import { useState, useEffect } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'
import { Product } from '../../../types'
import { ProductFilterParams } from './types'

export const useGetProducts = (params: ProductFilterParams = {}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const { name, sort_by, sort_direction } = params

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const queryParams = {
          ...(name && { name }),
          ...(sort_by && { sort_by }),
          ...(sort_direction && { sort_direction })
        }
        const queryString = new URLSearchParams(queryParams).toString()
        const fullUrl = queryString ? `/products/?${queryString}` : `/products/`
        const response = await axiosInstance.get(fullUrl)
        setProducts(response.data)
      } catch {
        setError('Error fetching products')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [name, sort_by, sort_direction])

  return { products, loading, error }
}
