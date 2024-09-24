import { useState, useEffect } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'
import { Product } from '../../../types'

export const useGetFrontPageProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(
          '/products/front_page_products'
        )
        setProducts(response.data)
      } catch (err: any) {
        setError('Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}
