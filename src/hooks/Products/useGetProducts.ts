import { useState, useEffect } from 'react'
import axios from 'axios'
import { Product } from '../../types'
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
        const url = `${process.env.REACT_APP_API_URL}/products/`

        const queryParams: Record<string, string> = {}

        if (name) queryParams.name = name
        if (sort_by) queryParams.sort_by = sort_by
        if (sort_direction) queryParams.sort_direction = sort_direction

        const queryString = new URLSearchParams(queryParams).toString()

        const fullUrl = queryString ? `${url}?${queryString}` : url
        const response = await axios.get(fullUrl)
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
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
