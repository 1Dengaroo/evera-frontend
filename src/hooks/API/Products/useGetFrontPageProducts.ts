import { useState, useEffect } from 'react'
import axios from 'axios'
import { Product } from '../../../types'

export const useGetFrontPageProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/products/front_page_products`
        const response = await axios.get(url)
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
