import { useState, useEffect } from 'react'
import axios from 'axios'
import { Product } from '../../types'

export const useGetProductById = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      setError('Product ID is required')
      return
    }

    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      try {
        const url = `${process.env.REACT_APP_API_URL}/products/${id}`
        const response = await axios.get(url)
        setProduct(response.data)
      } catch (err: any) {
        setError('Failed to fetch product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return { product, loading, error }
}
