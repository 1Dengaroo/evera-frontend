import { useState, useEffect } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'
import { CartItem } from '../../../types'

export const useGetCartTotal = (
  items: CartItem[],
  shouldFetch: boolean = true
) => {
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!shouldFetch || items.length === 0) {
      setTotal(0)
      return
    }

    const fetchTotal = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axiosInstance.post('/carts/cart_total', {
          items: items.map((item) => ({ id: item.id, quantity: item.quantity }))
        })
        setTotal(Number(response.data.total))
      } catch (err: any) {
        setError('Failed to get cart total')
      } finally {
        setLoading(false)
      }
    }

    fetchTotal()
  }, [items, shouldFetch])

  return { total, loading, error }
}
