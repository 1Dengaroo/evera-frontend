import { useState, useEffect } from 'react'
import axios from 'axios'

interface ValidateProductResponse {
  valid: boolean
  message?: string
}

export const useValidateProduct = (item: {
  id: string
  quantity: number
  size: string
}) => {
  const [isValid, setIsValid] = useState<boolean>(true)
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!item.id || !item.quantity || !item.size) {
      setError('Invalid product data.')
      setLoading(false)
      return
    }

    const validateItem = async () => {
      setLoading(true)
      setError(null)
      try {
        const url = `${process.env.REACT_APP_API_URL}/products/validate_product`
        const response = await axios.post<ValidateProductResponse>(url, {
          item: {
            id: item.id,
            quantity: item.quantity,
            size: item.size
          }
        })
        setIsValid(response.data.valid)
        setMessage(response.data.message || '')
      } catch (error: any) {
        setError(error.response?.data?.message || 'Failed to validate product.')
      } finally {
        setLoading(false)
      }
    }

    validateItem()
  }, [item.id, item.quantity, item.size])

  return { isValid, message, loading, error }
}
