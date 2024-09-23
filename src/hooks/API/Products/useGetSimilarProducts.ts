import { useState, useEffect } from 'react'
import axios from 'axios'
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
        const url = `${process.env.REACT_APP_API_URL}/products/${id}/similar_products`
        const response = await axios.get(url)
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
