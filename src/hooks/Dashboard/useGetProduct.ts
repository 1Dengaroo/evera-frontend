import { useState, useEffect } from 'react'
import axios from 'axios'
import { setAuthToken } from '../../utils/auth/setAuthToken'
import { Product } from '../../types'

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
        const url = `${process.env.REACT_APP_API_URL}/products/${productId}/edit`
        const token = localStorage.getItem('jwtToken')
        setAuthToken(token)
        const response = await axios.get(url)
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
