import { useState, useEffect } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'

export const useGetProductPriceById = (id: string) => {
  const [price, setPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('No product ID provided.')
      setLoading(false)
      return
    }

    const fetchPrice = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axiosInstance.get(`/products/${id}/price_by_id`)
        setPrice(Number(response.data.price))
      } catch {
        setError('Product is no longer available.')
      } finally {
        setLoading(false)
      }
    }

    fetchPrice()
  }, [id])

  return { price, loading, error }
}
