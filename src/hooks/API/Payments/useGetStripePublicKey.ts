import { useState, useEffect } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'

export const useGetStripePublicKey = () => {
  const [publicKey, setPublicKey] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPublicKey = async () => {
      try {
        const response = await axiosInstance.get(
          `/configurations/stripe_public_key`
        )
        setPublicKey(response.data.stripe_public_key)
      } catch (err: any) {
        setError('Failed to fetch Stripe public key')
      } finally {
        setLoading(false)
      }
    }

    fetchPublicKey()
  }, [])

  return { publicKey, loading, error }
}
