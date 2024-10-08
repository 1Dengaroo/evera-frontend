import { useState, useEffect } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'
import { Product } from '../../../types'

export const useGetProduct = (productId: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      try {
        if (!productId) {
          setProduct(null)
          setLoading(false)
          return
        }
        const response = await axiosInstance.get(`/products/${productId}/edit`)
        setProduct(response.data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  return { product, loading, error }
}
