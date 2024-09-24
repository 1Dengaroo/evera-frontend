import { useState } from 'react'
import { setAuthToken } from '../../../utils/auth/setAuthToken'
import axiosInstance from '../../../utils/axios/axiosInstance'

export interface UserProfile {
  name?: string
  email?: string
  phone_number_attributes?: {
    number?: string
  }
}

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const updateProfile = async (
    updatedData: Partial<UserProfile>
  ): Promise<UserProfile | null> => {
    setLoading(true)
    setError(null)
    try {
      const response = await axiosInstance.patch('/users/update_profile', {
        user: updatedData
      })
      return response.data
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Unknown error')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { updateProfile, loading, error }
}
