import { useState } from 'react'
import axios from 'axios'
import { Product } from '../../types'
import { setAuthToken } from '../Users/setAuthToken'

export const useUpdateProduct = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const updateProduct = async (
    id: string,
    updatedData: Partial<Product>
  ): Promise<Product | null> => {
    setLoading(true)
    setError(null)
    try {
      const url = `${process.env.REACT_APP_API_URL}/products/${id}`
      const token = localStorage.getItem('jwtToken')
      setAuthToken(token)
      const response = await axios.patch(url, updatedData)
      return response.data
    } catch (err: any) {
      setError(err.message || 'Unknown error')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { updateProduct, loading, error }
}
