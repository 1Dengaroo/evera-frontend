import { useState } from 'react'
import axios from 'axios'

export const useRequestPasswordReset = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const requestPasswordReset = async (email: string): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const url = `${process.env.REACT_APP_API_URL}/password`
      const response = await axios.post(url, { email })
      setMessage(response.data.message)
      return true
    } catch (e: any) {
      setError(e.response?.data?.error || 'Something went wrong.')
      return false
    } finally {
      setLoading(false)
    }
  }

  return { requestPasswordReset, loading, error, message }
}
