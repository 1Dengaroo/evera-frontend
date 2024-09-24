import { useState } from 'react'
import axios from 'axios'

export const useResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const resetPassword = async (
    resetToken: string | null,
    password: string,
    passwordConfirmation: string
  ): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const url = `${process.env.REACT_APP_API_URL}/password`
      const response = await axios.put(url, {
        user: {
          reset_password_token: resetToken,
          password,
          password_confirmation: passwordConfirmation
        }
      })
      setMessage(response.data.message)
      return true
    } catch (e: any) {
      setError(e.response?.data?.error || 'Something went wrong.')
      return false
    } finally {
      setLoading(false)
    }
  }

  return { resetPassword, loading, error, message }
}