import { useState, useEffect } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'

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
        const response = await axiosInstance.post<ValidateProductResponse>(
          '/carts/validate_product',
          {
            item: {
              id: item.id,
              quantity: item.quantity,
              size: item.size
            }
          }
        )
        setIsValid(response.data.valid)
        setMessage(response.data.message || '')
      } catch (e: any) {
        setError(e.response?.data?.message || 'Failed to validate product.')
      } finally {
        setLoading(false)
      }
    }

    validateItem()
  }, [item.id, item.quantity, item.size])

  return { isValid, message, loading, error }
}
