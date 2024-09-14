import { useState, useEffect } from 'react'
import axios from 'axios'
import { CartItem } from '../../types'

export const useValidateCart = (
  items: CartItem[],
  shouldValidate: boolean = true
) => {
  const [isValid, setIsValid] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!shouldValidate || items.length === 0) {
      setIsValid(false)
      return
    }

    const validateCart = async () => {
      setLoading(true)
      setError(null)

      try {
        const url = `${process.env.REACT_APP_API_URL}/products/validate_cart`
        const response = await axios.post(url, {
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            size: item.size
          }))
        })
        setIsValid(response.data.valid)
      } catch (err: any) {
        setError('Failed to validate cart')
      } finally {
        setLoading(false)
      }
    }

    validateCart()
  }, [items, shouldValidate])

  return { isValid, loading, error }
}
