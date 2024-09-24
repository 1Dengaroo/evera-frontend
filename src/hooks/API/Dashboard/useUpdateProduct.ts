import { useState } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'
import { Product } from '../../../types'

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
      const response = await axiosInstance.patch(`/products/${id}`, updatedData)
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
