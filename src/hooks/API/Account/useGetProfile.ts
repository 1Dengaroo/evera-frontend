import { useState, useEffect } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'

export interface UserProfile {
  name?: string
  email?: string
  phone_number?: string
}

export const useGetProfile = (isAuthenticated: boolean) => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axiosInstance.get('/users/profile')
      setProfile(response.data)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch profile')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }
    fetchProfile()
  }, [isAuthenticated])

  return { profile, loading, error, fetchProfile }
}
