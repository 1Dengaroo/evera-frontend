import { useState, useEffect } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'
import { Product } from '../../../types'

export const useGetSimilarProducts = (id: string) => {
  const [similarProducts, setSimilarProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      setError('Product ID is required')
      return
    }

    const fetchSimilarProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axiosInstance.get(
          `/products/${id}/similar_products`
        )
        setSimilarProducts(response.data)
      } catch (err: any) {
        setError('Failed to fetch similar products')
      } finally {
        setLoading(false)
      }
    }

    fetchSimilarProducts()
  }, [id])

  return { similarProducts, loading, error }
}
