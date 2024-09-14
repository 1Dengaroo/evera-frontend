import { useState, useEffect } from 'react'
import axios from 'axios'

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
        const url = `${process.env.REACT_APP_API_URL}/products/${id}/price_by_id`
        const response = await axios.get(url)
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
