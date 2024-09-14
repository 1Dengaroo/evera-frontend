import { useState, useEffect } from 'react'
import axios from 'axios'

export const useGetStripePublicKey = () => {
  const [publicKey, setPublicKey] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPublicKey = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/configurations/stripe_public_key`
        const response = await axios.get(url)
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
