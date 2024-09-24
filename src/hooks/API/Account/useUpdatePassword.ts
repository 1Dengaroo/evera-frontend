import { useState } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'

interface UpdatePasswordParams {
  currentPassword: string
  newPassword: string
  passwordConfirmation: string
}

interface UseUpdatePasswordReturn {
  updatePassword: (params: UpdatePasswordParams) => Promise<boolean>
  loading: boolean
  error: string | null
  message: string | null
}

export const useUpdatePassword = (): UseUpdatePasswordReturn => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const updatePassword = async (
    params: UpdatePasswordParams
  ): Promise<boolean> => {
    const { currentPassword, newPassword, passwordConfirmation } = params

    setLoading(true)
    setError(null)

    try {
      const response = await axiosInstance.patch('/users/update_password', {
        current_password: currentPassword,
        user: {
          password: newPassword,
          password_confirmation: passwordConfirmation
        }
      })
      setMessage(response.data.message)
      return true
    } catch (e: any) {
      setError(
        e.response?.data?.error ||
          'Something went wrong while updating the password.'
      )
      return false
    } finally {
      setLoading(false)
    }
  }

  return { updatePassword, loading, error, message }
}
